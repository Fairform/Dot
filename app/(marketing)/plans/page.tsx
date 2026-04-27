import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { PLANS } from '@/lib/plans/plansData'

export const metadata: Metadata = buildMetadata({
  title: 'Plans',
  description: 'Prepaid eSIM mobile plans from $35. No contracts.',
  path: '/plans',
})

const PLAN_COLORS: Record<string, string> = {
  starter:   '#F7F6F3',
  core:      '#EAE8F7',
  unlimited: '#E3EDF7',
  ultra:     '#111111',
}

export default function PlansPage() {
  return (
    <>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-white border-b border-dot-grey-200">
        <div className="max-w-lg mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-4">Pricing</p>
          <h1 className="font-serif text-dot-black mb-4"
            style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Simple plans.
          </h1>
          <p className="text-base text-dot-grey-500">Prepaid · 30 days · Recharge anytime</p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-site max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PLANS.map(plan => {
              const dark = plan.dark
              const featured = plan.featured && !dark
              const bg = PLAN_COLORS[plan.key] || '#F7F6F3'

              return (
                <div key={plan.key}
                  className={`rounded-3xl p-8 relative overflow-hidden ${featured ? 'ring-2 ring-dot-black' : ''}`}
                  style={{ background: bg }}>
                  {featured && (
                    <span className="absolute top-6 right-6 text-xs font-medium bg-dot-black text-white px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  )}

                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${dark ? 'text-white/40' : 'text-dot-grey-400'}`}>
                    Prepaid · 30 days
                  </p>
                  <p className={`text-2xl font-semibold mb-1 ${dark ? 'text-white' : 'text-dot-black'}`}>{plan.name}</p>
                  <p className={`text-sm mb-8 ${dark ? 'text-white/50' : 'text-dot-grey-500'}`}>{plan.data}</p>

                  <div className="flex items-end gap-1 mb-8">
                    <span className={`font-semibold leading-none ${dark ? 'text-white' : 'text-dot-black'}`}
                      style={{ fontSize: 52, letterSpacing: '-0.03em' }}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm mb-2 ${dark ? 'text-white/40' : 'text-dot-grey-400'}`}>/mo</span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {plan.inclusions.slice(0, 4).map((item, i) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${dark ? 'text-white/60' : 'text-dot-grey-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? 'bg-white/40' : 'bg-dot-grey-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/checkout?plan=${plan.key}`}
                    className={`block text-center text-sm font-medium py-3.5 rounded-full transition-opacity hover:opacity-80 ${
                      dark ? 'bg-white text-dot-black' : 'bg-dot-black text-white'
                    }`}>
                    Recharge ${plan.price}
                  </Link>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-dot-grey-400 text-center mt-6">All prices include GST. No exit fees. No contracts.</p>
        </div>
      </section>

      {/* Included in all */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-dot-grey-200">
        <div className="container-site max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-8">Every plan includes</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Unlimited calls & SMS',
              'Mobile hotspot',
              'eSIM activation',
              'Keep your number',
              'No contracts',
              'Voicemail',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-dot-grey-600 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-dot-grey-300 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
