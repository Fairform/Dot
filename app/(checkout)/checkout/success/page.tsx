'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getPlan } from '@/lib/plans/plansData'
import type { PlanDefinition } from '@/types/plans'

type Status = 'loading' | 'active' | 'processing' | 'failed'

export default function CheckoutSuccessPage() {
  const params   = useSearchParams()
  const sessionId = params.get('session_id') ?? ''
  const planKey   = params.get('plan') ?? 'core'
  const plan: PlanDefinition = getPlan(planKey)

  const [status, setStatus] = useState<Status>('loading')
  const [qrUrl, setQrUrl]   = useState<string | null>(null)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (!sessionId) { setStatus('active'); return }
    let attempts = 0
    const poll = async () => {
      try {
        const res = await fetch(`/api/order/${sessionId}`)
        if (!res.ok) throw new Error()
        const d = await res.json()
        if (d.status === 'active') { setStatus('active'); setQrUrl(d.esim_qr_url ?? null); clearInterval(interval) }
        else if (d.status === 'failed') { setStatus('failed'); clearInterval(interval) }
        else { setStatus('processing'); if (++attempts >= 12) clearInterval(interval) }
      } catch { setStatus('processing') }
    }
    poll()
    const interval = setInterval(poll, 5000)
    return () => clearInterval(interval)
  }, [sessionId])

  const resend = async () => {
    await fetch(`/api/order/${sessionId}`, { method: 'POST' })
    setResent(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card p-8">
        <p className="text-[10px] font-bold tracking-[1.5px] text-dot-grey-400 uppercase mb-3">Activation</p>
        <h1 className="text-3xl font-black text-dot-black tracking-tight mb-3">Connected.</h1>
        <p className="text-sm text-dot-grey-500 mb-8 leading-relaxed">
          {status === 'loading'    && 'Loading your activation details…'}
          {status === 'active'     && 'Your DOT Mobile eSIM is ready to install.'}
          {status === 'processing' && 'Your eSIM is being activated. This usually takes a few minutes.'}
          {status === 'failed'     && 'Your activation encountered an issue. Our team has been notified.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          {/* QR code */}
          <div className="bg-dot-grey-50 rounded-xl p-5 flex flex-col items-center gap-4">
            {status === 'loading' && <div className="w-36 h-36 bg-dot-grey-200 rounded-lg animate-pulse" />}
            {status === 'active' && qrUrl
              ? <img src={qrUrl} alt="eSIM QR Code" className="w-36 h-36 rounded-lg" />
              : status === 'active'
              ? <div className="w-36 h-36 bg-dot-grey-100 rounded-lg flex items-center justify-center text-xs text-dot-grey-400 text-center px-3">QR code sent to your email</div>
              : null
            }
            {status === 'processing' && (
              <div className="w-36 h-36 bg-white border border-dot-grey-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-dot-black border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs text-dot-grey-400">Generating…</p>
                </div>
              </div>
            )}
            <p className="text-[10px] text-dot-grey-400 text-center leading-relaxed">Scan with your phone camera to install</p>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'STATUS', value: (
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-400' : status === 'failed' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                  {status === 'active' ? 'eSIM ready' : status === 'failed' ? 'Issue detected' : 'Activating…'}
                </span>
              )},
              { label: 'PLAN',      value: `${plan.name} — ${plan.data}` },
              { label: 'NEXT BILL', value: `$${plan.price}.00 on renewal` },
              { label: 'NETWORK',   value: 'Telstra 5G wholesale' },
            ].map(row => (
              <div key={row.label} className="bg-dot-grey-50 rounded-xl px-4 py-3">
                <p className="text-[10px] font-bold tracking-[1px] text-dot-grey-400 uppercase mb-1.5">{row.label}</p>
                <p className="text-sm font-semibold text-dot-black">{row.value}</p>
              </div>
            ))}
            <div className="flex gap-3 mt-2">
              <button onClick={resend} disabled={resent} className={`btn-primary text-sm ${resent ? 'opacity-60' : ''}`}>
                {resent ? '✓ Email sent' : 'Resend email'}
              </button>
              <Link href="/support/esim-and-devices/how-to-install-your-esim" className="btn-secondary text-sm">
                View instructions
              </Link>
            </div>
          </div>
        </div>

        {/* Activation steps */}
        {status !== 'failed' && (
          <div className="mt-10 border-t border-dot-grey-200 pt-8">
            <p className="text-xs font-bold tracking-wide text-dot-grey-400 uppercase mb-5">How to activate</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { n: '01', title: 'Check your email', desc: 'Look for an email from hello@dotmobile.com.au with your QR code.' },
                { n: '02', title: 'Scan the QR code',  desc: 'Open your camera and scan. Follow the prompts to install your eSIM.' },
                { n: '03', title: 'Enable DOT Mobile',  desc: 'Go to Settings → Mobile Data and activate your new plan.' },
              ].map(s => (
                <div key={s.n} className="bg-dot-grey-50 rounded-xl p-5">
                  <p className="text-2xl font-black text-dot-black mb-2 leading-none">{s.n}</p>
                  <p className="text-sm font-semibold text-dot-black mb-1">{s.title}</p>
                  <p className="text-xs text-dot-grey-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support links */}
        <div className="mt-8 pt-8 border-t border-dot-grey-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-dot-grey-400 uppercase tracking-wide mb-3">eSIM installation</p>
            <ul className="space-y-2">
              {[
                { label: 'Install on iPhone',          href: '/support/esim-and-devices/install-esim-on-iphone' },
                { label: 'Install on Android',         href: '/support/esim-and-devices/install-esim-on-android' },
                { label: 'My eSIM is not activating',  href: '/support/troubleshooting-and-service-recovery/esim-not-activating' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-dot-accent hover:opacity-75 transition-opacity">{l.label} →</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-dot-grey-400 uppercase tracking-wide mb-3">Plan and billing</p>
            <ul className="space-y-2">
              {[
                { label: 'How billing works',              href: '/support/plans-billing-and-payments/how-billing-works' },
                { label: 'What happens when data runs out', href: '/support/plans-billing-and-payments/what-happens-when-data-runs-out' },
                { label: 'How to change your plan',        href: '/support/plans-billing-and-payments/how-to-change-your-plan' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-dot-accent hover:opacity-75 transition-opacity">{l.label} →</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {status === 'failed' && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-red-700 mb-1">Something went wrong</p>
            <p className="text-xs text-red-600 leading-relaxed">
              Our team has been notified and will contact you within 1 business day.
              For immediate help: <a href="mailto:support@dotmobile.com.au" className="underline">support@dotmobile.com.au</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
