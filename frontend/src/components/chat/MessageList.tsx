"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "./MessageBubble";
import { MessageBubble } from "./MessageBubble";
import { ASK_EVENT } from "@/lib/chat/constants";

interface MessageListProps {
  messages: ChatMessage[];
  streaming: boolean;
  /**
   * Suggestion chips, rendered from props only — the source's built-in
   * GENERIC_SUGGESTIONS fallback is gone; suggestions arrive via the greeting
   * payload / ChatPanel.
   */
  suggestions?: string[];
  excludedProjectNames?: string[];
  /** Direct suggestion-click hook; when absent the ASK_EVENT contract is used. */
  onSuggestion?: (q: string) => void;
  /** Retry hook for interrupted/retryable streams: re-sends the original question. */
  onRetry?: (message: ChatMessage) => void;
  /** Page-level lightbox hook (CamelliaClient passes setSelectedImage). */
  onImageClick?: (src: string) => void;
}

/**
 * Scrollable message area. Auto-scrolls to the bottom on new messages or
 * while streaming; shows question suggestions before the first exchange.
 */
export function MessageList({
  messages,
  streaming,
  suggestions,
  excludedProjectNames = [],
  onSuggestion,
  onRetry,
  onImageClick,
}: MessageListProps) {
  const visibleSuggestions = (suggestions ?? []).filter((suggestion) =>
    !excludedProjectNames.some((name) => suggestion.toLocaleLowerCase().includes(name.toLocaleLowerCase())),
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether the reader is parked at the bottom. While true we keep following
  // the streaming tail; once the user scrolls up to re-read we stop forcing the
  // caret down so autoscroll never fights their hand.
  const stickToBottomRef = useRef(true);
  // rAF coalescing for streaming token bursts: each token patch re-fires the
  // effect, but only one scroll per animation frame is scheduled, so the
  // scroller never queues dozens of competing tween targets.
  const scrollRafRef = useRef<number | null>(null);
  const prevCountRef = useRef(messages.length);

  useEffect(() => {
    stickToBottomRef.current = true;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    prevCountRef.current = messages.length;
  }, [messages.length]);

  // While streaming with the reader parked at the bottom, follow the tail
  // INSTANTLY: per-token smooth scrolls each start their own tween, and the
  // tween of a burst re-anchors mid-flight, so the pane visibly lurches and
  // slams instead of tracking. Instant assignment (inside the rAF) keeps the
  // pane glued to the growing tail with zero tween state. Smooth gliding is
  // reserved for non-streaming content mutation, where there is no per-token
  // re-anchor problem. Reduced-motion users keep the deterministic instant
  // path; user scroll-up still cancels following via handleScroll.
  // The rAF is cancelled ONLY on unmount: a per-dependency cleanup would run
  // after every streamed token (messages gets a new array identity each token)
  // and cancel the just-scheduled frame before it ever fires, so the
  // guard below would never trip and coalescing would be dead — the pane
  // starves during token bursts and then jumps.
  useEffect(() => {
    if (!stickToBottomRef.current) return;
    if (messages.length !== prevCountRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instant = streaming || reduceMotion;
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const node = scrollRef.current;
      if (!node || !stickToBottomRef.current) return;
      // Instant path (streaming / reduced motion): direct scrollTop assignment.
      // jsdom (and some old webviews) lack Element.scrollTo — the same
      // assignment degrades gracefully where scrollTo is missing.
      if (instant) {
        node.scrollTop = node.scrollHeight;
        return;
      }
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    });
  }, [messages, streaming]);

  // Unmount-only rAF teardown; see the coalescing note above for why this
  // must not live as the streaming effect's dependency cleanup.
  useEffect(
    () => () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    },
    [],
  );

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distanceFromBottom < 80;
  };

  const handleSuggestionClick = (q: string) => {
    if (onSuggestion) {
      onSuggestion(q);
      return;
    }
    // Source contract: suggestion clicks travel as a custom event so the
    // document-level listener in the orchestrator stays mounted exactly once.
    document.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: q }));
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="chat-scroll flex-1 overflow-y-auto px-4 py-6"
    >
      <div className="mx-auto flex max-w-[860px] flex-col gap-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onRetry={onRetry} onImageClick={onImageClick} />
        ))}
        {messages.length > 0 && !streaming && visibleSuggestions.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5 text-left">
            {visibleSuggestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSuggestionClick(q)}
                className="cursor-pointer rounded-xl border border-[#E8E5DF] bg-white px-4 py-3 text-left text-sm leading-[22px] text-[#16384C] shadow-sm transition hover:border-[#C9A45D] hover:shadow-md"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
