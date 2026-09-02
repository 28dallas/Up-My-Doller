import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import SiteShell from '@/components/layout/SiteShell'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pipsdollarprinter.com'

export const metadata: Metadata = {
  title: 'SmartTraders — Deriv Bot Builder, Copy Trading & Trading Education',
  description: 'Learn to trade Deriv like a pro. Build profitable Deriv trading bots without coding, copy top traders, access free bots, trading strategies, a risk calculator, and beginner education — all in one place.',
  keywords: 'Deriv bot builder, copy trading, trading bots Kenya, Deriv automation, binary options bot, learn Deriv, Deriv strategies, Deriv risk calculator, Deriv tutorial',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'SmartTraders — Deriv Bot Builder, Copy Trading & Trading Education',
    description: 'Learn to trade Deriv like a pro. Build profitable Deriv trading bots, copy top traders, and access beginner education.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'SmartTraders',
    url: siteUrl,
  },
  twitter: {
    site: '@smarttraders',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'SmartTraders' }],
  publisher: 'SmartTraders',
  creator: 'SmartTraders',
  verification: {
    google: '7KAQmHAf5sUT1FBuVWlriG2X2VfsfNYhILE_LppahpY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-white antialiased">
        <Suspense fallback={<>{children}</>}>
          <SiteShell>{children}</SiteShell>
        </Suspense>
      </body>
    </html>
  )
}
