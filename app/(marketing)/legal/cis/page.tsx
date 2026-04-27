import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'
import { PLANS } from '@/lib/plans/plansData'

export const metadata: Metadata = buildMetadata({
  title: 'Critical Information Summary',
  description: 'DOT Mobile Critical Information Summaries for all plans as required by the TCP Code.',
  path: '/legal/cis',
})

export default function CISIndexPage() {
  return (
    <LegalPageShell title="Critical Information Summary" lastUpdated="1 January 2025">
      <p>
        A Critical Information Summary (CIS) provides key information about each DOT Mobile plan
        in a standardised format as required by the Telecommunications Consumer Protections (TCP) Code.
        Select a plan below to view its CIS.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose mt-6">
        {PLANS.map(plan => (
          <Link
            key={plan.key}
            href={`/legal/cis/${plan.key}`}
            className="block p-5 border border-dot-grey-200 rounded-xl hover:border-dot-black hover:shadow-card-md transition-all group"
          >
            <p className="text-sm font-bold text-dot-black mb-1 group-hover:text-dot-blue transition-colors">{plan.name} Plan CIS</p>
            <p className="text-xs text-dot-grey-500">${plan.price}/month · {plan.data}</p>
          </Link>
        ))}
      </div>
    </LegalPageShell>
  )
}
