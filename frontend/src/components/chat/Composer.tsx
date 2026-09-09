"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Loader2, SendHorizonal } from "lucide-react";
import { COMPOSER_PLACEHOLDER, MAX_TURN_CHARS } from "@/lib/chat/constants";
import { cn } from "@/lib/utils";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  streaming: boolean;
}

/**
 * Question input: Enter sends, Shift+Enter inserts a newline.
 * Send is disabled while streaming or when the input is empty.
 * Input is hard-capped at MAX_TURN_CHARS (2000) to match the backend
 * HistoryTurn.content limit — capping here means the user can never type
 * past what the stream would accept.
 */
export function Composer({ value, onChange, onSend, disabled, streaming }: ComposerProps) {
  const canSend = !disabled && !streaming && value.trim().length > 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow equivalent of the source's autoSize {minRows: 1, maxRows: 5}:
  // reset to auto, then clamp the measured height to ~5 lines (24px each).
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[860px] items-end gap-2.5 rounded-2xl border border-[#E8E5DF] bg-white p-1.5 shadow-sm transition-colors focus-within:border-[#C9A45D]">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_TURN_CHARS))}
        onKeyDown={handleKeyDown}
        placeholder={COMPOSER_PLACEHOLDER}
        disabled={disabled}
        rows={1}
        className="max-h-[120px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] leading-6 text-[#16384C] outline-none placeholder:text-[#16384C]/40 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="Câu hỏi"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        aria-label="Gửi câu hỏi"
        className={cn(
          "inline-flex h-[42px] min-w-[92px] items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-[#F8F7F3] transition-colors",
          canSend ? "bg-[#16384C] hover:bg-[#16384C]/90" : "cursor-not-allowed bg-[#16384C]/40",
        )}
      >
        {streaming ? (
          <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <SendHorizonal size={16} aria-hidden="true" />
        )}
        Gửi
      </button>
    </div>
  );
}
