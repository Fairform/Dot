export type PlanKey = 'starter' | 'core' | 'unlimited' | 'ultra'

export interface PlanDefinition {
  key: PlanKey
  name: string
  tagline: string
  description: string
  data: string
  speed: string
  speedNote: string | null
  price: number
  featured: boolean
  dark: boolean
  ctaLabel: string
  stripePriceId: string
  inclusions: string[]
}

export interface FeatureRow {
  feature: string
  starter: string | boolean | null
  core: string | boolean | null
  unlimited: string | boolean | null
  ultra: string | boolean | null
}
