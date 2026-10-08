import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { MAIN_PAGES, PROJECT_PAGES } from "@/config/site-pages";
import { POSTS_PATH, getAllPosts } from "@/lib/posts";

const BASE_URL = SITE_URL.replace(/\/$/, "");

// Google yêu cầu <image:loc> là URL tuyệt đối.
const absoluteUrl = (path: string) =>
    /^https?:\/\//.test(path) ? path : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

// Danh sách trang lấy từ src/config/site-pages.ts (dùng chung với /so-do-trang).
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const pages: MetadataRoute.Sitemap = [...MAIN_PAGES, ...PROJECT_PAGES].map((page) => ({
        url: page.path === "/" ? BASE_URL : `${BASE_URL}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        ...(page.image && { images: [absoluteUrl(page.image)] }),
    }));

    // Bài viết mục Tin tức (content/tin-tuc/*.md)
    const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${BASE_URL}${POSTS_PATH}/${post.slug}`,
        lastModified: new Date(post.updated),
        changeFrequency: "monthly",
        priority: 0.6,
        ...(post.cover && { images: [absoluteUrl(post.cover)] }),
    }));

    return [...pages, ...posts];
}
