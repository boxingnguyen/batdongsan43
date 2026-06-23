# SEO Plan — All Projects (S-Light Tower focus)

**Date:** 2026-06-23
**Goals:** Organic search + social sharing (OG preview) + Google/Facebook paid ads

---

## Approach

Centralized SEO config (`projects-seo.ts`) + `buildMetadata()` helper. Each `layout.tsx` imports and applies — no duplicated logic.

---

## File Structure

```
src/
├── config/
│   └── projects-seo.ts          ← SEO data cho tất cả project
├── lib/
│   └── seo.ts                   ← buildMetadata() helper + JSON-LD injector
├── app/
│   ├── robots.ts                ← mới
│   ├── sitemap.ts               ← update thêm /projects/*
│   └── projects/
│       ├── s-light-tower/layout.tsx       ← expand với full metadata + JSON-LD
│       ├── sun-fours-tower/layout.tsx     ← tương tự
│       ├── symphony5/layout.tsx           ← tương tự
│       └── the-legend-danang/layout.tsx   ← tạo mới (hiện inline trong page.tsx)
└── public/
    └── og/
        ├── s-light-tower.jpg    ← 1200×630px, ~200KB (source: slight4.jpg)
        ├── sun-fours-tower.jpg
        ├── symphony5.jpg
        └── the-legend-danang.jpg
```

---

## Config Shape (`ProjectSEO` type)

```typescript
type ProjectSEO = {
  slug: string
  title: string           // ~60 chars, dùng cho <title>
  description: string     // 150-160 chars, dùng cho meta description
  keywords: string[]      // 8-12 keywords
  og: {
    title: string         // ngắn hơn, emotional hook
    description: string   // 1-2 câu, urgency
    image: string         // "/og/<slug>.jpg"
    imageAlt: string
  }
  jsonLd: {
    name: string
    address: string
    locality: string
    numberOfUnits?: number
    priceRange?: string
    geo: { lat: number; lng: number }
    amenities: string[]
    seller: string
  }
}
```

---

## S-Light Tower — Keyword Strategy

### Tầng 1: Branded (Google Ads — high intent)
- "S-Light Tower"
- "S Light Tower Đà Nẵng"
- "S-Light Tower Sun Group"
- "S-Light Tower Sun NeO City"
- "S-Light Tower giá bao nhiêu"
- "S-Light Tower mở bán"

### Tầng 2: Category (Organic — cạnh tranh trung bình)
- "căn hộ Nam Đà Nẵng"
- "căn hộ Sun Group Đà Nẵng 2025"
- "căn hộ Hòa Xuân Đà Nẵng"
- "Sun NeO City căn hộ"
- "căn hộ view sông Hàn Đà Nẵng"
- "căn hộ sở hữu lâu dài Đà Nẵng"

### Tầng 3: Long-tail (Organic — convert cao)
- "căn hộ mặt sông Hàn mở bán đợt 1"
- "đặt chỗ căn hộ Đà Nẵng 50 triệu"
- "căn hộ 396 căn Hòa Xuân"
- "tháp đôi Nam Đà Nẵng Sun Property"
- "căn hộ studio view sông Hàn Đà Nẵng"

### Keyword → Field mapping

| Field | Keyword dùng |
|-------|-------------|
| `title` | Branded + 1 category |
| `description` | 2-3 long-tail nhúng tự nhiên |
| `keywords[]` | Tất cả 3 tầng |
| `og.title` | Branded, ngắn, emotional |
| `og.description` | Hook + urgency |
| `jsonLd` | Tên chính xác, địa chỉ, tiện ích |

### S-Light Tower final values

```
title:
  "S-Light Tower Đà Nẵng | Căn Hộ View Sông Hàn 270° – Sun NeO City"

description (157 chars):
  "S-Light Tower – tháp đôi biểu tượng Sun NeO City, Nam Đà Nẵng.
   396 căn/tòa, view sông Hàn 3 mặt độc nhất, pháp lý sở hữu lâu dài.
   Mở bán đợt 1 – chỉ từ 50 tr booking. Đăng ký nhận bảng giá."

og.title:
  "S-Light Tower – Căn Hộ Mặt Sông Hàn Hiếm Nhất Đà Nẵng"

og.description:
  "Mở bán đợt 1 · 396 căn · Sở hữu lâu dài · Từ CĐT Sun Group.
   Tầm nhìn 270° sông Hàn – booking chỉ 50 triệu."
```

---

## JSON-LD Schema (S-Light Tower)

Type: `ApartmentComplex`

```json
{
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "S-Light Tower",
  "description": "Tháp đôi biểu tượng tại Sun NeO City, Nam Đà Nẵng. 396 căn/tòa, view sông Hàn 3 mặt, pháp lý sở hữu lâu dài.",
  "url": "https://{SITE_URL}/projects/s-light-tower",
  "image": "https://{SITE_URL}/og/s-light-tower.jpg",
  "numberOfRooms": "396",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nguyễn Đình Thi - 29/3",
    "addressLocality": "Hòa Xuân",
    "addressRegion": "Đà Nẵng",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 15.9896,
    "longitude": 108.2208
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Hồ bơi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Gym & Spa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kids Club", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Shophouse", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "An ninh 24/7", "value": true }
  ],
  "offers": {
    "@type": "Offer",
    "description": "Booking đợt 1 từ 50 triệu đồng",
    "seller": {
      "@type": "Organization",
      "name": "Sun Property – Sun Group"
    }
  }
}
```

JSON-LD inject vào `<head>` qua `<script type="application/ld+json">` trong layout.tsx.

---

## OG Images

- **Size:** 1200×630px (chuẩn Facebook Ads + Zalo + Google Display)
- **Max size:** ~200KB sau khi compress
- **Location:** `/public/og/<slug>.jpg`

| Project | Source image | Output |
|---------|-------------|--------|
| S-Light Tower | `slight4.jpg` | `/public/og/s-light-tower.jpg` |
| Sun Fours Tower | ảnh page hiện có | `/public/og/sun-fours-tower.jpg` |
| Symphony5 | ảnh page hiện có | `/public/og/symphony5.jpg` |
| The Legend | ảnh page hiện có | `/public/og/the-legend-danang.jpg` |

> OG images phải được resize + compress thủ công trước khi đặt vào `/public/og/`.

---

## Sitemap Update

Thêm project entries vào `sitemap.ts`:

```typescript
const projectPages = [
  { slug: "s-light-tower", priority: 0.9 },
  { slug: "sun-fours-tower", priority: 0.85 },
  { slug: "symphony5", priority: 0.85 },
  { slug: "the-legend-danang", priority: 0.85 },
]
// changeFrequency: "weekly" (giá/chính sách có thể thay đổi)
```

---

## robots.ts (mới)

```
User-agent: *
Allow: /
Allow: /projects/*
Disallow: /api/*
Sitemap: https://{SITE_URL}/sitemap.xml
```

---

## `buildMetadata()` helper

Input: `ProjectSEO` object
Output: Next.js `Metadata` object gồm:
- `title`, `description`, `keywords`
- `canonical` (từ `NEXT_PUBLIC_SITE_URL` + slug)
- `openGraph`: title, description, image (1200×630), url, type, locale, siteName
- `twitter`: card "summary_large_image", title, description, image
- `robots`: index, follow

JSON-LD được inject riêng qua component trong layout, không qua `Metadata` object (Next.js không support JSON-LD trong Metadata API).

---

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vn   # đã có, dùng cho canonical + OG url + sitemap
```

---

## Out of scope

- Dynamic OG image generation (có thể làm sau)
- i18n SEO cho project pages (hiện chỉ tiếng Việt)
- Google Search Console setup (manual step)
- Facebook Pixel / Google Tag Manager (separate task)
