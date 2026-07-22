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
import { buildMetadata, buildJsonLd } from "@/lib/seo";

const SEO_CONFIG = {
  slug: "symphony5",
  title: "Sun Symphony Residence 5 Đà Nẵng – Căn Hộ Cao Cấp Sông Hàn",
  description:
    "Sun Symphony Residence 5 Đà Nẵng – Căn hộ cao cấp view sông Hàn tại Sun Group. Thiết kế sang trọng, tiện ích đẳng cấp, pháp lý rõ ràng. Liên hệ tư vấn ngay!",
  keywords: [
    "Sun Symphony Residence 5",
    "Symphony 5 Đà Nẵng",
    "căn hộ Sun Symphony Đà Nẵng",
    "căn hộ cao cấp Đà Nẵng",
    "Sun Group Đà Nẵng",
  ],
  og: {
    title: "Sun Symphony Residence 5 – Căn Hộ Cao Cấp Đà Nẵng",
    description:
      "Dự án căn hộ cao cấp Sun Symphony Residence 5 tại Đà Nẵng. Vị trí đắc địa, tiện ích sang trọng, sở hữu lâu dài.",
    image: "/images/symphony5/phoi-canh-tong-the.jpg",
    imageAlt: "Sun Symphony Residence 5 Đà Nẵng – Phối Cảnh Tổng Thể",
  },
  jsonLd: {
    name: "Sun Symphony Residence 5",
    description: "Căn hộ cao cấp tại Đà Nẵng do Sun Group phát triển",
    streetAddress: "Đà Nẵng",
    locality: "Đà Nẵng",
    geo: { lat: 16.0471, lng: 108.2062 },
    amenities: ["Hồ Bơi", "Gym", "Spa", "Shophouse", "Kids Club"],
    seller: "Sun Property (Sun Group)",
    priceDescription: "Liên hệ để biết giá chi tiết",
  },
};

export const metadata: Metadata = buildMetadata(SEO_CONFIG);

export default function Symphony5Page() {
  const jsonLd = buildJsonLd(SEO_CONFIG);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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
      <ProjectScrollPopup projectName="Sun Symphony Residence 5" accent="#C8A96E" />
    </>
  );
}