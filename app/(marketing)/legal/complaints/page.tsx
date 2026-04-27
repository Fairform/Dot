import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Complaints Handling Policy',
  description: 'How to make a complaint to DOT Mobile and what to expect.',
  path: '/legal/complaints',
})

export default function ComplaintsPage() {
  return (
    <LegalPageShell title="Complaints Handling Policy" lastUpdated="1 January 2025">
      <p>
        DOT Mobile is committed to resolving complaints fairly and promptly. This policy is prepared
        in accordance with the Telecommunications Consumer Protections (TCP) Code.
      </p>

      <h2>How to make a complaint</h2>
      <p>
        Email complaints@dotmobile.com.au or use the contact form at dotmobile.com.au/contact.
        Include your name, account email, a description of the issue, and your preferred resolution.
        You may also have someone make a complaint on your behalf with your written consent.
      </p>

      <h2>Our response timeframes</h2>
      <p>
        We acknowledge all complaints within two business days. We aim to resolve most complaints
        within 15 business days. Complex complaints may take up to 40 business days. If we cannot
        resolve within 15 business days we will contact you with an updated timeframe.
      </p>

      <h2>Outcomes</h2>
      <p>
        Where we uphold a complaint we may offer an account credit or refund for billing errors,
        service restoration or plan adjustment, a written explanation, or a combination of these.
        We will notify you of our decision in writing with reasons.
      </p>

      <h2>Internal review</h2>
      <p>
        If you are not satisfied with our decision you may request an internal review handled by
        a senior team member not involved in the original decision. We aim to complete reviews
        within ten business days.
      </p>

      <h2>External escalation</h2>
      <p>
        If we cannot resolve your complaint after completing our internal process, or if 40 business
        days have passed without resolution, you may refer your complaint to the Telecommunications
        Industry Ombudsman (TIO) at tio.com.au or by calling 1800 062 058. The TIO provides a free
        and independent dispute resolution service.
      </p>

      <h2>Vulnerable customers</h2>
      <p>
        If you are experiencing financial hardship or other circumstances affecting your ability
        to resolve issues, please let us know so we can tailor our approach and prioritise your
        complaint accordingly.
      </p>
    </LegalPageShell>
  )
}
