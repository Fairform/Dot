import type { Metadata } from 'next'
import Link from 'next/link'
import { PLANS } from '@/lib/plans/plansData'

export const metadata: Metadata = {
  title: 'Recharge | DOT Mobile',
  description: 'Recharge your DOT Mobile prepaid plan. Top up your account instantly.',
}

export default function RechargePage() {
  return (
    <>
      <section className="dark-mesh py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-white pointer-events-none opacity-[0.025]" />
        <div className="container-site relative z-10 max-w-2xl">
          <span className="label-tag">Account</span>
          <h1
            className="font-display text-white mb-4 text-balance"
            style={{ fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 2, lineHeight: 0.92 }}
          >
            TOP UP.<br />STAY ON.
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            Enter your number and choose a plan to recharge your DOT Mobile service instantly.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-section">
        <div className="container-site max-w-lg">

          <div className="bg-white border border-dot-grey-200 rounded-3xl p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.10)] ">
            <label className="block text-[10px] font-bold tracking-[1.5px] text-dot-grey-500 uppercase mb-3">
              Your DOT Mobile number
            </label>
            <div className="flex gap-3">
              <input
                type="tel"
                placeholder="04XX XXX XXX"
                className="input-field flex-1 text-base font-semibold"
              />
              <button className="btn-primary px-6 whitespace-nowrap">Look up</button>
            </div>
            <p className="text-[11px] text-dot-grey-400 mt-3">
              Check your activation email from hello@dotmobile.com.au if unsure.
            </p>
          </div>

          <p className="text-[10px] font-bold tracking-[1.5px] text-dot-grey-400 uppercase mb-4">Choose your recharge</p>

          <div className="space-y-3 mb-8">
            {PLANS.map(plan => (
              <Link
                key={plan.key}
                href={`/checkout?plan=${plan.key}&type=recharge`}
                className="flex items-center justify-between p-5 rounded-2xl bg-white border border-dot-grey-200 hover:border-dot-black hover:shadow-card-md transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-display tracking-[1.5px] text-dot-black group-hover:text-dot-blue transition-colors"
                      style={{ fontSize: 22 }}
                    >
                      {plan.name.toUpperCase()}
                    </span>
                    {plan.featured && (
                      <span className="text-[9px] font-bold tracking-wider bg-dot-black text-white px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-dot-grey-500">{plan.data} · {plan.speed} · 30 days prepaid</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-dot-black">${plan.price}</p>
                  <p className="text-[10px] text-dot-grey-400">incl. GST</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-xs text-dot-grey-400 text-center">
            No account yet?{' '}
            <Link href="/plans" className="text-dot-blue hover:opacity-75">Get connected →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
