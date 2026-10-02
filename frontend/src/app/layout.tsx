import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { HeaderSelector } from "@/components/layout/HeaderSelector";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Toaster from "@/components/Toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ReactNode, Suspense } from "react";
import { SITE_URL } from "@/config/site";
import FloatingContactButtons from "@/components/shared/FloatingContactButtons";
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



export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const baseUrl = SITE_URL;

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
        {/* useSearchParams inside needs Suspense so pages can be prerendered */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
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
