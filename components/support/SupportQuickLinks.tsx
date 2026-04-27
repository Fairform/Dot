import Link from 'next/link'
import type { QuickLink } from '@/types/support'

export default function SupportQuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hidden -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-dot-grey-700 bg-dot-grey-100 hover:bg-dot-grey-200 px-3.5 py-2 rounded-full transition-colors duration-150 whitespace-nowrap"
        >
          {link.label}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M2 5h6M5 2l3 3-3 3" />
          </svg>
        </Link>
      ))}
    </div>
  )
}
