import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How DOT Mobile collects, uses, and protects your personal information.',
  path: '/legal/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="1 January 2025">
      <p>
        DOT Mobile Pty Ltd is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, disclose, and protect your personal information. We are bound by the Australian
        Privacy Principles under the Privacy Act 1988 (Cth).
      </p>

      <h2>1. What personal information we collect</h2>
      <p>
        When you sign up or manage your account we collect your full name, date of birth, residential
        address, email address, mobile number, government-issued photo ID details required for identity
        verification under Australian telecommunications law, and payment card details processed by
        Stripe Inc. on our behalf.
      </p>
      <p>
        We also collect network usage metadata (call records, data volumes, timestamps) required to
        deliver your service and maintain IPND records under the Telecommunications Act 1997 (Cth).
      </p>

      <h2>2. How we use your information</h2>
      <p>
        We use your information to activate and deliver your mobile service, verify your identity,
        process payments, maintain IPND records, send service communications, and detect fraud.
        With your consent, we may also send marketing communications which you can unsubscribe from
        at any time.
      </p>

      <h2>3. Who we share your information with</h2>
      <p>
        We share data with: Stripe Inc. (payment processing), Supabase Inc. (database hosting in
        Sydney), our MVNE partner for network provisioning, Telstra Corporation Limited for wholesale
        network access, and our transactional email provider. We do not sell your personal information.
      </p>

      <h2>4. How we protect your information</h2>
      <p>
        We use TLS encryption in transit, encryption at rest, multi-factor authentication for system
        access, and row-level security database controls. No system is completely secure — if you
        suspect your account has been compromised contact us immediately.
      </p>

      <h2>5. Data retention</h2>
      <p>
        Account data is retained for seven years after service cancellation as required by Australian
        taxation and telecommunications law. Call metadata is retained for two years. You may request
        deletion of data we are not legally required to keep.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You have the right to access, correct, and request deletion of your personal information.
        Contact our Privacy Officer at privacy@dotmobile.com.au. If we cannot resolve your concern,
        you may lodge a complaint with the Office of the Australian Information Commissioner at
        oaic.gov.au.
      </p>

      <h2>7. Contact</h2>
      <p>Privacy Officer &middot; DOT Mobile Pty Ltd &middot; privacy@dotmobile.com.au</p>
    </LegalPageShell>
  )
}
