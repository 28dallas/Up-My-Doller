import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Users, Target, Globe, TrendingUp, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const STATS = [
  { value: '12,000+', label: 'Active Traders' },
  { value: '50+', label: 'Free Bots' },
  { value: '3', label: 'Countries' },
  { value: '98%', label: 'Uptime' },
]

const VALUES = [
  { icon: Target, title: 'Built for real traders', desc: 'Every feature is designed around the daily workflow of synthetic-index traders on Deriv — not generic finance dashboards.' },
  { icon: Zap, title: 'No-code first', desc: 'From bot building to copy trading and alerts, the goal is to reduce setup friction and help traders move faster with less effort.' },
  { icon: Globe, title: 'Africa-focused', desc: 'Pricing, payment methods (M-Pesa), and product language are shaped around traders across Kenya, Uganda, Tanzania, and beyond.' },
  { icon: Shield, title: 'Transparent by default', desc: 'We show real win rates, real drawdowns, and real risk warnings. No inflated numbers, no guaranteed profit claims.' },
  { icon: Users, title: 'Community-driven', desc: 'Our 12,000+ member Telegram community is the backbone of the platform — signals, strategies, and peer support.' },
  { icon: TrendingUp, title: 'Continuous improvement', desc: 'The platform evolves based on trader feedback. If a feature is broken or missing, we hear about it and fix it fast.' },
]

const TEAM = [
  { initials: 'DK', name: 'DB King', role: 'Founder & Lead Trader', bio: 'Professional Deriv trader with 6+ years experience on synthetic indices. Built SmartTraders to share what actually works.' },
  { initials: 'AM', name: 'Alex Mwenda', role: 'Head of Product', bio: 'Product engineer focused on making complex trading tools accessible to everyday traders across Africa.' },
  { initials: 'FN', name: 'Faith Njeri', role: 'Community Manager', bio: 'Manages the Telegram community and ensures every trader gets the support they need to succeed.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            About SmartTraders
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            We Build Tools That Help <span className="gradient-text">African Traders Win</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SmartTraders is a Deriv-focused trading platform built for synthetic index traders across Africa. We combine automation, copy trading, real-time analysis, and community into one place.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-border bg-surface/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-primary font-mono">{value}</div>
                <div className="text-muted-foreground text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SmartTraders started as a Telegram group where a small community of Kenyan traders shared Deriv bot files and strategies. As the group grew to thousands of members, it became clear that traders needed more than just files — they needed a proper platform.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We built the first version of SmartTraders to solve the problems we faced ourselves: scattered bot files, no way to track performance, no easy copy trading, and payment methods that didn&apos;t work for African traders.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, SmartTraders serves thousands of traders across Kenya, Uganda, Tanzania, and beyond — with tools that are built specifically for how we trade.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { year: '2021', event: 'Started as a Telegram bot-sharing group' },
                { year: '2022', event: 'Launched first web platform with bot library' },
                { year: '2023', event: 'Added copy trading and M-Pesa payments' },
                { year: '2024', event: 'Launched full dashboard, signals, and analysis tools' },
              ].map(({ year, event }) => (
                <div key={year} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">{year}</div>
                  <div className="flex-1 flex items-center">
                    <p className="text-muted-foreground text-sm">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-surface/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">The Team</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TEAM.map(({ initials, name, role, bio }) => (
            <div key={name} className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">
                {initials}
              </div>
              <h3 className="text-white font-bold">{name}</h3>
              <p className="text-primary text-xs font-medium mt-1 mb-3">{role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <div className="bg-gradient-to-br from-primary/10 to-card border border-primary/20 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to start trading smarter?</h2>
          <p className="text-muted-foreground mb-6">Join 12,000+ traders already using SmartTraders to automate and grow their Deriv accounts.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-all">
              Create Free Account
            </Link>
            <Link href="/copy-trading" className="px-6 py-3 border border-border text-white font-semibold rounded-xl hover:border-primary/40 hover:bg-white/5 transition-all">
              Browse Traders
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
