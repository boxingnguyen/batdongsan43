"use client";

import Link from "next/link";
import { SITE_NAME } from "@/config/site";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#dau-tu", label: "Đầu tư" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#mat-bang", label: "Mặt bằng" },
  { href: "#csbh", label: "Chính sách" },
  { href: "#dtl", label: "Duyên Hải Holding" },
];

export function ProjectHeroNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="header-du-an"
      className={cn(
        "sticky top-0 z-50 border-b border-[#d2c4bb]/30 bg-[#f9f9f9]/95 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-20">
        <Link href="/" className="font-serif text-xl tracking-tight text-[#4a3829]">
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-[#4e453e] transition-colors hover:text-[#4a3829]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="p-2 text-[#4a3829] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#d2c4bb]/30 bg-[#f9f9f9]/98 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-[#4e453e]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}