import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { buildLegalBreadcrumbs } from '@/lib/navigation/breadcrumbs'

interface LegalPageShellProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPageShell({ title, lastUpdated, children }: LegalPageShellProps) {
  const breadcrumbs = buildLegalBreadcrumbs(title)
  return (
    <article>
      <Breadcrumbs items={breadcrumbs} className="mb-6" />
      <header className="mb-10 pb-8 border-b border-dot-grey-200">
        <h1 className="text-2xl font-black text-dot-black mb-3 text-balance">{title}</h1>
        <p className="text-xs text-dot-grey-400">Last updated: {lastUpdated}</p>
      </header>
      <div className="prose-dot">{children}</div>
    </article>
  )
}
