import Link from 'next/link'
import type { SupportCategory } from '@/types/support'
import Icon, { type IconName } from '@/components/ui/Icon'

export default function SupportCategoryCard({ category }: { category: SupportCategory }) {
  return (
    <Link
      href={`/support/${category.slug}`}
      className="group flex items-start gap-4 p-6 bg-white rounded-xl
                 border border-dot-grey-150 shadow-sm
                 hover:border-dot-grey-300 hover:shadow-md
                 transition-all duration-150"
    >
      <div className="w-10 h-10 rounded-lg bg-dot-grey-100 flex items-center justify-center
                      flex-shrink-0 text-dot-grey-500
                      group-hover:bg-dot-black group-hover:text-white transition-all duration-150">
        <Icon name={category.icon as IconName} size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-dot-black mb-1 leading-snug
                      group-hover:text-dot-accent transition-colors duration-150">
          {category.title}
        </p>
        <p className="text-sm text-dot-grey-500 leading-relaxed line-clamp-2">
          {category.shortDescription}
        </p>
      </div>

      <Icon name="chevron-right" size={15}
        className="text-dot-grey-300 flex-shrink-0 mt-0.5
                   group-hover:text-dot-black transition-colors duration-150" />
    </Link>
  )
}
