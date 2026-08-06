import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Play, Star, Bot } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import YouTubeEmbed from '@/components/learn/YouTubeEmbed'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'
import { RECOMMENDED_BOTS } from '@/lib/learn-data'

const RISK_COLORS: Record<string, 'green' | 'yellow' | 'red'> = {
  Low: 'green',
  Medium: 'yellow',
  High: 'red',
}

const DIFFICULTY_COLORS: Record<string, 'green' | 'blue' | 'red'> = {
  Beginner: 'green',
  Intermediate: 'blue',
  Advanced: 'red',
}

export default function RecommendedBotsPage() {
  const featured = RECOMMENDED_BOTS.find((b) => b.featured)
  const others = RECOMMENDED_BOTS.filter((b) => !b.featured)

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-14 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Bot Recommendations
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Recommended <span className="gradient-text">Deriv Bots</span> by Use Case
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Not every bot suits every trader. Here&apos;s our curated selection matched to your experience level, risk tolerance, and goals — each
            with a strategy breakdown and video guide.
          </p>
        </div>
      </section>

      {/* Featured bot */}
      {featured && (
        <section className="pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/15 via-card to-card border border-primary/30 rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-gold fill-current" />
              <span className="text-gold font-bold text-sm uppercase tracking-wider">Editor&apos;s Pick</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{featured.name}</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="green">{featured.market}</Badge>
                  <Badge variant="blue">{featured.strategy}</Badge>
                  <Badge variant={DIFFICULTY_COLORS[featured.difficulty]}>{featured.difficulty}</Badge>
                  <Badge variant={RISK_COLORS[featured.risk]}>{featured.risk} risk</Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{featured.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-extrabold text-primary">{featured.winRate}</div>
                    <div className="text-xs text-muted-foreground">Win rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">{featured.bestFor}</div>
                    <div className="text-xs text-muted-foreground">Best for</div>
                  </div>
                </div>
                <Link href="/bots" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black hover:bg-accent transition-all">
                  Browse Full Bot Library <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div>
                <YouTubeEmbed videoId={featured.youtubeId} title={`${featured.name} Tutorial`} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other recommended bots */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">More Curated Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                    <Play className="w-5 h-5" style={{ marginLeft: 2 }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">{b.name}</h3>
                    <div className="text-xs text-muted-foreground">{b.market} · {b.strategy}</div>
                  </div>
                </div>
                <Badge variant={RISK_COLORS[b.risk]}>{b.risk} risk</Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{b.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="green">Win: {b.winRate}</Badge>
                <Badge variant={DIFFICULTY_COLORS[b.difficulty]}>{b.difficulty}</Badge>
                <Badge variant="default">For: {b.bestFor}</Badge>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="text-white font-semibold text-sm mb-3">Strategy Breakdown</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="bg-background/50 border border-border rounded-lg p-3">Market: <span className="text-white">{b.market}</span></div>
                  <div className="bg-background/50 border border-border rounded-lg p-3">Strategy: <span className="text-white">{b.strategy}</span></div>
                  <div className="bg-background/50 border border-border rounded-lg p-3">Difficulty: <span className="text-white">{b.difficulty}</span></div>
                  <div className="bg-background/50 border border-border rounded-lg p-3">Risk: <span className="text-white">{b.risk}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to choose */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Choose the Right Bot</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: '1. Know your risk', desc: 'Start with a Low-risk bot on low-volatility markets (Volatility 10) if you\'re new.' },
              { title: '2. Match your style', desc: 'Choose a strategy you understand — Over/Under for simplicity, Rise/Fall for trend trading.' },
              { title: '3. Check the market', desc: 'Pick a market that matches your schedule. Synthetic indices run 24/7; forex follows sessions.' },
              { title: '4. Test on demo', desc: 'Always run any bot on a Deriv demo account before risking real money.' },
            ].map((c) => (
              <div key={c.title} className="bg-background/50 border border-border rounded-xl p-5">
                <h3 className="text-white font-bold text-sm mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
      </div>

      <EducationalCTA
        title="Find your perfect bot"
        description="Open a free Deriv account and explore our full library of 500+ free bots."
        secondaryHref="/strategies"
        secondaryLabel="Learn the Strategies"
        utmSource="bots-recommended"
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
