import Link from 'next/link'
import { BookOpen, Target, Calculator, Clock, Bot, ArrowRight } from 'lucide-react'

const TOOLS = [
  { href: '/learn', label: 'Learn Deriv Basics', desc: 'Beginner hub for understanding Deriv', icon: BookOpen },
  { href: '/strategies', label: 'Trading Strategies', desc: 'Explore 5 proven strategies', icon: Target },
  { href: '/tools/risk-calculator', label: 'Risk Calculator', desc: 'Plan your staking & martingale', icon: Calculator },
  { href: '/tools/trading-times', label: 'Trading Times', desc: 'Best times for each market', icon: Clock },
  { href: '/bots/recommended', label: 'Recommended Bots', desc: 'Curated bots by use case', icon: Bot },
]

export default function RelatedTools() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Explore More Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOOLS.map(({ href, label, desc, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-glow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">{label}</div>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3">{desc}</p>
              <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
