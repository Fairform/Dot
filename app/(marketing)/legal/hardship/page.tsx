import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Financial Hardship Policy',
  description: 'DOT Mobile support options for customers experiencing financial hardship.',
  path: '/legal/hardship',
})

export default function HardshipPage() {
  return (
    <LegalPageShell title="Financial Hardship Policy" lastUpdated="1 January 2025">
      <p>
        DOT Mobile recognises that customers may experience financial difficulty from time to time.
        This policy sets out the support options available to you if you are struggling to pay
        your bill.
      </p>

      <h2>Contact us before your service is suspended</h2>
      <p>
        If you are experiencing financial hardship, contact us as early as possible at
        support@dotmobile.com.au before your payment is due or before your service is suspended.
        Early contact gives us the most options to help you.
      </p>

      <h2>What support may be available</h2>
      <p>Depending on your circumstances, we may be able to offer:</p>
      <ul>
        <li>A short-term payment deferral</li>
        <li>A payment plan to clear an outstanding balance over time</li>
        <li>A temporary reduction to a lower-cost plan</li>
        <li>A waiver of late payment fees in genuine hardship circumstances</li>
        <li>A referral to free financial counselling services</li>
      </ul>

      <h2>Free financial counselling</h2>
      <p>
        The National Debt Helpline provides free, independent financial counselling at
        ndh.org.au or by calling 1800 007 007 (Monday to Friday, 9:30am to 4:30pm).
      </p>

      <h2>How to apply</h2>
      <p>
        Email support@dotmobile.com.au with the subject line &ldquo;Financial Hardship Request&rdquo;.
        Describe your situation briefly and what assistance you are seeking. We will respond
        within two business days.
      </p>

      <h2>Our commitment</h2>
      <p>
        All hardship requests are handled with sensitivity and confidentiality. We will not
        suspend your service while a hardship application is being assessed in good faith.
      </p>
    </LegalPageShell>
  )
}
