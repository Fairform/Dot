import Link from 'next/link'
import type { SupportArticleMeta } from '@/types/support'

interface Props {
  article: SupportArticleMeta
  featured?: boolean
}

export default function SupportArticleRow({ article, featured = false }: Props) {
  return (
    <Link
      href={`/support/${article.category}/${article.slug}`}
      className="flex items-center justify-between px-5 py-4 bg-white hover:bg-dot-grey-50 transition-colors duration-150 group"
    >
      <div className="flex-1 min-w-0 pr-4">
        <p className={`text-sm text-dot-black group-hover:text-dot-blue transition-colors duration-150 ${featured ? 'font-semibold' : 'font-medium'}`}>
          {article.title}
        </p>
        <p className="text-xs text-dot-grey-400 mt-0.5 line-clamp-1 leading-relaxed">{article.description}</p>
      </div>
      <svg className="w-4 h-4 text-dot-grey-300 flex-shrink-0 group-hover:text-dot-black transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 3l5 5-5 5" />
      </svg>
    </Link>
  )
}
