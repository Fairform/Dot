import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  appInfo: { name: 'DOT Mobile', version: '1.0.0', url: 'https://dotmobile.com.au' },
})

export async function createCheckoutSession({
  planKey, stripePriceId, customerEmail, metadata, successUrl, cancelUrl,
}: {
  planKey: string; stripePriceId: string; customerEmail: string
  metadata: Record<string, string>; successUrl: string; cancelUrl: string
}) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [{ price: stripePriceId, quantity: 1 }],
    metadata: { ...metadata, plan_key: planKey },
    subscription_data: { metadata: { ...metadata, plan_key: planKey } },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  })
}
