interface LogoDotsProps {
  invert?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function LogoDots({ invert = false, size = 'sm' }: LogoDotsProps) {
  const fill   = invert ? 'white'           : '#0A0A0A'
  const dimmed = invert ? 'rgba(255,255,255,0.28)' : '#C8C8C8'
  const sizes  = { sm: 28, md: 36, lg: 48 }
  const w = sizes[size]
  const h = Math.round(w * 0.72)

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 36 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Signal bar ascending dot pattern — left to right, bottom to top */}
      {/* Row 4 — bottom, fullest row */}
      <circle cx="4"  cy="22" r="2.4" fill={dimmed} />
      <circle cx="10" cy="22" r="2.4" fill={fill} />
      <circle cx="16" cy="22" r="2.4" fill={fill} />
      <circle cx="22" cy="22" r="2.4" fill={fill} />
      <circle cx="28" cy="22" r="2.4" fill={fill} />
      <circle cx="34" cy="22" r="2.4" fill={fill} />
      {/* Row 3 */}
      <circle cx="16" cy="16" r="2.4" fill={fill} />
      <circle cx="22" cy="16" r="2.4" fill={fill} />
      <circle cx="28" cy="16" r="2.4" fill={fill} />
      <circle cx="34" cy="16" r="2.4" fill={fill} />
      {/* Row 2 */}
      <circle cx="22" cy="10" r="2.4" fill={fill} />
      <circle cx="28" cy="10" r="2.4" fill={fill} />
      <circle cx="34" cy="10" r="2.4" fill={fill} />
      {/* Row 1 — top, tallest bar */}
      <circle cx="28" cy="4"  r="2.4" fill={fill} />
      <circle cx="34" cy="4"  r="2.4" fill={fill} />
    </svg>
  )
}
