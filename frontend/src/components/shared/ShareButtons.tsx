"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Facebook, Link2, Check } from "lucide-react";
import { SITE_URL } from "@/config/site";

const BUTTON_CLASS =
  "w-9 h-9 border border-[#d2c4bb]/40 flex items-center justify-center text-[#4e453e] hover:bg-[#4a3829] hover:text-white transition-all duration-300";

export function ShareButtons() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const pageUrl = `${SITE_URL.replace(/\/$/, "")}${pathname === "/" ? "" : pathname}`;
  const encoded = encodeURIComponent(pageUrl);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] font-medium leading-[16px] tracking-[0.03em] font-hanken text-[#4e453e]">
        Chia sẻ:
      </span>
      <a
        aria-label="Chia sẻ lên Facebook"
        className={BUTTON_CLASS}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        aria-label="Chia sẻ lên X"
        className={BUTTON_CLASS}
        href={`https://twitter.com/intent/tweet?url=${encoded}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.685-5.829 6.685h-3.307l7.73-8.835L2.45 2.25h6.68l4.764 6.312 5.35-6.312zM17.002 18.807h1.844L6.983 4.126H5.025l11.977 14.681z" />
        </svg>
      </a>
      <button
        type="button"
        aria-label="Sao chép liên kết"
        className={BUTTON_CLASS}
        onClick={copyLink}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
