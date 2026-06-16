import { HideSiteHeader } from "@/components/projects/HideSiteHeader";
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

export default function Symphony5Page() {
  return (
    <>
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
    </>
  );
}