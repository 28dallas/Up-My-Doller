'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Plus, Square, Settings, TrendingUp, CheckCircle } from 'lucide-react'
import { useTradingStore } from '@/stores/trading-store'
import StrategyTable from '@/components/trading/StrategyTable'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function DashboardCopyTradingPage() {
  const { snapshot, copiedStrategies, removeCopiedStrategy, startPolling } = useTradingStore()

  useEffect(() => startPolling(4000), [startPolling])

  const strategies = snapshot?.strategies ?? []
  const copied = strategies.filter((s) => copiedStrategies.includes(s.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Copy Trading</h1>
          <p className="text-muted-foreground text-sm mt-1">Mirror top strategy providers with zero-delay execution</p>
        </div>
        <Link href="/copy-trading">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Browse Strategies
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Copying', value: copied.length, color: 'text-primary' },
          { label: "Today's P&L", value: `+$${(snapshot?.today_pnl ?? 0).toFixed(2)}`, color: 'text-primary' },
          { label: 'Avg Win Rate', value: `${(snapshot?.win_rate ?? 0).toFixed(1)}%`, color: 'text-accent' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center py-4">
            <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {copied.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-white font-bold">Your Active Copies</h2>
          {copied.map((strategy) => (
            <Card key={strategy.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                {strategy.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold text-sm">{strategy.name}</span>
                  {strategy.is_verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                  <Badge variant="green">Copying</Badge>
                </div>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Min stake: ${strategy.min_stake} · {strategy.followers.toLocaleString()} followers
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm shrink-0">
                <div className="text-center">
                  <div className="text-primary font-bold font-mono">+{strategy.total_return.toFixed(1)}%</div>
                  <div className="text-muted-foreground text-xs">Return</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{strategy.win_rate.toFixed(1)}%</div>
                  <div className="text-muted-foreground text-xs">Win Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="w-8 h-8 rounded-lg bg-border text-muted-foreground hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeCopiedStrategy(strategy.id)}
                  className="w-8 h-8 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 flex items-center justify-center transition-all"
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {copied.length === 0 && (
        <Card className="text-center py-12">
          <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">Not copying any strategies yet</p>
          <p className="text-muted-foreground text-sm mb-6">Select a strategy below and click Copy Strategy to get started</p>
        </Card>
      )}

      <div>
        <h2 className="text-white font-bold text-lg mb-4">All Strategy Providers</h2>
        <StrategyTable showLive />
      </div>
    </div>
  )
}
