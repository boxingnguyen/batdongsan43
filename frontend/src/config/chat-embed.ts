/**
 * Embed surface for the deployed RAG chat app.
 *
 * `/chatbot/*` is a thin shell that frames the chat on its own origin instead of
 * reimplementing it here, so the chat keeps a single codebase and a single
 * deploy. This module is imported by server components, client components and
 * the link builder, so it stays free of any runtime dependency.
 */

/** Origin of the deployed chat app. Override per environment. */
export const CHAT_EMBED_ORIGIN =
  process.env.NEXT_PUBLIC_CHAT_EMBED_ORIGIN ??
  "https://ragre-web-448504678237.asia-southeast1.run.app";

/** Path prefix that marks the embed surface on this site. */
export const CHAT_EMBED_PREFIX = "/chatbot";

/** Project opened when /chatbot is requested without a path. */
export const CHAT_EMBED_PROJECT_KEY = "camellia";

/** Chat route on the remote app, appended to CHAT_EMBED_ORIGIN. */
export const CHAT_EMBED_DEFAULT_PATH = ["project", CHAT_EMBED_PROJECT_KEY];

/** localStorage key holding this browser's session id for the embedded chat. */
export const CHAT_EMBED_SESSION_KEY = "bds43.embed_session_id.camellia";

/** True for /chatbot and anything nested below it. */
export function isChatEmbedPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === CHAT_EMBED_PREFIX || pathname.startsWith(`${CHAT_EMBED_PREFIX}/`);
}

/** URL-safe path segment; "." and ".." are rejected so the target cannot escape. */
const SEGMENT_PATTERN = /^[A-Za-z0-9._~-]+$/;

/**
 * Validates the catch-all segments, falling back to the default chat route.
 * Returns null when a segment is unusable so the caller can 404.
 */
export function sanitizeEmbedPath(segments: readonly string[] | undefined): string[] | null {
  if (!segments || segments.length === 0) return [...CHAT_EMBED_DEFAULT_PATH];

  const safe: string[] = [];
  for (const segment of segments) {
    if (segment === "." || segment === ".." || !SEGMENT_PATTERN.test(segment)) return null;
    safe.push(segment);
  }
  return safe;
}

/** Link target for the launcher, optionally carrying a session id. */
export function chatEmbedHref(sessionId?: string | null): string {
  const path = `${CHAT_EMBED_PREFIX}/${CHAT_EMBED_DEFAULT_PATH.join("/")}`;
  return sessionId ? `${path}?sessionId=${encodeURIComponent(sessionId)}` : path;
}

/**
 * iframe src: the remote chat route plus every incoming query parameter.
 * Parameters are forwarded verbatim (sessionId, session, history, ...) so deep
 * links keep working without this shell having to mirror the chat's own API.
 */
export function buildChatEmbedSrc(
  segments: readonly string[],
  query: Readonly<Record<string, string | string[] | undefined>>,
): string {
  const url = new URL(`${CHAT_EMBED_ORIGIN.replace(/\/$/, "")}/${segments.join("/")}`);

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      url.searchParams.append(key, item);
    }
  }

  return url.toString();
}
