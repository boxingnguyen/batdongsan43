/**
 * API client for the active-project catalogue.
 *
 * Calls the relative `/api/projects` endpoint and defensively validates the
 * shape. Per GA-02: never invent projects on backend failure (returns `[]`)
 * and never default to Camellia.
 */
import type { ActiveProject } from "./contracts";

/** Wall-clock cap for one `/api/projects` request (ms). */
export const PROJECTS_FETCH_TIMEOUT_MS = 10_000;

/**
 * Defensive runtime guard for a single project record.
 * Accepts the exact `ActiveProject` shape but tolerates unknown extra fields.
 */
function isProjectLike(data: unknown): data is ActiveProject {
  if (typeof data !== "object" || data === null) return false;
  const rec = data as Record<string, unknown>;
  if (typeof rec.project_key !== "string") return false;
  if (typeof rec.display_name !== "string") return false;
  return true;
}

/**
 * Fetches the backend's active project catalogue.
 *
 * - Calls relative `/api/projects`.
 * - Bounded timeout (`PROJECTS_FETCH_TIMEOUT_MS`).
 * - Validates array shape defensively — non-array or malformed entries are
 *   rejected to `[]`.
 * - Returns `[]` on network failure / timeout / non-JSON rather than inventing
 *   a default project.
 */
export async function fetchActiveProjects(
  signal?: AbortSignal,
): Promise<ActiveProject[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PROJECTS_FETCH_TIMEOUT_MS);

  // Compose the caller's signal with our timeout.
  const onCallerAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      return [];
    }
    signal.addEventListener("abort", onCallerAbort, { once: true });
  }

  try {
    const response = await fetch("/api/projects", {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      // Non-2xx — degrade gracefully, never invent a project.
      return [];
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return [];
    }

    if (!Array.isArray(body)) {
      return [];
    }

    return body.filter(isProjectLike);
  } catch {
    // Network error, timeout, abort — return empty rather than inventing data.
    return [];
  } finally {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onCallerAbort);
    }
  }
}
