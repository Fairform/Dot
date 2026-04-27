import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/account/', '/login', '/api/'],
    },
    sitemap: 'https://dotmobile.com.au/sitemap.xml',
  }
}
