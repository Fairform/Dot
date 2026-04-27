import type { Metadata } from 'next'

const BASE_URL = 'https://dotmobile.com.au'
const DEFAULT_OG = `${BASE_URL}/images/og-default.png`

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
  ogImage?: string
}): Metadata {
  const url = `${BASE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | DOT Mobile`,
      description,
      url,
      siteName: 'DOT Mobile',
      type: 'website',
      locale: 'en_AU',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DOT Mobile`,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
