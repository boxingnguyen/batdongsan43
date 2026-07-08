import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://canhocaocapdanang.info";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/*.json$"],
        crawlDelay: 1,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
  };
}
