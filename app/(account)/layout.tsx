/**
 * Account layout — scaffold only.
 * Full implementation after Supabase Auth integration.
 * Middleware (middleware.ts) will gate this route group once auth is live.
 */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dot-grey-50">
      <main id="main-content">{children}</main>
    </div>
  )
}
