import type { Metadata } from "next";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { projectsSEO } from "@/config/projects-seo";

const seo = projectsSEO.find((p) => p.slug === "symphony5")!;

export const metadata: Metadata = buildMetadata(seo);

export default function Symphony5Layout({
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
