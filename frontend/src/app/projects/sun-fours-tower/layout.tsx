import type { Metadata } from "next";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { projectsSEO } from "@/config/projects-seo";

const seo = projectsSEO.find((p) => p.slug === "sun-fours-tower")!;

export const metadata: Metadata = buildMetadata(seo);

export default function SunFoursTowerLayout({
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
