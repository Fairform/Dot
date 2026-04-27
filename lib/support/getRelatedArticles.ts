import { getAllArticles } from './getAllArticles'
import type { SupportArticleMeta } from '@/types/support'

export async function getRelatedArticles(slugs: string[]): Promise<SupportArticleMeta[]> {
  const all = await getAllArticles()
  const set = new Set(slugs)
  return all.filter(a => set.has(a.slug)).slice(0, 4)
}
