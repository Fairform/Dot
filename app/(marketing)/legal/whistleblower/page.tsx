import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import LegalPageShell from '@/components/legal/LegalPageShell'

export const metadata: Metadata = buildMetadata({
  title: 'Whistleblower Policy',
  description: 'DOT Mobile Whistleblower Policy — how to report wrongdoing and the protections available.',
  path: '/legal/whistleblower',
})

export default function WhistleblowerPage() {
  return (
    <LegalPageShell title="Whistleblower Policy" lastUpdated="1 January 2025">
      <p>
        DOT Mobile Pty Ltd is committed to the highest standards of ethical conduct. This policy
        provides a mechanism for individuals to report concerns about potential wrongdoing and
        sets out the protections available. This policy is required under Part 9.4AAA of the
        Corporations Act 2001 (Cth).
      </p>

      <h2>Who is protected</h2>
      <p>
        Protections extend to current and former employees, contractors, consultants, suppliers
        and their employees, officers and directors of DOT Mobile, and relatives or dependants
        of any of the above.
      </p>

      <h2>What can be reported</h2>
      <p>You may make a protected disclosure if you have reasonable grounds to suspect:</p>
      <ul>
        <li>Conduct that constitutes an offence against an Australian law</li>
        <li>Misconduct including fraud, bribery, or corruption</li>
        <li>A serious breach of our policies or code of conduct</li>
        <li>A serious safety risk to public health</li>
        <li>Deliberate concealment of any of the above</li>
      </ul>

      <h2>How to make a disclosure</h2>
      <p>
        Contact the CEO or a Director of DOT Mobile directly at whistleblower@dotmobile.com.au.
        You may make a disclosure anonymously. You may also report to ASIC (asic.gov.au),
        the ATO for tax-related matters, or a legal practitioner for advice.
      </p>

      <h2>Protections</h2>
      <p>
        We will take all reasonable steps to protect the identity of a whistleblower. It is a
        serious breach of this policy and potentially a criminal offence under the Corporations
        Act 2001 (Cth) to cause detriment to a person because they made, or are suspected of
        making, a protected disclosure. Eligible whistleblowers are immune from civil, criminal,
        or administrative liability for making a protected disclosure.
      </p>

      <h2>False reports</h2>
      <p>
        This policy does not protect a person who knowingly makes a false disclosure. Making
        a knowingly false disclosure may constitute a criminal offence.
      </p>
    </LegalPageShell>
  )
}
