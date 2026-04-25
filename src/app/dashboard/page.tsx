'use client'
import { TrendingUp, TrendingDown, Bot, Copy, Plus, Wallet, Activity } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const CHART_DATA = [
  { day: 'Mon', pnl: 1200 },
  { day: 'Tue', pnl: 2100 },
  { day: 'Wed', pnl: 1800 },
  { day: 'Thu', pnl: 3200 },
  { day: 'Fri', pnl: 2800 },
  { day: 'Sat', pnl: 4100 },
  { day: 'Sun', pnl: 3750 },
]

const RECENT_ACTIVITY = [
  { type: 'win', bot: 'Volatility Crusher v3', market: 'V10', profit: '+KES 340', time: '2 min ago' },
  { type: 'loss', bot: 'Boom Rider Pro', market: 'Boom 1000', profit: '-KES 120', time: '8 min ago' },
  { type: 'win', bot: 'Even Odd Master', market: 'V25', profit: '+KES 210', time: '15 min ago' },
  { type: 'win', bot: 'Volatility Crusher v3', market: 'V10', profit: '+KES 290', time: '22 min ago' },
  { type: 'win', bot: 'Step Index Scalper', market: 'Step', profit: '+KES 180', time: '31 min ago' },
]

const STATS = [
  { label: 'Active Bots', value: '3', icon: Bot, color: 'text-primary', bg: 'bg-primary/10', change: null },
  { label: "Today's P&L", value: '+KES 1,240', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10', change: '+12.4%' },
  { label: 'Win Rate (7d)', value: '71.3%', icon: Activity, color: 'text-gold', bg: 'bg-gold/10', change: '+2.1%' },
  { label: 'Account Balance', value: 'KES 45,230', icon: Wallet, color: 'text-blue-400', bg: 'bg-blue-400/10', change: null },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-success font-bold font-mono text-sm">KES {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function DashboardOverview() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, James</h1>
          <p className="text-muted-foreground text-sm mt-1">Here&apos;s your trading performance today</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/bot-builder">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              Add New Bot
            </Button>
          </Link>
          <Link href="/copy-trading">
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4" />
              Copy Trader
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.change && (
                <Badge variant="green" className="text-xs">{stat.change}</Badge>
              )}
            </div>
            <div>
              <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* P&L Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold">7-Day P&L Performance</h2>
            <Badge variant="green">+KES 18,450 this week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" />
              <XAxis dataKey="day" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#00E676"
                strokeWidth={2.5}
                dot={{ fill: '#00E676', r: 4 }}
                activeDot={{ r: 6, fill: '#00E676' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-white font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.type === 'win' ? 'bg-success/20' : 'bg-danger/20'}`}>
                  {item.type === 'win'
                    ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                    : <TrendingDown className="w-3.5 h-3.5 text-danger" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{item.bot}</div>
                  <div className="text-muted-foreground text-xs">{item.market} | {item.time}</div>
                </div>
                <div className={`text-xs font-bold font-mono shrink-0 ${item.type === 'win' ? 'text-success' : 'text-danger'}`}>
                  {item.profit}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

