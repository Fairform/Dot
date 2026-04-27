import Link from 'next/link'
import HeroEmailInput from '@/components/homepage/HeroEmailInput'

// ── Data ──────────────────────────────────────────────────────
const valuePoints = [
  'eSIM activation',
  'Simple mobile plans',
  'Cancel anytime',
]

const activationCards = [
  {
    title: 'Choose your plan',
    text: 'Pick the mobile plan that fits how you use your phone.',
    tone: 'bg-[#EEF7F2]',
  },
  {
    title: 'Install your eSIM',
    text: 'Scan your QR code and activate directly from your phone.',
    tone: 'bg-[#EEF3FA]',
  },
  {
    title: "You're connected",
    text: 'No physical SIM. No waiting. No store visit.',
    tone: 'bg-[#F7EFF5]',
  },
]

const testimonials = [
  { quote: 'No SIM delivery. I was connected the same day.',    name: 'Sarah M.' },
  { quote: "The cleanest mobile signup I've used.",              name: 'James K.' },
  { quote: 'Finally, a telco site that makes sense.',           name: 'Priya R.' },
]

const faqs = [
  {
    q: 'What is DOT Mobile?',
    a: 'DOT Mobile is a prepaid eSIM carrier built on Telstra 5G infrastructure. No contracts, no stores, no physical SIM cards.',
  },
  {
    q: 'Do I need a physical SIM?',
    a: 'No. DOT Mobile is eSIM-only. Your SIM is digital — you activate it by scanning a QR code in your phone settings.',
  },
  {
    q: 'Can I keep my number?',
    a: 'Yes. Select "Keep my number" at checkout. We handle the port in 1–2 business days. Your service is live immediately.',
  },
  {
    q: 'What network does DOT Mobile use?',
    a: 'Telstra 5G infrastructure. Same towers, 98.8% population coverage. We access it wholesale — you get the network without the Telstra price.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. All plans are prepaid and 30-day. Stop recharging and your plan simply expires. No exit fees, ever.',
  },
]

// ── Phone screen component ────────────────────────────────────
function PhoneScreen({ secondary = false }: { secondary?: boolean }) {
  return (
    <div className="h-full rounded-[28px] bg-[#fafafa] p-4">
      {/* Dynamic island */}
      <div className="mx-auto mb-5 h-5 w-16 rounded-full bg-black" />
      {/* Status label */}
      <p className="text-xs text-black/40">{secondary ? 'Usage' : 'Home'}</p>
      {/* Main status */}
      <h3 className="mt-2 text-xl font-medium tracking-[-0.04em]">
        {secondary ? '50GB plan' : 'Connected'}
      </h3>
      {/* Primary card */}
      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <p className="text-xs text-black/40">DOT Mobile</p>
        <p className="mt-2 text-sm font-medium">
          {secondary ? '36.2 GB used' : 'eSIM active'}
        </p>
        {secondary && (
          <div className="mt-2">
            <div className="h-1.5 w-full rounded-full bg-black/8">
              <div className="h-1.5 w-[72%] rounded-full bg-black" />
            </div>
            <p className="mt-1 text-xs text-black/30">of 50 GB</p>
          </div>
        )}
      </div>
      {/* Plan card */}
      <div className="mt-4 rounded-2xl bg-[#eef3f7] p-4">
        <p className="text-xs text-black/40">Plan</p>
        <p className="mt-1 text-sm font-medium">
          {secondary ? 'Core · $42/mo' : 'Telstra 5G · Excellent'}
        </p>
      </div>
      {/* Bottom placeholder card */}
      <div className="mt-4 h-14 rounded-2xl bg-white ring-1 ring-black/5" />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="mx-auto flex min-h-[820px] max-w-6xl flex-col items-center px-6 pt-20 text-center">
        {/* Pill */}
        <div className="mb-8 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/70">
          eSIM mobile, made simple
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-[56px] font-medium leading-[0.95] tracking-[-0.04em] md:text-[82px]">
          Mobile, simplified.
          <br />
          No hassle.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
          Simple eSIM mobile plans for Australia. No physical SIM, no store
          visit, no usual telco mess.
        </p>

        {/* Email CTA — client component */}
        <HeroEmailInput />

        {/* Two phones + blobs */}
        <div className="relative mt-14 h-[430px] w-full max-w-3xl">
          {/* Colour blobs */}
          <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f0a49b] opacity-[0.45] blur-3xl" />
          <div className="absolute left-[44%] top-48 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7dbb8d] opacity-[0.35] blur-3xl" />
          <div className="absolute left-[58%] top-40 h-52 w-52 -translate-x-1/2 rounded-full bg-[#bdd7f2] opacity-[0.35] blur-3xl" />

          {/* Phones */}
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center justify-center">
            <div className="h-[390px] w-[195px] -rotate-6 rounded-[36px] border-[8px] border-black bg-white shadow-2xl">
              <PhoneScreen />
            </div>
            <div className="-ml-10 h-[390px] w-[195px] rotate-6 rounded-[36px] border-[8px] border-black bg-white shadow-2xl">
              <PhoneScreen secondary />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE ROW */}
      <section className="mx-auto grid max-w-4xl grid-cols-1 gap-10 px-6 py-10 text-center md:grid-cols-3">
        {valuePoints.map(item => (
          <div key={item} className="flex flex-col items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/10">
              <span className="h-2 w-2 rounded-full bg-[#111111]" />
            </div>
            <p className="text-[20px] font-medium leading-tight tracking-[-0.03em]">
              {item}
            </p>
          </div>
        ))}
      </section>

      {/* 3. PEACE OF MIND */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="text-[42px] font-medium leading-[1] tracking-[-0.04em] md:text-[56px]">
          A mobile plan,
          <br />
          with peace of mind.
        </h2>
        <p className="mt-5 text-sm leading-6 text-black/50">
          Activate in minutes. Manage everything online. Stay in control
          without call-centre friction.
        </p>
      </section>

      {/* 4. THREE ACTIVATION CARDS */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {activationCards.map(card => (
          <div
            key={card.title}
            className={`${card.tone} flex h-[300px] flex-col items-center justify-end rounded-[28px] p-8 text-center`}
          >
            <div className="mb-auto mt-8 h-24 w-24 rounded-3xl bg-white/70 shadow-sm ring-1 ring-black/5" />
            <h3 className="text-[28px] font-medium leading-none tracking-[-0.04em]">
              {card.title}
            </h3>
            <p className="mt-3 max-w-[220px] text-sm leading-5 text-black/55">
              {card.text}
            </p>
          </div>
        ))}
      </section>

      {/* 5. COVERAGE */}
      <section className="mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs text-black/50 ring-1 ring-black/10">
          Coverage
        </div>
        <h2 className="text-[46px] font-medium leading-[1] tracking-[-0.04em] md:text-[60px]">
          Coverage?
          <br />
          Glad you asked.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/50">
          Built on Telstra 5G infrastructure. 98.8% population coverage across
          Australia, including regional areas.
        </p>
        {/* Abstract dot grid visual */}
        <div className="relative mx-auto mt-14 h-[260px] max-w-3xl">
          <div
            className="absolute inset-0 rounded-[40px] opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(155,190,230,0.45) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Darwin'].map(city => (
            <span
              key={city}
              className="rounded-full bg-white px-4 py-1.5 text-xs text-black/50 ring-1 ring-black/10"
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="rounded-t-[46px] bg-[#f3eff6] px-6 py-28 text-center">
        <h2 className="text-[42px] font-medium leading-[1] tracking-[-0.04em]">
          They switched,
          <br />
          and stayed.
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map(item => (
            <div key={item.name} className="rounded-2xl bg-white p-6 text-left shadow-sm">
              <p className="text-sm leading-6 text-black/75">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-5 text-xs text-black/40">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-28">
        <div className="text-center">
          <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs text-black/50 ring-1 ring-black/10">
            FAQs
          </div>
          <h2 className="text-[42px] font-medium leading-[1] tracking-[-0.04em]">
            Got questions?
            <br />
            Here&rsquo;s the answers.
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map(item => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white p-5 ring-1 ring-black/5"
            >
              <summary className="cursor-pointer list-none text-sm font-medium">
                {item.q}
              </summary>
              <p className="mt-4 text-sm leading-6 text-black/55">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA — split */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-[34px] bg-white px-6 md:grid-cols-2 md:px-0">
        {/* Left: steps */}
        <div className="bg-[#eaf4ff] p-10 md:p-14">
          <h2 className="text-[36px] font-medium leading-[1] tracking-[-0.04em]">
            Get connected
            <br />
            in minutes.
          </h2>
          <div className="mt-8 space-y-3">
            {['Choose plan', 'Install eSIM', "You're online"].map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl bg-white/70 p-3 text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Right: pricing CTA */}
        <div className="relative bg-[#111111] p-10 text-white md:p-14">
          <h3 className="text-[34px] font-medium leading-[1] tracking-[-0.04em]">
            Simple plans.
            <br />
            Clear pricing.
          </h3>
          <p className="mt-4 text-sm text-white/50">
            Prepaid · 30 days · From $35
          </p>
          <Link
            href="/plans"
            className="mt-10 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            View plans
          </Link>
        </div>
      </section>
    </>
  )
}
