import { CHAT_EMBED_SESSION_KEY } from "@/config/chat-embed";

/**
 * Session id for the embedded chat, minted once per browser and reused, so a
 * reload or a second click returns to the same conversation.
 *
 * Returns null when storage is unavailable (private mode, blocked storage): the
 * embed then opens without a sessionId and the chat app mints its own.
 */
export function resolveEmbedSessionId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CHAT_EMBED_SESSION_KEY);
    if (stored) return stored;

    const created =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : fallbackSessionId();

    window.localStorage.setItem(CHAT_EMBED_SESSION_KEY, created);
    return created;
  } catch {
    return null;
  }
}

/** randomUUID needs a secure context; localhost and the deployed https site qualify. */
function fallbackSessionId(): string {
  const block = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, "0");
  return `${Date.now().toString(16)}-${block()}${block()}-${block()}${block()}`;
}
