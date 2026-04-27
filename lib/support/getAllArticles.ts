import { SUPPORT_CATEGORIES } from '@/content/support/_index'
import { getArticlesByCategory } from './getSupportArticle'
import type { SupportArticleMeta } from '@/types/support'

export async function getAllArticles(): Promise<SupportArticleMeta[]> {
  const all: SupportArticleMeta[] = []
  for (const cat of SUPPORT_CATEGORIES) {
    const articles = await getArticlesByCategory(cat.slug)
    all.push(...articles)
  }
  return all
}

export async function getFeaturedArticles(): Promise<SupportArticleMeta[]> {
  const all = await getAllArticles()
  return all.filter(a => a.featured)
}
