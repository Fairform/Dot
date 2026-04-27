import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dotmobile.com.au'),
  title: {
    default: 'DOT Mobile — Simple eSIM mobile.',
    template: '%s | DOT Mobile',
  },
  description: 'Prepaid eSIM mobile plans for Australia. No contracts. No stores. Activate in minutes.',
  openGraph: { type: 'website', locale: 'en_AU', siteName: 'DOT Mobile' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-screen antialiased bg-dot-bg text-dot-black">
        {children}
      </body>
    </html>
  )
}
