"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProgressSteps — 4-step vertical checklist shown while the assistant is
 * working (replaces the plain progress label). Each completed step gets a
 * green tick; the running step shows a small spinner. Senior-first, respects
 * prefers-reduced-motion.
 */

const STEPS = [
  "Hiểu câu hỏi",
  "Tra tài liệu",
  "Đối chiếu số liệu",
  "Soạn câu trả lời",
];

interface ProgressStepsProps {
  /** 0-based index of the step currently running. */
  activeStep: number;
}

export function ProgressSteps({ activeStep }: ProgressStepsProps) {
  return (
    <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
      {STEPS.map((label, i) => {
        const done = i < activeStep;
        const running = i === activeStep;
        return (
          <li key={label} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                done && "bg-[#5C8269] text-white",
                !done && running && "border-2 border-[#C9A45D] text-[#C9A45D]",
                !done && !running && "border border-[#E8E5DF] bg-[#F8F7F3] text-[#16384C]/40",
              )}
            >
              {done ? (
                <Check size={12} strokeWidth={3} />
              ) : running ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#C9A45D] border-t-transparent motion-reduce:animate-none" />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={cn(
                "text-[15px] leading-snug",
                done || running ? "text-[#16384C]" : "text-[#16384C]/40",
                running ? "font-semibold" : "font-normal",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
