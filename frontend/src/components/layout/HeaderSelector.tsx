"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { SiteHeader } from "@/components/layout/site-header";

export function HeaderSelector() {
  const pathname = usePathname() || "/";

  // Determine if we are on a Wyndham Soleil page
  // The Wyndham Soleil pages are: /introduction, /connection, /partners, /facility, /apartment, /news, /gallery, /contact-us, /media
  // under any locale prefix like /vi/introduction, /en/introduction, or /introduction
  const isSoleilPage = pathname.match(
    /^\/(vi|en)?\/?(introduction|connection|partners|facility|apartment|news|gallery|contact-us|media)/
  );

  if (isSoleilPage) {
    return <Header />;
  }

  return <SiteHeader />;
}
