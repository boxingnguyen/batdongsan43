import type { Metadata } from "next";
import { SITE_NAME } from "@/config/site";

export type FaqItem = { question: string; answer: string };

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
  /** Danh sách câu hỏi thường gặp – dùng để tạo FAQPage schema và render FAQ section */
  faq?: FaqItem[];
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

// ── Root / Homepage Metadata ───────────────────────────────────────────────────

/**
 * Type dành cho SEO của trang gốc (homepage) hoặc các trang không phải project.
 * Khác với ProjectSEO: không có slug, canonical là URL tuỳ chỉnh.
 */
export type RootSEO = {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string; // mặc định = baseUrl nếu không truyền
  og: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  googleSiteVerification?: string;
};

/**
 * Tạo Metadata cho root layout (homepage) và các trang dùng chung.
 * Tự động thêm alternates languages (vi / en), siteName, robots.
 *
 * @example
 * // layout.tsx
 * export const metadata = buildRootMetadata(ROOT_SEO_CONFIG);
 */
export function buildRootMetadata(seo: RootSEO): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.danangluxuryhomes.vn";
  const canonical = seo.canonical ?? baseUrl;
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
    alternates: {
      canonical,
      languages: {
        "vi-VN": `${baseUrl}/vi`,
        "en-US": `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
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
    ...(seo.googleSiteVerification && {
      verification: {
        google: seo.googleSiteVerification,
      },
    }),
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

// ── Breadcrumb JSON-LD ─────────────────────────────────────────────────────────
export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return JSON.stringify(jsonLd);
}

/**
 * Tạo breadcrumb items chuẩn cho trang dự án bất động sản.
 * Dùng chung cho tất cả project pages – không cần khai báo thủ công.
 *
 * Kết quả: Trang Chủ › Dự Án Bất Động Sản Đà Nẵng › <Tên dự án>
 *
 * @example
 * const items = buildProjectBreadcrumbItems(CAMELLIA_SEO_CONFIG);
 * const jsonLd = buildBreadcrumbJsonLd(items);
 */
export function buildProjectBreadcrumbItems(seo: ProjectSEO): BreadcrumbItem[] {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.danangluxuryhomes.vn";
  return [
    { name: "Trang Chủ", url: baseUrl },
    { name: "Dự Án Bất Động Sản Đà Nẵng", url: `${baseUrl}/projects` },
    { name: seo.jsonLd.name, url: `${baseUrl}/projects/${seo.slug}` },
  ];
}

// ── FAQ JSON-LD ───────────────────────────────────────────────────────────────
// FaqItem type đã được khai báo ở đầu file cùng với ProjectSEO

export function buildFaqJsonLd(faqs: FaqItem[]): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(jsonLd);
}
