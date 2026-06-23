# SEO — All Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full SEO metadata (title, description, keywords, canonical, OpenGraph, Twitter Card, JSON-LD, sitemap, robots) to all project landing pages via a centralized config.

**Architecture:** Single `ProjectSEO` config object per project → `buildMetadata()` helper produces Next.js `Metadata` → each `layout.tsx` imports both. JSON-LD injected via `<script>` tag in layout. Sitemap and robots.ts added at app root.

**Tech Stack:** Next.js 14 App Router, TypeScript, `next/navigation` Metadata API

## Global Constraints

- Domain always from `process.env.NEXT_PUBLIC_SITE_URL` — never hardcoded
- All metadata in Vietnamese (`locale: "vi_VN"`) — project pages are VI-only
- OG image size: use existing images as-is for now (local: prefix with SITE_URL; external: use URL directly)
- No new npm packages — use only Next.js built-ins
- Follow existing `layout.tsx` pattern (already used in s-light-tower, sun-fours-tower, symphony5)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lib/seo.ts` | Create | `buildMetadata()` helper — converts `ProjectSEO` → `Metadata` |
| `src/config/projects-seo.ts` | Create | All project SEO data (title, description, keywords, og, jsonLd) |
| `src/app/projects/s-light-tower/layout.tsx` | Modify | Import + apply config, inject JSON-LD |
| `src/app/projects/sun-fours-tower/layout.tsx` | Modify | Same |
| `src/app/projects/symphony5/layout.tsx` | Modify | Same |
| `src/app/projects/the-legend-danang/layout.tsx` | Create | Same (currently missing) |
| `src/app/sitemap.ts` | Modify | Add `/projects/*` entries |
| `src/app/robots.ts` | Create | Allow all, disallow `/api/*`, declare sitemap |

---

## Task 1: `src/lib/seo.ts` — buildMetadata helper

**Files:**
- Create: `src/lib/seo.ts`

**Interfaces:**
- Produces: `buildMetadata(seo: ProjectSEO): Metadata` used by all layout.tsx files
- Produces: `ProjectSEO` type used by `projects-seo.ts`

- [ ] **Step 1: Create `src/lib/seo.ts`**

```typescript
import type { Metadata } from "next";

export type ProjectSEO = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  og: {
    title: string;
    description: string;
    image: string;       // absolute URL or path starting with /
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

  // Resolve OG image to absolute URL
  const ogImage = seo.og.image.startsWith("http")
    ? seo.og.image
    : `${baseUrl}${seo.og.image}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    metadataBase: new URL(baseUrl),
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: canonical,
      siteName: "Ethereal Estate",
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
    ...(seo.jsonLd.numberOfUnits && { numberOfRooms: String(seo.jsonLd.numberOfUnits) }),
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
      ...(seo.jsonLd.priceDescription && { description: seo.jsonLd.priceDescription }),
      seller: { "@type": "Organization", name: seo.jsonLd.seller },
    },
  };

  return JSON.stringify(jsonLd);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/boxing/dxdh/nhadanang/frontend && npx tsc --noEmit 2>&1 | grep "seo.ts"
```

Expected: no errors for `src/lib/seo.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo.ts
git commit -m "feat(seo): add buildMetadata and buildJsonLd helpers"
```

---

## Task 2: `src/config/projects-seo.ts` — SEO data for all projects

**Files:**
- Create: `src/config/projects-seo.ts`

**Interfaces:**
- Consumes: `ProjectSEO` from `src/lib/seo.ts`
- Produces: `projectsSEO: ProjectSEO[]` — array indexed by slug

- [ ] **Step 1: Create `src/config/projects-seo.ts`**

```typescript
import type { ProjectSEO } from "@/lib/seo";

export const projectsSEO: ProjectSEO[] = [
  {
    slug: "s-light-tower",
    title: "S-Light Tower Đà Nẵng | Căn Hộ View Sông Hàn 270° – Sun NeO City",
    description:
      "S-Light Tower – tháp đôi biểu tượng Sun NeO City, Nam Đà Nẵng. 396 căn/tòa, view sông Hàn 3 mặt độc nhất, pháp lý sở hữu lâu dài. Mở bán đợt 1 – chỉ từ 50 tr booking. Đăng ký nhận bảng giá.",
    keywords: [
      "S-Light Tower",
      "S Light Tower Đà Nẵng",
      "S-Light Tower Sun Group",
      "S-Light Tower Sun NeO City",
      "S-Light Tower giá bao nhiêu",
      "S-Light Tower mở bán",
      "căn hộ Nam Đà Nẵng",
      "căn hộ Sun Group Đà Nẵng",
      "căn hộ Hòa Xuân Đà Nẵng",
      "căn hộ view sông Hàn Đà Nẵng",
      "căn hộ sở hữu lâu dài Đà Nẵng",
      "căn hộ mặt sông Hàn mở bán đợt 1",
    ],
    og: {
      title: "S-Light Tower – Căn Hộ Mặt Sông Hàn Hiếm Nhất Đà Nẵng",
      description:
        "Mở bán đợt 1 · 396 căn · Sở hữu lâu dài · Từ CĐT Sun Group. Tầm nhìn 270° sông Hàn – booking chỉ 50 triệu.",
      image: "/images/slight_images/slight4.jpg",
      imageAlt: "S-Light Tower – tháp đôi biểu tượng mặt sông Hàn Nam Đà Nẵng",
    },
    jsonLd: {
      name: "S-Light Tower",
      description:
        "Tháp đôi biểu tượng tại Sun NeO City, Nam Đà Nẵng. 396 căn/tòa, view sông Hàn 3 mặt, pháp lý sở hữu lâu dài.",
      streetAddress: "Nguyễn Đình Thi - 29/3",
      locality: "Hòa Xuân",
      numberOfUnits: 396,
      geo: { lat: 15.9896, lng: 108.2208 },
      amenities: ["Hồ bơi", "Gym & Spa", "Kids Club", "Shophouse", "An ninh 24/7"],
      seller: "Sun Property – Sun Group",
      priceDescription: "Booking đợt 1 từ 50 triệu đồng",
    },
  },
  {
    slug: "sun-fours-tower",
    title: "Sun FourS Tower Đà Nẵng | Căn Hộ Kính Cong Panorama – Sun Riverpolis",
    description:
      "Sun FourS Tower – 4 tháp căn hộ cao cấp tại Sun Riverpolis, phía Nam Đà Nẵng. 1.281 căn hộ, kính cong panorama, hồ bơi 4 mùa. Pháp lý sở hữu lâu dài. Đăng ký nhận bảng giá.",
    keywords: [
      "Sun FourS Tower",
      "Sun Fours Tower Đà Nẵng",
      "Sun Riverpolis căn hộ",
      "căn hộ kính cong panorama Đà Nẵng",
      "căn hộ phía Nam Đà Nẵng",
      "căn hộ Sun Group phía Nam",
      "căn hộ hồ bơi 4 mùa Đà Nẵng",
      "căn hộ 1281 căn Đà Nẵng",
      "căn hộ sở hữu lâu dài Đà Nẵng",
    ],
    og: {
      title: "Sun FourS Tower – Kính Cong Panorama Tại Nam Đà Nẵng",
      description:
        "4 tháp · 1.281 căn · Hồ bơi 4 mùa · Sở hữu lâu dài. Từ CĐT Sun Group tại Sun Riverpolis.",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      imageAlt: "Sun FourS Tower – căn hộ kính cong panorama phía Nam Đà Nẵng",
    },
    jsonLd: {
      name: "Sun FourS Tower",
      description:
        "4 tháp căn hộ cao cấp tại Sun Riverpolis, phía Nam Đà Nẵng. 1.281 căn hộ, kính cong panorama, hồ bơi 4 mùa.",
      streetAddress: "Sun Riverpolis, Ngũ Hành Sơn",
      locality: "Ngũ Hành Sơn",
      numberOfUnits: 1281,
      geo: { lat: 15.9653, lng: 108.2372 },
      amenities: ["Hồ bơi 4 mùa", "Gym & Spa & Yoga", "Shophouse thương mại", "Khu vui chơi trẻ em", "An ninh 24/7"],
      seller: "Sun Property – Sun Group",
    },
  },
  {
    slug: "symphony5",
    title: "Sun Symphony Residence 5 Đà Nẵng | View Sông Hàn – Pháo Hoa – Biển",
    description:
      "Sun Symphony Residence 5 – căn hộ hiếm sở hữu bộ tứ tầm view: Sông Hàn, pháo hoa DIFF, biển và núi. Đầu tư dòng tiền và second home tại Đà Nẵng. Đăng ký nhận thông tin.",
    keywords: [
      "Sun Symphony Residence 5",
      "Symphony 5 Đà Nẵng",
      "căn hộ view sông Hàn pháo hoa Đà Nẵng",
      "second home Đà Nẵng",
      "căn hộ đầu tư dòng tiền Đà Nẵng",
      "Sun Symphony Đà Nẵng",
      "căn hộ view 4 hướng Đà Nẵng",
    ],
    og: {
      title: "Sun Symphony Residence 5 – Bộ Tứ View Độc Nhất Đà Nẵng",
      description:
        "View Sông Hàn · Pháo hoa DIFF · Biển · Núi. Second home và đầu tư dòng tiền bậc nhất Đà Nẵng.",
      image: "https://dongtayland.vn/wp-content/uploads/2026/05/hero-12-5.jpg",
      imageAlt: "Sun Symphony Residence 5 – view sông Hàn và pháo hoa Đà Nẵng",
    },
    jsonLd: {
      name: "Sun Symphony Residence 5",
      description:
        "Căn hộ hiếm sở hữu bộ tứ tầm view Sông Hàn, pháo hoa, biển và núi tại Đà Nẵng.",
      streetAddress: "Đà Nẵng",
      locality: "Đà Nẵng",
      geo: { lat: 16.0544, lng: 108.2022 },
      amenities: ["Hồ bơi", "Gym", "View sông Hàn", "View pháo hoa DIFF"],
      seller: "Duyên Hải Holding",
    },
  },
  {
    slug: "the-legend-danang",
    title: "The Legend Đà Nẵng | Biểu Tượng Thượng Lưu – Đỉnh Cao Sống Sang",
    description:
      "The Legend Đà Nẵng – biểu tượng thượng lưu tại Đà Nẵng. Đỉnh cao sống sang kết hợp đầu tư vững chắc. Kiến trúc đẳng cấp, tiện ích 5 sao. Đăng ký nhận thông tin tư vấn.",
    keywords: [
      "The Legend Đà Nẵng",
      "căn hộ thượng lưu Đà Nẵng",
      "biệt thự cao cấp Đà Nẵng",
      "bất động sản hạng sang Đà Nẵng",
      "đầu tư bất động sản Đà Nẵng",
    ],
    og: {
      title: "The Legend Đà Nẵng – Biểu Tượng Thượng Lưu",
      description:
        "Kiến trúc đẳng cấp · Tiện ích 5 sao · Đầu tư vững chắc. Đỉnh cao sống sang tại Đà Nẵng.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmC05CVKPxhLPcb5CFqqgfcyExn1KUaem35XTncs57hw-LSL1GwINpGUZSGfC0nq8MOTwD13iBErs8y2ckhtVyAKE-I0Zx2boLQOK6IOwPpTu-O9QM9NgbXnKW9fAXIlsvw5W0GndVMJqSsRTXCSGCnkzN0TQ3KB5nal-VmFZP66MbIa1UG6pXQq_YTOxw-VQYWgjCVtkGRgLe934BGWeB0TvLqIWZ8yPL4p9S6sLsDCF_wXxhc-LTMPwXo3Rd9KWPymEMCPZ4",
      imageAlt: "The Legend Đà Nẵng – biệt thự và căn hộ thượng lưu",
    },
    jsonLd: {
      name: "The Legend Đà Nẵng",
      description: "Biểu tượng thượng lưu tại Đà Nẵng – đỉnh cao sống sang, đầu tư vững.",
      streetAddress: "Đà Nẵng",
      locality: "Đà Nẵng",
      geo: { lat: 16.0544, lng: 108.2022 },
      amenities: ["Hồ bơi", "Gym & Spa", "An ninh 24/7", "Tiện ích 5 sao"],
      seller: "Ethereal Estate",
    },
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/boxing/dxdh/nhadanang/frontend && npx tsc --noEmit 2>&1 | grep "projects-seo"
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/config/projects-seo.ts
git commit -m "feat(seo): add centralized ProjectSEO config for all projects"
```

---

## Task 3: Update layout.tsx files for all projects

**Files:**
- Modify: `src/app/projects/s-light-tower/layout.tsx`
- Modify: `src/app/projects/sun-fours-tower/layout.tsx`
- Modify: `src/app/projects/symphony5/layout.tsx`
- Create: `src/app/projects/the-legend-danang/layout.tsx`

**Interfaces:**
- Consumes: `buildMetadata`, `buildJsonLd` from `@/lib/seo`
- Consumes: `projectsSEO` from `@/config/projects-seo`

- [ ] **Step 1: Update `src/app/projects/s-light-tower/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { projectsSEO } from "@/config/projects-seo";

const seo = projectsSEO.find((p) => p.slug === "s-light-tower")!;

export const metadata: Metadata = buildMetadata(seo);

export default function SLightTowerLayout({
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
```

- [ ] **Step 2: Update `src/app/projects/sun-fours-tower/layout.tsx`**

```typescript
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
```

- [ ] **Step 3: Update `src/app/projects/symphony5/layout.tsx`**

```typescript
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
```

- [ ] **Step 4: Create `src/app/projects/the-legend-danang/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { projectsSEO } from "@/config/projects-seo";

const seo = projectsSEO.find((p) => p.slug === "the-legend-danang")!;

export const metadata: Metadata = buildMetadata(seo);

export default function TheLegendLayout({
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
```

- [ ] **Step 5: Verify TypeScript compiles across all 4 layouts**

```bash
cd /Users/boxing/dxdh/nhadanang/frontend && npx tsc --noEmit 2>&1 | grep "layout"
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/app/projects/s-light-tower/layout.tsx \
        src/app/projects/sun-fours-tower/layout.tsx \
        src/app/projects/symphony5/layout.tsx \
        src/app/projects/the-legend-danang/layout.tsx
git commit -m "feat(seo): wire all project layouts to centralized SEO config + JSON-LD"
```

---

## Task 4: Update sitemap.ts + create robots.ts

**Files:**
- Modify: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_SITE_URL` env var (already used in sitemap.ts)

- [ ] **Step 1: Update `src/app/sitemap.ts`**

Add project entries after the existing `routes` build loop:

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesoleil.vn";
  const currentDate = new Date();

  const pages = [
    "",
    "introduction",
    "apartment",
    "facility",
    "connection",
    "partners",
    "news",
    "gallery",
    "contact-us",
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Vietnamese pages (default locale, no prefix)
  pages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: currentDate,
      changeFrequency: page === "news" ? "daily" : page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : page === "introduction" ? 0.9 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
        },
      },
    });
  });

  // English pages
  pages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/en/${page}`,
      lastModified: currentDate,
      changeFrequency: page === "news" ? "daily" : page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : page === "introduction" ? 0.9 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
        },
      },
    });
  });

  // Project landing pages (VI only, high priority — ads targets)
  const projectSlugs = [
    { slug: "s-light-tower", priority: 0.9 },
    { slug: "sun-fours-tower", priority: 0.85 },
    { slug: "symphony5", priority: 0.85 },
    { slug: "the-legend-danang", priority: 0.85 },
  ];

  projectSlugs.forEach(({ slug, priority }) => {
    routes.push({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority,
    });
  });

  return routes;
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesoleil.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/boxing/dxdh/nhadanang/frontend && npx tsc --noEmit 2>&1 | grep -E "sitemap|robots"
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat(seo): add project pages to sitemap and create robots.ts"
```

---

## Verification

After all tasks:

- [ ] Start dev server: `cd /Users/boxing/dxdh/nhadanang/frontend && npm run dev`
- [ ] Check `http://localhost:3000/projects/s-light-tower` — view page source, verify `<title>`, `<meta name="description">`, `og:image`, `og:title`, JSON-LD `<script>` in `<head>`
- [ ] Check `http://localhost:3000/sitemap.xml` — verify all 4 project slugs appear
- [ ] Check `http://localhost:3000/robots.txt` — verify sitemap URL is correct
- [ ] Test OG preview: paste `http://localhost:3000/projects/s-light-tower` into [opengraph.xyz](https://www.opengraph.xyz) or Facebook Debugger (requires public URL)
