'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const MAP_URL = 'https://www.telstra.com.au/coverage-networks/our-coverage'

const AUS_DOTS: [number, number][] = [
  [55,25],[63,22],[71,22],[79,22],[87,22],[95,22],[103,22],[111,22],[119,22],[127,22],[135,22],[143,22],[151,22],
  [159,22],[167,22],[175,22],[183,22],[191,25],[199,25],[207,25],[215,25],[223,25],[231,22],[239,22],[247,22],
  [255,22],[255,28],[255,34],[251,40],[247,46],[243,50],[247,54],[251,58],[255,62],[259,66],[263,70],[263,76],
  [263,82],[263,88],[263,94],[263,100],[263,106],[263,112],[259,118],[259,124],[259,130],[255,136],[255,142],
  [251,148],[251,154],[251,160],[247,166],[243,172],[243,178],[239,184],[239,190],[235,196],[235,202],[231,208],
  [227,214],[223,218],[219,222],[215,226],[211,230],[207,232],[203,234],[199,236],[195,236],[191,236],[187,234],
  [183,232],[179,228],[175,226],[171,222],[167,218],[163,214],[159,212],[155,210],[151,210],[147,210],[143,208],
  [139,206],[135,204],[131,202],[127,200],[123,200],[119,200],[115,200],[111,202],[107,202],[103,202],[99,202],
  [95,202],[91,202],[91,196],[87,190],[83,184],[79,180],[79,174],[79,168],[79,162],[79,156],[79,150],[79,144],
  [79,138],[79,132],[79,126],[79,120],[79,114],[79,108],[79,102],[79,96],[79,90],[79,84],[79,78],[79,72],
  [79,66],[79,60],[79,54],[79,48],[79,42],[79,36],[79,30],[79,25],
  [91,116],[99,116],[107,116],[115,116],[123,116],[131,116],[139,116],[147,116],[155,116],[163,116],[171,116],[179,116],[187,116],[195,116],[203,116],[211,116],[219,116],[227,116],[235,116],[243,116],
  [91,140],[99,140],[107,140],[115,140],[123,140],[131,140],[139,140],[147,140],[155,140],[163,140],[171,140],[179,140],[187,140],[195,140],[203,140],[211,140],[219,140],[227,140],
  [91,164],[99,164],[107,164],[115,164],[123,164],[131,164],[139,164],[147,164],[155,164],[163,164],[171,164],[179,164],[187,164],[195,164],[203,164],
  [99,68],[107,68],[115,68],[123,68],[131,68],[139,68],[147,68],[155,68],[163,68],[171,68],[179,68],[187,68],[195,68],[203,68],[211,68],[219,68],[227,68],[235,68],[243,68],
  [99,92],[107,92],[115,92],[123,92],[131,92],[139,92],[147,92],[155,92],[163,92],[171,92],[179,92],[187,92],[195,92],[203,92],[211,92],[219,92],[227,92],[235,92],
  [44,268],[52,268],[60,268],[68,268],[44,276],[52,276],[60,276],[52,284],[60,284],[52,292],
]

const CITY_DOTS: [number, number][] = [
  [235,170],[183,222],[259,118],[83,138],[123,198],[191,30],[235,130],
]

const CITY_LABELS = [
  { x: 265, y: 165, label: 'Sydney',    anchor: 'start' as const },
  { x: 177, y: 227, label: 'Melbourne', anchor: 'end'   as const },
  { x: 265, y: 112, label: 'Brisbane',  anchor: 'start' as const },
  { x: 75,  y: 133, label: 'Perth',     anchor: 'end'   as const },
  { x: 117, y: 193, label: 'Adelaide',  anchor: 'end'   as const },
  { x: 191, y: 24,  label: 'Darwin',    anchor: 'middle' as const },
]

const citySet = new Set(CITY_DOTS.map(([x, y]) => `${x},${y}`))

const FAQ = [
  { q: 'What network does DOT Mobile run on?', a: 'DOT Mobile delivers services over the Telstra 5G infrastructure — Telstra wholesale infrastructure. Same physical towers as Telstra, covering 98.8% of the Australian population. DOT Mobile is a separate independent company.' },
  { q: 'Do I get 5G?', a: 'Yes. 5G-capable device in a 5G zone — you get 5G automatically. Available across all major Australian cities. Outside 5G your device seamlessly falls to 4G.' },
  { q: 'What speeds can I expect?', a: 'Starter: up to 100 Mbps. Core and Unlimited: up to 150 Mbps. Ultra: priority 5G access — highest available speeds on the network.' },
  { q: 'Does it work in regional and remote areas?', a: 'The Telstra 5G infrastructure covers more remote and regional Australia than any other network. Ideal for FIFO workers, regional communities, and road travellers.' },
  { q: 'Does DOT Mobile have its own towers?', a: "No. We access Telstra's existing physical mobile infrastructure on a wholesale basis. Same towers, same coverage, lower price — because we cut stores, staff, and plastic SIMs." },
  { q: 'What if I have a signal problem?', a: 'Most signal issues are device or settings related and fixable in minutes. See our troubleshooting guide or email support@dotmobile.com.au.' },
]

export default function CoveragePage() {
  const [val, setVal]     = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'covered'>('idle')
  const inputRef          = useRef<HTMLInputElement>(null)

  const check = () => {
    if (!val.trim()) { inputRef.current?.focus(); return }
    setState('loading')
    setTimeout(() => setState('covered'), 1200)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="dark-mesh py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-white pointer-events-none opacity-[0.028]" />
        <div className="container-site relative z-10 max-w-2xl">
          <span className="label-tag">Network</span>
          <h1
            className="font-display text-white mb-6 text-balance"
            style={{ fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 2, lineHeight: 0.92 }}
          >
            DOT/TELSTRA 5G.<br />RELIABLE<br />WHERE IT MATTERS.
          </h1>
          <p className="text-base text-white/50 leading-relaxed mb-10 max-w-lg">
            Same physical towers as Telstra. 98.8% population coverage.
            4G and 5G nationwide — including regional and remote Australia.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-colors"
              style={{ background: '#0066CC', color: '#0A0A0A', boxShadow: '0 4px 16px rgba(184,212,255,0.25)' }}
            >
              Check your area →
            </button>
            <Link
              href="/support/network-coverage-and-speeds"
              className="inline-flex items-center gap-2 text-white/55 text-sm font-semibold px-6 py-3 rounded-full border border-white/15 hover:border-white/30 hover:text-white/80 transition-colors"
            >
              Coverage support
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="dark-mesh border-t border-white/8 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '98.8%', label: 'Population coverage' },
              { value: '5G',    label: 'All major cities' },
              { value: '4G',    label: 'Regional & remote' },
              { value: '#1',    label: 'Network in Australia' },
            ].map(s => (
              <div key={s.label} className="bg-dot-black/80 border border-white/10 rounded-2xl p-5 text-center ">
                <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                <p className="text-[11px] text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE CHECKER ── */}
      <section id="checker" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-section">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Checker */}
            <div>
              <span className="label-tag">Live coverage check</span>
              <h2
                className="font-display text-dot-black mb-4 text-balance"
                style={{ fontSize: 'clamp(32px,5vw,52px)', letterSpacing: 2 }}
              >
                CHECK YOUR AREA
              </h2>
              <p className="text-sm text-dot-grey-500 mb-8 leading-relaxed max-w-md">
                Enter your postcode or suburb. We&apos;ll confirm Telstra 5G coverage
                and link you to the live network map for street-level detail.
              </p>

              <div className="flex gap-2 mb-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={val}
                  onChange={e => { setVal(e.target.value); setState('idle') }}
                  onKeyDown={e => e.key === 'Enter' && check()}
                  placeholder="Postcode or suburb"
                  disabled={state === 'loading'}
                  className="input-field flex-1 text-base disabled:opacity-60"
                />
                <button
                  onClick={check}
                  disabled={state === 'loading'}
                  className="btn-primary px-6 whitespace-nowrap disabled:opacity-60"
                >
                  {state === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                  ) : 'Check'}
                </button>
              </div>

              {state === 'covered' && (
                <div className="bg-white border border-dot-grey-200 rounded-2xl p-5 mb-4 animate-snap-in ">
                  <div className="flex items-start gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="12" fill="#22c55e" fillOpacity="0.14" />
                      <path d="M6 12l4 4L18 8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <p className="font-bold text-dot-black text-sm mb-0.5">
                        Telstra 5G covers {val || 'your area'}.
                      </p>
                      <p className="text-xs text-dot-grey-500 mb-4">
                        98.8% of Australia is on our network.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="/plans" className="btn-primary text-sm px-5 py-2.5">
                          See plans →
                        </Link>
                        <a
                          href={MAP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm px-5 py-2.5"
                        >
                          View detailed map →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-dot-grey-400">
                Coverage reflects the Telstra 5G wholesale network.
                For street-level accuracy{' '}
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-dot-blue hover:opacity-75">
                  view the full interactive map →
                </a>
              </p>
            </div>

            {/* Map card — clickable, links to Telstra map */}
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
              style={{ background: '#0A0A0A', minHeight: 380 }}
            >
              {/* Dot grid overlay */}
              <div className="absolute inset-0 dot-grid-white opacity-[0.025] pointer-events-none" />
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(0,102,204,0.08) 0%, transparent 60%)' }}
              />

              {/* Network badge */}
              <div className="absolute top-4 left-4 z-10 bg-white border border-dot-grey-200 rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                <p className="text-[8px] font-bold tracking-wider text-dot-grey-500 uppercase mb-0.5">Powered by</p>
                <p className="text-[13px] font-black text-dot-black leading-tight">Telstra 5G</p>
              </div>

              {/* Open map CTA */}
              <div className="absolute bottom-4 right-4 z-10">
                <span
                  className="inline-flex items-center gap-2 text-dot-black text-sm font-bold px-4 py-2 rounded-full"
                  style={{ background: '#0066CC' }}
                >
                  Open live map →
                </span>
              </div>

              {/* Australia dot map */}
              <div className="flex items-center justify-center p-10 opacity-70 h-full min-h-[380px]">
                <svg viewBox="0 0 320 320" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
                  {AUS_DOTS.map(([x, y], i) => {
                    const key    = `${x},${y}`
                    const isCity = citySet.has(key)
                    return (
                      <circle
                        key={i}
                        cx={x * 1.15}
                        cy={y * 1.15}
                        r={isCity ? 5 : 3}
                        fill={isCity ? '#0066CC' : 'white'}
                        opacity={isCity ? 1 : 0.55}
                      />
                    )
                  })}
                  {CITY_DOTS.map(([x, y], i) => (
                    <circle
                      key={`r-${i}`}
                      cx={x * 1.15}
                      cy={y * 1.15}
                      r={12}
                      fill="none"
                      stroke="#0066CC"
                      strokeWidth="0.8"
                      opacity="0.20"
                    />
                  ))}
                  {CITY_LABELS.map(c => (
                    <text
                      key={c.label}
                      x={c.x * 1.15}
                      y={c.y * 1.15}
                      textAnchor={c.anchor}
                      fontSize="9"
                      fontWeight="600"
                      fill="rgba(255,255,255,0.55)"
                      fontFamily="system-ui, sans-serif"
                    >
                      {c.label}
                    </text>
                  ))}
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── SPEED TABLE ── */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-dot-grey-200">
        <div className="container-site max-w-2xl">
          <span className="label-tag">Performance</span>
          <h2
            className="font-display text-dot-black mb-8"
            style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: 2 }}
          >
            SPEED BY PLAN.
          </h2>
          <div className="border border-dot-grey-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-dot-grey-100 border-b border-dot-grey-200">
                  {['Plan', 'Max speed', 'Network', 'Priority'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] font-bold text-dot-grey-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dot-grey-100">
                {[
                  { plan: 'Starter',   speed: '100 Mbps',          priority: 'Standard' },
                  { plan: 'Core',      speed: '150 Mbps',          priority: 'Standard' },
                  { plan: 'Unlimited', speed: '150 Mbps',          priority: 'Standard' },
                  { plan: 'Ultra',     speed: 'Highest available', priority: 'Priority 5G ★' },
                ].map((row, i) => (
                  <tr key={row.plan} className={i === 3 ? 'bg-dot-grey-50' : ''}>
                    <td className="py-3.5 px-4 font-bold text-dot-black">{row.plan}</td>
                    <td className="py-3.5 px-4 text-dot-grey-600">{row.speed}</td>
                    <td className="py-3.5 px-4">
                      <span className="label-tag" style={{ fontSize: 9 }}>Telstra 5G</span>
                    </td>
                    <td className="py-3.5 px-4 text-dot-grey-500 text-xs">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-dot-grey-400 mt-3">
            Speeds are maximum achievable. Actual speeds vary by location, device, and network load.
          </p>
        </div>
      </section>

      {/* ── EXPLAINER ── */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-dot-grey-50 border-t border-dot-grey-200">
        <div className="container-site max-w-3xl">
          <span className="label-tag">About the network</span>
          <h2
            className="font-display text-dot-black mb-6"
            style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: 2 }}
          >
            WHAT IS DOT/TELSTRA 5G?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-dot-grey-200 rounded-2xl p-6 ">
              <p className="text-sm font-bold text-dot-black mb-2">Same physical towers</p>
              <p className="text-sm text-dot-grey-500 leading-relaxed">
                DOT Mobile accesses Telstra&apos;s physical mobile infrastructure on a wholesale basis.
                Same coverage footprint as Telstra. Significantly lower price.
              </p>
            </div>
            <div className="bg-white border border-dot-grey-200 rounded-2xl p-6 ">
              <p className="text-sm font-bold text-dot-black mb-2">Independent company</p>
              <p className="text-sm text-dot-grey-500 leading-relaxed">
                DOT Mobile is not Telstra. By cutting stores, staff, and physical SIMs we pass those
                savings on as lower prepaid plan prices.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 "
            style={{ background: '#0A0A0A' }}
          >
            <div>
              <p className="text-sm font-bold text-white mb-1">Check coverage at your exact address</p>
              <p className="text-xs text-white/40">Live data from the Telstra network.</p>
            </div>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 text-dot-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white transition-colors whitespace-nowrap"
              style={{ background: '#0066CC' }}
            >
              Open coverage map →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-dot-grey-200">
        <div className="container-site max-w-2xl">
          <span className="label-tag">FAQ</span>
          <h2
            className="font-display text-dot-black mb-8"
            style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: 2 }}
          >
            COVERAGE QUESTIONS.
          </h2>
          <div className="divide-y divide-dot-grey-100 border-t border-dot-grey-200">
            {FAQ.map((item, i) => (
              <details key={i} className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-semibold text-dot-black hover:text-dot-blue transition-colors gap-4">
                  <span>{item.q}</span>
                  <span className="text-xl text-dot-grey-300 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 leading-none">
                    +
                  </span>
                </summary>
                <p className="text-sm text-dot-grey-500 mt-4 leading-relaxed pr-8">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dot-grey-50 border-t border-dot-grey-200 text-center">
        <div className="container-site max-w-lg mx-auto">
          <h2
            className="font-display text-dot-black mb-3"
            style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: 2 }}
          >
            SIGNAL ISSUES?
          </h2>
          <p className="text-sm text-dot-grey-500 mb-7 leading-relaxed">
            Most signal problems are device or settings related. Fixed in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/support/troubleshooting-and-service-recovery/no-signal" className="btn-primary text-sm">
              Troubleshoot signal →
            </Link>
            <Link href="/support/network-coverage-and-speeds" className="btn-secondary text-sm">
              Coverage support
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
