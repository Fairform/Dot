import fs from 'fs'
import path from 'path'
import type { SupportArticle, SupportArticleMeta } from '@/types/support'

type CategoryLoader = () => Promise<{ ARTICLES: SupportArticleMeta[] }>

const LOADERS: Record<string, CategoryLoader> = {
  'more-about-dot-mobile':                () => import('@/content/support/more-about-dot-mobile/_category'),
  'sign-up-and-activation':               () => import('@/content/support/sign-up-and-activation/_category'),
  'esim-and-devices':                     () => import('@/content/support/esim-and-devices/_category'),
  'plans-billing-and-payments':           () => import('@/content/support/plans-billing-and-payments/_category'),
  'network-coverage-and-speeds':          () => import('@/content/support/network-coverage-and-speeds/_category'),
  'troubleshooting-and-service-recovery': () => import('@/content/support/troubleshooting-and-service-recovery/_category'),
  'security-fraud-and-scam-protection':   () => import('@/content/support/security-fraud-and-scam-protection/_category'),
  'international-roaming-and-add-ons':    () => import('@/content/support/international-roaming-and-add-ons/_category'),
  'legal-privacy-and-compliance':         () => import('@/content/support/legal-privacy-and-compliance/_category'),
}

export async function getArticlesByCategory(category: string): Promise<SupportArticleMeta[]> {
  const loader = LOADERS[category]
  if (!loader) return []
  try {
    const mod = await loader()
    return (mod.ARTICLES ?? []).sort((a, b) => a.order - b.order)
  } catch {
    return []
  }
}

export async function getSupportArticle(
  category: string,
  slug: string
): Promise<SupportArticle | null> {
  const articles = await getArticlesByCategory(category)
  const meta     = articles.find(a => a.slug === slug)

  // Genuinely unknown slug — correct 404
  if (!meta) return null

  const mdxPath = path.join(
    process.cwd(),
    'content',
    'support',
    category,
    `${slug}.mdx`
  )

  // MDX file exists — use it
  if (fs.existsSync(mdxPath)) {
    const content = fs.readFileSync(mdxPath, 'utf-8')
    return { ...meta, content }
  }

  // Article is in metadata but MDX not yet written — return fallback, never 404
  return {
    ...meta,
    content: `${meta.description}\n\nThis article is being finalised. For immediate help contact [support@dotmobile.com.au](mailto:support@dotmobile.com.au).`,
  }
}
