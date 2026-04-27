import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { getSupportCategory, getSupportCategories } from '@/lib/support/getSupportCategories'
import { getArticlesByCategory } from '@/lib/support/getSupportArticle'
import { buildSupportBreadcrumbs, breadcrumbsToJsonLd } from '@/lib/navigation/breadcrumbs'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import SupportArticleRow from '@/components/support/SupportArticleRow'
import NeedHelpCallout from '@/components/support/NeedHelpCallout'

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const cats = await getSupportCategories()
  return cats.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const cat = await getSupportCategory(slug)
  if (!cat) return {}
  return buildMetadata({
    title: `${cat.title} — Help Centre`,
    description: cat.description,
    path: `/support/${cat.slug}`,
  })
}

export default async function SupportCategoryPage({ params }: Props) {
  const { category: slug } = await params
  const [category, articles] = await Promise.all([
    getSupportCategory(slug),
    getArticlesByCategory(slug),
  ])
  if (!category) notFound()

  const breadcrumbs = buildSupportBreadcrumbs(category.title, category.slug)
  const featured    = articles.filter(a => category.featuredArticleSlugs.includes(a.slug))
  const rest        = articles.filter(a => !category.featuredArticleSlugs.includes(a.slug))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsToJsonLd(breadcrumbs)) }}
      />
      <div className="container-site px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(28px,4vw,44px)] tracking-[2px] text-dot-black mb-3 text-balance">
            {category.title.toUpperCase()}
          </h1>
          <p className="text-base text-dot-grey-500 mb-10 leading-relaxed">{category.description}</p>

          {featured.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[1.5px] text-dot-grey-400 uppercase mb-3">Start here</p>
              <div className="divide-y divide-dot-grey-100 border border-dot-grey-200 rounded-2xl overflow-hidden">
                {featured.map(a => <SupportArticleRow key={a.slug} article={a} featured />)}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div className="mb-12">
              <p className="text-[10px] font-bold tracking-[1.5px] text-dot-grey-400 uppercase mb-3">All articles</p>
              <div className="divide-y divide-dot-grey-100 border border-dot-grey-200 rounded-2xl overflow-hidden">
                {rest.map(a => <SupportArticleRow key={a.slug} article={a} />)}
              </div>
            </div>
          )}

          <Link
            href="/support"
            className="text-sm text-dot-grey-500 hover:text-dot-black transition-colors inline-flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 2L3 7l5 5" />
            </svg>
            Back to Help Centre
          </Link>
          <NeedHelpCallout />
        </div>
      </div>
    </>
  )
}
