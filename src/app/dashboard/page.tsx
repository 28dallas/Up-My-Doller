'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  TrendingUp, TrendingDown, Bot, Copy, Plus, Wallet, Activity, Radio,
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useTradingStore } from '@/stores/trading-store'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StrategyTable from '@/components/trading/StrategyTable'

const CHART_DATA = [
  { day: 'Mon', pnl: 120 },
  { day: 'Tue', pnl: 210 },
  { day: 'Wed', pnl: 180 },
  { day: 'Thu', pnl: 320 },
  { day: 'Fri', pnl: 280 },
  { day: 'Sat', pnl: 410 },
  { day: 'Sun', pnl: 342 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-primary font-bold font-mono text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function DashboardOverview() {
  const { snapshot, isLive, startPolling, copiedStrategies } = useTradingStore()

  useEffect(() => startPolling(4000), [startPolling])

  const balance = snapshot?.balance ?? 12450.75
  const todayPnl = snapshot?.today_pnl ?? 342.18
  const winRate = snapshot?.win_rate ?? 74.2
  const activeTrades = snapshot?.active_trades ?? 2
  const openTrades = snapshot?.open_trades ?? []

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const stats = [
    { label: 'Account Balance', value: `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: Wallet, color: 'text-primary', bg: 'bg-primary/10' },
    { label: "Today's P&L", value: `${todayPnl >= 0 ? '+' : ''}$${todayPnl.toFixed(2)}`, icon: TrendingUp, color: todayPnl >= 0 ? 'text-primary' : 'text-danger', bg: todayPnl >= 0 ? 'bg-primary/10' : 'bg-danger/10', change: todayPnl >= 0 ? `+${((todayPnl / balance) * 100).toFixed(1)}%` : undefined },
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, icon: Activity, color: 'text-accent', bg: 'bg-accent/10', change: isLive ? 'Live' : undefined },
    { label: 'Active Trades', value: String(activeTrades), icon: Bot, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">{greeting}, Trader</h1>
            {isLive && <Badge variant="live">LIVE</Badge>}
          </div>
          <p className="text-muted-foreground text-sm">Real-time trading performance — updates every 4 seconds</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/bot-builder">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              Add Bot
            </Button>
          </Link>
          <Link href="/dashboard/copy-trading">
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4" />
              Copy Strategy
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.change && (
                <Badge variant={stat.change === 'Live' ? 'live' : 'green'} className="text-xs">
                  {stat.change}
                </Badge>
              )}
            </div>
            <div>
              <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold">7-Day P&L</h2>
            <Badge variant="green">+${CHART_DATA.reduce((s, d) => s + d.pnl, 0).toLocaleString()} this week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">Open Trades</h2>
            <Radio className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div className="space-y-3">
            {openTrades.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">No open trades</p>
            ) : (
              openTrades.map((trade) => (
                <div key={trade.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface border border-border">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    trade.profit_loss >= 0 ? 'bg-primary/15' : 'bg-danger/15'
                  }`}>
                    {trade.profit_loss >= 0
                      ? <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      : <TrendingDown className="w-3.5 h-3.5 text-danger" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate">{trade.strategy_name}</div>
                    <div className="text-muted-foreground text-xs">{trade.market} · {trade.direction}</div>
                  </div>
                  <div className={`text-xs font-bold font-mono ${trade.profit_loss >= 0 ? 'text-primary' : 'text-danger'}`}>
                    {trade.profit_loss >= 0 ? '+' : ''}${Math.abs(trade.profit_loss).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Copied strategies summary */}
      {copiedStrategies.length > 0 && (
        <Card glow="emerald">
          <h2 className="text-white font-bold mb-2">Active Copy Subscriptions</h2>
          <p className="text-muted-foreground text-sm">
            You are copying {copiedStrategies.length} strateg{copiedStrategies.length === 1 ? 'y' : 'ies'}.
            Trades mirror automatically with zero delay.
          </p>
        </Card>
      )}

      <div>
        <h2 className="text-white font-bold text-lg mb-4">Strategy Providers</h2>
        <StrategyTable showLive compact />
      </div>
    </div>
  )
}

