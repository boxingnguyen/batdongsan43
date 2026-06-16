import {
  WYNDHAM_SOLEIL_DANANG_SLUG,
  wyndhamsoleildanang,
} from "@/data/obsidian-pavilion";
import type { PropertyDetailContent } from "@/types/property-detail";

const staticProperties: Record<string, PropertyDetailContent> = {
  [WYNDHAM_SOLEIL_DANANG_SLUG]: wyndhamsoleildanang,
};

export function getStaticPropertyDetail(
  slug: string,
): PropertyDetailContent | null {
  return staticProperties[slug] ?? null;
}
