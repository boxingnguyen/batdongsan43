import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? `${baseUrl}/gallery` : `${baseUrl}/${locale}/gallery`
  
  return {
    title: t('title'),
    description: `Explore our gallery of images and videos showcasing Wyndham Soleil Đà Nẵng - luxury apartments, facilities, and stunning views.`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/gallery`,
        'en': `${baseUrl}/en/gallery`,
        [locale]: localeUrl, // Self-referential alternate link
        'x-default': `${baseUrl}/gallery`,
      },
    },
    openGraph: {
      title: t('title'),
      description: `Gallery of Wyndham Soleil Đà Nẵng`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/gallery/image-1.jpg`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Content coming soon.</p>
    </main>
  )
}


