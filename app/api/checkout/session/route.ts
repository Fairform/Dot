import { NextRequest, NextResponse } from 'next/server'
import { stripe, createCheckoutSession } from '@/lib/stripe'
import { getPlan } from '@/lib/plans/plansData'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planKey, firstName, lastName, email, dateOfBirth, address, keepNumber, currentNumber, currentProvider } = body

    if (!planKey || !email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const plan = getPlan(planKey)
    if (!plan.stripePriceId) {
      return NextResponse.json({ error: 'Plan pricing is not configured.' }, { status: 500 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://dotmobile.com.au'

    const session = await createCheckoutSession({
      planKey,
      stripePriceId: plan.stripePriceId,
      customerEmail: email,
      metadata: {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth ?? '',
        address: address ?? '',
        keep_number: String(keepNumber),
        current_number: currentNumber ?? '',
        current_provider: currentProvider ?? '',
      },
      successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${planKey}`,
      cancelUrl: `${appUrl}/checkout?plan=${planKey}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout/session]', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
