import Link from 'next/link'
import { BookOpen, GraduationCap, Calculator, Clock, ArrowRight } from 'lucide-react'

const LEARNING_RESOURCES = [
  {
    href: '/learn',
    title: 'Learn Deriv from Scratch',
    desc: 'New to trading? Start with our beginner-friendly Deriv basics guide.',
    icon: BookOpen,
    cta: 'Start Learning',
  },
  {
    href: '/strategies',
    title: 'Master Proven Strategies',
    desc: 'Explore 5 battle-tested strategies with win rates, steps, and video tutorials.',
    icon: GraduationCap,
    cta: 'Explore Strategies',
  },
  {
    href: '/tools/risk-calculator',
    title: 'Plan Your Risk',
    desc: 'Use our interactive calculator to plan your stakes and martingale safely.',
    icon: Calculator,
    cta: 'Calculate Risk',
  },
  {
    href: '/tools/trading-times',
    title: 'Trade at the Right Time',
    desc: 'Learn the best trading times and sessions for each Deriv market.',
    icon: Clock,
    cta: 'See Trading Times',
  },
]

export default function StartLearningSection() {
  return (
    <section className="py-20 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Start Learning
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Learn to Trade <span className="gradient-text">Before You Risk Money</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The most successful traders are the best-educated. Follow our free learning path to build a solid foundation before you trade a
            single dollar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEARNING_RESOURCES.map(({ href, title, desc, icon: Icon, cta }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-glow-sm transition-all flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{desc}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                {cta} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
