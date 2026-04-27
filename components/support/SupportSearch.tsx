'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchIndexItem } from '@/types/support'

interface SupportSearchProps {
  variant?: 'hero' | 'compact'
  placeholder?: string
}

export default function SupportSearch({ variant = 'hero', placeholder = 'Search for help…' }: SupportSearchProps) {
  const [query, setQuery]           = useState('')
  const [results, setResults]       = useState<SearchIndexItem[]>([])
  const [index, setIndex]           = useState<SearchIndexItem[]>([])
  const [focused, setFocused]       = useState(false)
  const [activeIdx, setActiveIdx]   = useState(-1)
  const inputRef    = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/support-index.json').then(r => r.json()).then(setIndex).catch(() => {})
  }, [])

  const search = useCallback((q: string) => {
    if (!q.trim() || q.length < 2) { setResults([]); return }
    const lower = q.toLowerCase()
    const scored = index
      .map(item => {
        let score = 0
        if (item.title.toLowerCase().includes(lower))       score += 3
        if (item.description.toLowerCase().includes(lower)) score += 2
        if (item.tags.some(t => t.toLowerCase().includes(lower))) score += 1
        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ item }) => item)
    setResults(scored)
    setActiveIdx(-1)
  }, [index])

  useEffect(() => { search(query) }, [query, search])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setFocused(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navigate = (url: string) => {
    router.push(url)
    setQuery('')
    setResults([])
    setFocused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const target = activeIdx >= 0 ? results[activeIdx] : results[0]
      if (target) navigate(target.url)
    } else if (e.key === 'Escape') setFocused(false)
  }

  const showResults = focused && results.length > 0
  const isHero = variant === 'hero'

  return (
    <div ref={containerRef} className={`relative ${isHero ? 'max-w-xl mx-auto' : 'max-w-sm'}`}>
      <div className={`relative flex items-center gap-3 bg-white rounded-xl border transition-shadow duration-200 ${focused ? 'border-dot-black shadow-card-md' : 'border-dot-grey-200 shadow-card'} ${isHero ? 'px-4 py-3.5' : 'px-3 py-2.5'}`}>
        <svg className="w-4 h-4 text-dot-grey-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search help articles"
          aria-expanded={showResults}
          autoComplete="off"
          spellCheck={false}
          className={`flex-1 bg-transparent outline-none text-dot-black placeholder:text-dot-grey-400 ${isHero ? 'text-sm' : 'text-xs'}`}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }} className="text-dot-grey-400 hover:text-dot-black transition-colors" aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        )}
      </div>

      {showResults && (
        <div role="listbox" className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-dot-grey-200 shadow-card-lg overflow-hidden z-50">
          {results.map((result, i) => (
            <button
              key={result.url}
              role="option"
              aria-selected={i === activeIdx}
              onClick={() => navigate(result.url)}
              className={`w-full text-left px-4 py-3 flex flex-col gap-0.5 transition-colors duration-100 ${i === activeIdx ? 'bg-dot-grey-50' : 'hover:bg-dot-grey-50'} ${i > 0 ? 'border-t border-dot-grey-100' : ''}`}
            >
              <p className="text-sm font-medium text-dot-black line-clamp-1">{result.title}</p>
              <p className="text-xs text-dot-grey-400">{result.categoryTitle}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
