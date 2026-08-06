import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react'
import RiskCalculator from '@/components/learn/RiskCalculator'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'

export default function RiskCalculatorPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-14 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Risk & Stake <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Plan your stakes and understand your martingale recovery sequence before you risk a single dollar. Adjust the sliders to see your
            potential loss at every level.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RiskCalculator />
      </section>

      {/* Educational content */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">What is Martingale?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Martingale is a recovery strategy that multiplies your stake after each loss so that a single win recovers all previous losses plus a
              profit. It&apos;s powerful but risky — a long losing streak can quickly exceed your budget.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-warning/15 flex items-center justify-center text-warning mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">The Risks</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every recovery level multiplies your total risk. With a 1.5x multiplier and 5 levels, your total stake can reach over 13x your base
              stake. Always cap your levels and set a strict daily budget.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center text-gold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">Golden Rules</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Never risk more than 1-2% of your account per trade. Keep your recovery sequence within your daily budget. And always remember —
              no strategy is guaranteed, so only trade money you can afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* Stop loss advice */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Understanding Stop Loss & Take Profit</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-primary font-bold text-base mb-3">Stop Loss</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                A stop loss automatically ends trading when your losses reach a set amount. It&apos;s your safety net that prevents a single bad
                streak from wiping out your account. We recommend setting it to 20-30% of your daily budget.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Example: With a $50 daily budget, set your stop loss at $10-$15. The bot stops trading once you lose that amount, preserving your
                capital for another day.
              </p>
            </div>
            <div>
              <h3 className="text-primary font-bold text-base mb-3">Take Profit</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                A take profit automatically ends trading when your profits reach a set target. It locks in your gains and prevents greed from
                giving back winnings. A common rule is to set take profit at 2x your daily target.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Example: With a $20 daily target, set your take profit at $40. The bot stops once you&apos;re up $40, securing your profit.
              </p>
            </div>
          </div>
        </div>
      </section>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
      </div>

      <EducationalCTA
        title="Trade with confidence"
        description="Use these risk principles to trade responsibly on a free Deriv account."
        secondaryHref="/tools/trading-times"
        secondaryLabel="Best Trading Times"
        utmSource="tools-risk-calculator"
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
