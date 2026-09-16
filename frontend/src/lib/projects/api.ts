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

/** Process-local cache TTL (ms). */
export const PROJECTS_CACHE_TTL_MS = 60_000;


/** Cache entry holding validated projects and expiry timestamp. */
interface ProjectsCacheEntry {
  projects: ActiveProject[];
  expiresAt: number;
}

/** In-memory cache, keyed by URL. Process-local only. */
let projectsCache: ProjectsCacheEntry | null = null;

/**
 * Lockstep TTL guard for fetch-failure branches: a cache hit is a valid
 * fallback only while still within the 60s window (stale-while-error).
 * After expiry we degrade to `[]` so repeated failures never pin stale data
 * indefinitely. Successful results (and only those) populate the cache.
 */
function projectsCacheIsValid(): boolean {
  return projectsCache !== null && projectsCache.expiresAt > Date.now();
}

/** Clears the process-local cache. Exports for test isolation. */
export function clearProjectsCache(): void {
  projectsCache = null;
}

/**
 * Defensive runtime guard for a single project record.
 * Accepts the `ActiveProject` shape but tolerates unknown extra fields.
 * Validates optional fields: name/short_name/location as string|null,
 * lat/lng as number|null, is_hot as boolean.
 */
export function isProjectLike(data: unknown): data is ActiveProject {
  if (typeof data !== "object" || data === null) return false;
  const rec = data as Record<string, unknown>;
  if (typeof rec.project_key !== "string") return false;
  if (typeof rec.display_name !== "string") return false;

  // Optional fields — tolerate absence, validate type when present.
  if (rec.name != null && (typeof rec.name !== "string" && rec.name !== null)) return false;
  if (rec.short_name != null && (typeof rec.short_name !== "string" && rec.short_name !== null)) return false;
  if (rec.location != null && (typeof rec.location !== "string" && rec.location !== null)) return false;
  if (rec.lat != null && typeof rec.lat !== "number") return false;
  if (rec.lng != null && typeof rec.lng !== "number") return false;
  if (rec.is_hot != null && typeof rec.is_hot !== "boolean") return false;

  return true;
}

/**
 * Fetches the backend's active project catalogue.
 *
 * - Calls relative `/api/projects`.
 * - Bounded timeout (`PROJECTS_FETCH_TIMEOUT_MS`).
 * - Parses the `{ projects: [...] }` envelope.
 * - Validates array shape defensively — malformed entries rejected.
 * - 60s process-local cache: successful results cached and reused; on fetch
 *   failure (non-2xx, JSON error, network/timeout), the cache is returned
 *   ONLY while still within TTL (stale-while-error), then `[]` degrades.
 * - Never invents a default project (never Camellia).
 * - A valid 2xx response with a malformed `{ projects: ... }` envelope returns
 *   `[]` unconditionally — this is an explicit contract, not a stale fallback.
 */
export async function fetchActiveProjects(
  signal?: AbortSignal,
): Promise<ActiveProject[]> {
  // Serve from cache if still valid.
  if (projectsCacheIsValid()) {
    return projectsCache!.projects;
  }

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
      // Non-2xx — never invent a project. The freshness guard at entry already
      // returned a valid cache; by here cache is absent or expired, so degrade
      // to `[]` rather than serving stale data.
      return [];
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return [];
    }

    // Parse the `{ projects: [...] }` envelope.
    const payload = body as Record<string, unknown>;
    if (
      typeof payload !== "object" ||
      payload === null ||
      !Array.isArray(payload.projects)
    ) {
      // Valid 2xx but malformed `{ projects: ... }` envelope — explicit
      // contract: return `[]` unconditionally, never a stale fallback.
      return [];
    }

    const valid = payload.projects.filter(isProjectLike);

    // Cache successful results.
    projectsCache = {
      projects: valid,
      expiresAt: Date.now() + PROJECTS_CACHE_TTL_MS,
    };

    return valid;
  } catch {
    // Network error, timeout, abort — cache freshness already checked at
    // entry; degrade to `[]`.
    return [];
  } finally {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onCallerAbort);
    }
  }
}
