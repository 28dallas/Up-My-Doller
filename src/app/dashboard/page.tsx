'use client'

import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Bot, TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useSimulatedTrades } from '@/hooks/useSimulatedTrades'
import { market } from '@/lib/simulatedMarket'
import { formatKES, formatPnL, getAllRunningBotIds } from '@/lib/botEngine'

export default function DashboardOverview() {
  const { trades, totalPnL, todayPnL, winRate, totalTrades, currentStreak } = useSimulatedTrades()
  const [days, setDays] = useState<7 | 30 | 90>(30)

  const equity = useMemo(() => market.generateEquityCurve(days), [days])
  const activeBots = useMemo(() => getAllRunningBotIds().slice(0, 3), [])
  const balance = 10000 + totalPnL
  const recentTrades = trades.slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Simulated Balance', value: formatKES(balance), accent: 'text-primary' },
          { label: "Today's P&L", value: formatPnL(todayPnL), accent: todayPnL >= 0 ? 'text-success' : 'text-danger' },
          { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, accent: 'text-gold' },
          { label: 'Active Bots', value: String(activeBots.length), accent: 'text-blue-400' },
        ].map((stat) => (
          <Card key={stat.label} glow="green" className="space-y-2">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.accent}`}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.75fr,0.95fr]">
        <Card className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Performance Chart</h2>
              <p className="text-sm text-muted-foreground">Realistic equity curve generated from the simulated engine.</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDays(value as 7 | 30 | 90)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${days === value ? 'bg-primary text-black' : 'border border-border text-muted-foreground hover:text-white'}`}
                >
                  {value}D
                </button>
              ))}
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equity}>
                <defs>
                  <linearGradient id="balanceFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00E676" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00E676" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f3043" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: '#8fa2b7', fontSize: 11 }} />
                <YAxis tick={{ fill: '#8fa2b7', fontSize: 11 }} tickFormatter={(value) => `KES ${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Balance']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{ background: '#121b29', border: '1px solid #1f3043', borderRadius: 16 }}
                />
                <Area type="monotone" dataKey="balance" stroke="#00E676" fill="url(#balanceFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active Bots</h2>
            <Badge variant="green">{activeBots.length} running</Badge>
          </div>
          {activeBots.length === 0 ? (
            <div className="rounded-3xl border border-border bg-background/40 p-5 text-sm text-muted-foreground">
              No bots are running right now. Start one from the bot builder to see live trade updates here.
            </div>
          ) : (
            activeBots.map((botId, index) => (
              <div key={botId} className="rounded-3xl border border-border bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Running Bot #{index + 1}</div>
                      <div className="text-xs text-muted-foreground">{botId}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                    RUNNING
                  </span>
                </div>
              </div>
            ))
          )}
          <Button className="w-full justify-center rounded-2xl" onClick={() => (window.location.href = '/dashboard/bot-builder')}>
            Open Bot Builder
          </Button>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.75fr,0.95fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Trades</h2>
              <p className="text-sm text-muted-foreground">Last {recentTrades.length} trades from the live simulation feed.</p>
            </div>
            <Badge variant={currentStreak >= 0 ? 'green' : 'red'}>
              Streak {currentStreak > 0 ? `+${currentStreak}` : currentStreak}
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Market</th>
                  <th className="pb-3 font-medium">Direction</th>
                  <th className="pb-3 font-medium">Stake</th>
                  <th className="pb-3 font-medium">Result</th>
                  <th className="pb-3 font-medium">P&L</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade) => (
                  <tr key={trade.id} className="border-t border-border/70">
                    <td className="py-3 text-muted-foreground">{trade.timestamp.toLocaleTimeString('en-KE')}</td>
                    <td className="py-3 text-white">{trade.symbolDisplay}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${trade.direction === 'CALL' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {trade.direction === 'CALL' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3 text-white">{formatKES(trade.stake)}</td>
                    <td className="py-3">
                      <Badge variant={trade.result === 'WIN' ? 'green' : 'red'}>{trade.result}</Badge>
                    </td>
                    <td className={`py-3 font-semibold ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>{formatPnL(trade.pnl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-white">Session Summary</h2>
          </div>
          <div className="rounded-3xl border border-border bg-background/40 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Trades Today</div>
            <div className="mt-2 text-3xl font-bold text-white">{totalTrades}</div>
          </div>
          <div className="rounded-3xl border border-border bg-background/40 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Net Performance</div>
            <div className={`mt-2 text-3xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>{formatPnL(totalPnL)}</div>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            The dashboard is powered entirely by simulated market data, so you can test workflows, signals, and bot behaviour without relying on any external trading API.
          </p>
        </Card>
      </div>
    </div>
  )
}
