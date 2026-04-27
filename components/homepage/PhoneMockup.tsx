'use client'

/**
 * Phone mockup — single state, no noise.
 * Shows: Connected, data usage, next recharge.
 * No floating cards. No speed gauges. No badges outside the frame.
 */
export default function PhoneMockup() {
  const W = 252, H = 530
  const F = 10          // frame inset
  const R = 46          // outer corner radius
  const SR = R - F + 1  // screen corner radius

  return (
    <div className="relative flex justify-center items-center py-8">
      <div style={{ width: W, filter: 'drop-shadow(0 32px 72px rgba(0,0,0,0.28)) drop-shadow(0 4px 16px rgba(0,0,0,0.16))' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pm-frame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#8C8C92" />
              <stop offset="35%"  stopColor="#BABABE" />
              <stop offset="65%"  stopColor="#6A6A6F" />
              <stop offset="100%" stopColor="#ABABB0" />
            </linearGradient>
            <linearGradient id="pm-screen-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#F8F8F8" />
              <stop offset="100%" stopColor="#F2F2F2" />
            </linearGradient>
            <linearGradient id="pm-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#1D6FE8" />
              <stop offset="100%" stopColor="#5A9BF0" />
            </linearGradient>
            <linearGradient id="pm-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1D6FE8" />
              <stop offset="100%" stopColor="#5A9BF0" />
            </linearGradient>
            <clipPath id="pm-screen">
              <rect x={F} y={F} width={W-F*2} height={H-F*2} rx={SR} />
            </clipPath>
          </defs>

          {/* Physical buttons */}
          <rect x={W-2} y={152} width={4} height={68} rx="2" fill="url(#pm-frame)" />
          <rect x={-2}  y={134} width={4} height={32} rx="2" fill="url(#pm-frame)" />
          <rect x={-2}  y={176} width={4} height={56} rx="2" fill="url(#pm-frame)" />
          <rect x={-2}  y={242} width={4} height={56} rx="2" fill="url(#pm-frame)" />

          {/* Frame */}
          <rect x={0} y={0} width={W} height={H} rx={R} fill="url(#pm-frame)" />
          <rect x={2} y={2} width={W-4} height={H-4} rx={R-2} fill="#181818" />

          {/* Camera island - top left */}
          <rect x={16} y={16} width={46} height={46} rx={14} fill="#0F0F0F" stroke="#252527" strokeWidth="0.5" />
          <circle cx={32} cy={32} r={10}  fill="#181818" stroke="#303032" strokeWidth="0.5" />
          <circle cx={32} cy={32} r={7}   fill="#090909" />
          <circle cx={32} cy={32} r={4}   fill="#080814" />
          <circle cx={30} cy={30} r={1.2} fill="rgba(255,255,255,0.22)" />
          <circle cx={50} cy={32} r={8.5} fill="#181818" stroke="#303032" strokeWidth="0.5" />
          <circle cx={50} cy={32} r={5.5} fill="#090909" />
          <circle cx={50} cy={32} r={3}   fill="#08080E" />
          <circle cx={48} cy={30} r={0.9} fill="rgba(255,255,255,0.18)" />
          <circle cx={32} cy={50} r={8.5} fill="#181818" stroke="#303032" strokeWidth="0.5" />
          <circle cx={32} cy={50} r={5.5} fill="#090909" />
          <circle cx={32} cy={50} r={3}   fill="#08080E" />
          <circle cx={30} cy={48} r={0.9} fill="rgba(255,255,255,0.18)" />
          <circle cx={50} cy={50} r={5}   fill="#252527" />
          <circle cx={50} cy={50} r={3}   fill="rgba(255,252,200,0.65)" />

          {/* Screen background */}
          <rect x={F} y={F} width={W-F*2} height={H-F*2} rx={SR} fill="url(#pm-screen-bg)" />

          {/* Screen content */}
          <g clipPath="url(#pm-screen)">
            <ScreenContent W={W} F={F} />
          </g>

          {/* Dynamic Island */}
          <rect x={W/2-48} y={F+10} width={96} height={28} rx={14} fill="#000000" />
          <circle cx={W/2+20} cy={F+24} r={5.5} fill="#181818" />
          <circle cx={W/2+20} cy={F+24} r={3.5} fill="#080808" />
          <circle cx={W/2+20} cy={F+24} r={2}   fill="#08080E" />
          <circle cx={W/2+18} cy={F+22} r={0.7} fill="rgba(255,255,255,0.25)" />

          {/* Frame highlight */}
          <rect x={0} y={0} width={W} height={H} rx={R}
            fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
          <path d={`M${R} 1 A${R-1} ${R-1} 0 0 0 1 ${R}`}
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}

function ScreenContent({ W, F }: { W: number; F: number }) {
  const L  = F           // screen left edge
  const SW = W - F * 2   // screen width ≈ 232
  const CX = L + SW / 2

  return (
    <g>
      <rect x={L} y={F} width={SW} height={512} fill="#F8F8F8" />

      {/* ── Status bar ── */}
      <text x={L+16} y={F+62}
        fontSize="10.5" fontWeight="700" letterSpacing="1.5"
        fontFamily="system-ui, -apple-system" fill="#0A0A0A">DOT</text>
      <text x={L+16} y={F+73}
        fontSize="5.5" fontWeight="600" letterSpacing="2.8"
        fontFamily="system-ui, -apple-system" fill="#A0A0A0">MOBILE</text>

      {/* Signal bars */}
      {[3,5,7,9,11].map((h, i) => (
        <rect key={i}
          x={L+SW-34+i*4.8} y={F+64-h}
          width="3.2" height={h} rx="1"
          fill={i < 4 ? '#0A0A0A' : '#E0E0E0'} />
      ))}
      <text x={L+SW-9} y={F+65}
        fontSize="7.5" fontWeight="800"
        fontFamily="system-ui" fill="#0A0A0A" textAnchor="middle">5G</text>

      {/* ── Connected card ── */}
      <rect x={L+10} y={F+84} width={SW-20} height={66} rx="16" fill="#F0F0F0" />
      <circle cx={L+26} cy={F+107} r={4} fill="#22C55E" />
      <circle cx={L+26} cy={F+107} r={2.2} fill="#15803D" />
      <text x={L+37} y={F+100}
        fontSize="6" fontWeight="700" letterSpacing="1.5"
        fontFamily="system-ui" fill="#A0A0A0">STATUS</text>
      <text x={L+37} y={F+113}
        fontSize="16" fontWeight="900"
        fontFamily="system-ui" fill="#0A0A0A">Connected</text>
      <text x={L+37} y={F+125}
        fontSize="8.5" fontFamily="system-ui" fill="#A0A0A0">Excellent signal · Telstra 5G</text>

      {/* ── Data usage card ── */}
      <rect x={L+10} y={F+160} width={SW-20} height={92} rx="16" fill="#F0F0F0" />
      <text x={L+22} y={F+176}
        fontSize="6" fontWeight="700" letterSpacing="1.5"
        fontFamily="system-ui" fill="#A0A0A0">DATA USAGE</text>
      <text x={L+22} y={F+194}
        fontSize="16.5" fontWeight="900"
        fontFamily="system-ui" fill="#0A0A0A">36.2 GB</text>
      <text x={L+22} y={F+206}
        fontSize="8.5" fontFamily="system-ui" fill="#A0A0A0">of 50 GB · 9 days left</text>

      {/* Progress bar */}
      <rect x={L+22} y={F+216} width={SW-100} height={5} rx="2.5" fill="#E0E0E0" />
      <rect x={L+22} y={F+216} width={(SW-100)*0.724} height={5} rx="2.5" fill="url(#pm-bar)" />

      {/* Ring */}
      <circle cx={L+SW-40} cy={F+196} r={24} fill="none" stroke="#E0E0E0" strokeWidth="5" />
      <circle cx={L+SW-40} cy={F+196} r={24} fill="none" stroke="url(#pm-ring)" strokeWidth="5"
        strokeDasharray={`${150.8*0.724} 150.8`} strokeLinecap="round"
        transform={`rotate(-90 ${L+SW-40} ${F+196})`} />
      <text x={L+SW-40} y={F+200}
        fontSize="9.5" fontWeight="900"
        fontFamily="system-ui" fill="#0A0A0A" textAnchor="middle">72%</text>

      {/* ── Next recharge card ── */}
      <rect x={L+10} y={F+262} width={SW-20} height={70} rx="16" fill="#0A0A0A" />
      <text x={L+22} y={F+278}
        fontSize="6" fontWeight="700" letterSpacing="1.5"
        fontFamily="system-ui" fill="rgba(255,255,255,0.32)">NEXT RECHARGE</text>
      <text x={L+22} y={F+293}
        fontSize="9.5" fontFamily="system-ui" fill="rgba(255,255,255,0.50)">20 May 2025</text>
      <text x={L+22} y={F+312}
        fontSize="21" fontWeight="900"
        fontFamily="system-ui" fill="white">$42</text>
      <text x={L+SW-20} y={F+300}
        fontSize="9" fontFamily="system-ui" fill="rgba(255,255,255,0.28)"
        textAnchor="end">Core plan</text>

      {/* ── eSIM card ── */}
      <rect x={L+10} y={F+342} width={SW-20} height={54} rx="16" fill="#F0F0F0" />
      <text x={L+22} y={F+358}
        fontSize="6" fontWeight="700" letterSpacing="1.5"
        fontFamily="system-ui" fill="#A0A0A0">eSIM</text>
      <text x={L+22} y={F+374}
        fontSize="14.5" fontWeight="700"
        fontFamily="system-ui" fill="#0A0A0A">Active</text>
      <circle cx={L+SW-26} cy={F+365} r={5} fill="#22C55E" opacity="0.15" />
      <circle cx={L+SW-26} cy={F+365} r={3} fill="#22C55E" />

      {/* ── Bottom nav ── */}
      <rect x={L} y={F+450} width={SW} height={62} fill="rgba(248,248,250,0.97)" />
      <rect x={L} y={F+450} width={SW} height={0.5} fill="rgba(0,0,0,0.06)" />
      <rect x={CX-50} y={F+496} width={100} height={4} rx={2} fill="rgba(0,0,0,0.15)" />

      {[
        { label: 'Home',  active: true  },
        { label: 'Usage', active: false },
        { label: 'Bill',  active: false },
        { label: 'Help',  active: false },
      ].map((tab, i) => {
        const tx = L + (SW / 4) * i + SW / 8
        return (
          <g key={tab.label}>
            <rect x={tx-13} y={F+458} width={26} height={18} rx={6}
              fill={tab.active ? '#0A0A0A' : 'transparent'} />
            <text x={tx} y={F+471}
              fontSize="6.5" fontWeight={tab.active ? '700' : '500'}
              fontFamily="system-ui" fill={tab.active ? 'white' : '#ABABAB'}
              textAnchor="middle">{tab.label}</text>
          </g>
        )
      })}
    </g>
  )
}
