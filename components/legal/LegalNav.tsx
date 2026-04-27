'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LEGAL_PAGES = [
  { label: 'Legal overview',         href: '/legal' },
  { label: 'Privacy Policy',         href: '/legal/privacy' },
  { label: 'Terms of Service',       href: '/legal/terms' },
  { label: 'Critical Info Summary',  href: '/legal/cis' },
  { label: 'Complaints Policy',      href: '/legal/complaints' },
  { label: 'Fair Use Policy',        href: '/legal/fair-use' },
  { label: 'Financial Hardship',     href: '/legal/hardship' },
  { label: 'Direct Debit',           href: '/legal/direct-debit' },
  { label: 'Whistleblower Policy',   href: '/legal/whistleblower' },
]

export default function LegalNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Legal documents">
      <p className="text-[10px] font-bold tracking-[0.9px] text-dot-grey-400 uppercase mb-4">Legal documents</p>
      <ul className="space-y-1">
        {LEGAL_PAGES.map(page => {
          const active = pathname === page.href
          return (
            <li key={page.href}>
              <Link
                href={page.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${active ? 'bg-dot-grey-100 text-dot-black font-medium' : 'text-dot-grey-600 hover:text-dot-black hover:bg-dot-grey-50'}`}
              >
                {page.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
