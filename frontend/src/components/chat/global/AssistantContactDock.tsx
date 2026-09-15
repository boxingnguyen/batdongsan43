"use client";
import React from "react";
import "./global-assistant-shell.css";

import { useGlobalAssistant, useAssistantLauncherAnchor } from "./GlobalAssistantProvider";

/** Zalo destination — must remain stable (spec §Contact dock). */
const ZALO_LINK = "https://zalo.me/0345747138";
/** Phone destination — must remain stable (spec §Contact dock). */
const PHONE_LINK = "tel:0345747138";

/**
 * AssistantContactDock — the single unified bottom-right concierge cluster.
 *
 * Replaces the three competing floating systems (the old FloatingContactButtons
 * Zalo/phone pair + any independent chat pill) with one stack: the AI assistant
 * pill launcher on top, Zalo and Phone controls beneath it. Zalo/phone keep
 * their exact functional destinations.
 *
 * Layout (spec §Responsive geometry):
 *   Desktop (>=1180): primary assistant pill, 58px tall, label "Trợ lý AI" /
 *     sub-label "Tư vấn dự án 24/7"; right/bottom 24px.
 *   Mobile (<768): 56x56 round AI launcher sitting above two 44x44 contact
 *     controls; right/bottom 16px.
 *
 * The AI launcher registers its ref with the provider so the host can restore
 * focus on close (spec §Accessibility: "close restores launcher focus").
 *
 * While the panel is open the dock is hidden from the accessibility tree and
 * removed from hit-testing (via the native `hidden` attribute). The open panel
 * carries the only interactive controls in that state, guaranteeing the composer
 * send button is the topmost hit-test target and nothing beneath it (e.g. the
 * Zalo anchor) can be clicked by accident. The panel also paints above the dock
 * in z-index (z-[70] vs z-[60]).
 */
export function AssistantContactDock() {
  const { openAssistant, isOpen } = useGlobalAssistant();
  const launcherRef = useAssistantLauncherAnchor();

  const handleOpen = () =>
    openAssistant({ initialView: "chat" });

  return (
    <div
      className="assistant-dock fixed z-[60] flex flex-col-reverse items-end gap-3"
      data-assistant-dock="true"
      hidden={isOpen}
      aria-hidden={isOpen}
    >
      {/* 1. Zalo control (secondary, below launcher) */}
      <a
        href={ZALO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ qua Zalo"
        className="assistant-dock__control zalo flex h-11 w-11 items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3829] focus-visible:ring-offset-2 transition-shadow"
      >
        <span aria-hidden="true">✦</span>
      </a>

      {/* 2. Phone control (secondary, below Zalo) */}
      <a
        href={PHONE_LINK}
        aria-label="Gọi 0345747138"
        className="assistant-dock__control phone flex h-11 w-11 items-center justify-center rounded-full bg-[#A85742] text-white shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3829] focus-visible:ring-offset-2 transition-shadow"
      >
        <span aria-hidden="true">✦</span>
      </a>

      {/* 3. Primary assistant pill launcher (top of stack). Height 58px per spec.
          flex-col-reverse renders it visually first despite being last in DOM,
          which keeps the launcher on top of the contact pair. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={handleOpen}
        aria-label="Mở trợ lý AI"
        data-pulse="true"
        className="assistant-dock__launcher relative flex items-center gap-3 rounded-full bg-[#FFFFFF] px-5 py-3.5 shadow-[0_10px_25px_-5px_rgba(26,32,35,0.12)] text-[#4E453E] transition-colors hover:bg-[#F3EFE9]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4A3829]/10">
          <span className="text-xl" aria-hidden="true">
            ✦
          </span>
        </span>
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="font-serif text-[15px] font-medium">Trợ lý AI</span>
          <span className="font-hanken text-[12px] opacity-70">
            Tư vấn dự án 24/7
          </span>
        </span>
      </button>
    </div>
  );
}
