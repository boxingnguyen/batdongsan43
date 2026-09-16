/**
 * Anonymous identity storage for the chat (single-project bds43 port).
 *
 * Pure over an injected Storage so tests can verify the persistence contract
 * (device_id survives reloads, session_id stays per-tab) without a DOM mock.
 * D7: device_id is the anonymous cross-visit identity — the backend scopes
 * conversation state by `device_id:session_id`, so it is minted once and
 * never regenerated per visit.
 */
import { STORAGE_PREFIX } from "./constants";

/** LocalStorage key for the persistent anonymous device id (created once). */
export const DEVICE_ID_KEY = `${STORAGE_PREFIX}.device_id`;

/**
 * LocalStorage key for the server-minted HMAC-signed anonymous identity
 * token (secure-wave spec §6). The server is the issuer and verifier; the FE
 * only stores it durably (localStorage, not tab-scoped) and echoes it back on
 * every /query so quota state survives restarts and reloads.
 */
export const ANON_TOKEN_KEY = `${STORAGE_PREFIX}.anon_token`;

/** Minimal Storage subset so tests can inject a plain-object mock. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Loads the persistent device id, creating a fresh UUID v4 on first visit. */
export function getDeviceId(storage: StorageLike): string {
  const existing = storage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const fresh = crypto.randomUUID();
  storage.setItem(DEVICE_ID_KEY, fresh);
  return fresh;
}

/**
 * Loads the session id for the current tab, scoped to one project so two
 * project surfaces can never share conversation context. With forceNew=true a
 * fresh UUID is minted, which is how a project change resets the conversation
 * context on the backend (`device_id:session_id` scope key) instead of
 * continuing the old one. Key shape: `${STORAGE_PREFIX}.session_id.${projectKey}`.
 */
export function getSessionId(storage: StorageLike, projectKey: string, forceNew = false): string {
  const key = `${STORAGE_PREFIX}.session_id.${projectKey}`;
  const existing = storage.getItem(key);
  if (existing && !forceNew) return existing;
  const fresh = crypto.randomUUID();
  storage.setItem(key, fresh);
  return fresh;
}

/**
 * Returns the persisted server-minted anon token, or null when none was
 * stored yet (the backend mints one and returns it on the next /query).
 */
export function getAnonToken(storage: StorageLike): string | null {
  return storage.getItem(ANON_TOKEN_KEY);
}

/**
 * Self-heal write path: persists an anon token returned by any /query
 * response, SSE ack frame, or GET /api/anon/token. Non-string or empty input
 * is ignored (returns false) so a malformed payload can never clobber a good
 * stored token.
 */
export function persistAnonToken(storage: StorageLike, token: unknown): boolean {
  if (typeof token !== "string" || token.length === 0) return false;
  storage.setItem(ANON_TOKEN_KEY, token);
  return true;
}
