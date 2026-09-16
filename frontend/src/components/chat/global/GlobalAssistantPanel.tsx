"use client";
import React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalAssistant, useAssistantOpenOptions } from "./GlobalAssistantProvider";
import { GlobalAssistantHeader } from "./GlobalAssistantHeader";
import { ProjectContextBar } from "./ProjectContextBar";
import { AssistantWelcome } from "./AssistantWelcome";
import { ProjectChoiceList } from "./ProjectChoiceList";
import type { ActiveProject } from "@/lib/projects/contracts";

/**
 * GlobalAssistantPanel is the lazily-loaded assistant shell. It renders:
 *   - the top bar header (close via the header; focus restores to the launcher
 *     in the provider),
 *   - the project context bar (chip with route link),
 *   - the welcome + project choice list (deterministic copy, no network for
 *     the greeting itself; the list loads lazily from /api/projects),
 *   - a local composer (placeholder only — real streaming is GA-07).
 *
 * It does NOT query /api/assistant/*, request history, or initialize MapLibre.
 * The project catalogue is the only network dependency, and only on first open.
 */
export function GlobalAssistantPanel() {
  const { isOpen, closeAssistant } = useGlobalAssistant();
  // The panel is lazily mounted only while the assistant is open, so the live
  // open-options read is always defined for the current open gesture. The
  // provider clears the options on the open->closed transition (after the
  // panel unmounts), so no explicit consume is required here.
  const openOptions = useAssistantOpenOptions();
  const hintedKey = openOptions?.selectedProjectKey;
  const initialQuestion = openOptions?.initialQuestion;

  // The selected/hinted project key from open options; the welcome view uses it
  // to highlight the matching card. Backend resolution remains authoritative.
  const [activeProjectKey, setActiveProjectKey] = useState<string | null>(
    hintedKey ?? null,
  );
  const [activeProject, setActiveProject] = useState<ActiveProject | null>(
    null,
  );

  // View states: welcome (default) -> chat (placeholder; stream is GA-07).
  const [view, setView] = useState<"welcome" | "chat">("welcome");
  // Seed the composer from the open options' initialQuestion (one-shot via the
  // initializer so later option clears can't wipe the seeded value).
  const [composerValue, setComposerValue] = useState(initialQuestion ?? "");

  const canSend = composerValue.trim().length > 0 && !!activeProjectKey;

  // Focus management: on open, move focus into the panel. (Close focus is
  // handled by the provider, which restores it to the launcher anchor before
  // the panel unmounts.)
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        const el = panelRef.current?.querySelector<HTMLElement>(
          "textarea, input, button, [href]",
        );
        el?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSelectProject = (project: ActiveProject) => {
    setActiveProjectKey(project.project_key);
    setActiveProject(project);
    setView("chat");
  };

  const handleSend = () => {
    if (!canSend) return;
    // No-op for GA-05: real query streaming lands in GA-07. Keep the composer
    // controlled so the UI feels responsive without inventing a backend call.
  };

  const handleClose = () => closeAssistant();

  const renderedView = useMemo(() => {
    if (view === "chat") {
      return (
        <div className="flex h-0 flex-1 flex-col overflow-y-auto">
          <ProjectContextBar activeProject={activeProject} />
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[13px] text-[#81756C]">
              Đang chờ bạn gửi câu hỏi. (Luồng trả lời sẽ có sẵn sau bước
              kế tiếp.)
            </p>
          </div>
          <div className="border-t border-[#E8E2D9] bg-[#FFFFFF] p-3">
            <LocalComposer
              value={composerValue}
              onChange={setComposerValue}
              onSend={handleSend}
              disabled={!canSend}
              streaming={false}
            />
          </div>
        </div>
      );
    }

    return (
      <>
        <ProjectContextBar
          activeProject={activeProject}
          onRequestChangeProject={() => setView("welcome")}
        />
        <div className="flex-1 overflow-y-auto">
          <AssistantWelcome>
            <ProjectChoiceList
              preselectedKey={hintedKey}
              onSelectProject={handleSelectProject}
            />
          </AssistantWelcome>
        </div>
      </>
    );
  }, [view, activeProject, hintedKey, composerValue, canSend]);

  return (
    <div
      ref={panelRef}
      className="assistant-panel fixed inset-0 z-[70] m-0 flex h-auto w-full flex-col rounded-none bg-[#FCFBF8] font-hanken text-[#4E453E] shadow-[0_10px_25px_-5px_rgba(26,32,35,0.12)] md:inset-auto md:right-6 md:bottom-6 md:h-[min(760px,calc(100dvh-112px))] md:w-[480px] md:max-w-[calc(100vw-48px)] md:rounded-[20px] md:border md:border-[#E8E2D9]"
      aria-label="Ethereal Concierge AI"
      role="dialog"
      aria-modal="true"
    >
      <GlobalAssistantHeader onClose={handleClose} />
      {renderedView}
    </div>
  );
}

/**
 * Local composer for the concierge panel. Deliberately minimal: GA-05 ships
 * view state only and does NOT implement real query streaming (that is GA-07).
 * This avoids reusing the legacy chat Composer whose wire call is the legacy
 * project-scoped query path.
 */
function LocalComposer({
  value,
  onChange,
  onSend,
  disabled,
  streaming,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
  streaming: boolean;
}) {
  const canSend = !disabled && !streaming && value.trim().length > 0;
  return (
    <div className="flex w-full items-end gap-2.5 rounded-2xl border border-[#E8E2D9] bg-[#FFFFFF] p-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (canSend) onSend();
          }
        }}
        placeholder="Bạn muốn hỏi gì về dự án…"
        disabled={disabled}
        rows={1}
        className="max-h-[120px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] leading-6 text-[#4E453E] outline-none placeholder:text-[#4E453E]/40 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="Câu hỏi"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        aria-label="Gửi câu hỏi"
        className="inline-flex h-[42px] min-w-[92px] items-center justify-center rounded-xl bg-[#16384C] px-4 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#16384C]/90 disabled:cursor-not-allowed disabled:bg-[#16384C]/40"
      >
        {streaming ? (
          <span className="animate-spin" aria-hidden="true">
            ⬤
          </span>
        ) : (
          "Gửi"
        )}
      </button>
    </div>
  );
}