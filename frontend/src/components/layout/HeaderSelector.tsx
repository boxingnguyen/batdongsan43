"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { SiteHeader } from "@/components/layout/site-header";

export function HeaderSelector() {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
