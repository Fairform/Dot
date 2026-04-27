import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrder, updateOrder, getOrderBySessionId } from '@/lib/supabase'
import { provisionESIM, requestNumberPort } from '@/lib/carrier'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const meta    = session.metadata ?? {}

        // Create order record
        const order = await createOrder({
          stripe_session_id:       session.id,
          stripe_subscription_id:  session.subscription as string ?? null,
          plan_key:                meta.plan_key,
          first_name:              meta.first_name,
          last_name:               meta.last_name,
          email:                   session.customer_email ?? '',
          date_of_birth:           meta.date_of_birth,
          address:                 meta.address,
          keep_number:             meta.keep_number === 'true',
          current_number:          meta.current_number || null,
          current_provider:        meta.current_provider || null,
          status:                  'processing',
          port_status:             'not_requested',
          port_id:                 null,
          esim_qr_url:             null,
          esim_activation_code:    null,
          error_message:           null,
        })

        // Provision eSIM
        try {
          const esim = await provisionESIM({
            orderId:    order.id,
            planKey:    meta.plan_key,
            firstName:  meta.first_name,
            lastName:   meta.last_name,
            email:      session.customer_email ?? '',
            dateOfBirth: meta.date_of_birth,
            address:    meta.address,
          })

          await updateOrder(order.id, {
            status:               'active',
            esim_qr_url:          esim.qrCodeUrl,
            esim_activation_code: esim.activationCode,
          })
        } catch (esimErr) {
          console.error('[webhook] eSIM provisioning failed', esimErr)
          await updateOrder(order.id, {
            status: 'failed',
            error_message: String(esimErr),
          })
        }

        // Request number port if needed
        if (meta.keep_number === 'true' && meta.current_number) {
          try {
            const port = await requestNumberPort({
              orderId:         order.id,
              currentNumber:   meta.current_number,
              currentProvider: meta.current_provider,
              firstName:       meta.first_name,
              lastName:        meta.last_name,
              dateOfBirth:     meta.date_of_birth,
            })
            await updateOrder(order.id, {
              port_status: port.status,
              port_id:     port.portId,
            })
          } catch (portErr) {
            console.error('[webhook] port request failed', portErr)
            await updateOrder(order.id, { port_status: 'failed' })
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        console.log('[webhook] subscription cancelled:', sub.id)
        break
      }

      default:
        console.log('[webhook] unhandled event type:', event.type)
    }
  } catch (err) {
    console.error('[webhook] handler error', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
