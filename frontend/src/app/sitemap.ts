import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://canhocaocapdanang.info'
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

  // Project landing pages (VI only, high priority — ads targets)
  const projectSlugs: { slug: string; priority: number }[] = [
    { slug: "s-light-tower", priority: 0.9 },
    { slug: "sun-fours-tower", priority: 0.85 },
    { slug: "symphony5", priority: 0.85 },
    { slug: "the-legend-danang", priority: 0.85 },
  ];

  projectSlugs.forEach(({ slug, priority }) => {
    routes.push({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority,
    });
  });

  return routes;
}

