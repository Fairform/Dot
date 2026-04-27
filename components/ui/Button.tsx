import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
}

const SIZES = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

export default function Button({
  variant = 'primary', size = 'md', href, onClick, disabled, loading,
  children, className = '', type = 'button',
}: ButtonProps) {
  const classes = `${VARIANTS[variant]} ${SIZES[size]} ${disabled || loading ? 'opacity-40 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={classes}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : null}
      {children}
    </button>
  )
}
