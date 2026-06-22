"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <main className={`${isProjectPage ? "" : "pt-20"} pb-40`}>{children}</main>
  );
}
