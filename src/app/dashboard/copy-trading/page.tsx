'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Square, Settings, TrendingUp, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const COPIED_TRADERS = [
  { id: '1', name: 'AlphaTrader_KE', verified: true, status: 'active', pnl_today: 840, win_rate: 78, max_stake: 5, daily_loss_limit: 50 },
  { id: '2', name: 'ProfitKing254', verified: true, status: 'active', pnl_today: 320, win_rate: 74, max_stake: 3, daily_loss_limit: 30 },
  { id: '3', name: 'BoomCrashPro', verified: false, status: 'paused', pnl_today: -120, win_rate: 71, max_stake: 2, daily_loss_limit: 20 },
]

export default function DashboardCopyTradingPage() {
  const [traders, setTraders] = useState(COPIED_TRADERS)

  const toggleStatus = (id: string, current: string) => {
    setTraders((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: current === 'active' ? 'paused' : 'active' } : t)
    )
  }

  const stopCopying = (id: string) => {
    setTraders((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Copy Trading</h1>
          <p className="text-muted-foreground text-sm mt-1">Traders you are currently copying</p>
        </div>
        <Link href="/copy-trading">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Find Traders
          </Button>
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Copying', value: traders.filter((t) => t.status === 'active').length, color: 'text-primary' },
          { label: "Today's Copy P&L", value: `+KES ${traders.reduce((s, t) => s + Math.max(0, t.pnl_today), 0).toLocaleString()}`, color: 'text-success' },
          { label: 'Avg Win Rate', value: `${Math.round(traders.reduce((s, t) => s + t.win_rate, 0) / traders.length)}%`, color: 'text-gold' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center py-4">
            <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {/* Trader list */}
      <div className="space-y-4">
        {traders.map((trader) => (
          <Card key={trader.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
              {trader.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-bold text-sm">{trader.name}</span>
                {trader.verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                <Badge variant={trader.status === 'active' ? 'green' : 'yellow'}>
                  {trader.status === 'active' ? 'Copying' : 'Paused'}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs mt-0.5">
                Max stake: ${trader.max_stake} · Daily loss limit: ${trader.daily_loss_limit}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm shrink-0">
              <div className="text-center">
                <div className={`font-bold font-mono ${trader.pnl_today >= 0 ? 'text-success' : 'text-danger'}`}>
                  {trader.pnl_today >= 0 ? '+' : ''}KES {trader.pnl_today.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">Today</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">{trader.win_rate}%</div>
                <div className="text-muted-foreground text-xs">Win Rate</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleStatus(trader.id, trader.status)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  trader.status === 'active'
                    ? 'bg-warning/20 text-warning hover:bg-warning/30'
                    : 'bg-success/20 text-success hover:bg-success/30'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-border text-muted-foreground hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => stopCopying(trader.id)}
                className="w-8 h-8 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 flex items-center justify-center transition-all"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {traders.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-white font-semibold mb-2">Not copying anyone yet</p>
          <p className="text-muted-foreground text-sm mb-6">Find top traders and start copying their trades</p>
          <Link href="/copy-trading">
            <Button variant="primary">Browse Traders</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
