'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HeroEmailInput() {
  const [email, setEmail] = useState('')

  return (
    <div className="mt-7 flex items-center rounded-full bg-white p-1 shadow-sm ring-1 ring-black/10">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-56 bg-transparent px-5 text-sm outline-none placeholder:text-black/35"
        placeholder="Enter your email"
      />
      <Link
        href="/plans"
        className="rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white"
      >
        Get connected
      </Link>
    </div>
  )
}
