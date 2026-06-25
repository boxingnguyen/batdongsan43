import type { Metadata } from "next";
import { SITE_NAME } from "@/config/site";

export type ProjectSEO = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  og: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  jsonLd: {
    name: string;
    description: string;
    streetAddress: string;
    locality: string;
    numberOfUnits?: number;
    geo: { lat: number; lng: number };
    amenities: string[];
    seller: string;
    priceDescription?: string;
  };
};

export function buildMetadata(seo: ProjectSEO): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";
  const canonical = `${baseUrl}/projects/${seo.slug}`;
  const ogImage = seo.og.image.startsWith("http")
    ? seo.og.image
    : `${baseUrl}${seo.og.image}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_NAME, url: baseUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(baseUrl),
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: canonical,
      siteName: SITE_NAME,
      title: seo.og.title,
      description: seo.og.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo.og.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.og.title,
      description: seo.og.description,
      images: [ogImage],
    },
  };
}

export function buildJsonLd(seo: ProjectSEO): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";
  const ogImage = seo.og.image.startsWith("http")
    ? seo.og.image
    : `${baseUrl}${seo.og.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: seo.jsonLd.name,
    description: seo.jsonLd.description,
    url: `${baseUrl}/projects/${seo.slug}`,
    image: ogImage,
    ...(seo.jsonLd.numberOfUnits && {
      numberOfRooms: String(seo.jsonLd.numberOfUnits),
    }),
    address: {
      "@type": "PostalAddress",
      streetAddress: seo.jsonLd.streetAddress,
      addressLocality: seo.jsonLd.locality,
      addressRegion: "Đà Nẵng",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seo.jsonLd.geo.lat,
      longitude: seo.jsonLd.geo.lng,
    },
    amenityFeature: seo.jsonLd.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      ...(seo.jsonLd.priceDescription && {
        description: seo.jsonLd.priceDescription,
      }),
      seller: { "@type": "Organization", name: seo.jsonLd.seller },
    },
  };

  return JSON.stringify(jsonLd);
}
