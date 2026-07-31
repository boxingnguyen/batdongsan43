// layout.tsx – Camellia Project Layout
// ✅ Metadata được export tại đây để Next.js inject vào <head>
// ✅ JSON-LD KHÔNG đặt ở đây (đã có trong page.tsx) – tránh duplicate schema

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getSEO } from "@/config/projects-seo";

const seo = getSEO("camellia");

export const metadata: Metadata = buildMetadata(seo);

export default function CamelliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
