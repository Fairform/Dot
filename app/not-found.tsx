import Link from 'next/link'
import LogoDots from '@/components/ui/LogoDots'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dot-grey-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <LogoDots size={8} />
      </div>
      <p className="text-[11px] font-bold tracking-[2px] text-dot-grey-400 uppercase mb-4">404</p>
      <h1 className="text-3xl font-black text-dot-black tracking-tight mb-3 text-balance">
        Page not found.
      </h1>
      <p className="text-sm text-dot-grey-500 mb-8 max-w-xs leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Link href="/" className="btn-primary text-sm">Back to home</Link>
        <Link href="/support" className="btn-secondary text-sm">Help centre</Link>
      </div>

      <div>
        <p className="text-xs text-dot-grey-400 mb-4">Looking for help?</p>
        <div className="flex flex-col gap-2 text-left">
          {[
            { label: 'How to install your eSIM', href: '/support/esim-and-devices/how-to-install-your-esim' },
            { label: 'Keep your number',          href: '/support/sign-up-and-activation/keep-your-number' },
            { label: 'How billing works',         href: '/support/plans-billing-and-payments/how-billing-works' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-dot-accent hover:opacity-75 transition-opacity">
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
