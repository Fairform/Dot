export default function NeedHelpCallout({ email = 'support@dotmobile.com.au' }: { email?: string }) {
  return (
    <div className="mt-12 border border-dot-grey-200 rounded-2xl p-6 bg-dot-grey-50">
      <p className="text-sm font-semibold text-dot-black mb-1">Still need help?</p>
      <p className="text-sm text-dot-grey-600 mb-4 leading-relaxed">
        If you could not find what you were looking for, our support team is here. We respond within one business day.
      </p>
      <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-dot-black border-b border-dot-black pb-0.5 hover:opacity-60 transition-opacity">
        Email {email}
      </a>
    </div>
  )
}
