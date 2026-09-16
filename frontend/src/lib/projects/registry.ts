/**
 * Website-side project registry.
 *
 * This is the canonical mapping from a backend `project_key` (delivered by
 * `/api/projects`) to website routing (`href`, `external`, `slug`). It lives
 * here so that special cases like Wyndham/Soleil's external URL are data,
 * not ad-hoc component logic.
 *
 * `slug === project_key` is NOT assumed: the Wyndham/Soleil project has the
 * backend key `soleil` but a legacy slug `wyndham-soleil-danang`.
 */
import type { WebsiteProjectRoute } from "./contracts";
import { projects } from "@/data/projects";

/**
 * The single source of truth for website routing metadata, derived from the
 * `projects.ts` data array. Only projects with `chatbotProjectKey`, `href`,
 * and `external` fields produce a route entry.
 */
export const websiteProjectRoutes: WebsiteProjectRoute[] = projects
  .filter(
    (project): project is typeof project & {
      chatbotProjectKey: string;
      href: string;
      external: boolean;
    } =>
      typeof project.chatbotProjectKey === "string" &&
      typeof project.href === "string" &&
      typeof project.external === "boolean",
  )
  .map((project) => ({
    chatbotProjectKey: project.chatbotProjectKey,
    href: project.href,
    external: project.external,
    // Preserve slug only when it differs from the backend key.
    slug: project.slug && project.slug !== project.chatbotProjectKey
      ? project.slug
      : undefined,
    image: project.image,
  }));

/**
 * Resolve website routing for a backend project key.
 *
 * @returns The matching `WebsiteProjectRoute`, or `null` when the key is
 *          unknown and NO href should be invented.
 */
export function lookupWebsiteProjectRoute(
  projectKey: string,
): WebsiteProjectRoute | null {
  return (
    websiteProjectRoutes.find((r) => r.chatbotProjectKey === projectKey) ?? null
  );
}

/**
 * Convenience: build an `href` for a backend project key.
 *
 * @returns The href string, or `null` if the key is unknown (never invents a
 *          slug-based URL).
 */
export function websiteHrefForProjectKey(projectKey: string): string | null {
  const route = lookupWebsiteProjectRoute(projectKey);
  return route ? route.href : null;
}
