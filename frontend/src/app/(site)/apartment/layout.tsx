import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Apartment' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? `${baseUrl}/apartment` : `${baseUrl}/${locale}/apartment`
  
  return {
    title: t('hero_title'),
    description: `Explore luxury apartments at Wyndham Soleil Đà Nẵng. ${t('content_5_23_desc')} ${t('content_27_45_desc')} ${t('content_47_48_desc')}`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/apartment`,
        'en': `${baseUrl}/en/apartment`,
        [locale]: localeUrl, // Self-referential alternate link
        'x-default': `${baseUrl}/apartment`,
      },
    },
    openGraph: {
      title: t('hero_title'),
      description: `Explore luxury apartments at Wyndham Soleil Đà Nẵng`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/header-can-ho.png`,
          width: 1200,
          height: 630,
          alt: t('hero_title'),
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

