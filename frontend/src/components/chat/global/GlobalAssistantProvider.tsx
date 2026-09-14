"use client";
import React from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

/**
 * Options accepted when opening the Ethereal Concierge assistant.
 *
 * - `selectedProjectKey`: a project the caller already knows (e.g. opened from
 *   a project page). Held as a *hint* only — backend resolution remains
 *   authoritative (see spec §Phân giải dự án).
 * - `initialQuestion`: a question to pre-fill the composer.
 * - `initialView`: which tab the shell opens on. "map" is reserved for GA-10.
 */
export interface OpenAssistantOptions {
  selectedProjectKey?: string;
  initialQuestion?: string;
  initialView?: "chat" | "map";
}

/**
 * Public contract of the Global Assistant context. The shell exposes a tiny
 * open/close/toggle surface shared by the launcher, hero CTA, and contact dock
 * so there is exactly one concierge across the site.
 */
export interface GlobalAssistantContextValue {
  isOpen: boolean;
  openAssistant(options?: OpenAssistantOptions): void;
  closeAssistant(): void;
  toggleAssistant(): void;
}

const GlobalAssistantContext = createContext<GlobalAssistantContextValue | null>(
  null,
);

/**
 * The single global assistant host provider. Wraps the site layout once (in
 * RootLayout) and exposes open/close/toggle to every consumer without
 * re-mounting chat state per page.
 *
 * Does NOT eagerly fetch projects, history, maps, or query endpoints. The
 * project catalogue is fetched lazily the first time the panel opens (see
 * `GlobalAssistantPanel` + `ProjectChoiceList`).
 *
 * Holds a ref to the AI launcher anchor so the provider can restore focus on
 * close (spec §Accessibility: "close restores launcher focus"). Focus
 * restoration lives here — in the provider — rather than inside the panel,
 * because the panel unmounts synchronously when `isOpen` flips to false,
 * before any panel effect for the closing transition could run. A
 * `wasOpenRef` guards the initial mount so we never steal focus on first load.
 */
export function GlobalAssistantProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  // Open options carried in state so the provider re-renders when a consumer
  // calls openAssistant(). The panel reads them live while open; the provider
  // clears them on close so stale options never leak to a later open cycle.
  const [openOptions, setOpenOptions] = useState<OpenAssistantOptions>();

  // Anchor ref: the dock attaches this to its AI pill so the provider can
  // return focus on close (spec §Accessibility).
  const aiLauncherRef = useRef<HTMLButtonElement>(null);
  // Guards focus restoration so the initial mount (closed) never steals focus.
  const wasOpenRef = useRef(false);

  const value = useMemo<GlobalAssistantContextValue>(
    () => ({
      isOpen,
      openAssistant: (options) => {
        setOpenOptions(options);
        setOpen(true);
      },
      closeAssistant: () => setOpen(false),
      toggleAssistant: () => setOpen((v) => !v),
    }),
    [isOpen],
  );

  // Restore focus to the launcher anchor only on the open->closed transition,
  // not on initial mount. Also clears pending open options on close.
  useEffect(() => {
    const transitionedToClosed = !isOpen && wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (transitionedToClosed) {
      setOpenOptions(undefined);
      aiLauncherRef.current?.focus();
    }
  }, [isOpen]);

  const consumeOpenOptions = useCallback(() => {
    const next = openOptions;
    setOpenOptions(undefined);
    return next;
  }, [openOptions]);

  return (
    <GlobalAssistantContext.Provider value={value}>
      <AssistantOpenOptionsContext.Provider
        value={{ options: openOptions, consume: consumeOpenOptions }}
      >
        <AssistantLauncherContext.Provider value={aiLauncherRef}>
          {children}
        </AssistantLauncherContext.Provider>
      </AssistantOpenOptionsContext.Provider>
    </GlobalAssistantContext.Provider>
  );
}

/**
 * Internal context carrying the most recent open options to the panel. The
 * panel reads them live while open via useAssistantOpenOptions(); the provider
 * clears them on the open->closed transition.
 */
interface AssistantOpenOptionsState {
  options: OpenAssistantOptions | undefined;
  consume: () => OpenAssistantOptions | undefined;
}

const AssistantOpenOptionsContext =
  createContext<AssistantOpenOptionsState | null>(null);

/**
 * Internal ref-context for the AI launcher anchor, so the dock can register
 * its pill and the provider can restore focus on close.
 */
const AssistantLauncherContext =
  createContext<React.RefObject<HTMLButtonElement | null> | null>(null);

/**
 * Panel-internal hook: read the options delivered by the most recent open
 * call. Returns the live value; the provider clears it on close. Throws if
 * used outside the provider.
 */
export function useAssistantOpenOptions(): OpenAssistantOptions | undefined {
  const ctx = useContext(AssistantOpenOptionsContext);
  if (!ctx) {
    throw new Error(
      "useAssistantOpenOptions must be used within <GlobalAssistantProvider>",
    );
  }
  return ctx.options;
}

/**
 * Panel-internal hook: consume + clear the open options once on open so the
 * panel never re-reads stale hints. Throws if used outside the provider.
 */
export function useConsumeAssistantOpenOptions(): OpenAssistantOptions | undefined {
  const ctx = useContext(AssistantOpenOptionsContext);
  if (!ctx) {
    throw new Error(
      "useConsumeAssistantOpenOptions must be used within <GlobalAssistantProvider>",
    );
  }
  return ctx.consume();
}

/**
 * Dock-internal hook: returns the anchor ref the dock should attach to its AI
 * pill so the provider can restore focus on close. Throws if used outside the
 * provider.
 */
export function useAssistantLauncherAnchor(): React.RefObject<HTMLButtonElement | null> {
  const ctx = useContext(AssistantLauncherContext);
  if (!ctx) {
    throw new Error(
      "useAssistantLauncherAnchor must be used within <GlobalAssistantProvider>",
    );
  }
  return ctx;
}

/**
 * Hook consumers use to read the Global Assistant state.
 * Throws if used outside the provider — fail fast in dev.
 */
export function useGlobalAssistant(): GlobalAssistantContextValue {
  const ctx = useContext(GlobalAssistantContext);
  if (!ctx) {
    throw new Error(
      "useGlobalAssistant must be used within <GlobalAssistantProvider>",
    );
  }
  return ctx;
}