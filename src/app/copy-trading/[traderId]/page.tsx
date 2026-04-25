'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Users, TrendingUp, TrendingDown, Shield } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { MOCK_TRADERS } from '@/lib/data'

const CHART_DATA_7D = [
  { day: 'Mon', roi: 4.2 }, { day: 'Tue', roi: 7.8 }, { day: 'Wed', roi: 6.1 },
  { day: 'Thu', roi: 11.3 }, { day: 'Fri', roi: 9.7 }, { day: 'Sat', roi: 14.2 }, { day: 'Sun', roi: 12.8 },
]
const CHART_DATA_30D = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`, roi: Math.round((Math.random() * 8 + 2) * 10) / 10,
}))

const RECENT_TRADES = [
  { time: '14:32', market: 'V10', direction: 'Over 5', stake: 2, result: 'win', pnl: 1.74 },
  { time: '14:18', market: 'V10', direction: 'Under 5', stake: 2, result: 'win', pnl: 1.74 },
  { time: '14:05', market: 'Boom 1000', direction: 'Rise', stake: 1, result: 'loss', pnl: -1.00 },
  { time: '13:51', market: 'V10', direction: 'Over 5', stake: 3, result: 'win', pnl: 2.61 },
  { time: '13:40', market: 'V25', direction: 'Even', stake: 1, result: 'win', pnl: 0.95 },
  { time: '13:28', market: 'V10', direction: 'Under 5', stake: 2, result: 'loss', pnl: -2.00 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-success font-bold font-mono text-sm">+{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export default function TraderProfilePage({ params }: { params: { traderId: string } }) {
  const trader = MOCK_TRADERS.find((t) => t.id === params.traderId) ?? MOCK_TRADERS[0]
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [maxStake, setMaxStake] = useState(5)
  const [dailyLimit, setDailyLimit] = useState(50)

  const chartData = period === '7d' ? CHART_DATA_7D : CHART_DATA_30D

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <Link href="/copy-trading" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Leaderboard
        </Link>

        {/* Trader header */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
              {trader.display_name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-white">{trader.display_name}</h1>
                {trader.is_verified && (
                  <Badge variant="blue">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-2">{trader.bio}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{trader.followers} followers</span>
                <span>Joined Jan 2023</span>
                <span className="text-primary font-semibold">${trader.subscription_fee}/mo to copy</span>
              </div>
            </div>
            <Button variant="primary" size="lg" onClick={() => setShowCopyModal(true)}>
              <TrendingUp className="w-5 h-5" />
              Copy This Trader
            </Button>
          </div>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Win Rate', value: `${trader.win_rate}%`, color: 'text-primary' },
            { label: 'Monthly ROI', value: `+${trader.monthly_roi}%`, color: 'text-success' },
            { label: 'Total Trades', value: trader.total_trades.toLocaleString(), color: 'text-white' },
            { label: 'Max Drawdown', value: `${trader.max_drawdown}%`, color: 'text-warning' },
          ].map(({ label, value, color }) => (
            <Card key={label} className="text-center py-4">
              <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
              <div className="text-muted-foreground text-xs mt-1">{label}</div>
            </Card>
          ))}
        </div>

        {/* P&L Chart */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold">ROI Performance</h2>
            <div className="flex bg-background border border-border rounded-lg overflow-hidden">
              {(['7d', '30d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 text-sm font-medium transition-all ${period === p ? 'bg-primary text-black' : 'text-muted-foreground hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" />
              <XAxis dataKey="day" tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="roi" stroke="#00E676" strokeWidth={2.5} dot={{ fill: '#00E676', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent trades */}
        <Card>
          <h2 className="text-white font-bold mb-5">Recent Trades</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Time', 'Market', 'Direction', 'Stake', 'Result', 'P&L'].map((h) => (
                    <th key={h} className="text-left px-3 py-3 text-muted-foreground text-xs font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_TRADES.map((trade, i) => (
                  <tr key={i} className="hover:bg-white/3 transition-all">
                    <td className="px-3 py-3 text-muted-foreground font-mono text-xs">{trade.time}</td>
                    <td className="px-3 py-3 text-white text-xs">{trade.market}</td>
                    <td className="px-3 py-3 text-white text-xs">{trade.direction}</td>
                    <td className="px-3 py-3 text-white font-mono text-xs">${trade.stake}</td>
                    <td className="px-3 py-3">
                      <div className={`flex items-center gap-1 text-xs font-semibold ${trade.result === 'win' ? 'text-success' : 'text-danger'}`}>
                        {trade.result === 'win' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {trade.result.toUpperCase()}
                      </div>
                    </td>
                    <td className={`px-3 py-3 font-bold font-mono text-xs ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Copy modal */}
      {showCopyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <Card className="w-full max-w-md border-primary/30">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Copy {trader.display_name}</h2>
              <button onClick={() => setShowCopyModal(false)} className="text-muted-foreground hover:text-white text-xl leading-none">×</button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-white text-sm font-medium">Max Stake per Trade ($)</label>
                  <span className="text-primary font-mono text-sm font-bold">${maxStake}</span>
                </div>
                <input type="range" min={1} max={50} value={maxStake} onChange={(e) => setMaxStake(Number(e.target.value))} className="w-full accent-primary" />
                <div className="flex justify-between text-muted-foreground text-xs mt-1"><span>$1</span><span>$50</span></div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-white text-sm font-medium">Daily Loss Limit ($)</label>
                  <span className="text-primary font-mono text-sm font-bold">${dailyLimit}</span>
                </div>
                <input type="range" min={10} max={500} step={10} value={dailyLimit} onChange={(e) => setDailyLimit(Number(e.target.value))} className="w-full accent-primary" />
                <div className="flex justify-between text-muted-foreground text-xs mt-1"><span>$10</span><span>$500</span></div>
              </div>

              <div className="bg-background rounded-xl border border-border p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-xs">Copying will stop automatically if your daily loss limit is reached. You can stop copying anytime from your dashboard.</p>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setShowCopyModal(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={() => setShowCopyModal(false)}>
                  Start Copying
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}
