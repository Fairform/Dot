'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, NAV_ACTION_ITEMS } from '@/lib/navigation/navConfig'
import MobileMenu from '@/components/navigation/MobileMenu'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header className={`sticky top-0 z-40 w-full nav-glass transition-shadow duration-150 ${scrolled ? 'shadow-card' : ''}`}>
        <div className="container-site flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="text-dot-black font-semibold text-base tracking-tight">
            DOT Mobile
          </Link>

          {/* Browse nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-150 ${
                  isActive(item.href)
                    ? 'bg-dot-grey-200 text-dot-black font-medium'
                    : 'text-dot-grey-500 hover:text-dot-black hover:bg-dot-grey-100'
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ACTION_ITEMS.map(item => (
              <Link key={item.href} href={item.href}
                className="px-4 py-2 text-sm text-dot-grey-500 hover:text-dot-black hover:bg-dot-grey-100 rounded-full transition-colors duration-150">
                {item.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-dot-grey-200 mx-2" />
            <Link href="/plans" className="btn-primary px-5 py-2.5 text-sm">Get Connected</Link>
          </div>

          {/* Mobile */}
          <button onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-dot-grey-100 transition-colors"
            aria-label="Open menu">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="1" x2="18" y2="1" />
              <line x1="0" y1="6" x2="18" y2="6" />
              <line x1="0" y1="11" x2="12" y2="11" />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
