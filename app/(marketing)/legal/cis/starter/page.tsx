import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Critical Information Summary — Starter Plan',
  description: 'DOT Mobile Starter Plan CIS. $35/month, 25 GB, no contract.',
  path: '/legal/cis/starter',
})

export default function CISStarterPage() {
  return (
    <LegalPageShell title="Critical Information Summary — Starter" lastUpdated="1 January 2025">
      <p>This Critical Information Summary is published by DOT Mobile Pty Ltd in accordance with the Telecommunications Consumer Protections (TCP) Code.</p>
      <h2>Plan details</h2>
      <ul>
        <li><strong>Plan name:</strong> Starter</li>
        <li><strong>Monthly charge:</strong> $35.00 (incl. GST)</li>
        <li><strong>Data:</strong> 25 GB per month</li>
        <li><strong>Download speed:</strong> Up to 100 Mbps</li>
        <li><strong>Upload speed:</strong> Up to 50 Mbps (typical)</li>
        <li><strong>Contract:</strong> No lock-in contract — month-to-month</li>
        <li><strong>Exit fee:</strong> $0</li>
      </ul>
      <h2>Inclusions</h2>
      <ul>
        <li>Unlimited standard national voice calls to Australian landlines and mobiles</li>
        <li>Unlimited standard national SMS and MMS</li>
        <li>Mobile hotspot / personal hotspot</li>
        <li>Voicemail</li>
        <li>Caller ID</li>
        <li>eSIM-only activation (no physical SIM supplied)</li>
      </ul>
      <h2>Exclusions</h2>
      <ul>
        <li>International calls (available as add-on)</li>
        <li>International SMS (available as add-on)</li>
        <li>International roaming (not available on Starter plan)</li>
        <li>Calls to premium rate numbers (190x)</li>
      </ul>
      <h2>When data runs out</h2>
      <p>Once your 25 GB monthly data allowance is exhausted, your data speed is reduced to approximately 1 Mbps for the remainder of the billing cycle. You will not be charged excess data fees. You may purchase a data add-on to restore full speeds.</p>
      <h2>Network</h2>
      <p>Services are provided over the Telstra wholesale mobile network (4G and 5G). Coverage information is available at dotmobile.com.au/coverage.</p>
      <h2>Billing</h2>
      <p>Billed monthly in advance on your renewal date. Payment by credit or debit card via Stripe.</p>
      <h2>Complaints</h2>
      <p>Contact us at support@dotmobile.com.au. If unresolved, contact the TIO at tio.com.au or 1800 062 058.</p>
    </LegalPageShell>
  )
}
