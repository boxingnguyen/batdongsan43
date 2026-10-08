import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildChatEmbedSrc, sanitizeEmbedPath } from "@/config/chat-embed";

// Query-driven and cross-origin: never prerender or cache this shell.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trợ lý AI — The Camellia Sơn Trà",
  robots: { index: false, follow: false },
};

type ChatEmbedPageProps = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Frames the deployed chat app so /chatbot/<path> on this site is the chat's
 * public entry point. The path and query are passed through untouched.
 */
export default async function ChatEmbedPage({ params, searchParams }: ChatEmbedPageProps) {
  const [{ path }, query] = await Promise.all([params, searchParams]);

  const segments = sanitizeEmbedPath(path);
  if (!segments) notFound();

  // No `sandbox`: the chat needs storage and scripts on its own origin.
  return (
    <iframe
      src={buildChatEmbedSrc(segments, query)}
      title="Trợ lý AI — The Camellia Sơn Trà"
      className="block h-dvh w-full border-0"
      allow="clipboard-write; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
