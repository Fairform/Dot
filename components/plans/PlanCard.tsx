import Link from 'next/link'
import type { PlanDefinition } from '@/types/plans'
import Icon from '@/components/ui/Icon'

export default function PlanCard({ plan, variant = 'full' }: { plan: PlanDefinition; variant?: 'teaser'|'full' }) {
  const dark     = plan.dark
  const featured = plan.featured && !dark
  const isTeaser = variant === 'teaser'

  return (
    <div
      className={`relative flex flex-col rounded-xl overflow-hidden transition-all duration-150 ${
        !dark && !featured ? 'bg-white border border-dot-grey-200 shadow-card hover:shadow-card-md hover:-translate-y-0.5' : ''
      }`}
      style={dark
        ? { background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 4px 24px rgba(0,0,0,0.40)' }
        : featured
        ? { background: '#FFFFFF', border: '2px solid #0A0A0A', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
        : undefined}
    >
      {featured && <div className="h-0.5 bg-dot-black" />}

      <div className="p-6 flex flex-col flex-1">

        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: dark ? 'rgba(255,255,255,0.28)' : '#A3A3A3' }}>
            Prepaid · 30 days
          </p>
          {featured && (
            <span className="bg-dot-grey-100 text-dot-grey-500 px-2.5 py-1 rounded-md text-xs font-semibold">
              Most popular
            </span>
          )}
          {dark && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{ color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.12)' }}>
              Priority 5G
            </span>
          )}
        </div>

        <h3 className="font-display leading-none mb-2"
          style={{ fontSize: 26, letterSpacing: 1, color: dark ? '#FFFFFF' : '#0A0A0A' }}>
          {plan.name.toUpperCase()}
        </h3>

        <p className="text-sm mb-5" style={{ color: dark ? 'rgba(255,255,255,0.42)' : '#737373' }}>
          {plan.data}
        </p>

        <div className="flex items-end gap-1 mb-1">
          <span className="font-black tracking-tight leading-none"
            style={{ fontSize: 44, color: dark ? '#FFFFFF' : '#0A0A0A' }}>
            ${plan.price}
          </span>
          <span className="text-sm mb-1.5" style={{ color: dark ? 'rgba(255,255,255,0.28)' : '#A3A3A3' }}>/mo</span>
        </div>
        <p className="text-sm mb-6" style={{ color: dark ? 'rgba(255,255,255,0.20)' : '#A3A3A3' }}>
          Recharge anytime
        </p>

        {!isTeaser && (
          <ul className="space-y-2 mb-6 flex-1">
            {plan.inclusions.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm"
                style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#525252' }}>
                <Icon name="check" size={14} className="flex-shrink-0 mt-0.5"
                  style={{ color: dark ? 'rgba(255,255,255,0.35)' : '#A3A3A3' } as React.CSSProperties} />
                {item}
              </li>
            ))}
          </ul>
        )}

        {isTeaser && <div className="flex-1 min-h-[4px]" />}

        <Link href={`/checkout?plan=${plan.key}`}
          className={`block text-center text-sm font-semibold py-3 rounded-lg mt-4
            transition-colors duration-150 active:scale-[0.98] ${
            dark    ? 'bg-white text-dot-black hover:bg-dot-grey-100'
            : featured ? 'bg-dot-black text-white hover:bg-dot-charcoal'
            : 'bg-dot-grey-100 text-dot-black hover:bg-dot-grey-200'
          }`}>
          Recharge ${plan.price}
        </Link>
      </div>
    </div>
  )
}
