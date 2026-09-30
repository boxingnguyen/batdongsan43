import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { MAIN_PAGES, PROJECT_PAGES } from "@/config/site-pages";

const BASE_URL = SITE_URL.replace(/\/$/, "");

// Danh sách trang lấy từ src/config/site-pages.ts (dùng chung với /so-do-trang).
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [...MAIN_PAGES, ...PROJECT_PAGES].map((page) => ({
        url: page.path === "/" ? BASE_URL : `${BASE_URL}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        ...(page.image && { images: [page.image] }),
    }));
}
