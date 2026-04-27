import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Activate eSIM | DOT Mobile',
  description: 'Activate your DOT Mobile eSIM. Enter your email or code to get your QR code instantly.',
}

export default function ActivatePage() {
  return (
    <>
      <section className="dark-mesh py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-white pointer-events-none opacity-[0.025]" />
        <div className="container-site relative z-10 max-w-2xl">
          <span className="label-tag">Activation</span>
          <h1
            className="font-display text-white mb-4 text-balance"
            style={{ fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 2, lineHeight: 0.92 }}
          >
            ACTIVATE.<br />GO LIVE.
          </h1>
          <p className="text-base text-white/50 leading-relaxed">
            Already purchased a plan? Get your eSIM QR code sent to your email in under 60 seconds.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-section">
        <div className="container-site max-w-lg">

          <div className="bg-white border border-dot-grey-200 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.10)]  mb-8">
            <h2
              className="font-display text-dot-black mb-6"
              style={{ fontSize: 28, letterSpacing: 1.5 }}
            >
              RESEND YOUR QR CODE
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold tracking-[1.5px] text-dot-grey-500 uppercase mb-2">
                  Email used at checkout
                </label>
                <input type="email" placeholder="you@email.com" className="input-field" />
              </div>
              <button className="btn-primary w-full justify-center py-3.5 text-sm">
                Send my QR code →
              </button>
            </div>

            <div className="pt-6 border-t border-dot-grey-200">
              <p className="text-[11px] text-dot-grey-400 text-center mb-4">
                Or enter your activation code directly
              </p>
              <div className="flex gap-3">
                <input
                  placeholder="XXXX-XXXX-XXXX"
                  className="input-field flex-1 font-mono tracking-widest text-center text-base"
                />
                <button className="btn-primary px-5 whitespace-nowrap">Activate</button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { n: '01', title: 'Enter email',  desc: 'The one used to sign up' },
              { n: '02', title: 'Check inbox',  desc: 'QR code in 60 seconds' },
              { n: '03', title: 'Scan & live',  desc: 'Settings → Mobile Data' },
            ].map(s => (
              <div key={s.n} className="bg-white border border-dot-grey-200 rounded-2xl p-4 text-center ">
                <p
                  className="font-display text-dot-grey-300 leading-none mb-2"
                  style={{ fontSize: 28 }}
                >
                  {s.n}
                </p>
                <p className="text-xs font-bold text-dot-black mb-1">{s.title}</p>
                <p className="text-[10px] text-dot-grey-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-dot-grey-400 text-center">
            Haven&apos;t purchased yet?{' '}
            <Link href="/plans" className="text-dot-blue hover:opacity-75">View plans →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
