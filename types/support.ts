export interface SupportCategory {
  slug: string
  title: string
  description: string
  shortDescription: string
  icon: string
  order: number
  featuredArticleSlugs: string[]
  relatedCategorySlugs: string[]
}

export interface SupportArticleMeta {
  slug: string
  category: string
  title: string
  description: string
  relatedSlugs: string[]
  featured: boolean
  order: number
  updatedAt: string
  tags: string[]
}

export interface SupportArticle extends SupportArticleMeta {
  content: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface QuickLink {
  label: string
  href: string
  description?: string
}

export interface SearchIndexItem {
  slug: string
  category: string
  categoryTitle: string
  title: string
  description: string
  url: string
  tags: string[]
}

export interface FAQItem {
  question: string
  answer: string
}
