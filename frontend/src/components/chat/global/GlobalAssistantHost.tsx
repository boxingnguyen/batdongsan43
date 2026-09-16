"use client";
import React from "react";

import { Suspense, lazy, useEffect } from "react";
import { useGlobalAssistant } from "./GlobalAssistantProvider";

/**
 * Lazy-loaded panel — hoisted to module scope so React.lazy is invoked exactly
 * once. Declaring it inside the component body would create a new lazy type on
 * every render, defeating Suspense's caching and remounting the panel (losing
 * conversation/view state).
 */
const GlobalAssistantPanel = lazy(() =>
  import("./GlobalAssistantPanel").then((mod) => ({
    default: mod.GlobalAssistantPanel,
  })),
);

/**
 * GlobalAssistantHost is the always-mounted shell that owns the floating panel
 * slot. It renders nothing — not even the launcher — until the assistant is
 * first opened, satisfying the performance rule:
 * "do not query /api/assistant/*, request history, or initialize MapLibre on
 * initial Home load."
 *
 * The launcher itself is hoisted into the unified contact dock (see
 * AssistantContactDock) so there is a single bottom-right concierge cluster.
 */
export function GlobalAssistantHost() {
  const { isOpen, closeAssistant } = useGlobalAssistant();

  // ESC closes the assistant (spec §Accessibility). Bound at the host so it
  // works regardless of which inner view/focus-trap is active.
  useEffect(() => {
    if (!isOpen) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeAssistant();
      }
    };
    // capture phase so the panel's own inputs can't swallow ESC
    document.addEventListener("keydown", onKeydown, true);
    return () => document.removeEventListener("keydown", onKeydown, true);
  }, [isOpen, closeAssistant]);

  // Mobile scroll lock while the assistant panel is open (spec §Accessibility).
  // Desktop does NOT lock page scroll.
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile()) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Suspense fallback={null}>
      <GlobalAssistantPanel />
    </Suspense>
  );
}
