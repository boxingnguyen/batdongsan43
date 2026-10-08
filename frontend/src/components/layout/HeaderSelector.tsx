"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { SiteHeader } from "@/components/layout/site-header";
import { isChatEmbedPath } from "@/config/chat-embed";

export function HeaderSelector() {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The embed surface renders no site chrome. Placed after the hooks and before
  // the mounted guard: the pathname is already correct while hydrating, so the
  // header never flashes on the way in.
  if (isChatEmbedPath(pathname)) {
    return null;
  }

  // Determine if we are on a content page (introduction, connection, etc.)
  // These pages use the full-width header instead of the compact header
  // Pages: /introduction, /connection, /partners, /facility, /apartment, /news, /gallery, /contact-us, /media
  const isContentPage = pathname.match(
    /^\/(vi|en)?\/?(introduction|connection|partners|facility|apartment|news|gallery|contact-us|media)/,
  );

  if (!mounted) {
    return <SiteHeader />;
  }

  if (isContentPage) {
    return <Header />;
  }

  return <SiteHeader />;
}
