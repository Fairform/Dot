/**
 * Account dashboard — scaffold.
 * Build out after Supabase Auth + subscription webhooks are confirmed working.
 */
export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-black text-dot-black mb-3">My Account</h1>
      <p className="text-sm text-dot-grey-500">
        Full account management is coming soon. For now, email us at{' '}
        <a href="mailto:support@dotmobile.com.au" className="text-dot-blue underline">
          support@dotmobile.com.au
        </a>{' '}
        for any account changes.
      </p>
    </div>
  )
}
