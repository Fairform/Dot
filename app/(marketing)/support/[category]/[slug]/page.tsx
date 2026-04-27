import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { buildMetadata } from '@/lib/seo/metadata'
import { getSupportCategory, getSupportCategories } from '@/lib/support/getSupportCategories'
import { getSupportArticle, getArticlesByCategory } from '@/lib/support/getSupportArticle'
import { getRelatedArticles } from '@/lib/support/getRelatedArticles'
import { buildSupportBreadcrumbs, breadcrumbsToJsonLd } from '@/lib/navigation/breadcrumbs'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import InlineAlert from '@/components/ui/InlineAlert'
import Icon from '@/components/ui/Icon'

interface Props { params: Promise<{ category: string; slug: string }> }

export async function generateStaticParams() {
  const cats = await getSupportCategories()
  const out: { category: string; slug: string }[] = []
  for (const cat of cats) {
    const articles = await getArticlesByCategory(cat.slug)
    for (const a of articles) out.push({ category: cat.slug, slug: a.slug })
  }
  return out
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getSupportArticle(category, slug)
  if (!article) return {}
  return buildMetadata({ title: article.title, description: article.description, path: `/support/${category}/${slug}` })
}

const MDX_COMPONENTS = { InlineAlert }

export default async function SupportArticlePage({ params }: Props) {
  const { category: catSlug, slug } = await params
  const [article, category] = await Promise.all([
    getSupportArticle(catSlug, slug),
    getSupportCategory(catSlug),
  ])
  if (!article || !category) notFound()

  const related     = await getRelatedArticles(article.relatedSlugs)
  const breadcrumbs = buildSupportBreadcrumbs(category.title, category.slug, article.title)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsToJsonLd(breadcrumbs)) }}
      />
      <div className="container-site px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="support-article-grid">

          {/* ── Main content ── */}
          <div>
            <header className="mb-8 pb-8 border-b border-dot-grey-200">
              <h1 className="text-2xl font-bold text-dot-black mb-3 text-balance leading-tight">
                {article.title}
              </h1>
              <p className="text-base text-dot-grey-500 leading-relaxed mb-3">
                {article.description}
              </p>
              <p className="text-xs text-dot-grey-400">
                Updated{' '}
                {new Date(article.updatedAt).toLocaleDateString('en-AU', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            </header>

            <div className="prose-dot">
              <MDXRemote source={article.content} components={MDX_COMPONENTS} />
            </div>

            <div className="mt-10 pt-8 border-t border-dot-grey-200">
              <Link
                href={`/support/${category.slug}`}
                className="text-sm text-dot-grey-500 hover:text-dot-black transition-colors
                           inline-flex items-center gap-1.5"
              >
                <Icon name="chevron-left" size={14} />
                Back to {category.title}
              </Link>
            </div>
          </div>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">

              {/* Related articles */}
              {related.length > 0 && (
                <div className="bg-dot-grey-100 rounded-2xl p-5">
                  <p className="text-[10px] font-bold tracking-widest text-dot-grey-400 uppercase mb-4">
                    Related articles
                  </p>
                  <ul className="space-y-3">
                    {related.map(a => (
                      <li key={a.slug}>
                        <Link
                          href={`/support/${a.category}/${a.slug}`}
                          className="text-sm font-medium text-dot-black hover:text-dot-blue
                                     transition-colors leading-snug block"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need help */}
              <div className="border border-dot-grey-200 rounded-2xl p-5 bg-white">
                <p className="text-sm font-semibold text-dot-black mb-1">Still need help?</p>
                <p className="text-xs text-dot-grey-500 leading-relaxed mb-4">
                  Our support team responds within one business day.
                </p>
                <a
                  href="mailto:support@dotmobile.com.au"
                  className="text-sm font-semibold text-dot-black inline-flex items-center gap-1.5
                             border-b border-dot-black pb-0.5 hover:opacity-60 transition-opacity"
                >
                  Email support
                  <Icon name="external" size={12} />
                </a>
              </div>

              {/* Category link */}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-dot-grey-400 uppercase mb-3">
                  Browse category
                </p>
                <Link
                  href={`/support/${category.slug}`}
                  className="text-sm text-dot-grey-600 hover:text-dot-black transition-colors
                             flex items-center gap-1.5"
                >
                  <Icon name="chevron-right" size={14} className="text-dot-grey-400" />
                  {category.title}
                </Link>
                <Link
                  href="/support"
                  className="text-sm text-dot-grey-600 hover:text-dot-black transition-colors
                             flex items-center gap-1.5 mt-2"
                >
                  <Icon name="chevron-right" size={14} className="text-dot-grey-400" />
                  All help topics
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile: related articles below */}
        {related.length > 0 && (
          <div className="lg:hidden mt-10">
            <p className="text-[10px] font-bold tracking-widest text-dot-grey-400 uppercase mb-4">
              Related articles
            </p>
            <div className="divide-y divide-dot-grey-100 border border-dot-grey-200 rounded-2xl overflow-hidden">
              {related.map(a => (
                <Link
                  key={a.slug}
                  href={`/support/${a.category}/${a.slug}`}
                  className="flex items-center justify-between px-5 py-4 bg-white
                             hover:bg-dot-grey-50 transition-colors group"
                >
                  <p className="text-sm font-medium text-dot-black group-hover:text-dot-blue
                                transition-colors">
                    {a.title}
                  </p>
                  <Icon name="chevron-right" size={14} className="text-dot-grey-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile: need help */}
        <div className="lg:hidden mt-8 border border-dot-grey-200 rounded-2xl p-6 bg-dot-grey-50">
          <p className="text-sm font-semibold text-dot-black mb-1">Still need help?</p>
          <p className="text-sm text-dot-grey-600 mb-4 leading-relaxed">
            Our support team responds within one business day.
          </p>
          <a
            href="mailto:support@dotmobile.com.au"
            className="text-sm font-semibold text-dot-black border-b border-dot-black pb-0.5
                       hover:opacity-60 transition-opacity inline-flex items-center gap-1.5"
          >
            Email support@dotmobile.com.au
          </a>
        </div>
      </div>
    </>
  )
}
