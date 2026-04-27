import { createClient } from '@supabase/supabase-js'
import type { Order } from '@/types/checkout'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase      = createClient(url, anon)
export const supabaseAdmin = createClient(url, svc)

export async function createOrder(data: Omit<Order, 'id' | 'created_at'>) {
  const { data: order, error } = await supabaseAdmin.from('orders').insert(data).select().single()
  if (error) throw error
  return order as Order
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  const { data, error } = await supabaseAdmin.from('orders').select().eq('stripe_session_id', sessionId).single()
  if (error) return null
  return data as Order
}

export async function updateOrder(id: string, updates: Partial<Order>) {
  const { data, error } = await supabaseAdmin.from('orders').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Order
}
