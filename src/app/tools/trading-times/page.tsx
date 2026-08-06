import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Clock, CalendarClock, AlertTriangle } from 'lucide-react'
import InfoCard from '@/components/learn/InfoCard'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'
import { TRADING_TIMES } from '@/lib/learn-data'

export default function TradingTimesPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-14 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Tools · Trading Times
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Best <span className="gradient-text">Trading Times</span> for Each Market
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Timing matters in trading. Learn when each Deriv market is most active and volatile so you can align your strategy with the best
            conditions.
          </p>
        </div>
      </section>

      {/* Times table */}
      <section className="pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto bg-card border border-border rounded-2xl">
          <table className="w-full min-w-[640px] text-sm text-left">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Market</th>
                <th className="px-6 py-4">Best Times</th>
                <th className="px-6 py-4">Timezone</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {TRADING_TIMES.map((t) => (
                <tr key={t.market} className="border-b border-border/50 last:border-0">
                  <td className="px-6 py-5 font-semibold text-white">{t.market}</td>
                  <td className="px-6 py-5 text-primary font-medium whitespace-nowrap">{t.bestTimes}</td>
                  <td className="px-6 py-5 text-muted-foreground">{t.timezone}</td>
                  <td className="px-6 py-5 text-muted-foreground leading-relaxed max-w-sm">{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trading calendar advice */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <CalendarClock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Weekly Trading Calendar Advice</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          For synthetic indices, trading is available 24/7 — but the best results come from consistency and discipline, not chasing every tick.
          Here&apos;s a sensible weekly rhythm.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          <InfoCard
            icon={<Clock className="w-5 h-5" />}
            title="Weekdays (Mon-Fri)"
            description="The most active period for forex and commodities. For synthetic indices, stick to a fixed daily schedule with clear take-profit and stop-loss targets."
          />
          <InfoCard
            icon={<CalendarClock className="w-5 h-5" />}
            title="Weekends"
            description="Forex and stock markets close on weekends, but synthetic indices keep running 24/7. Ideal for bots that trade volatility indices around the clock."
          />
          <InfoCard
            icon={<AlertTriangle className="w-5 h-5" />}
            title="High-Impact News"
            description="Real markets (forex, commodities) can whipsaw wildly during major news releases. Synthetic indices are unaffected — but avoid trading real markets impulsively around news."
          />
        </div>
      </section>

      {/* Volatility & timing */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Timing Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Liquidity', desc: 'Higher liquidity during market overlaps means tighter spreads and easier execution — critical for forex trading.' },
              { title: 'Volatility', desc: 'More movement creates more trading opportunities. For rise/fall and barrier strategies, active sessions give better entries.' },
              { title: 'Consistency', desc: 'The most important factor is showing up consistently. A disciplined daily routine beats randomly trading at all hours.' },
            ].map((c) => (
              <div key={c.title}>
                <h3 className="text-primary font-bold text-sm mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
      </div>

      <EducationalCTA
        title="Ready to trade at the right time?"
        description="Open a free Deriv account and start applying these timing principles to your strategies."
        secondaryHref="/strategies"
        secondaryLabel="View Strategies"
        utmSource="tools-trading-times"
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
