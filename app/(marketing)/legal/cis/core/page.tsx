import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Critical Information Summary — Core Plan',
  description: 'DOT Mobile Core Plan CIS. $42/month, 50 GB, no contract.',
  path: '/legal/cis/core',
})

export default function CISCorePage() {
  return (
    <LegalPageShell title="Critical Information Summary — Core" lastUpdated="1 January 2025">
      <p>This Critical Information Summary is published by DOT Mobile Pty Ltd in accordance with the TCP Code.</p>
      <h2>Plan details</h2>
      <ul>
        <li><strong>Plan name:</strong> Core</li>
        <li><strong>Monthly charge:</strong> $42.00 (incl. GST)</li>
        <li><strong>Data:</strong> 50 GB per month</li>
        <li><strong>Download speed:</strong> Up to 150 Mbps</li>
        <li><strong>Upload speed:</strong> Up to 50 Mbps (typical)</li>
        <li><strong>Contract:</strong> No lock-in contract — month-to-month</li>
        <li><strong>Exit fee:</strong> $0</li>
      </ul>
      <h2>Inclusions</h2>
      <ul>
        <li>Unlimited standard national voice calls</li>
        <li>Unlimited standard national SMS and MMS</li>
        <li>Mobile hotspot</li>
        <li>Voicemail and Caller ID</li>
        <li>eSIM-only activation</li>
      </ul>
      <h2>Exclusions</h2>
      <ul>
        <li>International calls and SMS (available as add-on)</li>
        <li>International roaming (not available on Core plan)</li>
        <li>Premium rate services</li>
      </ul>
      <h2>When data runs out</h2>
      <p>Once your 50 GB allowance is exhausted, data speed is reduced to approximately 1 Mbps for the rest of the billing cycle. No excess data charges apply. Data add-ons are available to restore full speeds.</p>
      <h2>Network</h2>
      <p>Delivered over the Telstra wholesale mobile network (4G and 5G). See dotmobile.com.au/coverage.</p>
      <h2>Billing</h2>
      <p>Billed monthly in advance. Payment by card via Stripe.</p>
      <h2>Complaints</h2>
      <p>support@dotmobile.com.au — TIO: tio.com.au or 1800 062 058.</p>
    </LegalPageShell>
  )
}
