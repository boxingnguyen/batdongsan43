"use client";
import React from "react";

import { useGlobalAssistant } from "./GlobalAssistantProvider";

/**
 * GlobalAssistantLauncher — a standalone button that opens the Ethereal
 * Concierge assistant. Context-agnostic: callers decide placement (header,
 * hero CTA, etc.). The unified floating cluster lives in AssistantContactDock.
 *
 * `label` controls the accessible name and visual label; `iconOnly` hides the
 * text label but `aria-label` must still be supplied by the caller.
 */
export interface GlobalAssistantLauncherProps {
  /** Accessible name for the trigger. */
  "aria-label"?: string;
  /** Visual label text shown next to the glyph. */
  label?: React.ReactNode;
  /** Render only the ✦ glyph, no text. */
  iconOnly?: boolean;
  /** Extra class for sizing/layout from the caller. */
  className?: string;
  onClick?: () => void;
}

export function GlobalAssistantLauncher({
  "aria-label": ariaLabel = "Mở trợ lý AI",
  label,
  iconOnly = false,
  className,
  onClick,
}: GlobalAssistantLauncherProps) {
  const { openAssistant } = useGlobalAssistant();

  const handleClick = () => {
    onClick?.();
    openAssistant({ initialView: "chat" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      <span aria-hidden="true">✦</span>
      {!iconOnly && label}
    </button>
  );
}