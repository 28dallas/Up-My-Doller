import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Bot Library', href: '/bots' },
    { label: 'Copy Trading', href: '/copy-trading' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Tutorials', href: '/blog?category=tutorial' },
    { label: 'Community', href: '/community' },
  ],
  Learn: [
    { label: 'Learn Deriv', href: '/learn' },
    { label: 'Deriv Basics', href: '/learn/deriv-basics' },
    { label: 'Strategies', href: '/strategies' },
    { label: 'Risk Calculator', href: '/tools/risk-calculator' },
    { label: 'Trading Times', href: '/tools/trading-times' },
    { label: 'Recommended Bots', href: '/bots/recommended' },
    { label: 'Comparisons', href: '/comparisons' },
    { label: 'Referral Program', href: '/refer' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Affiliate Program', href: '/affiliate' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 overflow-hidden rounded-lg border border-border bg-background">
                <Image
                  src="/img/Free Trading Signals 20260902_133854.jpg"
                  alt="SmartTraders logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-bold text-white text-sm">
                Smart<span className="text-primary">Traders</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Africa&apos;s #1 Deriv bot builder and copy trading platform.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://t.me/TRENDIF" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-border flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground text-xs font-bold">TG</a>
              <a href="https://wa.me/254107646264" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-border flex items-center justify-center hover:bg-[#25d366]/20 hover:text-[#25d366] transition-all text-muted-foreground text-xs font-bold">WA</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-border flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground text-xs font-bold">X</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-border flex items-center justify-center hover:bg-danger/20 hover:text-danger transition-all text-muted-foreground text-xs font-bold">YT</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-border flex items-center justify-center hover:bg-white/20 hover:text-white transition-all text-muted-foreground text-xs font-bold">TK</a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              Copyright {new Date().getFullYear()} SmartTraders. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs text-center md:text-right max-w-xl">
              <strong className="text-warning">Risk Disclaimer:</strong> Trading involves substantial risk of loss. Past performance is not indicative of future results. Only trade with money you can afford to lose. This platform does not provide financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
