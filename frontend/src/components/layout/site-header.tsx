"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties?status=for-sale", label: "Buy" },
  { href: "/properties?status=for-rent", label: "Rent" },
  { href: "/", label: "Projects" },
  { href: "/properties", label: "Market Trends" },
];

export function SiteHeader() {
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
      id="site-header"
      className={cn(
        "site-header fixed top-0 z-50 w-full border-b border-[#d2c4bb]/30 bg-[#f9f9f9]/60 backdrop-blur-xl transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-20">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-[#4a3829]"
        >
          Ethereal Estate
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="pb-1 text-sm font-semibold tracking-wide text-[#4e453e] transition-colors hover:text-[#4a3829]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="h-auto rounded-sm bg-[#4a3829] px-8 py-3 text-sm font-semibold text-white hover:bg-[#534335]"
          >
            <Link href="/properties/wyndham-soleil-danang#contact">
              Contact Us
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex p-2 text-[#4a3829] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#d2c4bb]/30 bg-[#f9f9f9]/95 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#4e453e]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 h-auto w-full rounded-sm bg-[#4a3829] py-3 text-white"
            >
              <Link
                href="/properties/wyndham-soleil-danang#contact"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
