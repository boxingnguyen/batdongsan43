// [DEPRECATED] Replaced by Next.js native sitemap.ts (app/sitemap.ts -> /sitemap.xml)
// Kept for reference only. Do not activate this file alongside sitemap.ts.
export {};

// import { NextResponse } from 'next/server'

// const baseUrl = 'https://canhocaocapdanang.info'

// export async function GET() {
//   const pages = [
//     '',
//     'introduction',
//     'apartment',
//     'facility',
//     'connection',
//     'partners',
//     'news',
//     'gallery',
//     'contact-us',
//   ]

//   const currentDate = new Date().toISOString()

//   // Build XML string with proper formatting
//   let xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
// `

//   // Vietnamese pages
//   pages.forEach((page) => {
//     const url = `${baseUrl}/${page}`
//     const changeFreq = page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly'
//     const priority = page === '' ? '1.0' : page === 'introduction' ? '0.9' : '0.8'

//     xml += `  <url>
//     <loc>${url}</loc>
//     <xhtml:link rel="alternate" hreflang="vi" href="${url}" />
//     <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${page}" />
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>${changeFreq}</changefreq>
//     <priority>${priority}</priority>
//   </url>
// `
//   })

//   // English pages
//   pages.forEach((page) => {
//     const url = `${baseUrl}/en/${page}`
//     const changeFreq = page === 'news' ? 'daily' : page === '' ? 'weekly' : 'monthly'
//     const priority = page === '' ? '1.0' : page === 'introduction' ? '0.9' : '0.8'

//     xml += `  <url>
//     <loc>${url}</loc>
//     <xhtml:link rel="alternate" hreflang="vi" href="${baseUrl}/${page}" />
//     <xhtml:link rel="alternate" hreflang="en" href="${url}" />
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>${changeFreq}</changefreq>
//     <priority>${priority}</priority>
//   </url>
// `
//   })

//   // Project pages
//   const projects = [
//     { slug: 's-light-tower', priority: '0.9' },
//     { slug: 'sun-fours-tower', priority: '0.85' },
//     { slug: 'symphony5', priority: '0.85' },
//     { slug: 'the-legend-danang', priority: '0.85' },
//   ]

//   projects.forEach(({ slug, priority }) => {
//     const url = `${baseUrl}/projects/${slug}`
//     xml += `  <url>
//     <loc>${url}</loc>
//     <lastmod>${currentDate}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>${priority}</priority>
//   </url>
// `
//   })

//   xml += '</urlset>'

//   return new NextResponse(xml, {
//     headers: {
//       'Content-Type': 'application/xml; charset=utf-8',
//       'Cache-Control': 'no-cache, no-store, must-revalidate',
//     },
//   })
// }
