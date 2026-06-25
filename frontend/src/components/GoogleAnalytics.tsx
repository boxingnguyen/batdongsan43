'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams ? '?' + searchParams.toString() : '');

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* Initialize Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: false,
            });
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
