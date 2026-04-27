import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Critical Information Summary — Unlimited Plan',
  description: 'DOT Mobile Unlimited Plan CIS. $55/month, no data cap, fair use applies.',
  path: '/legal/cis/unlimited',
})

export default function CISUnlimitedPage() {
  return (
    <LegalPageShell title="Critical Information Summary — Unlimited" lastUpdated="1 January 2025">
      <p>This Critical Information Summary is published by DOT Mobile Pty Ltd in accordance with the TCP Code.</p>
      <h2>Plan details</h2>
      <ul>
        <li><strong>Plan name:</strong> Unlimited</li>
        <li><strong>Monthly charge:</strong> $55.00 (incl. GST)</li>
        <li><strong>Data:</strong> No cap — fair use applies</li>
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
        <li>International roaming add-ons available</li>
      </ul>
      <h2>Fair use</h2>
      <p>This plan is intended for personal mobile use. Use that exceeds reasonable personal consumption — including use as a fixed broadband replacement or data reselling — is outside the plan's intended scope and may result in speed management. See dotmobile.com.au/legal/fair-use.</p>
      <h2>Network</h2>
      <p>Delivered over the Telstra wholesale mobile network (4G and 5G).</p>
      <h2>Billing</h2>
      <p>Billed monthly in advance. Payment by card via Stripe.</p>
      <h2>Complaints</h2>
      <p>support@dotmobile.com.au — TIO: tio.com.au or 1800 062 058.</p>
    </LegalPageShell>
  )
}
