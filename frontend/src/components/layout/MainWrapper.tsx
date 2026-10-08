"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatEmbedLauncher } from "@/components/chat-embed/ChatEmbedLauncher";
import { isChatEmbedPath } from "@/config/chat-embed";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";

  // The embed surface owns the whole viewport: no header offset, no footer and
  // no launcher, because the framed chat is the page.
  if (isChatEmbedPath(pathname)) {
    return <main className="h-dvh w-full overflow-hidden">{children}</main>;
  }

  const isProjectPage = pathname.startsWith("/projects/");

  return (
    <>
      <main className={`${isProjectPage ? "" : "pt-20"}`}>{children}</main>
      <SiteFooter />
      <ChatEmbedLauncher />
    </>
  );
}
