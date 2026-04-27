import Link from 'next/link'
import LogoDots from '@/components/ui/LogoDots'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dot-grey-50">
      <header className="bg-white border-b border-dot-grey-200 h-[58px] flex items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DOT Mobile — Home">
          <LogoDots />
          <div className="leading-none">
            <span className="block text-[16px] font-black tracking-[0.5px] text-dot-black">DOT</span>
            <span className="block text-[7px] font-semibold tracking-[2.5px] text-dot-grey-400">MOBILE</span>
          </div>
        </Link>
        <Link href="/plans" className="ml-auto text-sm text-dot-grey-500 hover:text-dot-black transition-colors">
          ← Back to plans
        </Link>
      </header>
      <main id="main-content">{children}</main>
    </div>
  )
}
