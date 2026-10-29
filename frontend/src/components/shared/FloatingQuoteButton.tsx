"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

/**
 * Floating quote CTA, stacked above the AI launcher in the bottom-left dock.
 * Hidden on the contact page itself, where the button would only point at the
 * page the visitor is already on.
 */
export function FloatingQuoteButton() {
  const pathname = usePathname() ?? "/";

  if (pathname === "/lien-he") return null;

  return (
    <Link
      href="/lien-he"
      aria-label="Báo giá — liên hệ tư vấn"
      title="Báo giá dự án"
      className="flex h-14 items-center gap-2.5 rounded-full bg-[#4a3829] px-5 text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#6f5a4a] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A6A3B] motion-reduce:transition-none motion-reduce:hover:scale-100 pointer-events-auto"
    >
      <FileText aria-hidden="true" strokeWidth={2} className="h-5 w-5 shrink-0 text-[#E3C284]" />
      <span className="text-[15px] font-semibold leading-none tracking-wide">Báo giá</span>
    </Link>
  );
}
