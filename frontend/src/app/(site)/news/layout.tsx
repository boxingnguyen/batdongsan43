import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "News" });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn";
  const localeUrl = `${baseUrl}/news`;

  return {
    title: t("hero_title"),
    description: `Latest news and updates about Căn hộ cao cấp Đà Nẵng - luxury apartments, project progress, and real estate insights in Da Nang.`,
    alternates: {
      canonical: localeUrl,
    },
    openGraph: {
      title: t("hero_title"),
      description: `Latest news and updates about Căn hộ cao cấp Đà Nẵng`,
      url: localeUrl,
      type: "article",
      images: [
        {
          url: `${baseUrl}/images/home/tintuc1.png`,
          width: 800,
          height: 454,
          alt: t("hero_title"),
        },
      ],
    },
  };
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
