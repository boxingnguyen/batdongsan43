import type { Confidence, SseEventName } from "./contracts";

/**
 * Default local FastAPI proxy target used when NEXT_PUBLIC_API_PROXY_TARGET
 * is not set (see frontend/next.config.ts).
 */
export const DEFAULT_API_PROXY_TARGET = "http://localhost:8000";

/** Relative endpoint proxied to FastAPI for the streaming chat query. */
export const API_QUERY_ENDPOINT = "/api/query";

/** Relative endpoint proxied to FastAPI for the first-open greeting. */
export const API_HELLO_ENDPOINT = "/api/llms-hello";

/** Canonical SSE event names emitted by the FastAPI /api/query stream. */
export const API_SSE_EVENTS = {
  ACK: "ack",
  ROUTING: "routing",
  PLACES: "places",
  SOURCES: "sources",
  FACTS: "facts",
  IMAGES: "images",
  VIDEOS: "videos",
  TOKEN: "token",
  DONE: "done",
  ERROR: "error",
} as const satisfies Record<string, SseEventName>;

/** Every SSE event name in the stream, for iteration and validation. */
export const SSE_EVENT_NAMES: readonly SseEventName[] = [
  API_SSE_EVENTS.ACK,
  API_SSE_EVENTS.ROUTING,
  API_SSE_EVENTS.PLACES,
  API_SSE_EVENTS.SOURCES,
  API_SSE_EVENTS.FACTS,
  API_SSE_EVENTS.IMAGES,
  API_SSE_EVENTS.VIDEOS,
  API_SSE_EVENTS.TOKEN,
  API_SSE_EVENTS.DONE,
  API_SSE_EVENTS.ERROR,
];

/** Short Vietnamese labels for the 3-tier confidence score. */
export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  HIGH: "Cao",
  MEDIUM: "Trung bình",
  LOW: "Thấp",
};

/**
 * Storage key prefix for every chat surface so no key is hardcoded at call
 * sites: `bds43.device_id`, `bds43.session_id.<projectKey>`, `bds43.anon_token`,
 * `bds43.hello_shown.<projectKey>`, …
 */
export const STORAGE_PREFIX = "bds43";

/** Custom event name used by suggestion buttons to trigger a send. */
export const ASK_EVENT = "bds43:ask";

/** Placeholder shown in the composer when idle. */
export const COMPOSER_PLACEHOLDER = "Bạn muốn hỏi gì về dự án…";

/** Maximum number of past conversation turns sent with each query. */
export const MAX_HISTORY_TURNS = 4;

/** Maximum number of characters per history turn sent with each query. */
export const MAX_TURN_CHARS = 2000;
