import { NextRequest, NextResponse } from 'next/server'

const reqMap = new Map<string, { count: number; reset: number }>()

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = reqMap.get(ip)
  if (!entry || entry.reset < now) {
    reqMap.set(ip, { count: 1, reset: now + windowMs })
    return false
  }
  if (entry.count >= limit) return true
  entry.count++
  return false
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anon'
  const isDev = process.env.NODE_ENV === 'development'

  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/checkout/webhook')) {
    if (isRateLimited(ip, 30, 60_000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }
  }

  const res = NextResponse.next()

  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com"
    : "script-src 'self' 'unsafe-inline' https://js.stripe.com"

  const connectSrc = isDev
    ? "connect-src 'self' https://api.stripe.com https://*.supabase.co ws://localhost:* wss://localhost:*"
    : "connect-src 'self' https://api.stripe.com https://*.supabase.co"

  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      connectSrc,
      "frame-src https://js.stripe.com",
    ].join('; ')
  )

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
