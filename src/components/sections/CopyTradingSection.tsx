import Link from 'next/link'
import { CheckCircle, TrendingUp, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { MOCK_TRADERS } from '@/lib/data'

export default function CopyTradingSection() {
  const topTraders = MOCK_TRADERS.slice(0, 5)

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <Badge variant="blue" className="mb-4">Copy Trading</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Copy Africa&apos;s Best{' '}
              <span className="gradient-text">Deriv Traders</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Follow verified top traders and automatically mirror their trades. 
              Set your stake size, daily loss limits, and let the pros trade for you.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Real-time trade mirroring',
                'Set max stake & daily loss limits',
                'Verified trader performance stats',
                'Cancel anytime, no lock-in',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link href="/copy-trading">
                <Button variant="primary">Start Copying</Button>
              </Link>
              <Link href="/copy-trading">
                <Button variant="outline">View All Traders →</Button>
              </Link>
            </div>
          </div>

          {/* Right: Leaderboard */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-white font-bold text-sm">Top Traders Leaderboard</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-success text-xs">Live</span>
              </div>
            </div>

            <div className="divide-y divide-border">
              {topTraders.map((trader, index) => (
                <div key={trader.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/3 transition-all">
                  {/* Rank */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    index === 0 ? 'bg-gold/20 text-gold' :
                    index === 1 ? 'bg-white/10 text-white/70' :
                    index === 2 ? 'bg-warning/20 text-warning' :
                    'bg-border text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {trader.display_name.slice(0, 2).toUpperCase()}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-sm font-medium truncate">{trader.display_name}</span>
                      {trader.is_verified && <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {trader.followers} followers
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right shrink-0">
                    <div className="text-success text-sm font-bold font-mono">+{trader.monthly_roi}%</div>
                    <div className="text-muted-foreground text-xs">{trader.win_rate}% win</div>
                  </div>

                  {/* Copy button */}
                  <Button variant="outline" size="sm" className="shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
