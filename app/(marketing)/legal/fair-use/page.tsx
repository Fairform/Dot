import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Fair Use Policy',
  description: 'How fair use applies to DOT Mobile Unlimited and Ultra plans.',
  path: '/legal/fair-use',
})

export default function FairUsePage() {
  return (
    <LegalPageShell title="Fair Use Policy" lastUpdated="1 January 2025">
      <p>
        This Fair Use Policy applies to DOT Mobile Unlimited and Ultra plans. These plans offer no
        data cap, subject to the fair use conditions described in this policy.
      </p>

      <h2>What fair use means</h2>
      <p>
        Unlimited and Ultra plans are designed for typical personal mobile use including streaming
        video and music, browsing, social media, video calls, and mobile hotspot sharing with a
        small number of devices.
      </p>
      <p>
        Fair use does not mean unlimited for all purposes. The following uses fall outside the
        intended scope of these plans and may result in speed management or, in serious cases,
        service suspension:
      </p>
      <ul>
        <li>Using a mobile plan as a fixed broadband replacement for a household or business</li>
        <li>Reselling data to third parties</li>
        <li>Running servers or peer-to-peer file distribution networks</li>
        <li>Using automated systems to generate sustained high-volume traffic</li>
        <li>Any use that causes disproportionate impact on the shared network</li>
      </ul>

      <h2>Speed management</h2>
      <p>
        If your usage is identified as exceeding fair use, we will first attempt to contact you
        by email before taking any action. If the usage pattern continues, we may apply speed
        management to reduce your download speed for a temporary period.
      </p>

      <h2>What fair use does not restrict</h2>
      <p>
        Normal heavy personal use — including daily streaming in high definition, remote work
        video calls, large file downloads, and routine hotspot sharing — is within fair use on
        all Unlimited and Ultra plans.
      </p>

      <h2>Contact</h2>
      <p>Questions about fair use: support@dotmobile.com.au</p>
    </LegalPageShell>
  )
}
