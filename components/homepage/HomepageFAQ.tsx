'use client'

import { useState } from 'react'
import type { FAQItem } from '@/types/support'
import Icon from '@/components/ui/Icon'

export default function HomepageFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-dot-grey-150 border-t border-b border-dot-grey-150">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4 group"
            aria-expanded={open === i}
          >
            <span className="text-base font-medium text-dot-black group-hover:text-dot-accent
                             transition-colors duration-150">
              {item.question}
            </span>
            <div className={`flex-shrink-0 text-dot-grey-400 transition-transform duration-200 ${
              open === i ? 'rotate-90' : ''
            }`}>
              <Icon name="chevron-right" size={16} />
            </div>
          </button>

          <div className={`overflow-hidden transition-all duration-200 ${
            open === i ? 'max-h-96 pb-5' : 'max-h-0'
          }`}>
            <p className="text-base text-dot-grey-500 leading-relaxed pr-6">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
