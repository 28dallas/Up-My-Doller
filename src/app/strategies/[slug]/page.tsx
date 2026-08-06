import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Check, X, Play } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import StepGuide from '@/components/learn/StepGuide'
import YouTubeEmbed from '@/components/learn/YouTubeEmbed'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import { STRATEGIES } from '@/lib/learn-data'

interface PageProps {
  params: { slug: string }
}

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

export default function StrategyPage({ params }: PageProps) {
  const strategy = STRATEGIES.find((s) => s.slug === params.slug) ?? STRATEGIES[0]
  const related = STRATEGIES.filter((s) => s.slug !== strategy.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Link href="/strategies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Strategies
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <article className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={DIFFICULTY_COLORS[strategy.difficulty]}>{strategy.difficulty}</Badge>
              <Badge variant={RISK_COLORS[strategy.riskLevel]}>{strategy.riskLevel} Risk</Badge>
              <Badge variant="gold">Win rate: {strategy.winRate}</Badge>
              <Badge variant="default">Payout: {strategy.payout}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">{strategy.name}</h1>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{strategy.tagline}</p>

            {/* Video tutorial */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-white">Video Tutorial</h2>
              </div>
              <YouTubeEmbed videoId={strategy.youtubeId} title={`${strategy.name} Strategy Tutorial`} />
            </div>

            {/* What it is */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">What Is This Strategy?</h2>
              {strategy.description.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </section>

            {/* Markets */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Best Markets</h2>
              <div className="flex flex-wrap gap-2">
                {strategy.markets.map((m) => (
                  <span key={m} className="px-4 py-2 rounded-lg bg-card border border-border text-white text-sm font-medium">{m}</span>
                ))}
              </div>
            </section>

            {/* Step guide */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step: How to Trade It</h2>
              <StepGuide steps={strategy.steps} title={`${strategy.name} Setup`} />
            </section>

            {/* Pros/Cons */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Pros & Cons</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card border border-primary/20 rounded-2xl p-5">
                  <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-2"><Check className="w-4 h-4" /> Pros</h3>
                  <ul className="space-y-2">
                    {strategy.pros.map((p) => (
                      <li key={p} className="flex gap-2 text-muted-foreground text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border border-danger/20 rounded-2xl p-5">
                  <h3 className="text-danger font-bold text-sm mb-3 flex items-center gap-2"><X className="w-4 h-4" /> Cons</h3>
                  <ul className="space-y-2">
                    {strategy.cons.map((c) => (
                      <li key={c} className="flex gap-2 text-muted-foreground text-sm">
                        <X className="w-4 h-4 text-danger shrink-0 mt-0.5" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Martingale note */}
            {strategy.martingaleReady && (
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 mb-10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-primary">Martingale ready:</strong> This strategy pairs well with a martingale recovery system. Use our
                  <Link href="/tools/risk-calculator" className="text-primary underline ml-1"> risk calculator</Link> to plan your stakes safely.
                </p>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Strategy Summary</h3>
              <dl className="space-y-3 text-sm">
                {[
                  ['Difficulty', strategy.difficulty],
                  ['Risk Level', strategy.riskLevel],
                  ['Win Rate', strategy.winRate],
                  ['Payout', strategy.payout],
                  ['Martingale', strategy.martingaleReady ? 'Recommended' : 'Not Recommended'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-white font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Other Strategies</h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/strategies/${r.slug}`} className="block group">
                    <div className="text-white text-xs font-medium group-hover:text-primary transition-colors mb-1">{r.name}</div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>{r.difficulty}</span>·<span>{r.riskLevel} risk</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <EducationalCTA
        title={`Ready to trade ${strategy.name}?`}
        description="Open a free Deriv account and start applying this strategy with a demo or real account."
        secondaryHref="/bots/recommended"
        secondaryLabel="Find a Matching Bot"
      />
      <RelatedTools />
      <Footer />
    </main>
  )
}
