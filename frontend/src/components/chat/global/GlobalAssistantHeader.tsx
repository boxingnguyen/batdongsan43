"use client";
import React from "react";

import { X } from "lucide-react";

/**
 * GlobalAssistantHeader — the thin top bar of the assistant panel. Carries the
 * panel title and a close button with an explicit label. It does NOT redesign
 * the site header (HeaderSelector/SiteHeader remain untouched).
 */
export interface GlobalAssistantHeaderProps {
  onClose: () => void;
  closeAriaLabel?: string;
}

export function GlobalAssistantHeader({
  onClose,
  closeAriaLabel = "Đóng trợ lý AI",
}: GlobalAssistantHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E8E2D9] bg-[#FFFFFF] px-4 py-3">
      <h2 className="font-serif text-[16px] font-medium text-[#4A3829]">
        Ethereal Concierge AI
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeAriaLabel}
        className="inline-flex h-10 w-10 min-w-[44px] min-h-[44px] items-center justify-center rounded-full text-[#4E453E] hover:bg-[#F3EFE9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A3829] focus-visible:ring-offset-2"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </div>
  );
}