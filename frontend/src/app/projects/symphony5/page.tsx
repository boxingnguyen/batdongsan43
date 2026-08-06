import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
import { ProjectScrollPopup } from "@/components/projects/ProjectScrollPopup";
import { ProjectHeroNav } from "@/components/projects/ProjectHeroNav";
import { SymphonyHero } from "@/components/projects/SymphonyHero";
import { SymphonyIntro } from "@/components/projects/SymphonyIntro";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { SymphonyLocation } from "@/components/projects/SymphonyLocation";
import { SymphonyInvestment } from "@/components/projects/SymphonyInvestment";
import { SymphonyAmenities } from "@/components/projects/SymphonyAmenities";
import { SymphonyProducts } from "@/components/projects/SymphonyProducts";
import { SymphonyFloorPlan } from "@/components/projects/SymphonyFloorPlan";
import { SymphonyPolicy } from "@/components/projects/SymphonyPolicy";
import { SymphonyDtl } from "@/components/projects/SymphonyDtl";

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, buildJsonLd, buildBreadcrumbJsonLd, buildProjectBreadcrumbItems } from "@/lib/seo";
import { getSEO } from "@/config/projects-seo";
import { ProjectBottomContent } from "@/components/projects/ProjectBottomContent";

const SYMPHONY5_SEO_CONFIG = getSEO("symphony5")

export const metadata: Metadata = buildMetadata(SYMPHONY5_SEO_CONFIG);

export default function Symphony5Page() {
  const symphony5ApartmentComplexJsonLd = buildJsonLd(SYMPHONY5_SEO_CONFIG);
  const symphony5BreadcrumbJsonLd = buildBreadcrumbJsonLd(
    buildProjectBreadcrumbItems(SYMPHONY5_SEO_CONFIG)
  );
  const symphony5FaqItems = SYMPHONY5_SEO_CONFIG.faq ?? [];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: symphony5ApartmentComplexJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: symphony5BreadcrumbJsonLd }} />
      <HideSiteHeader />
      <div className="symphony5-page bg-[#f9f9f9]">
        <ProjectHeroNav />
        <SymphonyHero />
        <SymphonyIntro />
        <ProjectOverview />
        <SymphonyLocation />
        <SymphonyInvestment />
        <SymphonyAmenities />
        <SymphonyProducts />
        <SymphonyFloorPlan />
        <SymphonyPolicy />
        <SymphonyDtl />
      </div>

      <ProjectBottomContent 
        slug="symphony5" 
        accentColor="#C8A96E"
        bgSeo="bg-white"
        bgRelated="bg-[#f9f9f9]"
        borderColor="border-[#E8E2D9]"
      />

      <ProjectScrollPopup projectName="Sun Symphony Residence 5" accent="#C8A96E" />
    </>
  );
}