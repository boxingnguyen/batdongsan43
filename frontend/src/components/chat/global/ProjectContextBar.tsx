"use client";
import React from "react";

import { lookupWebsiteProjectRoute } from "@/lib/projects/registry";
import type { ActiveProject } from "@/lib/projects/contracts";
import { ExternalLink } from "lucide-react";

/**
 * ProjectContextBar displays the currently-resolved (or selected) project as a
 * chip with a "view project page" action. It is a UX affordance only — the
 * backend remains the source of truth for resolution; this bar never claims the
 * selection is authoritative.
 *
 * Uses the GA-02 registry to resolve the website route (internal href or
 * external URL) without assuming `slug === project_key`.
 */
export interface ProjectContextBarProps {
  /**
   * The active project hint — either the backend-resolved key or the user's
   * explicit selection from ProjectChoiceList.
   */
  activeProject: ActiveProject | null;
  /** Whether the user can swap to a different project from within the bar. */
  onRequestChangeProject?: () => void;
}

export function ProjectContextBar({
  activeProject,
  onRequestChangeProject,
}: ProjectContextBarProps) {
  if (!activeProject) {
    return (
      <div className="border-b border-[#E8E2D9] bg-[#FCFBF8]/70 px-4 py-2.5">
        <span className="flex items-center gap-2 text-[12px] text-[#81756C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#81756C]/40" />
          Chưa chọn dự án — hãy chọn ở danh sách bên dưới
        </span>
      </div>
    );
  }

  const title =
    activeProject.display_name ||
    activeProject.short_name ||
    activeProject.name ||
    activeProject.project_key;
  const route = lookupWebsiteProjectRoute(activeProject.project_key);
  const href = route?.href ?? null;
  const isExternal = route?.external ?? false;
  const location = activeProject.location;

  return (
    <div className="border-b border-[#E8E2D9] bg-[#F3EFE9] px-4 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[12px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5C8269]" />
          <span className="font-medium text-[#4A3829]">Đang tư vấn:</span>
          <span className="font-serif font-medium text-[#4A3829]">{title}</span>
          {location ? (
            <>
              <span className="text-[#81756C]">·</span>
              <span className="text-[#81756C]">{location}</span>
            </>
          ) : null}
        </span>
        <div className="flex items-center gap-1.5">
          {onRequestChangeProject ? (
            <button
              type="button"
              onClick={onRequestChangeProject}
              className="text-[11px] font-semibold text-[#4A3829]/80 underline decoration-[#C9A96E]/60 underline-offset-2 hover:text-[#4A3829]"
            >
              Đổi dự án
            </button>
          ) : null}
          {href ? (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={`Xem chi tiết ${title}`}
              className="inline-flex items-center text-[#4A3829]/60 hover:text-[#4A3829]"
            >
              <ExternalLink size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}