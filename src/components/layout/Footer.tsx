import Link from 'next/link'
import { CircleDollarSign } from 'lucide-react'

const footerSections = {
  Platform: [
    ['Free Bots', '/bots'],
    ['Copy Trading', '/copy-trading'],
    ['Pricing', '/pricing'],
    ['Dashboard', '/dashboard'],
  ],
  Resources: [
    ['Blog', '/blog'],
    ['Signals', '/dashboard/signals'],
    ['Analysis', '/dashboard/analysis'],
    ['Bot Builder', '/dashboard/bot-builder'],
  ],
  Company: [
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Affiliate', '/affiliate'],
    ['Community', '/community'],
  ],
  Legal: [
    ['Terms', '/terms'],
    ['Privacy', '/privacy'],
    ['Disclaimer', '/disclaimer'],
  ],
} as const

const socialLinks = [
  ['Telegram', process.env.NEXT_PUBLIC_TELEGRAM_URL],
  ['YouTube', process.env.NEXT_PUBLIC_YOUTUBE_URL],
  ['TikTok', process.env.NEXT_PUBLIC_TIKTOK_URL],
  ['X', process.env.NEXT_PUBLIC_TWITTER_URL],
  ['Deriv', process.env.NEXT_PUBLIC_DERIV_URL],
].filter(([, href]) => Boolean(href))

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold">Pips Dollar Printer</div>
                <div className="text-xs text-muted-foreground">Deriv bot builder and copy trading</div>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Build, simulate, and manage Deriv-style bot workflows with a platform designed for African traders and M-Pesa-friendly upgrades.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/90">{title}</h3>
              <div className="space-y-3">
                {links.map(([label, href]) => (
                  <Link key={href} href={href} className="block text-sm text-muted-foreground transition hover:text-primary">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-background/50 p-5">
          <p className="text-sm font-semibold text-white">Risk Disclaimer</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Pips Dollar Printer is not a financial advisor. Trading synthetic indices involves significant risk. Only trade funds you can afford to lose. All trading activity is conducted on Deriv.com. This platform provides tools, simulations, and education, not brokerage services or guarantees of profit.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 Pips Dollar Printer</span>
          <span>Built for traders across Kenya, Tanzania, Uganda, Nigeria, Ghana, and Rwanda.</span>
        </div>
      </div>
    </footer>
  )
}
