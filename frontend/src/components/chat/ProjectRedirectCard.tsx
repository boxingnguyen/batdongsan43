"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectRedirect } from "./MessageBubble";

interface ProjectRedirectCardProps {
  redirect: ProjectRedirect;
  /** Optional navigation hook (analytics etc.); plain <Link> handles the actual routing. */
  onNavigate?: () => void;
}

/**
 * Prominent call-to-action under an answer that actually belongs to another
 * project (cross-project guardrail). Single-project port: the card is purely
 * presentational — no project list, no registry lookup. A real <Link> (not
 * onClick) keeps middle-click/copy-link working and lands on the internal
 * /projects/<slug> page. Only mounted when the message carries a normalized
 * redirect, so absence renders nothing.
 */
export function ProjectRedirectCard({ redirect, onNavigate }: ProjectRedirectCardProps) {
  // Compact name when available ("The Soleil"), full display name otherwise.
  const label = redirect.shortName ?? redirect.displayName;
  return (
    <div className="mt-3 rounded-2xl border border-[#C9A45D]/40 bg-[#C9A45D]/10 p-3">
      <Link
        href={`/projects/${redirect.project_key}`}
        onClick={onNavigate}
        aria-label={`Xem dự án ${label}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16384C] px-4 py-3 text-[15px] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#16384C]/90"
      >
        Xem dự án {label}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
