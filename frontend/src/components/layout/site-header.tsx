"use client";

import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties?status=for-sale", label: "Buy" },
  { href: "/properties?status=for-rent", label: "Map" },
  { href: "/properties", label: "Trends" },
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
        "site-header fixed top-0 z-50 w-full border-b border-[#E8E2D9] dark:border-[#d2c4bb]/30 bg-[#f9f9f9]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md h-20 transition-all duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-20">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="font-serif text-3xl font-medium italic tracking-tight text-[#4a3829] dark:text-[#faddc8] transition-colors"
        >
          Ethereal Estate
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-12 md:flex h-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold tracking-wider font-hanken text-[#4e453e] dark:text-[#d2c4bb] hover:text-[#4a3829] dark:hover:text-[#faddc8] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side Actions */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Search Button */}
          <button 
            type="button"
            className="text-[#4a3829] dark:text-[#faddc8] hover:opacity-80 transition-opacity p-2 flex items-center gap-2"
            aria-label="Search"
          >
            <span className="text-sm font-semibold tracking-wider font-hanken">AI Search</span>
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* CTA Button */}
          <Link
            href="/properties/wyndham-soleil-danang#contact"
            className="bg-[#4a3829] hover:bg-[#6f5a4a] text-white px-8 py-3 rounded-sm text-sm font-semibold tracking-wider font-hanken transition-all duration-300 shadow-sm"
          >
            Private Access
          </Link>
        </div>

        {/* Mobile menu button and search */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            type="button"
            className="text-[#4a3829] dark:text-[#faddc8] p-2"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <button
            type="button"
            className="inline-flex p-2 text-[#4a3829] dark:text-[#faddc8]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[#E8E2D9] dark:border-[#d2c4bb]/30 bg-[#f9f9f9]/95 dark:bg-[#1A1A1A]/95 px-5 py-6 md:hidden transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wider font-hanken text-[#4e453e] dark:text-[#d2c4bb]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-[#E8E2D9] dark:bg-[#d2c4bb]/30 my-2" />
            <Link
              href="/properties/wyndham-soleil-danang#contact"
              className="w-full text-center bg-[#4a3829] hover:bg-[#6f5a4a] text-white py-3 rounded-sm text-sm font-semibold tracking-wider font-hanken transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              Private Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
