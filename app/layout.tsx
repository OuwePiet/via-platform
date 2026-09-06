import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './global.css'
import SiteNav from './site-nav'

export const metadata: Metadata = {
  metadataBase: new URL('https://viadeso.online'),
  title: {
    default: 'VIA — DeSo NFT platform',
    template: '%s | VIA',
  },
  description:
    'Explore DeSo NFT collections and public social activity through VIA, directly from the DeSo blockchain.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VIA — DeSo NFT platform',
    description:
      'Explore DeSo NFT collections and public social activity through VIA, directly from the DeSo blockchain.',
    url: '/',
    siteName: 'VIA',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteNav />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
