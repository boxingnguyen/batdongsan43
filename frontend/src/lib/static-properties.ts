import {
  WYNDHAM_SOLEIL_DANANG_SLUG,
  wyndhamsoleildanang,
} from "@/data/obsidian-pavilion";
import {
  AZURE_BAY_RESIDENCES_SLUG,
  azureBayResidences,
} from "@/data/azure-bay-residences";
import type { PropertyDetailContent } from "@/types/property-detail";

const staticProperties: Record<string, PropertyDetailContent> = {
  [WYNDHAM_SOLEIL_DANANG_SLUG]: wyndhamsoleildanang,
  [AZURE_BAY_RESIDENCES_SLUG]: azureBayResidences,
};

export function getStaticPropertyDetail(
  slug: string
): PropertyDetailContent | null {
  return staticProperties[slug] ?? null;
}
