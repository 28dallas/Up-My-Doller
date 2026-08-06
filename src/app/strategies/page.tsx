import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, TrendingUp, Target, ShieldAlert, Play } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'
import { STRATEGIES } from '@/lib/learn-data'

const DIFFICULTY_COLORS: Record<string, 'green' | 'blue' | 'yellow' | 'red' | 'gold'> = {
  Beginner: 'green',
  Intermediate: 'blue',
  Advanced: 'red',
}

const RISK_COLORS: Record<string, 'green' | 'yellow' | 'red'> = {
  Low: 'green',
  Medium: 'yellow',
  High: 'red',
}

export default function StrategiesPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Strategies
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Proven <span className="gradient-text">Trading Strategies</span> for Deriv
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
Seven battle-tested strategies used by successful Deriv traders — from beginner-friendly market plays to advanced recovery
            systems like Alembert and Oscar&apos;s Grind. Each includes win rates, step-by-step guides, risk levels, and a video tutorial.
          </p>
        </div>
      </section>

      {/* Strategies grid */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATEGIES.map((s) => (
            <Link key={s.slug} href={`/strategies/${s.slug}`} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-glow-sm transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <Badge variant={DIFFICULTY_COLORS[s.difficulty]}>{s.difficulty}</Badge>
              </div>

              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{s.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{s.summary}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <Badge variant={RISK_COLORS[s.riskLevel]}>{s.riskLevel} Risk</Badge>
                <Badge variant="default">Win rate: {s.winRate}</Badge>
                <Badge variant="gold">Payout: {s.payout}</Badge>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                  <Play className="w-3.5 h-3.5" /> Video guide
                </span>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                  View strategy <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}

          {/* Risk management card */}
          <div className="bg-gradient-to-br from-warning/10 to-card border border-warning/30 rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-warning/15 flex items-center justify-center text-warning mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-white font-bold text-lg mb-2">Risk Management First</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              No strategy wins 100% of the time. The difference between successful and losing traders is how they manage risk. Always cap your
              stake, set stop losses, and never risk more than 1-2% of your account per trade.
            </p>
            <Link href="/tools/risk-calculator" className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
              Plan your risk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How strategies work */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Use These Strategies</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            Each strategy page includes a full breakdown with a step-by-step guide and a video tutorial. We recommend starting with the
            beginner-friendly Over/Under strategy, building confidence with small stakes, then progressing to more advanced strategies as you
            develop.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: '1. Learn the concept', desc: 'Read the strategy breakdown and watch the video to understand the logic.' },
              { title: '2. Practice on demo', desc: 'Test the strategy on a Deriv demo account with virtual money first.' },
              { title: '3. Automate with a bot', desc: 'Once confident, apply it to a bot in our library or build your own.' },
            ].map((s) => (
              <div key={s.title} className="bg-background/50 border border-border rounded-xl p-5">
                <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
      </div>

      <EducationalCTA
        title="Put a strategy into action"
        description="Open a free Deriv account and start applying these strategies with a real or demo account."
        secondaryHref="/bots/recommended"
        secondaryLabel="View Recommended Bots"
        utmSource="strategies"
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
