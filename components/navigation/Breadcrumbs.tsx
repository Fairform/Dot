import Link from 'next/link'
import type { BreadcrumbItem } from '@/types/support'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-dot-grey-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-dot-grey-300 select-none">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-dot-black transition-colors duration-150 truncate max-w-[180px]">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-dot-black font-medium truncate max-w-[200px]' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
