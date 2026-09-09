"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { History, Lock, Phone, Sparkles, Zap } from "lucide-react";
import toast from "react-hot-toast";

import { CHAT_DEFAULT_PROJECT_KEY, getChatProject } from "@/config/chat-projects";
import {
  fetchGreeting,
  isInferRetryableStreamError,
  QueryRequestError,
  QueryStreamError,
  streamQuery,
  type DoneMeta,
  type GreetingPayload,
} from "@/lib/chat/api";
import type { QuotaState } from "@/lib/chat/quota";

import {
  applyLeadBonus,
  isQuotaExhausted,
  normalizeQuota,
  quotaBadgeLabel,
  parseQuotaErrorEnvelope,
  QUOTA_EXCEEDED_CODE,
  shouldForceLeadForm,
} from "@/lib/chat/quota";
import {
  ASK_EVENT,
  MAX_HISTORY_TURNS,
  MAX_TURN_CHARS,
  STORAGE_PREFIX,
} from "@/lib/chat/constants";
import {
  getAnonToken,
  getDeviceId,
  getSessionId,
  persistAnonToken,
  type StorageLike,
} from "@/lib/chat/identity";
import { filterPublicImages, filterPublicVideos } from "@/lib/chat/mediaPolicy";

import { normalizeProjectRedirect, type ChatMessage } from "./MessageBubble";
import { MessageList } from "./MessageList";
import { Composer } from "./Composer";
import { ChatHistoryPopover } from "./ChatHistoryPopover";
import { LeadDialog } from "./LeadDialog";

export interface ChatPanelProps {
  /** Matches the backend project_key; all project data comes from getChatProject(). */
  projectKey?: string;
  className?: string;
  /** Surfaces chat images in the page lightbox (CamelliaClient passes setSelectedImage). */
  onImageClick?: (src: string) => void;
}

const QUOTA_EXHAUSTED_STORAGE_KEY = `${STORAGE_PREFIX}.quota_exhausted`;
const HELLO_SHOWN_KEY = `${STORAGE_PREFIX}.hello_shown`;
const ANON_TOKEN_ENDPOINT = "/api/anon/token";
const ANON_TOKEN_FETCH_TIMEOUT_MS = 3000;

/** Wall copy used when the 429/error frame carries no message. */
const QUOTA_WALL_FALLBACK_MESSAGE =
  "Anh/chị đã dùng hết lượt tư vấn miễn phí. Để lại số điện thoại để nhận thêm lượt tư vấn miễn phí nhé!";

function hasMarkIdentity(
  anonToken: string | null | undefined,
  projectKey: string | null | undefined
): boolean {
  return (
    typeof anonToken === "string" &&
    anonToken.length > 0 &&
    typeof projectKey === "string" &&
    projectKey.length > 0
  );
}

function persistQuotaExhaustedMark(storage: StorageLike, anonToken: string, projectKey: string): void {
  if (!hasMarkIdentity(anonToken, projectKey)) return;
  storage.setItem(QUOTA_EXHAUSTED_STORAGE_KEY, JSON.stringify({ t: anonToken, p: projectKey }));
}

/** True when the stored wall mark belongs to the current anon token +
 * project pair. A rotated token (post-lead) never inherits the old wall. */
function wasQuotaExhaustedMarked(
  storage: Pick<StorageLike, "getItem">,
  anonToken: string | null,
  projectKey: string | null
): boolean {
  if (!hasMarkIdentity(anonToken, projectKey)) return false;
  try {
    const parsed = JSON.parse(storage.getItem(QUOTA_EXHAUSTED_STORAGE_KEY) ?? "") as Partial<{
      t: string;
      p: string;
    }>;
    return parsed.t === anonToken && parsed.p === projectKey;
  } catch {
    return false;
  }
}

function clearQuotaExhaustedMark(storage: Pick<Storage, "removeItem" | "setItem">): void {
  try {
    storage.removeItem(QUOTA_EXHAUSTED_STORAGE_KEY);
  } catch {
    // Storage without removeItem support degrades to an unreadable row.
    storage.setItem(QUOTA_EXHAUSTED_STORAGE_KEY, "");
  }
}

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Best-effort lead note (<= 200 chars) from the latest answered facts so the
 * sales rep knows what the customer is interested in. Undefined without facts.
 */
function buildLeadNote(messages: ChatMessage[]): string | undefined {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i];
    if (msg.role !== "assistant" || !msg.facts || msg.facts.length === 0) continue;
    const subjects = msg.facts.map((f) => f.subject).filter((s) => s.trim().length > 0);
    if (subjects.length === 0) continue;
    return `Quan tâm: ${subjects.join(", ")}`.slice(0, 200);
  }
  return undefined;
}

const GREETING_ID = "greeting";

/**
 * Chat RAG orchestrator (customer path of the source ChatPage, rewritten for
 * this design system). Single project: flat state, all project data from
 * getChatProject(projectKey), no literals. The greeting is the first assistant
 * message in MessageList — seeded instantly from config.fallbackGreeting
 * (zero network), upgraded by /api/llms-hello on mount; any failure keeps the
 * fallback silently.
 */
export function ChatPanel({ projectKey = CHAT_DEFAULT_PROJECT_KEY, className, onImageClick }: ChatPanelProps) {
  const config = getChatProject(projectKey);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: GREETING_ID, role: "assistant", content: config.fallbackGreeting },
  ]);

/** Keeps the project route shareable: canonical ?sessionId= via replaceState
 * so no Next route transition unmounts the panel. Non-canonical mounts are
 * left untouched. */
function syncSessionUrl(sessionId: string): void {
  if (typeof window === "undefined") return;
  if (!window.location.pathname.startsWith("/projects/")) return;
  const params = new URLSearchParams(window.location.search);
  if (sessionId) params.set("sessionId", sessionId);
  else params.delete("sessionId");
  const qs = params.toString();
  const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  if (window.location.href !== nextUrl) window.history.replaceState(null, "", nextUrl);
}

/** Reads a deep-linked ?sessionId= at mount; empty when absent. */
function sessionIdFromUrl(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("sessionId") ?? "";
}
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(config.fallbackSuggestions);
  const [quota, setQuota] = useState<QuotaState | null>(null);
  // The wall is restored during state INIT (not in an effect) so after a reload
  // the wall + lead button show before the server re-asserts. The persisted
  // mark is identity-scoped ({t: anonToken, p: projectKey}); anonToken starts
  // null, so the server re-asserts on the first ack after the token mints.
  const [quotaExhausted, setQuotaExhausted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return wasQuotaExhaustedMarked(window.localStorage, getAnonToken(window.localStorage), projectKey);
    } catch {
      return false;
    }
  });
  const [deviceId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return getDeviceId(window.localStorage);
    } catch {
      return crypto.randomUUID();
    }
  });
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return sessionIdFromUrl() || getSessionId(window.sessionStorage, projectKey);
    } catch {
      return crypto.randomUUID();
    }
  });
  const [anonToken, setAnonToken] = useState<string | null>(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [leadCtaHint, setLeadCtaHint] = useState<string | null>(null);

  const sessionIdRef = useRef(sessionId);
  const tokenBufferRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const streamAbortRef = useRef<AbortController | null>(null);
  const switchEpochRef = useRef(0);
  // Dismissal contract: once the user closes the form mid-episode, a late
  // in-flight error frame must not reopen it behind their back.
  const leadFormDismissedRef = useRef(false);
  // Prevents StrictMode double-mount from fetching the greeting twice in dev;
  // the paired nonce ref re-arms it after a new-session reset.
  const greetingFetchedRef = useRef(false);
  const greetingFetchedNonceRef = useRef(0);
  const [greetingNonce, setGreetingNonce] = useState(0);
  const [leadDone, setLeadDone] = useState(false);

  // Patch by id: the greeting uses a fixed id, so the mount effect doesn't need
  // to live inside the message closure.
  const patchMessage = useCallback(
    (id: string, patch: Partial<ChatMessage> | ((prev: ChatMessage) => Partial<ChatMessage>)) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m))
      );
    },
    []
  );

  const rememberAnonToken = useCallback((token: unknown): void => {
    try {
      if (persistAnonToken(window.localStorage, token)) {
        setAnonToken(typeof token === "string" ? token : null);
      }
    } catch {
      // Private mode: the token lives only in this session's state.
    }
  }, []);

  // Mint the anon token lazily before the FIRST query; /query also self-heals
  // from the token in its response, so a mint failure never blocks chat.
  const ensureAnonToken = useCallback(async (): Promise<string | undefined> => {
    let stored: string | null = null;
    try {
      stored = getAnonToken(window.localStorage);
    } catch {
      stored = null;
    }
    if (stored) return stored;
    try {
      const response = await fetch(ANON_TOKEN_ENDPOINT, {
        signal: AbortSignal.timeout(ANON_TOKEN_FETCH_TIMEOUT_MS),
      });
      if (!response.ok) return undefined;
      const body = (await response.json()) as { anon_token?: unknown };
      if (typeof body.anon_token !== "string" || body.anon_token.length === 0) return undefined;
      rememberAnonToken(body.anon_token);
      return body.anon_token;
    } catch {
      return undefined;
    }
  }, [rememberAnonToken]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isNewSession = greetingNonce !== greetingFetchedNonceRef.current;
    if (isNewSession) {
      greetingFetchedNonceRef.current = greetingNonce;
      greetingFetchedRef.current = false;
    }
    if (greetingFetchedRef.current) return;
    // hello_shown is a per-tab skip guard: a reload keeps the fallback on
    // display without a network call; a new-session nonce bypasses it.
    let alreadyShown = false;
    try {
      alreadyShown =
        !isNewSession && window.sessionStorage.getItem(`${HELLO_SHOWN_KEY}.${projectKey}`) === "1";
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) {
      greetingFetchedRef.current = true;
      return;
    }
    greetingFetchedRef.current = true;
    try {
      window.sessionStorage.setItem(`${HELLO_SHOWN_KEY}.${projectKey}`, "1");
    } catch {
      // sessionStorage unavailable: non-fatal.
    }

    const epoch = switchEpochRef.current;
    void fetchGreeting(projectKey, { deviceId })
      .then((payload: GreetingPayload) => {
        if (switchEpochRef.current !== epoch) return;
        const greeting =
          typeof payload.greeting === "string" && payload.greeting.trim().length > 0
            ? payload.greeting
            : null;
        // Empty payload: keep the fallback, leave suggestions untouched.
        if (!greeting) return;
        patchMessage(GREETING_ID, {
          content: greeting,
          ...(payload.images?.length ? { images: filterPublicImages(payload.images) } : {}),
          ...(payload.videos?.length ? { videos: filterPublicVideos(payload.videos) } : {}),
        });
        setSuggestions(
          payload.suggestions && payload.suggestions.length > 0
            ? payload.suggestions
            : config.fallbackSuggestions
        );
      })
      .catch(() => {
        // ANY error/timeout: silently keep the fallback — the page must survive
        // an offline backend (project-page contract).
        if (switchEpochRef.current === epoch) return;
      });
  }, [config.fallbackSuggestions, deviceId, greetingNonce, patchMessage, projectKey]);

  // Deep-link + shareability: the canonical ?sessionId= tracks the active
  // session (mount init, new-session reset, history pick) via replaceState.
  useEffect(() => {
    if (!sessionId) return;
    syncSessionUrl(sessionId);
  }, [sessionId]);


  const handleSend = useCallback(
    (text: string) => {
      const query = text.trim();
      // A walled identity cannot send: every attempt would be rejected by the server.
      if (!query || streaming || quotaExhausted) return;

      if (!sessionIdRef.current) {
        try {
          sessionIdRef.current = getSessionId(window.sessionStorage, projectKey);
        } catch {
          sessionIdRef.current = crypto.randomUUID();
        }
        setSessionId(sessionIdRef.current);
      }

      const userMsg: ChatMessage = { id: newId(), role: "user", content: query };
      const assistantId = newId();
      const assistantMsg: ChatMessage = { id: assistantId, role: "assistant", content: "", streaming: true };

      // At most MAX_HISTORY_TURNS turns (1 turn = 1 user + 1 assistant), each
      // clamped to MAX_TURN_CHARS — matches the backend HistoryTurn limit and
      // avoids 422 validation on every turn after the first.
      const history = messages
        .filter((m) => (m.role === "user" || m.role === "assistant") && m.content.trim().length > 0)
        .slice(-(MAX_HISTORY_TURNS * 2))
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_TURN_CHARS) }));

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStreaming(true);
      setInput("");

      // One controller per stream; the identity check below keeps a replaced
      // stream's terminal event from flipping global streaming while a new
      // stream runs.
      const streamEpoch = switchEpochRef.current;
      const streamAbort = new AbortController();
      streamAbortRef.current = streamAbort;
      const isLatestStream = () =>
        streamAbortRef.current === streamAbort && switchEpochRef.current === streamEpoch;

      const flushTokens = () => {
        if (tokenBufferRef.current) {
          const chunk = tokenBufferRef.current;
          tokenBufferRef.current = "";
          patchMessage(assistantId, (m) => ({ content: m.content + chunk }));
        }
        flushTimerRef.current = null;
      };

      const runStream = (anonTokenForQuery: string | undefined) =>
        streamQuery(
          {
            query,
            session_id: sessionIdRef.current,
            history,
            device_id: deviceId,
            project_key: projectKey,
            anon_token: anonTokenForQuery,
            signal: streamAbort.signal,
          },
          {
            onAck: (ackMeta) => {
              patchMessage(assistantId, { acknowledged: true });
              const snapshot = normalizeQuota(ackMeta?.quota);
              if (snapshot) setQuota(snapshot);
              rememberAnonToken(ackMeta?.anon_token);
            },
            onRouting: (payload) => {
              patchMessage(assistantId, { progressStep: 0 });
              if (payload.lead_cta_hint != null) setLeadCtaHint(payload.lead_cta_hint);
            },
            onSources: (sources) => patchMessage(assistantId, { sources, progressStep: 1 }),
            onFacts: (facts) => patchMessage(assistantId, { facts, progressStep: 2 }),
            onImages: (images) => patchMessage(assistantId, { images }),
            onVideos: (videos) => patchMessage(assistantId, { videos }),
            onToken: (token) => {
              tokenBufferRef.current += token;
              patchMessage(assistantId, { progressStep: 3 });
              if (flushTimerRef.current === null) {
                flushTimerRef.current = window.setTimeout(flushTokens, 60);
              }
            },
            onDone: (meta: DoneMeta) => {
              if (flushTimerRef.current !== null) {
                window.clearTimeout(flushTimerRef.current);
                flushTokens();
              }
              // The durable CTA hint rides the done frame (the routing one may be null).
              const { lead_cta_hint: doneHint } = meta as DoneMeta & {
                lead_cta_hint?: string | null;
              };
              if (doneHint != null) setLeadCtaHint(doneHint);
              // Cross-project guardrail: when the backend suggests another
              // project, render an internal /projects/<slug> link card — never
              // switch projects.
              const { project_redirect: rawRedirect } = meta as DoneMeta & {
                project_redirect?: unknown;
              };
              const redirect = normalizeProjectRedirect(rawRedirect);
              // done.answer is the official sanitized answer — replace the
              // streamed body so no leftover markers survive.
              patchMessage(assistantId, {
                streaming: false,
                ...(typeof meta.answer === "string" && meta.answer.length > 0
                  ? { content: meta.answer }
                  : {}),
                confidence: meta.confidence,
                requires_review: meta.requires_review,
                traceId: meta.trace_id,
                latencyMs: meta.latency_ms,
                ...(redirect ? { projectRedirect: redirect } : {}),
              });
              const snapshot = normalizeQuota(meta.quota);
              if (snapshot) setQuota(snapshot);
              rememberAnonToken(meta.anon_token);
              if (isLatestStream()) setStreaming(false);
            },
            onError: (err) => {
              if (flushTimerRef.current !== null) {
                window.clearTimeout(flushTimerRef.current);
                flushTokens();
              }
              // Quota wall: a 429 body or an SSE error frame coded
              // ANONYMOUS_QUOTA_EXCEEDED ends the free turn — show the server
              // copy, raise the hard gate, open LeadDialog (no retry toast, no
              // input restore). Both envelope shapes (QueryRequestError.body
              // nested under `error`, QueryStreamError.data with top-level
              // `code`) feed the same parser.
              const envelope =
                err instanceof QueryRequestError
                  ? parseQuotaErrorEnvelope(err.body)
                  : err instanceof QueryStreamError
                    ? parseQuotaErrorEnvelope(err.data)
                    : null;
              if (envelope !== null && envelope.code === QUOTA_EXCEEDED_CODE) {
                patchMessage(assistantId, {
                  streaming: false,
                  content: envelope.message || QUOTA_WALL_FALLBACK_MESSAGE,
                });
                const exhausted = isQuotaExhausted(envelope.quota);
                if (envelope.quota) setQuota(envelope.quota);
                setQuotaExhausted(exhausted);
                // Persist the wall so a reload keeps the lead button until the
                // server re-asserts (or a lead bonus clears it). The mark needs a
                // non-empty anon token — mint first; never write under a shared
                // empty sentinel.
                if (exhausted && projectKey) {
                  void (async () => {
                    let markToken: string | null = null;
                    try {
                      markToken = (await ensureAnonToken()) ?? null;
                    } catch {
                      markToken = null;
                    }
                    if (!markToken) return;
                    try {
                      persistQuotaExhaustedMark(window.localStorage, markToken, projectKey);
                    } catch {
                      // Storage unavailable (private mode): the wall stays in memory only.
                    }
                  })();
                }
                if (shouldForceLeadForm(envelope.quota) && !leadFormDismissedRef.current) {
                  setLeadFormOpen(true);
                }
                if (isLatestStream()) setStreaming(false);
                return;
              }
              patchMessage(assistantId, (m) => {
                // Interruption before the done frame: keep the streamed tokens and
                // offer a retry instead of replacing a partial answer with a bare
                // error line; nothing streamed → the error copy becomes the text.
                // An explicit retryable=true flag wins; legacy frames without the
                // flag infer from the code but keep interrupted semantics.
                const hasPartial = m.content.trim().length > 0;
                const explicitRetryable = err instanceof QueryStreamError && err.retryable === true;
                const explicitNotRetryable = err instanceof QueryStreamError && err.retryable === false;
                const inferredRetryable =
                  !explicitRetryable &&
                  !explicitNotRetryable &&
                  err instanceof QueryStreamError &&
                  err.retryable === null &&
                  isInferRetryableStreamError(err.code);
                return {
                  streaming: false,
                  error: true,
                  interrupted: !(explicitRetryable || explicitNotRetryable),
                  retryable: explicitRetryable || inferredRetryable,
                  retryQuery: query,
                  content: hasPartial ? m.content : err.message,
                };
              });
              if (isLatestStream()) {
                toast.error(err.message);
                setStreaming(false);
                // Keep the text so a retry doesn't require retyping.
                setInput(query);
              }
            },
          }
        );

      // The stream is deferred until the lazy anon-token mint completes so the
      // browser's first query carries a signed identity; a stream slot replaced
      // (new epoch) during the mint must not start consuming.
      void (async () => {
        const anonTokenForQuery = await ensureAnonToken();
        if (streamAbortRef.current !== streamAbort) return;
        void runStream(anonTokenForQuery);
      })();
    },
    [
      patchMessage,
      deviceId,
      ensureAnonToken,
      messages,
      projectKey,
      quotaExhausted,
      rememberAnonToken,
      streaming,
    ]
  );

  // Ref-based ASK_EVENT wiring: MessageList suggestion chips dispatch a
  // CustomEvent; the handler reads the latest handleSend without rebinding.
  const handleSendRef = useRef(handleSend);
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  useEffect(() => {
    const onAsk = (e: Event) => {
      const detail = (e as CustomEvent<unknown>).detail;
      if (typeof detail === "string" && detail.trim()) handleSendRef.current(detail);
    };
    document.addEventListener(ASK_EVENT, onAsk as EventListener);
    return () => document.removeEventListener(ASK_EVENT, onAsk as EventListener);
  }, []);

  // Unmount hygiene: a running stream must not keep the network alive after the
  // component dies, and the token flush timer must not fire into a dead component.
  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
      streamAbortRef.current = null;
      if (flushTimerRef.current !== null) {
        window.clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
    };
  }, []);

  // Wall lifted (lead bonus) → restore auto-open for the next episode.
  useEffect(() => {
    if (!quotaExhausted) leadFormDismissedRef.current = false;
  }, [quotaExhausted]);

  const handleNewSession = useCallback(() => {
    // A new session is a context reset — bump the epoch so in-flight hydration
    // of the OLD session cannot resurrect a transcript after the reset.
    switchEpochRef.current += 1;
    streamAbortRef.current?.abort();
    streamAbortRef.current = null;
    let freshId: string;
    try {
      freshId = getSessionId(window.sessionStorage, projectKey, true);
    } catch {
      freshId = crypto.randomUUID();
    }
    sessionIdRef.current = freshId;
    setSessionId(freshId);
    setMessages([{ id: GREETING_ID, role: "assistant", content: config.fallbackGreeting }]);
    setSuggestions(config.fallbackSuggestions);
    setStreaming(false);
    // Re-enables the greeting fetch: the effect re-arms when the nonce changes.
    setGreetingNonce((n) => n + 1);
  }, [config.fallbackGreeting, config.fallbackSuggestions, projectKey]);

  const handleHistoryPick = useCallback(
    (pickedSessionId: string, transcript: ChatMessage[]) => {
      // Abort any in-flight stream + bump the epoch: transcript hydration is a context reset.
      switchEpochRef.current += 1;
      streamAbortRef.current?.abort();
      streamAbortRef.current = null;
      setStreaming(false);
      sessionIdRef.current = pickedSessionId;
      setSessionId(pickedSessionId);
      setMessages(transcript.length > 0 ? transcript : [{ id: GREETING_ID, role: "assistant", content: config.fallbackGreeting }]);
      setSuggestions(config.fallbackSuggestions);
    },
    [config.fallbackGreeting, config.fallbackSuggestions]
  );
  const handleLeadSuccess = useCallback(
    (quotaBonusGranted: number) => {
      setLeadDone(true);
      if (quotaBonusGranted > 0) {
        setQuota((prev) => applyLeadBonus(prev, quotaBonusGranted));
        setQuotaExhausted(false);
        // A granted bonus lifts the persisted wall row for good — the read side
        // already rejects identity-mismatched marks, so reloading after payoff
        // never re-walls.
        try {
          clearQuotaExhaustedMark(window.localStorage);
        } catch {
          // Storage unavailable: the lift stays in memory only.
        }
        toast.success(`+${quotaBonusGranted} lượt tư vấn miễn phí`);
      } else {
        toast.success("Đã ghi nhận thông tin của Anh/Chị.");
      }
    },
    []
  );
  // Wall shows when the current episode is exhausted, or a restored mark stands
  // unrefuted by any server snapshot (quota === null).
  const showQuotaWall = quotaExhausted && (quota === null || isQuotaExhausted(quota));
  const quotaBadge = quota ? quotaBadgeLabel(quota) : null;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-sm border border-[#E8E5DF] bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E8E5DF] bg-[#F8F7F3] px-4 py-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm bg-[#16384C]">
            <Sparkles className="h-4 w-4 text-[#C9A45D]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-base text-[#16384C]">{config.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-[#16384C]/60">
              Trợ lý dự án
              <span className="rounded-full bg-[#C9A45D]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#8C6D2F]">
                AI hỗ trợ
              </span>
            </p>
          </div>

          {quotaBadge && (
            <div
              role="status"
              aria-label={`Lượt tư vấn: ${quotaBadge}`}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[#C9A45D]/40 bg-[#C9A45D]/10 px-3 py-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-[#C9A45D]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#8C6D2F]">{quotaBadge}</span>
            </div>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => setHistoryOpen((open) => !open)}
              aria-haspopup="dialog"
              aria-expanded={historyOpen}
              aria-label="Lịch sử hội thoại"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                historyOpen
                  ? "border-[#C9A45D] bg-[#C9A45D]/15 text-[#16384C]"
                  : "border-[#E8E5DF] bg-white text-[#16384C]/70 hover:bg-[#F8F7F3]"
              }`}
            >
              <History className="h-4 w-4" aria-hidden="true" />
            </button>
            <ChatHistoryPopover
              projectKey={projectKey}
              deviceId={deviceId}
              onPick={handleHistoryPick}
              onNewSession={handleNewSession}
              open={historyOpen}
              onClose={() => setHistoryOpen(false)}
            />
          </div>
        </div>
        <div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <MessageList
                messages={messages}
                streaming={streaming}
                suggestions={suggestions}
                onSuggestion={(q) => handleSend(q)}
                onRetry={(msg) => {
                  // Interrupted retry re-sends the SAME question through the normal
                  // send path — history shaping, quota gating and stream lifecycle
                  // stay on a single route.
                  if (msg.retryQuery) handleSend(msg.retryQuery);
                }}
                onImageClick={onImageClick}
              />
            </div>

            <div className="flex-shrink-0 border-t border-[#E8E5DF] p-3">
              <Composer
                value={input}
                onChange={setInput}
                onSend={() => handleSend(input)}
                disabled={showQuotaWall}
                streaming={streaming}
              />

              {showQuotaWall && (
                <div
                  role="alert"
                  className="mx-auto mt-2 flex max-w-[860px] items-start gap-2.5 rounded-sm border border-[#C9A45D]/50 bg-[#C9A45D]/10 px-3.5 py-3"
                >
                  <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A45D]" aria-hidden="true" />
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="text-sm leading-relaxed text-[#16384C]">
                      Anh/chị đã dùng hết lượt tư vấn miễn phí. Để lại số điện thoại trong form dưới đây để nhận
                      thêm lượt miễn phí — chuyên viên sẽ gọi lại trong khoảng 5 phút.
                    </span>
                    <button
                      type="button"
                      onClick={() => setLeadFormOpen(true)}
                      className="self-start rounded-full bg-[#C9A45D] px-4 py-2 text-sm font-bold text-[#16384C] transition-opacity hover:opacity-90"
                    >
                      Để lại số điện thoại nhận thêm lượt tư vấn
                    </button>
                  </div>
                </div>
              )}

              {leadCtaHint !== null && !leadDone && (
                <button
                  type="button"
                  onClick={() => setLeadFormOpen(true)}
                  className="mx-auto mt-2 flex h-11 w-full max-w-[860px] items-center justify-center gap-2 rounded-full bg-[#16384C] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4 text-[#C9A45D]" aria-hidden="true" />
                  Nhận bảng giá + ưu đãi qua điện thoại
                </button>
              )}

              <p className="mt-2 text-center text-xs text-[#2B2B2B]/50">
                Thông tin mang tính tham khảo — vui lòng xác nhận với chuyên viên trước khi ra quyết định.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LeadDialog
        open={leadFormOpen}
        projectKey={projectKey}
        sessionId={sessionId}
        deviceId={deviceId}
        anonToken={anonToken ?? undefined}
        notePrefill={buildLeadNote(messages)}
        onClose={() => {
          // Dismissal is unconditional: the wall lives in the composer disable +
          // wall CTA, not in keeping the modal open.
          leadFormDismissedRef.current = true;
          setLeadFormOpen(false);
        }}
        onLeadSuccess={handleLeadSuccess}
      />
    </div>
  );
}
