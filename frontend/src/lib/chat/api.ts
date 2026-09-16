import type {
  Confidence,
  FactEvidence,
  Image,
  NearbyPlace,
  Source,
  SseRoutingPayload,
  Video,
} from "./contracts";
import { API_QUERY_ENDPOINT, API_SSE_EVENTS } from "./constants";

/**
 * Wall-clock cap for one POST /api/query SSE stream. A cold LightRAG first
 * query can stay silent for 40s+ before the first token; 180s keeps that
 * alive while still failing a truly stalled stream fast enough for the
 * interrupted-stream retry UX.
 */
export const QUERY_STREAM_TIMEOUT_MS = 180_000;

/** Metadata delivered on the `done` SSE event (besides the streamed answer). */
export interface DoneMeta {
  trace_id: string;
  latency_ms: number;
  confidence?: Confidence;
  requires_review?: boolean;
  /**
   * Secure wave §5.3: the final sanitized answer (authoritative) — callers
   * replace the streamed message body with it.
   */
  answer?: string;
  /** Post-consumption quota snapshot (authoritative, §5.1 shape). */
  quota?: unknown;
  /** Newly minted anon token when the caller had none/invalid (§5.3). */
  anon_token?: string;
}

/** Payload of the SSE `ack` event since the secure wave (§5.3). */
export interface AckMeta {
  /** Pre-consumption quota snapshot (§5.1 shape). */
  quota?: unknown;
  /** Newly minted anon token when the caller sent none/invalid. */
  anon_token?: string;
}

/**
 * SSE `error` frame carrying a structured backend envelope (e.g.
 * ANONYMOUS_QUOTA_EXCEEDED, §5.3); plain-string errors stay plain Errors so
 * existing consumers are unaffected.
 */
export class QueryStreamError extends Error {
  /** Raw frame data: `{code, message?, retryable?, quota?, lead_cta?}` per spec §5.2/§5.3. */
  readonly data: unknown;
  /**
   * Additive backend flag: the frame explicitly marks this failure as safe to
   * retry (timeout, transient internal). Null = frame carried no flag; callers
   * fall back to code-based inference.
   */
  readonly retryable: boolean | null;
  /** Backend error code from the structured envelope, when present. */
  readonly code: string | null;

  constructor(message: string, data: unknown) {
    super(message);
    this.name = "QueryStreamError";
    this.data = data;
    const rec = (data && typeof data === "object" ? data : {}) as {
      code?: unknown;
      retryable?: unknown;
    };
    this.code = typeof rec.code === "string" ? rec.code : null;
    // Defensive read: the flag is additive, so absent/legacy frames stay null
    // instead of inventing a boolean the backend never sent.
    this.retryable = typeof rec.retryable === "boolean" ? rec.retryable : null;
  }
}

/**
 * Fallback inference for error frames that predate the additive `retryable`
 * flag: timeout and transient internal failures are retryable; policy
 * rejections and input errors are not.
 */
export function isInferRetryableStreamError(code: string | null): boolean {
  return code === "STREAM_TIMEOUT" || code === "INTERNAL";
}

/** Callbacks for each event type in the POST /api/query SSE stream. */
export interface QueryStreamHandlers {
  /** Story 4.5 — routing metadata emitted before the answer legs start. */
  onRouting?: (payload: SseRoutingPayload) => void;
  onSources?: (sources: Source[]) => void;
  onPlaces?: (places: NearbyPlace[]) => void;
  onFacts?: (facts: FactEvidence[]) => void;
  onImages?: (images: Image[]) => void;
  onVideos?: (videos: Video[]) => void;
  onToken?: (text: string) => void;
  onDone?: (meta: DoneMeta) => void;
  /** Secure wave §5.3: ack may carry the quota snapshot + a minted token. */
  onAck?: (meta?: AckMeta) => void;
  onError?: (error: Error) => void;
}

interface RawSseEvent {
  event: string;
  data: unknown;
}

/** Structured `{"ok": false, "error": {"code", "message"}}` error envelope. */
export interface ApiErrorEnvelope {
  ok?: boolean;
  error?: { code?: string; message?: string };
}

/**
 * HTTP-level query failure carrying the backend error code so callers can
 * branch on the outcome (e.g. a scope 422 instead of a dead-end toast).
 */
export class QueryRequestError extends Error {
  readonly status: number;
  readonly code: string | null;
  /** Raw error envelope, when the body parsed as JSON. */
  readonly body: ApiErrorEnvelope | null;

  constructor(status: number, message: string, code: string | null, body: ApiErrorEnvelope | null = null) {
    super(message);
    this.name = "QueryRequestError";
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

/**
 * Injectable bearer-token source for POST /api/query: a provider resolving a
 * token makes every query ship `Authorization: Bearer <token>` (the backend
 * then treats the session as authenticated instead of burning the anonymous
 * allowance). This port installs none but keeps the seam for source parity.
 */
export type QueryAuthTokenProvider = () => Promise<string | null> | string | null;

let queryAuthTokenProvider: QueryAuthTokenProvider | null = null;

/** Installs (or, with null, removes) the per-request /query token provider. */
export function setQueryAuthTokenProvider(provider: QueryAuthTokenProvider | null): void {
  queryAuthTokenProvider = provider;
}

/**
 * Resolves the Authorization headers for ONE query; never rejects — an absent
 * provider, an empty/null token or a throwing provider all degrade to "no
 * header", which keeps the historical anonymous flow byte-identical.
 */
async function resolveQueryAuthHeaders(): Promise<Record<string, string>> {
  if (!queryAuthTokenProvider) return {};
  try {
    const token = await queryAuthTokenProvider();
    return typeof token === "string" && token.length > 0
      ? { Authorization: `Bearer ${token}` }
      : {};
  } catch {
    return {};
  }
}

/**
 * Streams a chat query through POST /api/query (SSE) and fans out events to
 * the provided handlers. Supports standard `event:`/`data:` framing plus a
 * non-standard `events:` batch line (JSON array of events).
 *
 * `signal` lets the caller cancel an in-flight stream (e.g. unmount or a new
 * send); an aborted stream resolves silently instead of surfacing onError,
 * because cancellation is intentional, not a failure.
 */
export async function streamQuery(
  req: {
    query: string;
    session_id?: string;
    device_id?: string;
    project_key?: string;
    as_of?: string;
    history?: { role: "user" | "assistant"; content: string }[];
    /**
     * Secure wave §5.6: server-minted signed anonymous identity token. Sent
     * on every query so the backend can key quota to a durable identity; the
     * response/ack self-heals by returning a fresh token when absent/invalid.
     */
    anon_token?: string;
    /** Aborts the fetch + SSE read loop; no error is reported when set. */
    signal?: AbortSignal;
  },
  handlers: QueryStreamHandlers
): Promise<void> {
  const authHeaders = await resolveQueryAuthHeaders();

  // Caller abort = intentional cancel, stays silent (checked via req.signal
  // below); the QUERY_STREAM_TIMEOUT_MS abort still surfaces onError so the
  // interrupted-stream retry UX fires.
  const streamSignal = req.signal
    ? AbortSignal.any([req.signal, AbortSignal.timeout(QUERY_STREAM_TIMEOUT_MS)])
    : AbortSignal.timeout(QUERY_STREAM_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(API_QUERY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(req.device_id ? { "X-Device-Id": req.device_id } : {}),
        ...authHeaders,
      },
      body: JSON.stringify(req),
      signal: streamSignal,
    });
  } catch (cause) {
    if (req.signal?.aborted) return;
    const err = new Error("Không kết nối được máy chủ. Vui lòng thử lại.", { cause });
    handlers.onError?.(err);
    return;
  }

  if (!response.ok) {
    const body = await readErrorBody(response);
    const err = new QueryRequestError(
      response.status,
      body?.error?.message ?? `Máy chủ trả lỗi ${response.status}. Vui lòng thử lại sau.`,
      body?.error?.code ?? null,
      body
    );
    handlers.onError?.(err);
    return;
  }

  if (!response.body) {
    const err = new Error("Trình duyệt không hỗ trợ streaming phản hồi.");
    handlers.onError?.(err);
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // SSE frames are separated by a blank line.
      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1) {
        const chunk = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        dispatchChunk(chunk, handlers);
        boundary = buffer.indexOf("\n\n");
      }
    }
    // Flush the trailing frame that has no ending blank line.
    if (buffer.trim().length) {
      dispatchChunk(buffer, handlers);
    }
  } catch (cause) {
    if (req.signal?.aborted) return;
    const err = new Error("Lỗi khi đọc luồng phản hồi.", { cause });
    handlers.onError?.(err);
  } finally {
    reader.releaseLock();
  }
}

/** Parses one SSE chunk (event:, data:, events:) and dispatches events. */
function dispatchChunk(chunk: string, handlers: QueryStreamHandlers): void {
  let currentEvent = "";
  const dispatch: RawSseEvent[] = [];

  for (const line of chunk.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("event:")) {
      currentEvent = trimmed.slice(6).trim();
    } else if (trimmed.startsWith("events:")) {
      // Batch line: data is a JSON array of {event, data}.
      const raw = trimmed.slice(7).trim();
      const parsed = tryJson(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          dispatch.push({
            event: String(item?.event ?? currentEvent ?? ""),
            data: item?.data,
          });
        }
        currentEvent = "";
      }
    } else if (trimmed.startsWith("data:")) {
      const raw = trimmed.slice(5).trim();
      const parsed = tryJson(raw);
      if (parsed && typeof parsed === "object" && "event" in parsed) {
        // JSON already carries its own event name.
        const obj = parsed as Record<string, unknown>;
        dispatch.push({
          event: String(obj.event),
          data: obj.data,
        });
      } else {
        dispatch.push({
          event: currentEvent || API_SSE_EVENTS.TOKEN,
          data: parsed ?? raw,
        });
      }
      currentEvent = "";
    }
  }

  for (const evt of dispatch) {
    handleEvent(evt, handlers);
  }
}

function handleEvent(evt: RawSseEvent, handlers: QueryStreamHandlers): void {
  switch (evt.event) {
    case API_SSE_EVENTS.ACK:
      handlers.onAck?.(
        evt.data && typeof evt.data === "object" ? (evt.data as AckMeta) : undefined
      );
      break;
    case API_SSE_EVENTS.ROUTING:
      if (evt.data && typeof evt.data === "object") {
        handlers.onRouting?.(evt.data as SseRoutingPayload);
      }
      break;
    case API_SSE_EVENTS.SOURCES:
      handlers.onSources?.(
        (evt.data as { sources?: Source[] } | null)?.sources ?? asArray<Source>(evt.data)
      );
      break;
    case API_SSE_EVENTS.PLACES:
      // Backend emits an object `{"places": [...]}`, not a bare array.
      handlers.onPlaces?.((evt.data as { places?: NearbyPlace[] } | null)?.places ?? asArray<NearbyPlace>(evt.data));
      break;
    case API_SSE_EVENTS.FACTS:
      handlers.onFacts?.(
        (evt.data as { facts?: FactEvidence[] } | null)?.facts ?? asArray<FactEvidence>(evt.data)
      );
      break;
    case API_SSE_EVENTS.IMAGES:
      // Backend emits an object `{"images": [...]}`, not a bare array.
      handlers.onImages?.((evt.data as { images?: Image[] } | null)?.images ?? asArray<Image>(evt.data));
      break;
    case API_SSE_EVENTS.VIDEOS:
      // Greeting stream emits an object `{"videos": [...]}`, not a bare array.
      handlers.onVideos?.((evt.data as { videos?: Video[] } | null)?.videos ?? asArray<Video>(evt.data));
      break;
    case API_SSE_EVENTS.TOKEN:
      if (typeof evt.data === "string") {
        handlers.onToken?.(evt.data);
      } else if (evt.data && typeof evt.data === "object") {
        const text = (evt.data as { text?: string }).text;
        if (typeof text === "string") handlers.onToken?.(text);
      }
      break;
    case API_SSE_EVENTS.DONE:
      handlers.onDone?.(evt.data as DoneMeta);
      break;
    case API_SSE_EVENTS.ERROR: {
      // Structured frames (e.g. ANONYMOUS_QUOTA_EXCEEDED) keep their envelope
      // on a typed error; plain-string frames stay the historical plain Error.
      if (evt.data && typeof evt.data === "object") {
        const rec = evt.data as { message?: unknown };
        const message =
          typeof rec.message === "string" && rec.message.length > 0
            ? rec.message
            : "Có lỗi xảy ra khi xử lý câu hỏi.";
        handlers.onError?.(new QueryStreamError(message, evt.data));
        break;
      }
      const message =
        typeof evt.data === "string"
          ? evt.data
          : "Có lỗi xảy ra khi xử lý câu hỏi.";
      handlers.onError?.(new Error(message));
      break;
    }
    default:
      break;
  }
}

function asArray<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

function tryJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

// The first-open greeting is a progressive enhancement: text may render from
// the config fallback while media/suggestions arrive from the hello endpoint.

const API_HELLO_ENDPOINT = "/api/llms-hello";

// A hanging hello endpoint must not leave the media patch pending forever
// (review M9). QA measured 5.0-5.5s responses, so 5s aborted deterministically
// (net::ERR_ABORTED) and flaked the gallery; 15s ceilings that latency.
const GREETING_MEDIA_TIMEOUT_MS = 15000;

/** Media attached to a project greeting by POST /api/llms-hello. */
export interface GreetingPayload {
  greeting?: string;
  trace_id?: string;
  suggestions?: string[];
  images?: Image[];
  videos?: Video[];
}

/** Fetches the project/audience-scoped first assistant greeting. */
export async function fetchGreeting(
  projectKey: string,
  options: { deviceId?: string; audience?: "customer" | "sales" } = {},
): Promise<GreetingPayload> {
  const response = await fetch(API_HELLO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.deviceId ? { "X-Device-Id": options.deviceId } : {}),
    },
    body: JSON.stringify({
      project_key: projectKey,
      audience: options.audience ?? "customer",
    }),
    signal: AbortSignal.timeout(GREETING_MEDIA_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`llms-hello failed: ${response.status}`);
  return (await response.json()) as GreetingPayload;
}

export interface ChatSessionSummary {
  session_id: string;
  project_key: string;
  title: string;
  message_count: number;
  handed_off: boolean;
  last_active_at: string;
}

export interface ChatSessionMessage {
  role: "user" | "assistant";
  content: string;
  meta?: Record<string, unknown> | null;
  created_at: string;
}

/**
 * Identity headers shared by every history/session endpoint (secure wave):
 * the backend answers 401 unless BOTH the persistent device id and the signed
 * anon token are present, then scopes rows by their combination — so a
 * mismatched identity is an intentional ownership rejection the callers
 * surface as a recoverable error, never retried with faked credentials.
 */
async function chatSessionHeaders(deviceId: string, anonToken: string | null): Promise<Record<string, string>> {
  return {
    Accept: "application/json",
    "X-Device-Id": deviceId,
    ...(anonToken ? { "X-Anon-Token": anonToken } : {}),
    ...(await resolveQueryAuthHeaders()),
  };
}

/**
 * Loads persisted sessions for the current device and project. Requires the
 * signed anon identity: GET /api/sessions 401s without `X-Device-Id` +
 * `X-Anon-Token`, and a null `anonToken` therefore surfaces that rejection.
 */
export async function fetchChatSessions(
  deviceId: string,
  projectKey: string,
  anonToken: string | null
): Promise<ChatSessionSummary[]> {
  const response = await fetch(`/api/sessions?device_id=${encodeURIComponent(deviceId)}&project_key=${encodeURIComponent(projectKey)}`, {
    headers: await chatSessionHeaders(deviceId, anonToken),
  });
  if (!response.ok) throw new Error(`sessions failed: ${response.status}`);
  const payload = (await response.json()) as { sessions?: ChatSessionSummary[] } | ChatSessionSummary[];
  return Array.isArray(payload) ? payload : payload.sessions ?? [];
}

/**
 * Loads a persisted transcript; callers may render it read-only. `project_key`
 * is a REQUIRED backend query parameter (its absence is a 422) and, together
 * with the two identity headers, scopes the lookup so another visitor's
 * session id resolves to an intentional 404 instead of leaking a transcript.
 */
export async function fetchChatSessionMessages(
  deviceId: string,
  sessionId: string,
  projectKey: string,
  anonToken: string | null
): Promise<ChatSessionMessage[]> {
  const response = await fetch(`/api/sessions/${encodeURIComponent(sessionId)}/messages?project_key=${encodeURIComponent(projectKey)}`, {
    headers: await chatSessionHeaders(deviceId, anonToken),
  });
  if (!response.ok) throw new Error(`session messages failed: ${response.status}`);
  const payload = (await response.json()) as { messages?: ChatSessionMessage[] } | ChatSessionMessage[];
  return Array.isArray(payload) ? payload : payload.messages ?? [];
}

const API_LEAD_ENDPOINT = "/api/lead";

/** Request body of `POST /api/lead` (snake_case mirrors the FastAPI model). */
export interface LeadPayload {
  /** Project the lead belongs to (backend requires it, story 10.1/G1). */
  project_key: string;
  session_id?: string;
  /** Anonymous persistent device id (D7), sent alongside the lead. */
  device_id?: string;
  /**
   * Server-minted signed anon identity (secure wave §5.5/§6) so POST
   * /api/lead can grant the one-time bonus to the chatting identity.
   */
  anon_token?: string;
  name?: string;
  phone: string;
  consent: boolean;
  note?: string;
  budget_vnd?: number;
}

/** Successful `POST /api/lead` response (HTTP 201). */
export interface LeadSubmitResult {
  lead_id: number;
  will_call_within_minutes: number;
  /**
   * Secure wave §5.5: bonus turns granted with this lead (0 when the identity
   * already received its one-time grant, rule R3).
   */
  quota_bonus_granted?: number;
}

export type LeadSubmitErrorKind = "duplicate" | "validation" | "network";

/** Typed submit failure so LeadForm can map HTTP outcomes onto UX states. */
export class LeadSubmitError extends Error {
  readonly kind: LeadSubmitErrorKind;
  readonly status: number | null;

  constructor(kind: LeadSubmitErrorKind, message: string, status: number | null = null) {
    super(message);
    this.name = "LeadSubmitError";
    this.kind = kind;
    this.status = status;
  }
}

/**
 * Submits a customer lead. Resolves on 201; throws LeadSubmitError classified
 * as duplicate (409), validation (other 4xx, carrying the backend detail when
 * it is a plain string), or network (fetch failure / 5xx).
 */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  let response: Response;
  try {
    response = await fetch(API_LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Guard sync: POST /api/lead matches session.device_id against this
        // header (or the body) so the handed-off badge and CRM link bind to the
        // same identity that chatted. Same device_id already rides in the body.
        ...(payload.device_id ? { "X-Device-Id": payload.device_id } : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadSubmitError("network", "Không kết nối được máy chủ. Vui lòng thử lại.");
  }

  if (response.ok) {
    return (await response.json()) as LeadSubmitResult;
  }

  if (response.status === 409) {
    throw new LeadSubmitError(
      "duplicate",
      "Số này đã đăng ký, chuyên viên sẽ gọi sớm nhất.",
      409
    );
  }

  if (response.status >= 400 && response.status < 500) {
    const detail = await readErrorDetail(response);
    throw new LeadSubmitError(
      "validation",
      detail ?? "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.",
      response.status
    );
  }

  throw new LeadSubmitError("network", "Máy chủ gặp sự cố. Vui lòng thử lại sau.", response.status);
}

/** Best-effort extraction of a FastAPI `detail` string from an error body. */
export async function readErrorDetail(response: Response): Promise<string | null> {
  try {
    const data = (await response.json()) as { detail?: unknown };
    return typeof data.detail === "string" ? data.detail : null;
  } catch {
    return null;
  }
}

/** Parses the backend error envelope; returns null when the body is not JSON. */
async function readErrorBody(response: Response): Promise<ApiErrorEnvelope | null> {
  try {
    return (await response.json()) as ApiErrorEnvelope;
  } catch {
    return null;
  }
}
