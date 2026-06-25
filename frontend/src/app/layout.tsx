import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { HeaderSelector } from "@/components/layout/HeaderSelector";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, getLocale } from "next-intl/server";
import Toaster from "@/components/Toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ReactNode } from "react";
import { SITE_NAME } from "@/config/site";
import FloatingContactButtons from "@/components/shared/FloatingContactButtons";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// 3. METADATA - Static root metadata
const metadata: Metadata = {
  title: `${SITE_NAME} – Bất Động Sản Cao Cấp Đà Nẵng`,
  description: "Dự án bất động sản cao cấp tại Đà Nẵng: S-Light Tower, Sun FourS Tower, The Legend, Symphony Residence. Căn hộ ven sông, sở hữu lâu dài.",
  keywords: [
    "bất động sản Đà Nẵng",
    "căn hộ Đà Nẵng",
    "chung cư cao cấp Đà Nẵng",
    "đầu tư bất động sản",
    "căn hộ ven sông",
    "căn hộ biển Đà Nẵng",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thesoleil.vn"),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/vi",
      "en-US": "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export { metadata };


// 4. FIX ROOTLAYOUT FUNCTION (Must accept params)
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params?: Promise<{ locale?: string }>; // <-- Make params optional
}>) {
  // Get locale from params if available, otherwise use getLocale()
  const paramsData = params ? await params : null;
  const localeFromParams = paramsData?.locale;
  const resolvedLocale = localeFromParams || (await getLocale()) || "vi";
  // Ensure locale is always 'vi' or 'en'
  const locale =
    resolvedLocale === "en" || resolvedLocale === "vi" ? resolvedLocale : "vi";

  // const locale = await getLocale() // <-- This line is no longer needed
  const messages = await getMessages();
  // const t = await getTranslations({ locale, namespace: 'meta' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesoleil.vn";

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    name: "The Soleil Đà Nẵng",
    alternateName: "Wyndham Soleil Đà Nẵng",
    description: "Khám phá các dự án bất động sản đẳng cấp tại Đà Nẵng",
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 02, Phạm Văn Đồng, Phường An Hải",
      addressLocality: "Đà Nẵng",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "16.0583",
      longitude: "108.2278",
    },
    developer: {
      "@type": "Organization",
      name: "Công Ty Cổ Phần PPC An Thịnh Đà Nẵng",
      url: baseUrl,
    },
    operator: {
      "@type": "Organization",
      name: "Wyndham Hotel Group",
    },
    numberOfUnits: {
      "@type": "QuantitativeValue",
      value: "Multiple towers with various apartment types",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Infinity Pool",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Gym",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Spa",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Restaurant",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Shopping Center",
        value: true,
      },
    ],
    image: `${baseUrl}/images/home/cover-image.jpg`,
    telephone: "+84345747138",
    email: "Thesoleildanangofficial@gmail.com",
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <GoogleAnalytics />
      </head>
      <body
        className={`${font.className} bg-white dark:bg-black antialiased relative`}
      >
        <NextTopLoader color="#07be8a" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
            <HeaderSelector />
            <MainWrapper>{children}</MainWrapper>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>

        <FloatingContactButtons />
      </body>
    </html>
  );
}
