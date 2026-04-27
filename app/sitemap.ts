import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/support/getAllArticles'
import { getSupportCategories } from '@/lib/support/getSupportCategories'

const BASE = 'https://dotmobile.com.au'

const STATIC: [string, number][] = [
  ['/', 1.0],
  ['/plans', 0.9],
  ['/plans/starter', 0.8],
  ['/plans/core', 0.8],
  ['/plans/unlimited', 0.8],
  ['/plans/ultra', 0.8],
  ['/coverage', 0.8],
  ['/about', 0.6],
  ['/support', 0.9],
  ['/legal', 0.5],
  ['/legal/privacy', 0.5],
  ['/legal/terms', 0.5],
  ['/legal/cis', 0.5],
  ['/legal/cis/starter', 0.4],
  ['/legal/cis/core', 0.4],
  ['/legal/cis/unlimited', 0.4],
  ['/legal/cis/ultra', 0.4],
  ['/legal/complaints', 0.5],
  ['/legal/fair-use', 0.5],
  ['/legal/hardship', 0.5],
  ['/legal/direct-debit', 0.4],
  ['/legal/whistleblower', 0.4],
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getSupportCategories(),
  ])

  return [
    ...STATIC.map(([path, priority]) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...categories.map(cat => ({
      url: `${BASE}/support/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...articles.map(a => ({
      url: `${BASE}/support/${a.category}/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
