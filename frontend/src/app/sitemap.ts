import type { MetadataRoute } from "next";

const BASE_URL =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    // Các trang tĩnh
    const staticPages = [
        {
            path: "",
            priority: 1.0,
            changeFrequency: "weekly" as const,
        },
        {
            path: "introduction",
            priority: 0.9,
            changeFrequency: "monthly" as const,
        },
        {
            path: "apartment",
            priority: 0.8,
            changeFrequency: "monthly" as const,
        },
        {
            path: "facility",
            priority: 0.8,
            changeFrequency: "monthly" as const,
        },
        {
            path: "connection",
            priority: 0.8,
            changeFrequency: "monthly" as const,
        },
        {
            path: "partners",
            priority: 0.7,
            changeFrequency: "monthly" as const,
        },
        {
            path: "gallery",
            priority: 0.7,
            changeFrequency: "monthly" as const,
        },
        {
            path: "news",
            priority: 0.8,
            changeFrequency: "daily" as const,
        },
        {
            path: "contact-us",
            priority: 0.6,
            changeFrequency: "monthly" as const,
        },
        {
            path: "lien-he",
            priority: 0.6,
            changeFrequency: "monthly" as const,
        },
    ];

    // Trang dự án
    const projectPages = [
        "s-light-tower",
        "sun-fours-tower",
        "symphony5",
        "the-legend-danang",
        "camellia",
    ];

    const sitemap: MetadataRoute.Sitemap = [
        ...staticPages.map((page) => ({
            url: page.path ? `${BASE_URL}/${page.path}` : BASE_URL,
            lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),

        ...projectPages.map((slug) => ({
            url: `${BASE_URL}/projects/${slug}`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        })),
    ];

    // Nếu sau này có tiếng Anh thì dùng đoạn này
    // const enSitemap = sitemap.map((item) => ({
    //   ...item,
    //   url: item.url.replace(BASE_URL, `${BASE_URL}/en`),
    // }));
    //
    // return [...sitemap, ...enSitemap];

    return sitemap;
}