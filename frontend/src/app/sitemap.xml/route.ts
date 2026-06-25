import { NextResponse } from 'next/server'

const baseUrl = 'https://canhocaocapdanang.info'

function buildUrl(loc: string, alternates?: { vi?: string; en?: string }, lastmod?: string, changefreq?: string, priority?: string) {
  let xml = '  <url>\n'
  xml += `    <loc>${loc}</loc>\n`

  if (alternates) {
    if (alternates.vi) xml += `    <xhtml:link rel="alternate" hreflang="vi" href="${alternates.vi}" />\n`
    if (alternates.en) xml += `    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />\n`
  }

  if (lastmod) xml += `    <lastmod>${lastmod}</lastmod>\n`
  if (changefreq) xml += `    <changefreq>${changefreq}</changefreq>\n`
  if (priority) xml += `    <priority>${priority}</priority>\n`

  xml += '  </url>\n'
  return xml
}

export async function GET() {
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

  const currentDate = new Date().toISOString()
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`

  // Vietnamese pages
  pages.forEach((page) => {
    const url = `${baseUrl}/${page}`
    const changeFreq = page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly'
    const priority = page === '' ? '1.0' : page === 'introduction' ? '0.9' : '0.8'

    xml += buildUrl(
      url,
      {
        vi: url,
        en: `${baseUrl}/en/${page}`,
      },
      currentDate,
      changeFreq,
      priority
    )
  })

  // English pages
  pages.forEach((page) => {
    const url = `${baseUrl}/en/${page}`
    const changeFreq = page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly'
    const priority = page === '' ? '1.0' : page === 'introduction' ? '0.9' : '0.8'

    xml += buildUrl(
      url,
      {
        vi: `${baseUrl}/${page}`,
        en: url,
      },
      currentDate,
      changeFreq,
      priority
    )
  })

  // Project pages
  const projects = [
    { slug: 's-light-tower', priority: '0.9' },
    { slug: 'sun-fours-tower', priority: '0.85' },
    { slug: 'symphony5', priority: '0.85' },
    { slug: 'the-legend-danang', priority: '0.85' },
  ]

  projects.forEach(({ slug, priority }) => {
    const url = `${baseUrl}/projects/${slug}`
    xml += buildUrl(url, undefined, currentDate, 'weekly', priority)
  })

  xml += '</urlset>'

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
