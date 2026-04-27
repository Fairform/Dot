'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, NAV_ACTION_ITEMS } from '@/lib/navigation/navConfig'

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <div onClick={onClose} aria-hidden
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 flex flex-col bg-white border-l border-dot-grey-200 transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-dot-grey-100">
          <Link href="/" onClick={onClose} className="font-semibold text-dot-black">DOT Mobile</Link>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-dot-grey-100 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${pathname.startsWith(item.href) ? 'bg-dot-grey-100 text-dot-black font-medium' : 'text-dot-grey-500 hover:bg-dot-grey-100 hover:text-dot-black'}`}>
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-dot-grey-100">
            {NAV_ACTION_ITEMS.map(item => (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="block px-4 py-2.5 rounded-xl text-sm text-dot-grey-500 hover:bg-dot-grey-100 hover:text-dot-black transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="px-4 pb-8 pt-3 border-t border-dot-grey-100">
          <Link href="/plans" onClick={onClose} className="btn-primary w-full justify-center py-3">Get Connected</Link>
        </div>
      </div>
    </>
  )
}
