import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { BookOpen, Key, Bot, Copy, Bell, BarChart2, Wallet, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SECTIONS = [
  {
    icon: Key,
    title: 'Getting Started',
    color: 'text-primary',
    bg: 'bg-primary/10',
    articles: [
      { title: 'Create your SmartTraders account', href: '/auth/signup' },
      { title: 'Connect your Deriv account via API token', href: '/dashboard/api-token' },
      { title: 'Understanding your dashboard', href: '/dashboard' },
      { title: 'Setting up Telegram alerts', href: '/dashboard/alerts' },
    ],
  },
  {
    icon: Bot,
    title: 'Bot Builder & Free Bots',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    articles: [
      { title: 'How to load a free bot', href: '/bots' },
      { title: 'Using the no-code bot builder', href: '/dashboard/bot-builder' },
      { title: 'Quick strategy setup guide', href: '/dashboard/bot-builder' },
      { title: 'Managing your active bots', href: '/dashboard/my-bots' },
    ],
  },
  {
    icon: Copy,
    title: 'Copy Trading',
    color: 'text-success',
    bg: 'bg-success/10',
    articles: [
      { title: 'How copy trading works on SmartTraders', href: '/copy-trading' },
      { title: 'Choosing the right trader to copy', href: '/copy-trading' },
      { title: 'Setting stake size and risk limits', href: '/dashboard/copy-trading' },
      { title: 'Stopping a copy subscription', href: '/dashboard/copy-trading' },
    ],
  },
  {
    icon: BarChart2,
    title: 'Analysis Tools',
    color: 'text-accent',
    bg: 'bg-accent/10',
    articles: [
      { title: 'Using the Analysis Tool (Even/Odd, Over/Under)', href: '/dashboard/analysis' },
      { title: 'Smart Analysis and LDP prediction', href: '/dashboard/smart-analysis' },
      { title: 'Reading the live charts', href: '/dashboard/charts' },
      { title: 'Understanding pattern matches', href: '/dashboard/matches' },
    ],
  },
  {
    icon: Bell,
    title: 'Signals & Alerts',
    color: 'text-gold',
    bg: 'bg-gold/10',
    articles: [
      { title: 'How trading signals are generated', href: '/dashboard/signals' },
      { title: 'Connecting Telegram for alerts', href: '/dashboard/alerts' },
      { title: 'Configuring alert preferences', href: '/dashboard/alerts' },
      { title: 'Using Speedbot for automated signals', href: '/dashboard/speedbot' },
    ],
  },
  {
    icon: Wallet,
    title: 'Payments & Billing',
    color: 'text-warning',
    bg: 'bg-warning/10',
    articles: [
      { title: 'How to pay with M-Pesa', href: '/dashboard/wallet' },
      { title: 'Upgrading your plan', href: '/pricing' },
      { title: 'Cancelling your subscription', href: '/dashboard/wallet' },
      { title: 'Payment not activating — what to do', href: '/dashboard/support' },
    ],
  },
]

const QUICK_STEPS = [
  { step: '1', title: 'Create account', desc: 'Sign up free — no card required' },
  { step: '2', title: 'Connect Deriv', desc: 'Add your API token from deriv.com' },
  { step: '3', title: 'Load a bot', desc: 'Pick from 50+ free bots or build your own' },
  { step: '4', title: 'Enable alerts', desc: 'Connect Telegram for trade notifications' },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Documentation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            How to Use <span className="gradient-text">SmartTraders</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to set up, trade, and grow — from first login to advanced automation.
          </p>
        </div>
      </section>

      {/* Quick start */}
      <section className="py-10 border-y border-border bg-surface/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-bold text-center mb-8">Quick Start (4 Steps)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold mx-auto mb-3">{step}</div>
                <div className="text-white font-semibold text-sm">{title}</div>
                <div className="text-muted-foreground text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/auth/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-all">
              Get Started Free <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Doc sections */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map(({ icon: Icon, title, color, bg, articles }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="text-white font-bold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {articles.map(({ title: articleTitle, href }) => (
                  <li key={articleTitle}>
                    <Link href={href} className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      {articleTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-card border border-border rounded-2xl p-8 text-center">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Can&apos;t find what you need?</h3>
          <p className="text-muted-foreground text-sm mb-5">Our support team is available on Telegram and in the dashboard support center.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/support" className="px-5 py-2.5 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-all text-sm">
              Open Support Center
            </Link>
            <a href="https://t.me/pipsdollarprinter" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 border border-border text-white font-semibold rounded-xl hover:border-primary/40 hover:bg-white/5 transition-all text-sm">
              Ask on Telegram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
