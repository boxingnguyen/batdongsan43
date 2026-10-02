import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Apartment" });
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn";
  const localeUrl = `${baseUrl}/apartment`;

  return {
    title: t("hero_title"),
    description: `Explore luxury apartments at Căn hộ cao cấp Đà Nẵng. ${t("content_5_23_desc")} ${t("content_27_45_desc")} ${t("content_47_48_desc")}`,
    alternates: {
      canonical: localeUrl,
    },
    openGraph: {
      title: t("hero_title"),
      description: `Explore luxury apartments at Căn hộ cao cấp Đà Nẵng`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/header-can-ho.png`,
          width: 800,
          height: 454,
          alt: t("hero_title"),
        },
      ],
    },
  };
}

export default function ApartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
