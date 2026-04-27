import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Direct Debit Agreement',
  description: 'DOT Mobile Direct Debit Request Service Agreement — terms governing automatic monthly payment.',
  path: '/legal/direct-debit',
})

export default function DirectDebitPage() {
  return (
    <LegalPageShell title="Direct Debit Request Service Agreement" lastUpdated="1 January 2025">
      <p>
        This agreement sets out the terms of the direct debit arrangement between you and
        DOT Mobile Pty Ltd. By providing your payment details and proceeding with your subscription,
        you authorise DOT Mobile to debit your nominated payment account as described below.
      </p>

      <h2>Your authorisation</h2>
      <p>
        You authorise DOT Mobile Pty Ltd to charge your nominated credit or debit card for your
        monthly subscription fee on your renewal date each month, any applicable add-on charges
        you have purchased, and any outstanding amounts following a failed payment attempt.
      </p>

      <h2>Payment processor</h2>
      <p>
        All payments are processed by Stripe Inc., a PCI-DSS Level 1 certified payment processor.
        DOT Mobile does not store your full card number, CVV, or expiry date on our systems.
      </p>

      <h2>Retry policy</h2>
      <p>
        If a payment attempt fails, we will notify you by email and may retry the payment within
        seven days. After three unsuccessful attempts, we may suspend your service and contact
        you to update your payment details.
      </p>

      <h2>Your rights</h2>
      <p>
        You may update your nominated payment method at any time by logging into your account.
        To cancel this direct debit authorisation you must cancel your subscription in accordance
        with our Subscription Terms and Conditions. We will notify you by email of any changes
        to debit amounts at least 30 days before they take effect.
      </p>

      <h2>Disputes</h2>
      <p>
        If you believe a debit was made in error, contact us at support@dotmobile.com.au.
        You may also contact your bank or card issuer to dispute a transaction, typically within
        120 days of the charge date.
      </p>

      <h2>Governing law</h2>
      <p>This agreement is governed by the laws of New South Wales, Australia and the ePayments Code administered by ASIC.</p>
    </LegalPageShell>
  )
}
