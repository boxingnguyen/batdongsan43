import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { HeaderSelector } from "@/components/layout/HeaderSelector";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import Toaster from "@/components/Toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ReactNode } from "react";
import { SITE_NAME } from "@/config/site";
import { GlobalAssistantProvider } from "@/components/chat/global/GlobalAssistantProvider";
import { GlobalAssistantHost } from "@/components/chat/global/GlobalAssistantHost";
import { AssistantContactDock } from "@/components/chat/global/AssistantContactDock";
import { buildRootMetadata } from "@/lib/seo";
import { ROOT_SEO_CONFIG, buildRealEstateAgentSchema, buildResidentialComplexSchema } from "@/config/site-seo";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = buildRootMetadata(ROOT_SEO_CONFIG);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};



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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn";

  // Structured Data (JSON-LD) – RealEstateAgent (LocalBusiness)
  const realEstateAgentSchema = buildRealEstateAgentSchema(baseUrl);

  // Structured Data (JSON-LD) – ResidentialComplex
  const residentialComplexSchema = buildResidentialComplexSchema(baseUrl);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(residentialComplexSchema) }}
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
            <GlobalAssistantProvider>
              <HeaderSelector />
              <MainWrapper>{children}</MainWrapper>
              <GlobalAssistantHost />
              <Toaster />
              {/* Unified concierge contact dock (replaces FloatingContactButtons). */}
              <AssistantContactDock />
            </GlobalAssistantProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
