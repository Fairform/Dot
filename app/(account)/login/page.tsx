/**
 * Login page — scaffold.
 * Replace with Supabase Auth UI or custom form once auth is ready.
 */
import Link from 'next/link'
import LogoDots from '@/components/ui/LogoDots'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-dot-grey-50">
      <Link href="/" className="flex items-center gap-2.5 mb-10" aria-label="DOT Mobile">
        <LogoDots />
        <div className="leading-none">
          <span className="block text-[16px] font-black tracking-[0.5px] text-dot-black">DOT</span>
          <span className="block text-[7px] font-semibold tracking-[2.5px] text-dot-grey-400">MOBILE</span>
        </div>
      </Link>
      <div className="card p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-black text-dot-black mb-2">Sign in</h1>
        <p className="text-sm text-dot-grey-500 mb-8">Account management is coming soon.</p>
        <p className="text-xs text-dot-grey-400 mb-4">
          Need help with your plan or eSIM? Contact us:
        </p>
        <a href="mailto:support@dotmobile.com.au" className="btn-primary text-sm w-full justify-center">
          Email support
        </a>
        <Link href="/" className="block text-center text-sm text-dot-grey-400 hover:text-dot-black transition-colors mt-4">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
