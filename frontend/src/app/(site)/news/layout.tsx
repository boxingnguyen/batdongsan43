import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'News' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? `${baseUrl}/news` : `${baseUrl}/${locale}/news`
  
  return {
    title: t('hero_title'),
    description: `Latest news and updates about Wyndham Soleil Đà Nẵng - luxury apartments, project progress, and real estate insights in Da Nang.`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/news`,
        'en': `${baseUrl}/en/news`,
        [locale]: localeUrl, // Self-referential alternate link
        'x-default': `${baseUrl}/news`,
      },
    },
    openGraph: {
      title: t('hero_title'),
      description: `Latest news and updates about Wyndham Soleil Đà Nẵng`,
      url: localeUrl,
      type: 'article',
      images: [
        {
          url: `${baseUrl}/images/home/tintuc1.png`,
          width: 1200,
          height: 630,
          alt: t('hero_title'),
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

