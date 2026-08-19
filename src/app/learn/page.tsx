import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, BookOpen, Target, Calculator, Clock, Bot, Rocket, BookMarked, LineChart } from 'lucide-react'
import InfoCard from '@/components/learn/InfoCard'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import Newsletter from '@/components/learn/Newsletter'
import { DERIV_MARKETS } from '@/lib/learn-data'

const LEARNING_PATHS = [
  {
    href: '/learn/deriv-basics',
    title: 'Deriv Basics',
    desc: 'What is Deriv, account types, markets explained, and how to open your first account.',
    icon: BookOpen,
    level: 'Beginner',
    time: '10 min',
  },
  {
    href: '/strategies',
    title: 'Trading Strategies',
    desc: 'Seven proven strategies with win rates, step guides, and YouTube tutorials.',
    icon: Target,
    level: 'Beginner → Advanced',
    time: '20 min',
  },
  {
    href: '/tools/risk-calculator',
    title: 'Risk & Money Management',
    desc: 'Plan your staking and martingale with our interactive calculator.',
    icon: Calculator,
    level: 'Essential',
    time: '5 min',
  },
  {
    href: '/tools/trading-times',
    title: 'Trading Times Advice',
    desc: 'When to trade each Deriv market for the best results.',
    icon: Clock,
    level: 'Reference',
    time: '5 min',
  },
  {
    href: '/bots/recommended',
    title: 'Recommended Bots',
    desc: 'Curated bots matched to your experience level and goals.',
    icon: Bot,
    level: 'Hands-on',
    time: '10 min',
  },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Learn
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Master <span className="gradient-text">Deriv Trading</span> Step by Step
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you&apos;re a complete beginner or an experienced trader, our learning hub takes you from your first Deriv account to
            automated trading bots — with no jargon and no fluff.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/learn/deriv-basics" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black hover:bg-accent transition-all">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#learning-paths" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-white hover:border-primary/40 hover:bg-white/5 transition-all">
              View Learning Paths
            </a>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section id="learning-paths" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Your Learning Path</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Follow these steps in order to build a solid foundation and avoid the costly mistakes most beginner traders make.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map(({ href, title, desc, icon: Icon, level, time }, i) => (
            <Link key={href} href={href} className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-glow-sm transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-border/50 rounded-full px-3 py-1">Step {i + 1}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{level}</span>
                <span className="flex items-center gap-1">{time}</span>
              </div>
            </Link>
          ))}

          {/* Getting started CTA card */}
          <Link href="/refer" className="group relative bg-gradient-to-br from-primary/15 to-card border border-primary/30 rounded-2xl p-6 hover:shadow-glow-sm transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-black">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">Bonus</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">Invite & Earn Premium</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Refer friends to unlock a free personalized AI bot, premium signals, and more.
            </p>
            <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Markets overview */}
      <section className="py-16 bg-surface/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <LineChart className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-white">Which Deriv Market Is Right for You?</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Deriv offers synthetic indices, forex, and commodities. Understanding the differences is the first step to choosing the right one.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DERIV_MARKETS.map((m) => (
              <InfoCard
                key={m.slug}
                icon={<span className="text-2xl">{m.icon}</span>}
                title={m.name}
                description={`${m.description} ${m.beginnerFriendly ? '✓ Beginner-friendly.' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Educational CTA */}
<EducationalCTA
        title="Start your Deriv journey today"
        description="Open a free Deriv account in minutes and follow our learning path to start trading with confidence."
        secondaryHref="/strategies"
        secondaryLabel="View Strategies"
        utmSource="learn-hub"
      />

      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
