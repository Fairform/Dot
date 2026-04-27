import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'DOT Mobile Standard Form of Agreement and Subscription Terms and Conditions.',
  path: '/legal/terms',
})

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" lastUpdated="1 January 2025">
      <p>
        These terms govern your use of DOT Mobile mobile telecommunications services provided by
        DOT Mobile Pty Ltd. By activating a plan you agree to these terms together with the applicable
        Critical Information Summary.
      </p>

      <h2>1. Our services</h2>
      <p>
        DOT Mobile provides eSIM-only mobile telecommunications services over the Telstra wholesale
        mobile network. We do not supply physical SIM cards. Services are activated via a QR code
        delivered by email following successful payment and identity verification.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and an Australian resident to subscribe. You must provide
        accurate identity information as required under the Telecommunications Act 1997 (Cth).
      </p>

      <h2>3. Billing</h2>
      <p>
        Plans are billed monthly in advance on your renewal date. Payment is collected via your
        nominated card through Stripe Inc. If payment fails we will notify you and may retry within
        seven days. Service may be suspended if payment is not resolved.
      </p>

      <h2>4. No contracts</h2>
      <p>
        All plans are month-to-month with no lock-in contract and no exit fees. Cancel at any time
        from your account. Service remains active until the end of the current billing period.
        No partial-month refunds are provided.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        You must not use DOT Mobile services for unlawful purposes, to send spam, to conduct
        denial-of-service attacks, or to resell our network access. Unlimited plans are subject
        to fair use and are intended for personal mobile use, not as fixed broadband replacement.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our liability is limited to the amount you paid in
        the three months preceding the event giving rise to the claim. We are not liable for
        indirect or consequential losses, or for service interruptions caused by Telstra
        Wholesale&rsquo;s network or events outside our control.
      </p>

      <h2>7. Complaints</h2>
      <p>
        Contact us at support@dotmobile.com.au. If we cannot resolve your complaint you may refer
        it to the Telecommunications Industry Ombudsman at tio.com.au or 1800 062 058.
      </p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of New South Wales, Australia.</p>
    </LegalPageShell>
  )
}
