import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, CheckCircle, Wallet, CreditCard, Globe, ShieldCheck } from 'lucide-react'
import StepGuide from '@/components/learn/StepGuide'
import YouTubeEmbed from '@/components/learn/YouTubeEmbed'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'
import { getAffiliateLink } from '@/lib/constants'

const ACCOUNT_TYPES = [
  {
    icon: Wallet,
    title: 'Real Account',
    desc: 'Trade with real money. Requires identity verification and minimum deposit. Best for actual trading.',
  },
  {
    icon: CreditCard,
    title: 'Demo Account',
    desc: 'Practice with virtual money ($10,000). Perfect for testing strategies and bots without risk.',
  },
  {
    icon: Globe,
    title: 'Deriv MT5',
    desc: 'Deriv\'s MetaTrader 5 platform for forex, stocks, and commodities — more advanced, for experienced traders.',
  },
  {
    icon: ShieldCheck,
    title: 'Deriv X',
    desc: 'Deriv\'s modern web and mobile trading platform with a clean interface and advanced charting.',
  },
]

const OPEN_ACCOUNT_STEPS = [
  { title: 'Visit Deriv.com', body: 'Click "Open Free Deriv Account" and you\'ll be taken to the official Deriv signup page.' },
  { title: 'Sign up with email', body: 'Enter your email, create a password, and verify your email address.' },
  { title: 'Choose your account type', body: 'Start with a Demo account to practice, then upgrade to Real when you\'re ready.' },
  { title: 'Deposit funds (for real trading)', body: 'Use bank transfer, crypto, e-wallets, or local payment methods like M-Pesa to fund your real account.' },
  { title: 'Verify your identity', body: 'Upload your ID for real-account verification. This is required by financial regulators.' },
]

export default function DerivBasicsPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Link href="/learn" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Learn Hub
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <article className="lg:col-span-2">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
              Beginner Guide
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              What is Deriv? A Complete Guide for Absolute Beginners
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Deriv is one of the world&apos;s most popular online trading platforms, offering synthetic indices, forex, commodities, and
              cryptocurrencies. This guide walks you through everything you need to know to get started — no prior experience required.
            </p>

            {/* Video */}
            <div className="mb-10">
              <YouTubeEmbed videoId="uXlXWFHmXNk" title="Deriv Beginner Tutorial" />
            </div>

            {/* What is Deriv */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">What is Deriv?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Deriv is an online trading platform that lets you trade financial instruments like forex, synthetic indices, commodities, and
                cryptocurrencies. It was founded in 1999 and is regulated in multiple jurisdictions, making it one of the most trusted platforms
                for traders in Africa and around the world.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What makes Deriv unique is its <strong className="text-white">synthetic indices</strong> — 24/7 markets that are not affected by
                real-world news or economic events. This predictability makes them ideal for automated trading bots, which is why our platform
                focuses heavily on them.
              </p>
            </section>

            {/* How it works */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">How Deriv Trading Works</h2>
              <div className="space-y-4">
                {[
                  'You predict whether an asset price will rise or fall over a set period (e.g., 1 minute, 5 minutes).',
                  'Your payout depends on whether your prediction is correct and the payout percentage of the chosen market.',
                  'Trades can be manual or automated through bots (like the ones our platform builds).',
                  'You manage risk with stake sizing, stop loss, and take profit settings.',
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Account types */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Account Types Explained</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {ACCOUNT_TYPES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-card border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Open account steps */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">How to Open a Free Deriv Account</h2>
              <StepGuide steps={OPEN_ACCOUNT_STEPS} title="Setup Steps" />
            </section>

            {/* Markets */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">What Can You Trade on Deriv?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Synthetic Indices', desc: '24/7 markets like Volatility, Boom, Crash, Step Index. Perfect for bots.' },
                  { name: 'Forex', desc: 'Major, minor, and exotic currency pairs with high liquidity.' },
                  { name: 'Commodities', desc: 'Gold, silver, oil, and other raw materials.' },
                  { name: 'Cryptocurrencies', desc: 'Bitcoin, Ethereum, and other popular cryptos.' },
                ].map((m) => (
                  <div key={m.name} className="bg-card border border-border rounded-2xl p-5">
                    <h3 className="text-white font-bold text-sm mb-1">{m.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

{/* CTA */}
            <a
              href={getAffiliateLink('deriv-basics')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-primary/20 to-card border border-primary/30 p-6 hover:border-primary/50 transition-all group"
            >
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Ready to open your free account?</h3>
                <p className="text-muted-foreground text-sm">It takes less than 2 minutes and requires no initial deposit.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#00c853] px-5 py-3 text-sm font-bold text-black whitespace-nowrap group-hover:bg-[#00e676] transition-all">
                Open Free Account <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
              <h3 className="text-white font-bold text-sm mb-4">On This Page</h3>
              <ul className="space-y-2 text-muted-foreground text-xs">
                {['What is Deriv?', 'How Deriv Trading Works', 'Account Types', 'Open a Free Account', 'What Can You Trade?'].map((h) => (
                  <li key={h} className="hover:text-primary cursor-pointer transition-colors">{h}</li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Next Steps</h3>
              <div className="space-y-3">
                <Link href="/strategies" className="block group">
                  <div className="text-white text-xs font-medium group-hover:text-primary transition-colors mb-1">Explore Trading Strategies</div>
                  <div className="text-muted-foreground text-xs">Learn the 5 proven strategies</div>
                </Link>
                <Link href="/bots/recommended" className="block group">
                  <div className="text-white text-xs font-medium group-hover:text-primary transition-colors mb-1">Recommended Bots</div>
                  <div className="text-muted-foreground text-xs">Find a bot for your level</div>
                </Link>
                <Link href="/tools/risk-calculator" className="block group">
                  <div className="text-white text-xs font-medium group-hover:text-primary transition-colors mb-1">Plan Your Risk</div>
                  <div className="text-muted-foreground text-xs">Use the risk calculator</div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure className="mt-10" />
      </div>

      <EducationalCTA utmSource="deriv-basics" />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
