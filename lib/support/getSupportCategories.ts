import { SUPPORT_CATEGORIES } from '@/content/support/_index'
import type { SupportCategory } from '@/types/support'

export async function getSupportCategories(): Promise<SupportCategory[]> {
  return SUPPORT_CATEGORIES.sort((a, b) => a.order - b.order)
}

export async function getSupportCategory(slug: string): Promise<SupportCategory | null> {
  return SUPPORT_CATEGORIES.find(c => c.slug === slug) ?? null
}
