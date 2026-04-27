import Link from 'next/link'
import type { SupportArticleMeta } from '@/types/support'

export default function RelatedArticles({ articles }: { articles: SupportArticleMeta[] }) {
  if (!articles.length) return null
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-dot-grey-500 uppercase tracking-wide mb-4">Related articles</h2>
      <div className="divide-y divide-dot-grey-100 border border-dot-grey-200 rounded-xl overflow-hidden">
        {articles.map(article => (
          <Link
            key={article.slug}
            href={`/support/${article.category}/${article.slug}`}
            className="flex items-center justify-between px-5 py-4 bg-white hover:bg-dot-grey-50 transition-colors duration-150 group"
          >
            <div>
              <p className="text-sm font-medium text-dot-black group-hover:text-dot-blue transition-colors duration-150">{article.title}</p>
              <p className="text-xs text-dot-grey-400 mt-0.5 line-clamp-1">{article.description}</p>
            </div>
            <svg className="w-4 h-4 text-dot-grey-300 flex-shrink-0 ml-4 group-hover:text-dot-black transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
