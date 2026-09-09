"use client";

import { useCallback, useState } from "react";
import { Bot, Check, Copy, User } from "lucide-react";
import toast from "react-hot-toast";
import { ConfidenceBadge } from "./ConfidenceBadge";
import type { Confidence, FactEvidence, Image, Source, Video } from "@/lib/chat/contracts";
import { AnswerBlocks } from "./AnswerBlocks";
import { SourcesList } from "./SourcesList";
import { FactsTable } from "./FactsTable";
import { AckChip } from "./AckChip";
import { ProgressSteps } from "./ProgressSteps";
import { GreetingMedia } from "./GreetingMedia";
import { ProjectRedirectCard } from "./ProjectRedirectCard";

/**
 * Cross-project redirect guardrail (FE half): when a question asked in project
 * X is really about project Y, the backend attaches an optional
 * `project_redirect` field to the SSE `done` payload. In this port the card
 * renders as an internal link to /projects/<slug> — no project switching.
 *
 * Why a normalizer instead of trusting the cast: the field is optional and the
 * backend ships it incrementally, so every malformed/absent shape must degrade
 * to "no card", never crash the chat.
 */

/** Domain shape consumed by the redirect card. */
export interface ProjectRedirect {
  project_key: string;
  /** Commercial name for the CTA label; falls back to the key. */
  displayName: string;
  /** Compact name preferred for the CTA label when the backend sends one. */
  shortName?: string;
}

/**
 * Validates one raw `project_redirect` value. Returns null for anything that
 * cannot identify a destination project (absent, non-object, empty key) so
 * callers can spread it conditionally into message state.
 */
export function normalizeProjectRedirect(raw: unknown): ProjectRedirect | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const key =
    typeof r.project_key === "string" && r.project_key.length > 0
      ? r.project_key
      : typeof r.projectKey === "string" && r.projectKey.length > 0
        ? r.projectKey
        : "";
  if (!key) return null;
  const displayName = firstNonEmptyString(r.display_name, r.displayName) ?? key;
  const shortName = firstNonEmptyString(r.short_name, r.shortName);
  return shortName ? { project_key: key, displayName, shortName } : { project_key: key, displayName };
}

function firstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  facts?: FactEvidence[];
  images?: Image[];
  videos?: Video[];
  confidence?: Confidence;
  requires_review?: boolean;
  traceId?: string;
  latencyMs?: number;
  streaming?: boolean;
  acknowledged?: boolean;
  progressStep?: number;
  error?: boolean;
  /**
   * Mid-stream failure (proxy/network cut before the `done` frame): the
   * partial answer stays visible and the bubble offers a "Thử lại" retry
   * instead of collapsing into a bare error line.
   */
  interrupted?: boolean;
  /**
   * Error-frame contract (additive): the backend marks timeouts/transient
   * failures retryable. Absent = fall back to `interrupted` semantics.
   */
  retryable?: boolean;
  /** Question to re-send when the user hits the interrupted-stream retry. */
  retryQuery?: string;
  /** Cross-project guardrail: set only when the backend suggests a switch. */
  projectRedirect?: ProjectRedirect;
}

interface MessageBubbleProps {
  message: ChatMessage;
  /** Retry hook for interrupted/retryable streams: re-sends the original question. */
  onRetry?: (message: ChatMessage) => void;
  /** Page-level lightbox hook; absent → ImageGallery's inline portal lightbox. */
  onImageClick?: (src: string) => void;
}

/**
 * Staged label shown while the assistant works and no answer text has
 * arrived yet. Rotates with progressStep so the wait reads as a pipeline,
 * not a frozen spinner (blend with AckChip + ProgressSteps, no duplicates).
 */
const WAITING_STAGES = [
  "Đang phân tích câu hỏi",
  "Đang tra cứu tài liệu pháp lý",
  "Đang đối chiếu số liệu dự án",
  "Đang soạn câu trả lời",
];

function WaitingIndicator({ progressStep }: { progressStep?: number }) {
  const stage = WAITING_STAGES[Math.min(progressStep ?? 0, WAITING_STAGES.length - 1)];
  return (
    <div className="flex min-h-[32px] items-center gap-2.5">
      <span className="inline-flex gap-[3px]" aria-hidden="true">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A45D] motion-reduce:animate-none" />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A45D] motion-reduce:animate-none"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A45D] motion-reduce:animate-none"
          style={{ animationDelay: "0.4s" }}
        />
      </span>
      <span className="text-[13px] leading-5 text-[#16384C]/60">{stage}</span>
    </div>
  );
}

/** Formats a latency in milliseconds as a compact string: "850 ms" / "2.5 s". */
function formatLatency(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}
/**
 * Renders a single chat message bubble.
 * - User: right-aligned, navy background, cream text.
 * - Assistant: left-aligned, white card with sources, facts, streamed markdown
 *   (typing caret while streaming), then a compact trace footer.
 */
export function MessageBubble({ message, onRetry, onImageClick }: MessageBubbleProps) {
  const isUser = message.role === "user";
  // The greeting is the only message that carries videos (RAG answers attach
  // images only), so use it to flip the welcome layout: the hero leads with the
  // film + gallery and the static welcome text lands last, below the images.
  const isGreeting = !!message.videos?.length;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success("Đã sao chép");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép nội dung này.");
    }
  }, [message.content]);

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2.5">
        <div className="max-w-[72%] whitespace-pre-wrap break-words rounded-2xl bg-[#16384C] px-4 py-2.5 text-[15px] leading-6 text-[#F8F7F3] shadow-sm">
          {message.content}
        </div>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#16384C] text-[#F8F7F3]"
        >
          <User size={14} />
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-start gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A45D]/50 bg-white text-[#C9A45D]"
      >
        <Bot size={15} />
      </span>
      <div className="w-full max-w-[86%] rounded-2xl border border-[#E8E5DF] bg-white px-[18px] py-4 shadow-sm">
        {message.error ? (
          message.interrupted || message.retryable ? (
            <>
              <AnswerBlocks
                content={message.content || "Có lỗi xảy ra khi xử lý câu hỏi."}
              />
              <div
                className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md border-l-2 border-[#B25B36] bg-[#F9ECE4] px-3 py-2.5 text-sm text-[#16384C]"
                role="status"
              >
                <span>
                  {message.retryable && !message.interrupted
                    ? "Phản hồi chưa hoàn tất"
                    : "Kết nối bị gián đoạn"}
                </span>
                <button
                  type="button"
                  onClick={() => onRetry?.(message)}
                  aria-label="Thử lại câu hỏi"
                  className="rounded-lg border border-[#E8E5DF] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#16384C] transition hover:border-[#C9A45D]"
                >
                  Thử lại
                </button>
              </div>
            </>
          ) : (
            <div
              className="mt-1 rounded-md border-l-2 border-[#B25B36] bg-[#F9ECE4] px-3 py-2.5"
              role="alert"
            >
              <p className="text-sm font-semibold text-[#16384C]">Có lỗi xảy ra</p>
              <p className="mt-1 text-sm leading-6 text-[#16384C]/70">
                {message.content || "Có lỗi xảy ra khi xử lý câu hỏi."}
              </p>
            </div>
          )
        ) : (
          <>
            {message.sources && message.sources.length > 0 && (
              <SourceSection title="Nguồn tài liệu" sources={message.sources} />
            )}
            {message.facts && message.facts.length > 0 && (
              <FactSection facts={message.facts} />
            )}
            {message.streaming && !message.content ? (
              <div aria-live="polite">
                <AckChip visible={!!message.acknowledged} />
                <div className="mt-3">
                  <WaitingIndicator progressStep={message.progressStep} />
                </div>
                {message.acknowledged && (
                  <div className="mt-3">
                    <ProgressSteps activeStep={message.progressStep ?? 0} />
                  </div>
                )}
              </div>
            ) : (
              <AnswerBlocks
                content={message.content}
                streaming={message.streaming}
              />
            )}
            {isGreeting || message.videos?.length || message.images?.length ? (
              <GreetingMedia
                videos={message.videos}
                images={message.images}
                ready={!message.streaming}
                onImageClick={onImageClick}
              />
            ) : null}
            {/* Cross-project guardrail: prominent switch CTA below the answer
                once the stream is finished; absent field renders nothing. */}
            {message.projectRedirect && !message.streaming && (
              <ProjectRedirectCard redirect={message.projectRedirect} />
            )}
            {!message.streaming && !message.error && message.content.trim().length > 0 && (
              <div className="bubble-copy-row mt-2 flex justify-end">
                <button
                  type="button"
                  title={copied ? "Đã sao chép" : "Sao chép câu trả lời"}
                  onClick={handleCopy}
                  aria-label="Sao chép câu trả lời"
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#16384C]/50 transition hover:bg-[#F8F7F3] hover:text-[#16384C]"
                >
                  {copied ? (
                    <Check size={13} className="text-[#5C8269]" aria-hidden="true" />
                  ) : (
                    <Copy size={13} aria-hidden="true" />
                  )}
                  {copied ? "Đã sao chép" : "Sao chép"}
                </button>
              </div>
            )}
            {!message.streaming && message.confidence && message.confidence !== "LOW" && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <ConfidenceBadge confidence={message.confidence} />
              </div>
            )}
            {!message.streaming && (message.traceId || message.latencyMs !== undefined) && (
              <div className="mt-2.5 flex flex-wrap gap-3 border-t border-dashed border-[#E8E5DF] pt-2 text-[11px] text-[#16384C]/50">
                {message.traceId && <span>trace_id: {message.traceId}</span>}
                {message.latencyMs !== undefined && (
                  <span>phản hồi trong {formatLatency(message.latencyMs)}</span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SourceSection({ title, sources }: { title: string; sources: Source[] }) {
  return (
    <div className="mb-2.5">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#16384C]/50">
        {title}
      </p>
      <div className="mt-1">
        <SourcesList sources={sources} max={5} />
      </div>
    </div>
  );
}

function FactSection({ facts }: { facts: FactEvidence[] }) {
  return (
    <div className="mb-2.5">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#16384C]/50">
        Sự kiện pháp lý
      </p>
      <div className="mt-1">
        <FactsTable facts={facts} />
      </div>
    </div>
  );
}
