import { Bot, Copy, Gift, BarChart3, Bell, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'

const FEATURES = [
  {
    icon: Bot,
    title: 'No-Code Bot Builder',
    description: 'Drag & drop strategy builder. Create complex trading bots in minutes without writing a single line of code.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Copy,
    title: 'Copy Trading',
    description: 'Copy top-performing traders automatically. Mirror their trades in real-time and earn while you learn.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Gift,
    title: 'Free Bots Library',
    description: 'Download 500+ ready-made bot strategies. Tested, backtested, and optimized for Deriv markets.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Stats',
    description: 'Live P&L, win rate, and drawdown tracking. Know exactly how your bots are performing at all times.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Bell,
    title: 'Telegram Alerts',
    description: 'Get notified on every trade via Telegram. Never miss a win or a loss — stay in control 24/7.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'OAuth login, no API key exposure. Your Deriv credentials are never stored on our servers.',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-heading">Everything You Need to Trade Like a Pro</h2>
          <p className="section-subheading text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
            A complete trading automation suite built specifically for Deriv.com traders across Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} glow="green" className="group">
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
