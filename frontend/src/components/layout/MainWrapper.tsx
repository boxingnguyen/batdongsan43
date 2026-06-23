"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <>
      <main className={`${isProjectPage ? "" : "pt-20"}`}>{children}</main>
      {!isProjectPage && <SiteFooter />}
    </>
  );
}
