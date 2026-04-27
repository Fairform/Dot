import LegalNav from '@/components/legal/LegalNav'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-site px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block"><LegalNav /></aside>
        <div>{children}</div>
      </div>
    </div>
  )
}
