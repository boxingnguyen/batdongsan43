import type { Metadata } from "next";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { projectsSEO } from "@/config/projects-seo";

const seo = projectsSEO.find((p) => p.slug === "s-light-tower")!;

export const metadata: Metadata = buildMetadata(seo);

export default function SLightTowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJsonLd(seo) }}
      />
      {children}
    </>
  );
}
