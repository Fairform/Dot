import type { BreadcrumbItem } from '@/types/support'

export function buildSupportBreadcrumbs(
  categoryTitle: string,
  categorySlug: string,
  articleTitle?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Support', href: '/support' },
    { label: categoryTitle, href: articleTitle ? `/support/${categorySlug}` : undefined },
  ]
  if (articleTitle) items.push({ label: articleTitle })
  return items
}

export function buildLegalBreadcrumbs(documentTitle: string): BreadcrumbItem[] {
  return [{ label: 'Legal', href: '/legal' }, { label: documentTitle }]
}

export function breadcrumbsToJsonLd(items: BreadcrumbItem[], baseUrl = 'https://dotmobile.com.au') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }
}
