import { Bot, Copy, LineChart, Shield, Zap, Users } from 'lucide-react'
import Card from '@/components/ui/Card'

const FEATURES = [
  {
    icon: Copy,
    title: 'Copy Trading',
    description: 'Mirror top-performing strategy providers in real-time. Set stake limits and let the pros trade for you.',
  },
  {
    icon: Zap,
    title: 'Zero-Delay Execution',
    description: 'Lightning-fast trade execution with no lag. Your bots react to market moves instantly.',
  },
  {
    icon: Bot,
    title: '100+ Trading Bots',
    description: 'Pre-built, backtested bots for Volatility, Boom/Crash, Forex, and Step Index markets.',
  },
  {
    icon: LineChart,
    title: 'Live Performance Stats',
    description: 'Real-time win rate, drawdown, and return tracking. Know exactly how strategies perform.',
  },
  {
    icon: Shield,
    title: 'Secure OAuth Login',
    description: 'Connect your Deriv account securely. API tokens are encrypted and never exposed.',
  },
  {
    icon: Users,
    title: 'Community & Mentorship',
    description: 'Join live sessions, Telegram signals, and mentorship programs from verified traders.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-heading">Powerful Tools for Every Trader</h2>
          <p className="section-subheading mx-auto">
            Everything you need to trade smarter — copy trading, automated bots, and real-time analytics in one platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} glow="emerald" className="group">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
