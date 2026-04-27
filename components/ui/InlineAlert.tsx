interface InlineAlertProps {
  variant?: 'info' | 'warning' | 'success' | 'error'
  title?: string
  children: React.ReactNode
}

const STYLES = {
  info:    { wrap: 'bg-blue-50 border-blue-200 text-blue-800',    icon: 'ℹ' },
  warning: { wrap: 'bg-yellow-50 border-yellow-200 text-yellow-800', icon: '⚠' },
  success: { wrap: 'bg-green-50 border-green-200 text-green-800', icon: '✓' },
  error:   { wrap: 'bg-red-50 border-red-200 text-red-800',       icon: '✕' },
}

export default function InlineAlert({ variant = 'info', title, children }: InlineAlertProps) {
  const s = STYLES[variant]
  return (
    <div className={`my-5 border rounded-xl p-4 ${s.wrap}`}>
      <div className="flex gap-3">
        <span className="text-base flex-shrink-0 mt-0.5">{s.icon}</span>
        <div>
          {title && <p className="text-sm font-semibold mb-1">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
