import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { getSupportCategories } from '@/lib/support/getSupportCategories'
import SupportSearch from '@/components/support/SupportSearch'
import Icon from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

export const metadata: Metadata = buildMetadata({
  title: 'Help Centre',
  description: 'Find answers about eSIM setup, billing, plans, and coverage.',
  path: '/support',
})

export default async function SupportHomePage() {
  const categories = await getSupportCategories()

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-dot-grey-200 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-dot-black mb-4"
            style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, letterSpacing: '-0.01em' }}>
            How can we help?
          </h1>
          <p className="text-base text-dot-grey-500 mb-8">
            Search eSIM setup, billing, coverage, or troubleshooting.
          </p>
          <SupportSearch variant="hero" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-dot-grey-100">
        <div className="container-site">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Install eSIM',        href: '/support/esim-and-devices/how-to-install-your-esim' },
              { label: 'Keep your number',     href: '/support/sign-up-and-activation/keep-your-number' },
              { label: 'How billing works',    href: '/support/plans-billing-and-payments/how-billing-works' },
              { label: 'No signal',            href: '/support/troubleshooting-and-service-recovery/no-signal' },
              { label: 'Device compatibility', href: '/support/esim-and-devices/device-compatibility' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="pill hover:border-dot-grey-400 hover:text-dot-black transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-dot-grey-400 mb-10 text-center">Browse by topic</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/support/${cat.slug}`}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-dot-grey-200 hover:border-dot-grey-400 transition-all duration-150 group">
                <div className="w-10 h-10 rounded-xl bg-dot-grey-100 flex items-center justify-center flex-shrink-0 text-dot-grey-500 group-hover:bg-dot-black group-hover:text-white transition-all duration-150">
                  <Icon name={cat.icon as IconName} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dot-black mb-0.5 group-hover:text-dot-accent transition-colors">{cat.title}</p>
                  <p className="text-xs text-dot-grey-400 truncate">{cat.shortDescription}</p>
                </div>
                <Icon name="chevron-right" size={14} className="text-dot-grey-300 group-hover:text-dot-black transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-dot-grey-200 text-center">
        <div className="container-site max-w-sm mx-auto">
          <p className="text-base font-medium text-dot-black mb-2">Still need help?</p>
          <p className="text-sm text-dot-grey-500 mb-5">We respond within one business day.</p>
          <a href="mailto:support@dotmobile.com.au"
            className="text-sm text-dot-accent hover:opacity-70 transition-opacity">
            support@dotmobile.com.au
          </a>
        </div>
      </section>
    </>
  )
}
