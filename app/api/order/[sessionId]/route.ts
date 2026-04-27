import { NextRequest, NextResponse } from 'next/server'
import { getOrderBySessionId } from '@/lib/supabase'

interface Props { params: Promise<{ sessionId: string }> }

export async function GET(_req: NextRequest, { params }: Props) {
  const { sessionId } = await params
  if (!sessionId) return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })

  const order = await getOrderBySessionId(sessionId)
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  return NextResponse.json({
    status:      order.status,
    port_status: order.port_status,
    esim_qr_url: order.esim_qr_url,
    plan_key:    order.plan_key,
  })
}

export async function POST(_req: NextRequest, { params }: Props) {
  const { sessionId } = await params
  const order = await getOrderBySessionId(sessionId)
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  // TODO: trigger Resend email with eSIM QR code
  console.log('[order/resend] resend activation email for', order.id)
  return NextResponse.json({ success: true })
}
