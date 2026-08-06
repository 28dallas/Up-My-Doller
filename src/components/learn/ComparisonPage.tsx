import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Check, X, ArrowRight, Scale } from 'lucide-react'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'

export type ComparisonRow = {
  feature: string
  deriv: string
  competitor: string
  winner: 'deriv' | 'competitor' | 'tie'
}

export type ComparisonData = {
  slug: string
  competitorName: string
  tagline: string
  intro: string[]
  rows: ComparisonRow[]
  verdictTitle: string
  verdict: string
  bottomLine: string
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-14 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            <Scale className="w-4 h-4" /> Comparison
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-6">
            Deriv vs {data.competitorName}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Deriv vs <span className="gradient-text">{data.competitorName}</span>: Full Comparison
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{data.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {data.intro.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-border bg-background/50">
            <div className="px-5 py-4 text-sm font-bold text-muted-foreground">Feature</div>
            <div className="px-5 py-4 text-sm font-bold text-primary flex items-center justify-center">✅ Deriv</div>
            <div className="px-5 py-4 text-sm font-bold text-white flex items-center justify-center">{data.competitorName}</div>
          </div>
          {data.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 ${i < data.rows.length - 1 ? 'border-b border-border/50' : ''}`}>
              <div className="px-5 py-4 text-sm text-white font-medium">{row.feature}</div>
              <div className="px-5 py-4 text-sm text-muted-foreground flex items-start justify-center text-center">
                <span className={`inline-flex items-center gap-1.5 ${row.winner === 'deriv' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                  {row.winner === 'deriv' ? <Check className="w-4 h-4 shrink-0" /> : row.winner === 'competitor' ? <X className="w-4 h-4 shrink-0 text-danger" /> : <span className="text-muted-foreground">—</span>}
                  {row.deriv}
                </span>
              </div>
              <div className="px-5 py-4 text-sm text-muted-foreground flex items-start justify-center text-center">
                <span className={`inline-flex items-center gap-1.5 ${row.winner === 'competitor' ? 'text-white font-semibold' : 'text-muted-foreground'}`}>
                  {row.winner === 'competitor' ? <Check className="w-4 h-4 shrink-0 text-primary" /> : row.winner === 'deriv' ? <X className="w-4 h-4 shrink-0 text-danger" /> : <span className="text-muted-foreground">—</span>}
                  {row.competitor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section className="pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary/10 to-card border border-primary/30 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">{data.verdictTitle}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{data.verdict}</p>
          <p className="text-white font-semibold leading-relaxed">{data.bottomLine}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AffiliateDisclosure />
      </div>

      <EducationalCTA
        title={`Try Deriv for yourself`}
        description={`See the difference — open a free Deriv account and experience the platform that wins our comparison.`}
        secondaryHref="/learn/deriv-basics"
        secondaryLabel="Learn How Deriv Works"
        utmSource={`comparison-${data.slug}`}
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}
