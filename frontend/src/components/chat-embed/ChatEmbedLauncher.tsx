"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { chatEmbedHref } from "@/config/chat-embed";
import { resolveEmbedSessionId } from "./embed-session";

/**
 * Floating entry point to the embedded chat, mirroring the contact dock on the
 * opposite corner. Rendered by MainWrapper, so it is absent on the embed
 * surface itself.
 */
export function ChatEmbedLauncher() {
  const router = useRouter();

  // A real anchor keeps middle-click and no-JS working; a plain left click
  // resolves the session id first so the visitor returns to their own chat.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    router.push(chatEmbedHref(resolveEmbedSessionId()));
  };

  return (
    <a
      href={chatEmbedHref()}
      onClick={handleClick}
      aria-label="Mở trợ lý AI — The Camellia Sơn Trà"
      title="Trợ lý AI — The Camellia Sơn Trà"
      className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A6A3B] pointer-events-auto"
    >
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D8BC86] to-[#8A6A3B] shadow-lg transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl">
        {/* Attention halo; hidden for visitors who ask for reduced motion. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#C8A96E] opacity-60 motion-reduce:hidden"
        />
        <Sparkles
          aria-hidden="true"
          strokeWidth={2.2}
          className="relative z-10 h-8 w-8 text-white drop-shadow"
        />
      </span>

      <span className="hidden flex-col rounded-r-full bg-gradient-to-r from-[#8A6A3B] to-[#C8A96E] px-5 py-2 text-white shadow-lg md:flex">
        <span className="text-[15px] font-bold leading-tight">Trợ lý AI</span>
        <span className="text-[12px] leading-tight opacity-90">Tư vấn dự án 24/7</span>
      </span>
    </a>
  );
}
