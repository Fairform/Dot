interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'inverted' | 'blue'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default:  'bg-dot-grey-100 text-dot-black',
    inverted: 'bg-white/15 text-white',
    blue:     'bg-dot-blue/10 text-dot-blue',
  }
  return (
    <span className={`inline-block text-[10px] font-bold tracking-[0.8px] px-2.5 py-1 rounded-md ${styles[variant]}`}>
      {children}
    </span>
  )
}
