import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import React from "react";
import { GlobalAssistantProvider } from "../GlobalAssistantProvider";
import { AssistantContactDock } from "../AssistantContactDock";
import { GlobalAssistantHost } from "../GlobalAssistantHost";
import { useGlobalAssistant } from "../GlobalAssistantProvider";

/**
 * Behaviour tests for the Ethereal Concierge shell (GA-05).
 *
 * These exercise the *shipped* components directly:
 *   - Launcher lives in AssistantContactDock (which also carries Zalo/Phone).
 *   - ESC handling + lazy panel live in GlobalAssistantHost.
 *   - The welcome greeting + project list live in GlobalAssistantPanel.
 *   - The hero CTA lives in EtherealHomeClient (rendered under the same provider).
 *
 * The only network call in scope is the project catalogue fetch; it is mocked
 * so the deterministic welcome greeting behaviour is proven without network.
 */

// Silence jsdom noise that isn't relevant to the behaviours under test.
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.matchMedia =
    window.matchMedia ||
    function (query: string) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    };
});

afterAll(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});

// Mock the project catalogue module so the welcome view never hits the network.
vi.mock("@/lib/projects/api", () => ({
  fetchActiveProjects: vi.fn(() => Promise.resolve([])),
  clearProjectsCache: vi.fn(),
  PROJECTS_FETCH_TIMEOUT_MS: 10_000,
  PROJECTS_CACHE_TTL_MS: 60_000,
}));

/** Render `next/image` → a plain img so the home hero mounts in jsdom. */
vi.mock("next/image", () => ({
  __esModule: true,
  default: function Image(props: { alt?: string }) {
    return React.createElement("img", { alt: props.alt ?? "stub" });
  },
}));

/** Render `next/link` → an anchor so the project links work in jsdom. */
vi.mock("next/link", () => ({
  __esModule: true,
  default: function Link({ children }: { children: React.ReactNode }) {
    return React.createElement("a", null, children);
  },
}));

/** Stub ImageWithSkeleton to a plain img so the home hero renders cleanly. */
vi.mock("@/components/ui/ImageWithSkeleton", () => ({
  __esModule: true,
  ImageWithSkeleton: function ImageWithSkeleton(props: { alt?: string }) {
    return React.createElement("img", { alt: props.alt ?? "stub" });
  },
}));

import { EtherealHomeClient } from "@/components/Home/EtherealHomeClient";

/**
 * FullShell mounts the real dock (launcher + Zalo + Phone), the real host
 * (ESC listener + lazily-loaded panel), and optionally the real hero CTA — all
 * on a single provider instance — so every behaviour below is validated
 * against shipped code.
 */
function FullShell({ withHero = false }: { withHero?: boolean }) {
  return (
    <GlobalAssistantProvider>
      {withHero && <EtherealHomeClient />}
      <AssistantContactDock />
      <GlobalAssistantHost />
    </GlobalAssistantProvider>
  );
}

const LAUNCHER_LABEL = "Mở trợ lý AI tư vấn bất động sản";
const PANEL_LABEL = "Trợ lý AI Ethereal Concierge";

/** Open the assistant and wait for the lazily-loaded panel to appear. */
async function openAssistantVia(fn: () => void) {
  await act(async () => {
    fn();
  });
  await waitFor(() => {
    expect(screen.getByLabelText(PANEL_LABEL)).toBeInTheDocument();
  });
}

describe("launcher_opens_assistant", () => {
  it("opens the assistant panel when the dock launcher is clicked", async () => {
    render(<FullShell />);

    expect(screen.queryByLabelText(PANEL_LABEL)).not.toBeInTheDocument();

    await openAssistantVia(() => {
      screen.getByLabelText(LAUNCHER_LABEL).click();
    });
  });
});

describe("hero_cta_opens_same_assistant", () => {
  it("the hero CTA opens the same assistant the dock launcher controls", async () => {
    render(<FullShell withHero />);

    // The real hero button ships in EtherealHomeClient with aria-label "Hỏi trợ lý AI".
    const hero = screen.getByLabelText("Hỏi trợ lý AI");

    // No assistant open initially.
    expect(screen.queryByLabelText(PANEL_LABEL)).not.toBeInTheDocument();

    // Click the real production CTA — it must drive the SAME provider state the
    // dock launcher controls (single assistant, not a second instance).
    await openAssistantVia(() => hero.click());

    expect(screen.getAllByLabelText(PANEL_LABEL)).toHaveLength(1);

    // State is shared/idempotent: reopening via the dock launcher yields no
    // second panel.
    await act(async () => {
      screen.getByLabelText(LAUNCHER_LABEL).click();
    });
    expect(screen.getAllByLabelText(PANEL_LABEL)).toHaveLength(1);
  });
});

describe("escape_closes_assistant", () => {
  it("ESC key closes an open assistant via the host listener", async () => {
    render(<FullShell />);

    await openAssistantVia(() => {
      screen.getByLabelText(LAUNCHER_LABEL).click();
    });

    // The host binds a capture-phase ESC listener while open.
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    });
    await waitFor(() => {
      expect(screen.queryByLabelText(PANEL_LABEL)).not.toBeInTheDocument();
    });
  });
});

describe("close_restores_launcher_focus", () => {
  it("focus returns to the dock launcher after the assistant closes", async () => {
    render(<FullShell />);

    const launcher = screen.getByLabelText(LAUNCHER_LABEL);

    await openAssistantVia(() => launcher.click());
    expect(launcher).not.toHaveFocus();

    // ESC fires in the host's capture-phase listener and flips isOpen false,
    // which (via the provider effect) restores focus to the launcher ref.
    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    });
    await waitFor(() => {
      expect(screen.queryByLabelText(PANEL_LABEL)).not.toBeInTheDocument();
    });
    expect(launcher).toHaveFocus();
  });
});

describe("zalo_link_is_preserved", () => {
  it("the dock links to the exact Zalo destination", async () => {
    render(<FullShell />);

    const zalo = screen.getByLabelText("Liên hệ qua Zalo");
    expect(zalo).toHaveAttribute("href", "https://zalo.me/0345747138");
    expect(zalo).toHaveAttribute("target", "_blank");
  });
});

describe("phone_link_is_preserved", () => {
  it("the dock links to the exact tel: destination", async () => {
    render(<FullShell />);

    const phone = screen.getByLabelText("Gọi điện thoại hỗ trợ");
    expect(phone).toHaveAttribute("href", "tel:0345747138");
  });
});

describe("welcome_does_not_require_network_query", () => {
  it("renders the deterministic greeting without fetching /api/assistant/*", async () => {
    // The catalogue fetch (/api/projects) is the only allowed network call on
    // open; stub its module (vi.mock above) so we can assert NO fetch at all
    // reaches the network while rendering the welcome greeting.
    const fetchSpy = vi.spyOn(global, "fetch");

    render(<FullShell />);

    await openAssistantVia(() => {
      screen.getByLabelText(LAUNCHER_LABEL).click();
    });

    // Welcome copy is deterministic and present after the lazy panel mounts.
    await waitFor(() => {
      expect(
        screen.getByText(/Chào bạn, tôi là Ethereal Concierge AI/i),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Thông tin được tổng hợp từ dữ liệu dự án/i),
    ).toBeInTheDocument();

    // No fetch to /api/assistant/* (or any other network) should have fired to
    // render the welcome greeting.
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
