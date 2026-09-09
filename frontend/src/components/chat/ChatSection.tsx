"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";

import { CHAT_DEFAULT_PROJECT_KEY, getChatProject } from "@/config/chat-projects";

import "./chat.css";

/**
 * ChatPanel is dynamically imported: it pulls remark + the chat state machine.
 * Mounting only when the section enters the viewport keeps the project page's
 * LCP/Lighthouse scores untouched.
 */
const ChatPanel = dynamic(
  () => import("./ChatPanel").then((mod) => mod.ChatPanel),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[560px] items-center justify-center rounded-2xl border border-[#E8E5DF] bg-[#F8F7F3]">
        <span className="text-sm text-[#16384C]/50">Đang tải trợ lý…</span>
      </div>
    ),
  }
);

export interface ChatSectionProps {
  /** Matches the backend project_key ("camellia"). */
  projectKey?: string;
  /** Anchor id for the nav link (default "tra-loi"). */
  anchorId?: string;
}

/**
 * Chat RAG section mounted on the project page (no separate greeting section —
 * the greeting is the first assistant message inside ChatPanel).
 *
 * Gate: renders only when NEXT_PUBLIC_CHAT_ENABLED === "true" — off by default
 * so the page never calls a backend that doesn't exist yet. Returns null (not a
 * skeleton) so no gap is left in the layout.
 *
 * `py-0` on purpose: globals.css has `section { @apply py-24 }`; this section
 * manages its own padding so the ~560px chat frame isn't pushed off-balance.
 */
function ChatSectionImpl({
  projectKey = CHAT_DEFAULT_PROJECT_KEY,
  anchorId = "tra-loi",
}: ChatSectionProps) {
  // getChatProject throws on a bad key — fail fast in dev instead of hiding the typo.
  const config = useMemo(() => getChatProject(projectKey), [projectKey]);

  if (process.env.NEXT_PUBLIC_CHAT_ENABLED !== "true") return null;

  return (
    <section id={anchorId} className="scroll-mt-24 bg-[#F8F7F3] py-0">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Section header — same system_ui as the other project sections */}
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A45D]">
            Trợ lý ảo
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#16384C] sm:text-4xl">
            Hỏi đáp về {config.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#16384C]/70">
            Đặt câu hỏi về giá, tiến độ, pháp lý hay tiện ích — trợ lý trả lời
            ngay từ dữ liệu chính thức của dự án.
          </p>
        </div>

        <ChatPanel projectKey={projectKey} />
      </div>
    </section>
  );
}

export const ChatSection = memo(ChatSectionImpl);
