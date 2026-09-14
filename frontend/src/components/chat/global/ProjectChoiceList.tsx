"use client";
import React from "react";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchActiveProjects } from "@/lib/projects/api";
import { lookupWebsiteProjectRoute } from "@/lib/projects/registry";
import type { ActiveProject, WebsiteProjectRoute } from "@/lib/projects/contracts";

/**
 * ProjectChoiceList renders the catalogue of projects the assistant can
 * consult, sourced lazily from `/api/projects` (via GA-02's fetchActiveProjects)
 * — never hardcoded. It loads defensively: a network/backend failure surfaces an
 * empty list (no project is ever invented, per GA-02 contract).
 *
 * On selection the chosen project is reported upward; the backend remains the
 * source of truth for resolution (the chip is only a UX hint).
 */
export interface ProjectChoiceListProps {
  /** Projects pre-selected by the caller (e.g. from the open options). */
  preselectedKey?: string;
  /** Fired when the user picks a project card. */
  onSelectProject: (project: ActiveProject) => void;
}

export function ProjectChoiceList({
  preselectedKey,
  onSelectProject,
}: ProjectChoiceListProps) {
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchActiveProjects().then(
      (result) => {
        if (!cancelled) {
          setProjects(result);
          setLoading(false);
        }
      },
      (err) => {
        if (!cancelled) {
          // Defensive: GA-02 guarantees fetchActiveProjects never throws — it
          // returns [] on failure — but guard anyway so the panel can't crash.
          setError(
            err instanceof Error
              ? err.message
              : "Không tải được danh sách dự án",
          );
          setProjects([]);
          setLoading(false);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = useCallback(
    (project: ActiveProject) => () => {
      if (project.project_key !== preselectedKey)
        onSelectProject(project);
    },
    [onSelectProject, preselectedKey],
  );

  if (loading) {
    return (
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        aria-busy="true"
        aria-label="Đang tải danh sách dự án"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-xl border border-[#E8E2D9] bg-[#F3EFE9]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-[#81756C]" role="status">
        {error}
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-sm text-[#81756C]" role="status">
        Hiện chưa có dự án nào đang hỗ trợ.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {projects.map((project) => {
        const route = lookupWebsiteProjectRoute(project.project_key);
        return (
          <ProjectTile
            key={project.project_key}
            project={project}
            selected={project.project_key === preselectedKey}
            route={route}
            onSelect={handleSelect(project)}
          />
        );
      })}
    </div>
  );
}

/** Single project tile — inlined to stay within the GA-05 component tree. */
function ProjectTile({
  project,
  selected,
  route,
  onSelect,
}: {
  project: ActiveProject;
  selected: boolean;
  route: WebsiteProjectRoute | null;
  onSelect: () => void;
}) {
  const badge = project.is_hot ? " Nổi bật" : "";
  const href = route?.href ?? null;
  const isExternal = route?.external ?? false;
  const title =
    project.display_name || project.short_name || project.name || project.project_key;

  const tileBody: ReactNode = (
    <>
      <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-lg">
        {/* No committed image on ActiveProject — use a colour placeholder keyed to
            the project title so the tile never invents media. This lives only
            in the assistant welcome, a separate surface from the site gallery. */}
        <div className="flex h-full w-full items-center justify-center bg-[#F3EFE9] text-[#81756C]">
          {title}
        </div>
        {badge ? (
          <span className="absolute right-2 top-2 rounded-sm bg-[#A85742]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="font-serif text-[15px] font-medium text-[#4A3829]">
        {title}
      </h3>
      {project.location ? (
        <p className="mt-1 text-[12px] text-[#81756C]">{project.location}</p>
      ) : null}
    </>
  );

  const selectButton = (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Chọn ${title}`}
      className="group flex w-full cursor-pointer flex-col text-left"
    >
      {tileBody}
    </button>
  );

  const baseClassName =
    "flex flex-col gap-2.5 rounded-xl border p-3 shadow-sm transition " +
    "border-[#E8E2D9] bg-[#FFFFFF] hover:border-[#C9A96E] hover:shadow-md" +
    (selected ? " ring-2 ring-[#C9A96E]" : "");

  // When a website route exists, surface a "view project page" link beneath
  // the tile. The select button still fires onSelect so the concierge context
  // can be set; the view link navigates independently.
  if (href && route) {
    return (
      <div className={baseClassName}>
        {selectButton}
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[12px] font-semibold text-[#4A3829]/80 underline decoration-[#C9A96E]/60 underline-offset-2 hover:text-[#4A3829]"
        >
          Xem chi tiết {title}
        </a>
      </div>
    );
  }

  return <div className={baseClassName}>{selectButton}</div>;
}