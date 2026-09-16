"use client";

/**
 * AckChip — zero-latency "question received" feedback.
 * Shown in the assistant bubble as soon as the `ack` SSE event fires (< 100ms),
 * before any token streams.
 */

interface AckChipProps {
  /** Show the chip (received ack) — otherwise hidden. */
  visible: boolean;
}

export function AckChip({ visible }: AckChipProps) {
  if (!visible) return null;
  return (
    <div
      aria-live="polite"
      className="inline-flex min-h-[32px] items-center gap-2 rounded-full border border-[#C9A45D]/40 bg-[#C9A45D]/10 px-3 py-1.5 text-[13px] font-semibold text-[#16384C]"
    >
      <span aria-hidden="true" className="inline-flex gap-[3px]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#C9A45D]" />
        <span className="h-[5px] w-[5px] rounded-full bg-[#C9A45D]" />
        <span className="h-[5px] w-[5px] rounded-full bg-[#C9A45D]" />
      </span>
      AI đã nhận câu hỏi
    </div>
  );
}
