import { projects } from "@/data/projects";

export type SitePage = {
  path: string;
  label: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
  image?: string;
};

// ── Danh sách trang được index ─────────────────────────────────────────────
// Nguồn chung cho /sitemap.xml (app/sitemap.ts) và trang Sơ đồ trang (/so-do-trang).
// Các trang template (/introduction, /apartment, /facility, /connection, /partners,
// /gallery, /news, /contact-us, /media) chưa có nội dung/bản dịch → chưa đưa vào.
// Khi hoàn thiện trang nào, thêm vào MAIN_PAGES.

export const MAIN_PAGES: SitePage[] = [
  { path: "/", label: "Trang chủ", changeFrequency: "weekly", priority: 1.0 },
  { path: "/projects", label: "Dự án căn hộ cao cấp Đà Nẵng", changeFrequency: "weekly", priority: 0.9 },
  { path: "/lien-he", label: "Liên hệ tư vấn", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tin-tuc", label: "Tin tức & cẩm nang mua căn hộ", changeFrequency: "daily", priority: 0.7 },
];

// Dự án có trang riêng trên site (bỏ qua dự án chỉ link ra website ngoài)
const EXTERNAL_PROJECT_SLUGS = ["wyndham-soleil-danang"];

export const PROJECT_PAGES: SitePage[] = projects
  .filter((p) => !EXTERNAL_PROJECT_SLUGS.includes(p.slug))
  .map((p) => ({
    path: `/projects/${p.slug}`,
    label: p.title,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    image: p.image,
  }));
