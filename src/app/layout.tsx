import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/shared/Providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pipsdollarprinter.com'),
  title: 'Pips Dollar Printer — Deriv Bot Builder & Copy Trading Africa',
  description:
    'Build and download free Deriv trading bots. Copy top traders in Kenya, Tanzania, Uganda. No coding required. M-Pesa payments accepted.',
  keywords: [
    'deriv bot builder kenya',
    'free deriv bots',
    'copy trading deriv',
    'volatility 75 bot',
    'deriv automation africa',
    'trading bots kenya',
  ],
  openGraph: {
    title: 'Pips Dollar Printer — Deriv Bot Builder & Copy Trading Africa',
    description:
      'Build and download free Deriv trading bots. Copy top traders across Africa with simulated live dashboards and M-Pesa-friendly upgrades.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pips Dollar Printer — Deriv Bot Builder & Copy Trading Africa',
    description:
      'Build and download free Deriv bots, copy top traders, and simulate live performance from one platform.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
