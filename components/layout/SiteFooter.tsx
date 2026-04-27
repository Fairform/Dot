import Link from 'next/link'

const COL1 = [
  { label: 'Plans',    href: '/plans' },
  { label: 'Coverage', href: '/coverage' },
  { label: 'Recharge', href: '/recharge' },
  { label: 'Activate', href: '/activate' },
]

const COL2 = [
  { label: 'Help centre',   href: '/support' },
  { label: 'Install eSIM',  href: '/support/esim-and-devices/how-to-install-your-esim' },
  { label: 'Billing',       href: '/support/plans-billing-and-payments/how-billing-works' },
  { label: 'Port number',   href: '/support/sign-up-and-activation/keep-your-number' },
]

const COL3 = [
  { label: 'Privacy',    href: '/legal/privacy' },
  { label: 'Terms',      href: '/legal/terms' },
  { label: 'Fair use',   href: '/legal/fair-use' },
  { label: 'Complaints', href: '/legal/complaints' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-dot-grey-200">
      <div className="container-site px-4 sm:px-6 lg:px-8 pt-16 pb-12">

        {/* Three columns */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-5">Product</p>
            <ul className="space-y-3">
              {COL1.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dot-grey-500 hover:text-dot-black transition-colors duration-150">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-5">Support</p>
            <ul className="space-y-3">
              {COL2.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dot-grey-500 hover:text-dot-black transition-colors duration-150">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-5">Legal</p>
            <ul className="space-y-3">
              {COL3.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-dot-grey-500 hover:text-dot-black transition-colors duration-150">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large wordmark */}
        <div className="border-t border-dot-grey-100 pt-10">
          <p className="font-serif text-[clamp(48px,8vw,100px)] font-normal text-dot-grey-200 leading-none tracking-tight mb-6 select-none">
            DOT Mobile
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-dot-grey-400">
              &copy; {new Date().getFullYear()} DOT Mobile Pty Ltd &nbsp;&middot;&nbsp; Registered with the TIO &nbsp;&middot;&nbsp; Built on Telstra 5G infrastructure
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/dotmobile.au" target="_blank" rel="noopener noreferrer"
                className="text-xs text-dot-grey-400 hover:text-dot-black transition-colors">Instagram</a>
              <a href="https://tiktok.com/@dotmobile.au" target="_blank" rel="noopener noreferrer"
                className="text-xs text-dot-grey-400 hover:text-dot-black transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
