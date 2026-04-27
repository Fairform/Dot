'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getPlan } from '@/lib/plans/plansData'
import type { PlanDefinition } from '@/types/plans'

type Step = 1 | 2 | 3

interface Form {
  firstName: string; lastName: string; email: string
  dateOfBirth: string; address: string
  keepNumber: boolean; currentNumber: string; currentProvider: string
  esimConfirmed: boolean; termsConfirmed: boolean
}

const INIT: Form = {
  firstName: '', lastName: '', email: '', dateOfBirth: '', address: '',
  keepNumber: true, currentNumber: '', currentProvider: '',
  esimConfirmed: false, termsConfirmed: false,
}

function CtxLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-xs text-dot-accent hover:opacity-75 transition-opacity underline underline-offset-2" target="_blank">
      {children}
    </Link>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const params = useSearchParams()
  const planKey = params.get('plan') ?? 'core'
  const plan: PlanDefinition = useMemo(() => getPlan(planKey), [planKey])

  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<Form>(INIT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof Form, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const step2Valid = !!(form.firstName && form.lastName && form.email && form.dateOfBirth && form.address && form.esimConfirmed)

  async function handlePay() {
    if (!form.termsConfirmed) return
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey, ...form }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Payment failed. Please try again.') }
      const { url } = await res.json()
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  const STEPS = ['Review', 'Details', 'Payment']

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((label, i) => {
          const n = (i + 1) as Step
          const done = step > n; const curr = step === n
          return (
            <div key={label} className="flex items-center">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${done || curr ? 'bg-dot-black text-white' : 'bg-dot-grey-200 text-dot-grey-500'}`}>
                  {done ? '✓' : n}
                </span>
                <span className={`text-sm font-medium hidden sm:block ${curr || done ? 'text-dot-black' : 'text-dot-grey-400'}`}>{label}</span>
              </div>
              {i < 2 && <div className="w-8 md:w-16 h-px bg-dot-grey-200 mx-3" />}
            </div>
          )
        })}
      </div>

      <h1 className="text-2xl font-black text-dot-black tracking-tight mb-8">
        {step === 1 && 'Almost there.'}{step === 2 && 'A few details.'}{step === 3 && 'Secure checkout.'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="card p-6 md:p-8">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-dot-grey-400 mb-1">Selected plan</p>
                <p className="text-2xl font-black text-dot-black">{plan.name}</p>
                <p className="text-sm text-dot-grey-500">{plan.data} · {plan.speed}</p>
              </div>
              <div className="bg-dot-grey-50 rounded-xl p-5">
                <p className="text-xs font-semibold text-dot-grey-500 uppercase tracking-wide mb-3">What happens next</p>
                <ol className="space-y-2">
                  {['Enter your details','Pay securely via Stripe','Receive your eSIM QR code by email','Scan and connect — live in minutes'].map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-dot-grey-600">
                      <span className="w-5 h-5 rounded-full bg-white border border-dot-grey-200 flex items-center justify-center text-xs font-bold text-dot-black flex-shrink-0 mt-0.5">{i+1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex gap-3">
                <Link href="/plans" className="btn-secondary text-sm">Change plan</Link>
                <button onClick={() => setStep(2)} className="btn-primary text-sm">Continue →</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">First name</label>
                  <input className="input-field" placeholder="First name" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Last name</label>
                  <input className="input-field" placeholder="Last name" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Email address</label>
                <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Date of birth</label>
                <input className="input-field" placeholder="DD/MM/YYYY" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Residential address</label>
                <input className="input-field" placeholder="123 Collins St, Melbourne VIC 3000" value={form.address} onChange={e => set('address', e.target.value)} />
              </div>

              {/* Number porting */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-dot-grey-500 uppercase tracking-wide mb-3">Mobile number</p>
                <div className="flex gap-2 mb-4">
                  {[true, false].map(v => (
                    <button key={String(v)} type="button" onClick={() => set('keepNumber', v)}
                      className={`text-sm px-4 py-2 rounded-full border transition-all ${form.keepNumber === v ? 'bg-dot-black text-white border-dot-black' : 'bg-white text-dot-black border-dot-grey-200'}`}>
                      {v ? 'Keep my number' : 'Get a new number'}
                    </button>
                  ))}
                </div>
                {form.keepNumber && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Current number</label>
                      <input className="input-field" placeholder="04XX XXX XXX" value={form.currentNumber} onChange={e => set('currentNumber', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-dot-grey-500 mb-1.5">Current provider</label>
                      <input className="input-field" placeholder="e.g. Telstra, Optus" value={form.currentProvider} onChange={e => set('currentProvider', e.target.value)} />
                    </div>
                  </div>
                )}
                <p className="text-xs text-dot-grey-400 mt-3">
                  <CtxLink href="/support/sign-up-and-activation/keep-your-number">How number porting works →</CtxLink>
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input type="checkbox" checked={form.esimConfirmed} onChange={e => set('esimConfirmed', e.target.checked)} className="mt-0.5 w-4 h-4 accent-dot-black flex-shrink-0" />
                <span className="text-sm text-dot-grey-600 leading-relaxed">
                  I confirm my device supports eSIM.{' '}
                  <CtxLink href="/support/esim-and-devices/device-compatibility">Check compatibility →</CtxLink>
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="btn-secondary text-sm">Back</button>
                <button onClick={() => setStep(3)} disabled={!step2Valid}
                  className={`btn-primary text-sm ${!step2Valid ? 'opacity-40 cursor-not-allowed' : ''}`}>
                  Continue to payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-dot-grey-50 rounded-xl p-4 flex items-center gap-3 text-sm text-dot-grey-600">
                <span>🔒</span>
                <span>Secure payment powered by Stripe. Your card details are never stored on our servers.</span>
              </div>
              <div className="border-2 border-dashed border-dot-grey-200 rounded-xl p-10 text-center text-dot-grey-400 text-sm">
                <p className="font-medium text-dot-grey-500 mb-1">Stripe Elements</p>
                <p className="text-xs">Wire up Stripe Elements here — see lib/stripe.ts</p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.termsConfirmed} onChange={e => set('termsConfirmed', e.target.checked)} className="mt-0.5 w-4 h-4 accent-dot-black flex-shrink-0" />
                <span className="text-sm text-dot-grey-600 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/legal/terms" className="text-dot-black underline">Terms of Service</Link>,{' '}
                  <Link href="/legal/privacy" className="text-dot-black underline">Privacy Policy</Link>, and{' '}
                  <Link href="/legal/cis" className="text-dot-black underline">Critical Information Summary</Link>.
                </span>
              </label>
              <p className="text-xs text-dot-grey-400">
                <CtxLink href="/support/plans-billing-and-payments/how-billing-works">Questions about billing →</CtxLink>
              </p>
              {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{error}</div>}
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary text-sm">Back</button>
                <button disabled={!form.termsConfirmed || loading} onClick={handlePay}
                  className={`btn-primary text-sm flex-1 ${(!form.termsConfirmed || loading) ? 'opacity-40 cursor-not-allowed' : ''}`}>
                  {loading ? 'Redirecting…' : `Pay $${plan.price}.00 and activate →`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="bg-dot-black rounded-2xl p-6 h-fit lg:sticky lg:top-6">
          <p className="text-[10px] font-bold tracking-[1.5px] text-white/40 uppercase mb-4">Order summary</p>
          <p className="text-2xl font-black text-white mb-0.5">{plan.name}</p>
          <p className="text-sm text-white/50 mb-6">{plan.data} · {plan.speed}</p>
          <div className="border-t border-white/10 pt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Due today</span>
              <span className="font-bold text-white">${plan.price}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Then monthly</span>
              <span className="font-semibold text-white">${plan.price}.00</span>
            </div>
          </div>
          <div className="mt-6 bg-white/5 rounded-xl p-4 text-xs text-white/40 leading-relaxed">
            No contracts. Cancel anytime. eSIM delivered to your email within minutes.
          </div>
          <Link href="/plans" className="block text-center text-xs text-white/30 hover:text-white/60 transition-colors mt-5">
            Change plan
          </Link>
        </aside>
      </div>
    </div>
  )
}
