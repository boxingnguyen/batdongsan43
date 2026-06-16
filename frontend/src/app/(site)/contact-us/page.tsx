import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'contact' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const localeUrl = locale === 'vi' ? `${baseUrl}/contact-us` : `${baseUrl}/${locale}/contact-us`
  
  return {
    title: t('title'),
    description: `Contact Wyndham Soleil Đà Nẵng. Hotline: ${t('info.hotline1_value')}, ${t('info.hotline2_value')}. Email: ${t('info.email_value')}. Address: ${t('info.address_value')}`,
    alternates: {
      canonical: localeUrl,
      languages: {
        'vi': `${baseUrl}/contact-us`,
        'en': `${baseUrl}/en/contact-us`,
        [locale]: localeUrl, // Self-referential alternate link
        'x-default': `${baseUrl}/contact-us`,
      },
    },
    openGraph: {
      title: t('title'),
      description: `Contact Wyndham Soleil Đà Nẵng for inquiries about luxury apartments`,
      url: localeUrl,
      images: [
        {
          url: `${baseUrl}/images/home/cover-image.jpg`,
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
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Content coming soon.</p>
    </main>
  )
}


