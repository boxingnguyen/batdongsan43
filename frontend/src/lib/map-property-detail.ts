import type { Property } from "@/types/strapi";
import type { PropertyDetailContent } from "@/types/property-detail";
import { blocksToPlainText, getStrapiMediaUrl } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80";

export function mapStrapiToPropertyDetail(
  property: Property
): PropertyDetailContent {
  const mainUrl =
    getStrapiMediaUrl(property.featured_image) ?? FALLBACK_IMAGE;
  const galleryUrls =
    property.gallery
      ?.map((g) => getStrapiMediaUrl(g))
      .filter((u): u is string => Boolean(u)) ?? [];

  const images: PropertyDetailContent["images"] = [
    {
      src: mainUrl,
      alt: property.title,
      layout: "main",
    },
    ...galleryUrls.slice(0, 2).map((src, i) => ({
      src,
      alt: `${property.title} gallery ${i + 1}`,
      layout: "secondary" as const,
    })),
  ];

  while (images.length < 3) {
    images.push({
      src: FALLBACK_IMAGE,
      alt: property.title,
      layout: "secondary",
    });
  }

  const descriptionText = blocksToPlainText(property.description);
  const location = [property.address, property.city].filter(Boolean).join(", ");

  return {
    slug: property.slug,
    title: property.title,
    price: Number(property.price),
    monthlyEstimate: "Contact for estimate",
    beds: property.bedrooms != null ? `${property.bedrooms} Beds` : "—",
    baths: property.bathrooms != null ? `${property.bathrooms} Baths` : "—",
    sqft:
      property.area_sqft != null
        ? `${property.area_sqft.toLocaleString()} SQFT`
        : "—",
    location: location || "Location on request",
    badge: "Premium Collection",
    description: descriptionText
      ? [descriptionText]
      : ["Details available upon private inquiry."],
    amenities: [],
    images: images.slice(0, 3),
    galleryCount: galleryUrls.length || undefined,
    marketYoY: "Data available on request",
    agent: {
      name: property.agent?.name ?? "Private Client Advisor",
      title: property.agent?.role ?? "Private Client Advisor",
      image:
        getStrapiMediaUrl(property.agent?.avatar) ??
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    },
  };
}
