/**
 * Project-domain contract types shared between the website data layer and the
 * backend catalogue. Backend identity (`project_key`) is deliberately kept
 * separate from website routing (`href`) so the two concerns evolve
 * independently.
 */

/**
 * Minimal shape of a project record as delivered by the FastAPI backend
 * `/api/projects` endpoint. Mirrors the backend's ingested `project_key` plus
 * the subset of human-facing fields the assistant UI needs.
 */
export interface ActiveProject {
  project_key: string;
  name?: string | null;
  display_name: string;
  short_name?: string | null;
  location?: string | null;
  lat?: number | null;
  lng?: number | null;
  is_hot?: boolean;
}

/**
 * Website-side routing metadata for a single project. This is pure website
 * data — `slug === project_key` is NOT assumed (e.g. the Wyndham/Soleil project
 * has backend key `soleil` but a legacy slug `wyndham-soleil-danang`).
 */
export interface WebsiteProjectRoute {
  /** Matches the backend's `project_key` (e.g. "camellia", "soleil"). */
  chatbotProjectKey: string;
  /** Internal route or external URL for the project page. */
  href: string;
  /** `true` when `href` is a cross-origin URL and must open externally. */
  external: boolean;
  /** Page slug; may differ from the backend key. */
  slug?: string;
  /** Optional hero image used by link tiles. */
  image?: string;
}
