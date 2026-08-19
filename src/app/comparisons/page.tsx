import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Scale, ArrowRight, TrendingUp, Bot, Rocket } from 'lucide-react'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import AffiliateDisclosure from '@/components/learn/AffiliateDisclosure'
import Newsletter from '@/components/learn/Newsletter'

export const metadata = {
  title: 'Deriv vs Other Platforms | Full Comparisons 2024',
  description:
    'Honest, up-to-date comparisons of Deriv vs Pocket Option, Binomo, and Olymp Trade. See how Deriv stacks up on regulation, bots, markets, payouts, and more.',
}

const COMPARISONS = [
  {
    href: '/comparisons/deriv-vs-pocketoption',
    competitor: 'Pocket Option',
    tagline: 'Regulated derivatives vs high-payout binary options — comparing bots, synthetic indices, and beginner experience.',
    icon: TrendingUp,
  },
  {
    href: '/comparisons/deriv-vs-binomo',
    competitor: 'Binomo',
    tagline: 'Does Binomo match Deriv on regulation, 24/7 synthetic indices, and native bot automation? Find out.',
    icon: Bot,
  },
  {
    href: '/comparisons/deriv-vs-olymptrade',
    competitor: 'Olymp Trade',
    tagline: 'Olymp Trade\'s simple interface vs Deriv\'s automation — which platform suits your trading style?',
    icon: Rocket,
  },
]

export default function ComparisonsIndexPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-14 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Comparisons
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Deriv vs <span className="gradient-text">Other Platforms</span> — Honest Comparisons
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We compare Deriv head-to-head with the most popular alternatives so you can make an informed decision. Every comparison covers
            regulation, markets, bot automation, payouts, and beginner experience.
          </p>
        </div>
      </section>

      {/* Comparison cards */}
      <section className="pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {COMPARISONS.map(({ href, competitor, tagline, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-glow-sm transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Scale className="w-3.5 h-3.5" /> vs {competitor}
                </div>
              </div>
              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                Deriv vs {competitor}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{tagline}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why compare */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Trust Our Comparisons?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Independent', desc: 'We earn affiliate commissions from Deriv, but our comparisons are honest — we clearly state where competitors win on payouts or features.' },
              { title: 'Education-first', desc: 'Every comparison focuses on what actually matters for traders: regulation, automation, market variety, and real usability — not marketing fluff.' },
              { title: 'Bot-focused', desc: 'Because this site is built around automated trading, our comparisons weigh bot automation heavily — where Deriv is the clear market leader.' },
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
        title="See why Deriv wins"
        description="Open a free Deriv account and experience the platform that beats the competition on bots, markets, and regulation."
        secondaryHref="/learn"
        secondaryLabel="Explore the Learning Hub"
        utmSource="comparisons-index"
      />
      <Newsletter className="pt-4" />
      <RelatedTools />
      <Footer />
    </main>
  )
}