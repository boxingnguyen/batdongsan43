"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/properties?status=for-sale", label: "Buy" },
  { href: "/properties?status=for-rent", label: "Rent" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-emerald-400">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline tracking-tight">LuxeEstate</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-600",
                pathname === link.href.split("?")[0]
                  ? "text-emerald-600"
                  : "text-slate-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/properties">Browse listings</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link href="/properties" onClick={() => setOpen(false)}>
                Browse listings
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
