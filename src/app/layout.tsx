import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import FloatingAI from '@/components/learn/FloatingAI'
import { DERIV_AFFILIATE_LINK } from '@/lib/constants'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pipsdollarprinter.com'

export const metadata: Metadata = {
  title: 'Pips Dollar Printer — Deriv Bot Builder, Copy Trading & Trading Education',
  description: 'Learn to trade Deriv like a pro. Build profitable Deriv trading bots without coding, copy top traders, access free bots, trading strategies, a risk calculator, and beginner education — all in one place.',
  keywords: 'Deriv bot builder, copy trading, trading bots Kenya, Deriv automation, binary options bot, learn Deriv, Deriv strategies, Deriv risk calculator, Deriv tutorial',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Pips Dollar Printer — Deriv Bot Builder, Copy Trading & Trading Education',
    description: 'Learn to trade Deriv like a pro. Build profitable Deriv trading bots, copy top traders, and access beginner education.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Pips Dollar Printer',
    url: siteUrl,
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
        <FloatingAI />
        <a
          href={DERIV_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Free Deriv Account"
          className="fixed right-4 bottom-6 z-50 hidden items-center justify-center gap-2 rounded-full bg-[#00c853] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(0,200,83,0.35)] transition-all hover:bg-[#00e676] hover:shadow-[0_12px_36px_rgba(0,200,83,0.45)] md:inline-flex"
        >
          Open Free Deriv Account →
        </a>
        <a
          href={DERIV_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Free Deriv Account"
          className="fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-[#00c853] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(0,200,83,0.35)] transition-all hover:bg-[#00e676] hover:shadow-[0_12px_36px_rgba(0,200,83,0.45)] md:hidden"
        >
          Open Free Deriv Account →
        </a>
        <div className="pb-28">
          {children}
        </div>
      </body>
    </html>
  )
}
