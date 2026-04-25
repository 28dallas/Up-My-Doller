'use client'
import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react'

const MARKETS = ['All', 'V10', 'V25', 'V75', 'Boom 1000', 'Crash 500', 'Step Index']

const PNL_DATA = [
  { date: 'Jan 1', pnl: 1200 }, { date: 'Jan 5', pnl: 2800 }, { date: 'Jan 10', pnl: 2100 },
  { date: 'Jan 15', pnl: 4200 }, { date: 'Jan 20', pnl: 3600 }, { date: 'Jan 25', pnl: 5800 },
  { date: 'Jan 30', pnl: 5200 }, { date: 'Feb 5', pnl: 7100 }, { date: 'Feb 10', pnl: 6400 },
  { date: 'Feb 15', pnl: 8900 }, { date: 'Feb 20', pnl: 8200 }, { date: 'Feb 25', pnl: 10500 },
]

const WIN_RATE_BY_MARKET = [
  { market: 'V10', win_rate: 68, trades: 420 },
  { market: 'V25', win_rate: 61, trades: 310 },
  { market: 'V75', win_rate: 55, trades: 180 },
  { market: 'Boom 1000', win_rate: 72, trades: 240 },
  { market: 'Crash 500', win_rate: 65, trades: 195 },
  { market: 'Step', win_rate: 58, trades: 130 },
]

const STRATEGY_BREAKDOWN = [
  { name: 'Over/Under', value: 38, color: '#00E676' },
  { name: 'Rise/Fall', value: 28, color: '#FFD700' },
  { name: 'Even/Odd', value: 20, color: '#60A5FA' },
  { name: 'Digit Match', value: 14, color: '#F59E0B' },
]

const HOURLY_DATA = Array.from({ length: 24 }, (_, h) => ({
  hour: `${h}:00`,
  wins: Math.floor(Math.random() * 20 + 5),
  losses: Math.floor(Math.random() * 10 + 2),
}))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-bold font-mono">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalysisPage() {
  const [market, setMarket] = useState('All')
  const [period, setPeriod] = useState('30d')

  const totalTrades = WIN_RATE_BY_MARKET.reduce((s, m) => s + m.trades, 0)
  const avgWinRate = Math.round(WIN_RATE_BY_MARKET.reduce((s, m) => s + m.win_rate, 0) / WIN_RATE_BY_MARKET.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analysis</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep dive into your trading performance</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', 'All'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Trades', value: totalTrades.toLocaleString(), icon: Activity, color: 'text-primary', bg: 'bg-primary/10', change: '+124 this week' },
          { label: 'Avg Win Rate', value: `${avgWinRate}%`, icon: Target, color: 'text-success', bg: 'bg-success/10', change: '+2.3% vs last month' },
          { label: 'Total Profit', value: 'KES 45,230', icon: TrendingUp, color: 'text-gold', bg: 'bg-gold/10', change: '+KES 8,400 this month' },
          { label: 'Avg Daily P&L', value: 'KES 1,508', icon: TrendingDown, color: 'text-blue-400', bg: 'bg-blue-400/10', change: 'Based on 30 days' },
        ].map(({ label, value, icon: Icon, color, bg, change }) => (
          <Card key={label}>
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-white text-xs font-medium mt-0.5">{label}</div>
            <div className="text-muted-foreground text-xs mt-1">{change}</div>
          </Card>
        ))}
      </div>

      {/* Market filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {MARKETS.map((m) => (
          <button
            key={m}
            onClick={() => setMarket(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${market === m ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* P&L Chart */}
      <Card>
        <h2 className="text-white font-bold mb-5">Cumulative P&L (KES)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={PNL_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" />
            <XAxis dataKey="date" tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="pnl" stroke="#00E676" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#00E676' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Win rate by market + Strategy breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-white font-bold mb-5">Win Rate by Market</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WIN_RATE_BY_MARKET} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" vertical={false} />
              <XAxis dataKey="market" tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="win_rate" name="Win Rate %" radius={[4, 4, 0, 0]}>
                {WIN_RATE_BY_MARKET.map((entry, i) => (
                  <Cell key={i} fill={entry.win_rate >= 65 ? '#00E676' : entry.win_rate >= 58 ? '#F59E0B' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-white font-bold mb-5">Strategy Breakdown</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={STRATEGY_BREAKDOWN} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {STRATEGY_BREAKDOWN.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {STRATEGY_BREAKDOWN.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground text-xs">{s.name}</span>
                  </div>
                  <span className="text-white text-xs font-bold font-mono">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Hourly performance */}
      <Card>
        <h2 className="text-white font-bold mb-5">Hourly Trade Distribution (24h)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={HOURLY_DATA} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="wins" name="Wins" fill="#00E676" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="losses" name="Losses" fill="#EF4444" radius={[2, 2, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-sm bg-success" />Wins</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-sm bg-danger" />Losses</div>
        </div>
      </Card>

      {/* Market breakdown table */}
      <Card>
        <h2 className="text-white font-bold mb-5">Market Performance Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Market', 'Trades', 'Win Rate', 'Avg Profit', 'Total P&L', 'Status'].map((h) => (
                  <th key={h} className="text-left px-3 py-3 text-muted-foreground text-xs font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {WIN_RATE_BY_MARKET.map((row) => (
                <tr key={row.market} className="hover:bg-white/3 transition-all">
                  <td className="px-3 py-3 text-white font-medium text-sm">{row.market}</td>
                  <td className="px-3 py-3 text-muted-foreground font-mono text-sm">{row.trades}</td>
                  <td className="px-3 py-3">
                    <Badge variant={row.win_rate >= 65 ? 'green' : row.win_rate >= 58 ? 'yellow' : 'red'}>
                      {row.win_rate}%
                    </Badge>
                  </td>
                  <td className="px-3 py-3 text-success font-mono text-sm">+KES {Math.round(row.win_rate * 12)}</td>
                  <td className="px-3 py-3 text-success font-bold font-mono text-sm">+KES {(row.trades * row.win_rate * 0.12).toFixed(0)}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-success text-xs">Active</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
