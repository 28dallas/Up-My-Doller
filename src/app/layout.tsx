import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Pips Dollar Printer — Deriv Bot Builder & Copy Trading',
  description: 'Build profitable Deriv trading bots without coding. Copy top traders, download 500+ free bots, and automate your trading on Deriv.com.',
  keywords: 'Deriv bot builder, copy trading, trading bots Kenya, Deriv automation, binary options bot',
  metadataBase: new URL('https://up-my-doller-yn86.vercel.app'),
  openGraph: {
    title: 'Pips Dollar Printer — Deriv Bot Builder & Copy Trading',
    description: 'Build profitable Deriv trading bots without coding.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Pips Dollar Printer',
    url: 'https://up-my-doller-yn86.vercel.app',
  },
  twitter: {
    site: '@pipsdollarprinter',
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
  authors: [{ name: 'Pips Dollar Printer' }],
  publisher: 'Pips Dollar Printer',
  creator: 'Pips Dollar Printer',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
