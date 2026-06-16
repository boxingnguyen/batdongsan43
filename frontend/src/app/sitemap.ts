import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thesoleil.vn'
  const currentDate = new Date()

  // Common pages for both locales
  const pages = [
    '',
    'introduction',
    'apartment',
    'facility',
    'connection',
    'partners',
    'news',
    'gallery',
    'contact-us',
  ]

  // Generate sitemap entries for Vietnamese (default) and English
  const routes: MetadataRoute.Sitemap = []

  // Vietnamese pages (default locale, no prefix)
  pages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: currentDate,
      changeFrequency: page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : page === 'introduction' ? 0.9 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
        },
      },
    })
  })

  // English pages
  pages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/en/${page}`,
      lastModified: currentDate,
      changeFrequency: page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : page === 'introduction' ? 0.9 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/${page}`,
          en: `${baseUrl}/en/${page}`,
        },
      },
    })
  })

  return routes
}

