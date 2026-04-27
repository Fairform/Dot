import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About DOT Mobile',
  description: 'DOT Mobile is an Australian eSIM-only mobile carrier built for a digital-first generation.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <section className="bg-dot-black py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container-site max-w-2xl">
          <p className="text-[11px] font-bold tracking-[2px] text-white/40 uppercase mb-4">About</p>
          <h1 className="text-4xl font-black text-white tracking-tight mb-5 text-balance">
            Built for the way you actually use your phone.
          </h1>
          <p className="text-sm text-white/55 leading-relaxed">
            DOT Mobile is an Australian eSIM-only mobile carrier. No stores. No plastic SIM cards. No lock-in contracts.
            Just clean plans, fast activation, and a network that covers most of the country.
          </p>
        </div>
      </section>

      <section className="section border-b border-dot-grey-200">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h2 className="text-2xl font-black text-dot-black mb-6 text-balance">Why we exist.</h2>
          <div className="prose-dot">
            <p>
              Mobile carriers in Australia have spent decades building stores, printing SIM cards, and running advertisements.
              You pay for all of it — in your monthly bill.
            </p>
            <p>
              DOT Mobile does none of that. Our entire operation is digital. You choose a plan online, verify your identity,
              pay, and receive an eSIM QR code in your email. Scan it. Done. The whole thing takes about three minutes.
            </p>
            <p>
              We run on the Telstra wholesale mobile network — the same infrastructure that covers 98.5% of the Australian
              population. The difference is we are not Telstra. We have lower costs, and we pass them on to you.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-b border-dot-grey-200">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-dot-black mb-10 text-balance">What we believe.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Simplicity is the product', desc: 'Four plans. Clear pricing. No add-ons you did not ask for. No fine print designed to confuse you.' },
              { title: 'Digital-first is faster', desc: 'Activate in minutes, not days. No waiting for a SIM card in the mail. No trips to a store.' },
              { title: 'Your data is yours', desc: 'We collect what we need to deliver your service. We do not sell it. We do not share it except to operate your account.' },
            ].map(item => (
              <div key={item.title} className="p-6 bg-dot-grey-50 rounded-2xl border border-dot-grey-200">
                <p className="text-base font-bold text-dot-black mb-3">{item.title}</p>
                <p className="text-sm text-dot-grey-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-b border-dot-grey-200">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-dot-black mb-8 text-balance">Key facts.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Plans',            value: '4' },
              { label: 'Contracts',        value: '0' },
              { label: 'Physical stores',  value: '0' },
              { label: 'Activation time',  value: '< 5 min' },
            ].map(s => (
              <div key={s.label} className="text-center p-6 bg-dot-grey-50 rounded-2xl border border-dot-grey-200">
                <p className="text-3xl font-black text-dot-black mb-1">{s.value}</p>
                <p className="text-xs text-dot-grey-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
          <h2 className="text-2xl font-black text-dot-black mb-3 text-balance">Ready to switch?</h2>
          <p className="text-sm text-dot-grey-500 mb-8 leading-relaxed">Takes under 3 minutes. No contracts. Cancel anytime.</p>
          <Link href="/plans" className="btn-primary">See plans →</Link>
        </div>
      </section>
    </>
  )
}
