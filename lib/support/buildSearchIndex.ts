import fs from 'fs'
import path from 'path'

// Direct imports to avoid path alias issues
const CATEGORIES = [
  'more-about-dot-mobile',
  'sign-up-and-activation',
  'esim-and-devices',
  'plans-billing-and-payments',
  'network-coverage-and-speeds',
  'troubleshooting-and-service-recovery',
  'security-fraud-and-scam-protection',
  'international-roaming-and-add-ons',
  'legal-privacy-and-compliance',
]

const CATEGORY_TITLES: Record<string, string> = {
  'more-about-dot-mobile': 'More about DOT Mobile',
  'sign-up-and-activation': 'Sign up and Activation',
  'esim-and-devices': 'eSIM and Devices',
  'plans-billing-and-payments': 'Plans, Billing and Payments',
  'network-coverage-and-speeds': 'Network, Coverage and Speeds',
  'troubleshooting-and-service-recovery': 'Troubleshooting and Service Recovery',
  'security-fraud-and-scam-protection': 'Security, Fraud and Scam Protection',
  'international-roaming-and-add-ons': 'International Roaming and Add-ons',
  'legal-privacy-and-compliance': 'Legal, Privacy and Compliance',
}

async function build() {
  const index: object[] = []
  for (const cat of CATEGORIES) {
    const catPath = path.join(process.cwd(), 'content', 'support', cat, '_category.ts')
    if (!fs.existsSync(catPath)) { console.log(`Skipping ${cat} — no _category.ts`); continue }
    const content = fs.readFileSync(catPath, 'utf-8')
    const slugMatches = [...content.matchAll(/slug:\s*'([^']+)'/g)]
    const titleMatches = [...content.matchAll(/title:\s*'([^']+)'/g)]
    const descMatches  = [...content.matchAll(/description:\s*'([^']+)'/g)]
    const tagMatches   = [...content.matchAll(/tags:\s*\[([^\]]+)\]/g)]
    for (let i = 0; i < slugMatches.length; i++) {
      const slug  = slugMatches[i]?.[1] ?? ''
      const title = titleMatches[i]?.[1] ?? ''
      const desc  = descMatches[i]?.[1] ?? ''
      const rawTags = tagMatches[i]?.[1] ?? ''
      const tags = [...rawTags.matchAll(/'([^']+)'/g)].map(m => m[1])
      if (slug) index.push({ slug, category: cat, categoryTitle: CATEGORY_TITLES[cat], title, description: desc, url: `/support/${cat}/${slug}`, tags })
    }
  }
  const out = path.join(process.cwd(), 'public', 'support-index.json')
  fs.writeFileSync(out, JSON.stringify(index, null, 2))
  console.log(`Search index: ${index.length} articles → ${out}`)
}

build().catch(e => { console.error(e); process.exit(1) })
