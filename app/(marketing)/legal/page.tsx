import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Legal',
  description: 'DOT Mobile legal documents including Privacy Policy, Terms of Service, Critical Information Summaries, and all customer policies.',
  path: '/legal',
})

const DOCS = [
  { title: 'Privacy Policy', href: '/legal/privacy', desc: 'How we collect, use, and protect your personal information.' },
  { title: 'Terms of Service', href: '/legal/terms', desc: 'The agreement governing your use of DOT Mobile services.' },
  { title: 'Critical Information Summary', href: '/legal/cis', desc: 'Key plan details in a standardised format as required by the TCP Code.' },
  { title: 'Complaints Handling Policy', href: '/legal/complaints', desc: 'How to make a complaint and what to expect from us.' },
  { title: 'Fair Use Policy', href: '/legal/fair-use', desc: 'What fair use means on Unlimited and Ultra plans.' },
  { title: 'Financial Hardship Policy', href: '/legal/hardship', desc: 'Support options if you are having difficulty paying your bill.' },
  { title: 'Direct Debit Agreement', href: '/legal/direct-debit', desc: 'Terms governing automatic monthly payment collection.' },
  { title: 'Whistleblower Policy', href: '/legal/whistleblower', desc: 'How to report wrongdoing and the protections available to you.' },
]

export default function LegalIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-dot-black mb-3 text-balance">Legal documents</h1>
      <p className="text-sm text-dot-grey-500 mb-10 leading-relaxed max-w-lg">
        All DOT Mobile legal documents and policies. For plain-language explanations of your rights, see our{' '}
        <Link href="/support/legal-privacy-and-compliance" className="text-dot-accent underline underline-offset-2">
          legal support articles
        </Link>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOCS.map(doc => (
          <Link key={doc.href} href={doc.href} className="block card p-5 hover:shadow-card-md transition-shadow group">
            <p className="text-sm font-semibold text-dot-black mb-1 group-hover:text-dot-accent transition-colors">{doc.title}</p>
            <p className="text-xs text-dot-grey-500 leading-relaxed">{doc.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
