import { SITE_NAME } from "@/config/site";
import type { RootSEO } from "@/lib/seo";

// ── 1. Thông tin doanh nghiệp (Business Info) ──────────────────────────────────────────────
// Đổi sĐT, địa chỉ, email → chỉ cần sửa ở đây, áp dụng toàn site.
export const SITE_INFO = {
  /** Tên thương hiệu hiển thị */
  name: SITE_NAME,
  /** Số điện thoại định dạng E.164 (dùng trong schema) */
  telephone: "+84345747138",
  /** Số điện thoại định dạng hiển thị (dùng trong UI) */
  telephoneDisplay: "0345 747 138",
  /** Tên người phụ trách */
  contactPerson: "(GĐKD) Nguyễn Thị Nguyệt",
  /** Email liên hệ */
  email: "contact@canhocaocapdanang.info",
  /** Địa chỉ văn phòng */
  address: {
    street: "246 Đỗ Bá",
    district: "Phường Mỹ An",
    city: "Đà Nẵng",
    country: "VN",
    postalCode: "550000",
    full: "246 Đỗ Bá, Phường Mỹ An, Đà Nẵng, Việt Nam",
  },
  /** Tọa độ GPS */
  geo: {
    lat: "16.0583",
    lng: "108.2278",
  },
  /** Liên kết mạng xã hội (để trống "" nếu không có) */
  social: {
    facebook: "https://www.facebook.com/nguyet.nguyen2111",
    instagram: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
    twitter: "",
  },
  /** Zalo */
  zalo: "https://zalo.me/0345747138",
  /** Giờ làm việc */
  openingHours: {
    opens: "08:00",
    closes: "17:30",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as const,
  },
  /** Phân khúc giá (cho Schema.org) */
  priceRange: "$$$$",
  /** Khu vực phục vụ */
  areaServed: "Đà Nẵng, Việt Nam",
  /** Ảnh đại diện website (relative path từ public/) */
  coverImage: "/images/home/cover-image.jpg",
} as const;

// ── 2. Root SEO Config (Homepage) ─────────────────────────────────────────────
// Dùng trong layout.tsx: export const metadata = buildRootMetadata(ROOT_SEO_CONFIG)
export const ROOT_SEO_CONFIG: RootSEO = {
  title: `Căn Hộ Cao Cấp Đà Nẵng | ${SITE_NAME}`,
  description:
    "Khám phá căn hộ cao cấp Đà Nẵng tại S-Light Tower, Sun FourS Tower, The Legend và The Camellia. Xem bảng giá, pháp lý và nhận tư vấn miễn phí.",
  keywords: [
    "căn hộ cao cấp Đà Nẵng",
    "bất động sản Đà Nẵng",
    "căn hộ Đà Nẵng",
    "chung cư cao cấp Đà Nẵng",
    "đầu tư bất động sản Đà Nẵng",
    "căn hộ ven sông Hàn",
    "căn hộ biển Đà Nẵng",
    "Sun Group Đà Nẵng",
    "Ethereal Estate",
  ],
  og: {
    title: `${SITE_NAME} – Căn Hộ Cao Cấp Đà Nẵng`,
    description:
      "Khám phá căn hộ cao cấp Đà Nẵng, cập nhật bảng giá và pháp lý dự án. Nhận tư vấn miễn phí từ Ethereal Estate.",
    image: "/images/home/cover-image.jpg",
    imageAlt: "Ethereal Estate – Căn Hộ Cao Cấp Đà Nẵng",
  },
  googleSiteVerification: "D5dPqZRqYMKZFvQAMkLkCNKYrEPUd2rDp5c5maDCkhY",
};
// ── 3. JSON-LD Schema builders ──────────────────────────────────────────────
export function buildRealEstateAgentSchema(baseUrl: string): object {
  const activeSocialLinks = Object.values(SITE_INFO.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: SITE_INFO.name,
    description:
      "Đại lý bất động sản cao cấp tại Đà Nẵng – chuyên tư vấn căn hộ Sun Group, S-Light Tower, Sun FourS Tower, The Legend, Symphony Residence, The Camellia.",
    url: baseUrl,
    telephone: SITE_INFO.telephone,
    email: SITE_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_INFO.address.street,
      addressLocality: SITE_INFO.address.district,
      addressRegion: SITE_INFO.address.city,
      addressCountry: SITE_INFO.address.country,
      postalCode: SITE_INFO.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_INFO.geo.lat,
      longitude: SITE_INFO.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE_INFO.openingHours.days,
      opens: SITE_INFO.openingHours.opens,
      closes: SITE_INFO.openingHours.closes,
    },
    image: `${baseUrl}${SITE_INFO.coverImage}`,
    priceRange: SITE_INFO.priceRange,
    areaServed: SITE_INFO.areaServed,
    ...(activeSocialLinks.length > 0 && { sameAs: activeSocialLinks }),
  };
}

