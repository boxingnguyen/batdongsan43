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

/**
 * The single source of truth for website routing metadata.
 *
 * Each entry maps a backend `chatbotProjectKey` to an internal route or
 * external URL. When a backend key has no website route entry,
 * `lookupWebsiteProjectRoute` returns `null` — never an invented href.
 */
export const websiteProjectRoutes: WebsiteProjectRoute[] = [
  {
    chatbotProjectKey: "camellia",
    href: "/projects/camellia",
    external: false,
    slug: "camellia",
    image: "/images/camellia_images/camellia-phoi-canh.jpg",
  },
  {
    chatbotProjectKey: "soleil",
    href: "https://thesoleil.vn",
    external: true,
    slug: "wyndham-soleil-danang",
    image: "/images/home/banner-1.jpg",
  },
];

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
