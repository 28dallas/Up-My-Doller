'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Play, Pause, Square, Settings, TrendingUp, TrendingDown } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const MOCK_USER_BOTS = [
  { id: '1', name: 'Volatility Crusher v3', market: 'Volatility 10', strategy: 'Over/Under', status: 'running', win_rate: 68, pnl_today: 1240, stake: 2 },
  { id: '2', name: 'Boom Rider Pro', market: 'Boom 1000', strategy: 'Rise/Fall', status: 'paused', win_rate: 72, pnl_today: -120, stake: 1 },
  { id: '3', name: 'Even Odd Master', market: 'Volatility 25', strategy: 'Even/Odd', status: 'running', win_rate: 58, pnl_today: 340, stake: 0.5 },
]

type BotStatus = 'running' | 'paused' | 'stopped'

export default function MyBotsPage() {
  const [bots, setBots] = useState(MOCK_USER_BOTS)

  const toggleStatus = (id: string, current: BotStatus) => {
    setBots((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: current === 'running' ? 'paused' : 'running' } : b
      )
    )
  }

  const stopBot = (id: string) => {
    setBots((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'stopped' } : b)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Bots</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your deployed trading bots</p>
        </div>
        <Link href="/dashboard/bot-builder">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Add Bot
          </Button>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Running', count: bots.filter((b) => b.status === 'running').length, color: 'text-success' },
          { label: 'Paused', count: bots.filter((b) => b.status === 'paused').length, color: 'text-warning' },
          { label: 'Stopped', count: bots.filter((b) => b.status === 'stopped').length, color: 'text-muted-foreground' },
        ].map(({ label, count, color }) => (
          <Card key={label} className="text-center py-4">
            <div className={`text-2xl font-bold font-mono ${color}`}>{count}</div>
            <div className="text-muted-foreground text-xs mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {/* Bot list */}
      <div className="space-y-4">
        {bots.map((bot) => (
          <Card key={bot.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Status indicator */}
            <div className={`w-2 h-2 rounded-full shrink-0 ${
              bot.status === 'running' ? 'bg-success animate-pulse' :
              bot.status === 'paused' ? 'bg-warning' : 'bg-muted-foreground'
            }`} />

            {/* Bot info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-bold text-sm">{bot.name}</h3>
                <Badge variant={bot.status === 'running' ? 'green' : bot.status === 'paused' ? 'yellow' : 'default'}>
                  {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs mt-0.5">{bot.market} · {bot.strategy} · Stake: ${bot.stake}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-white font-bold font-mono">{bot.win_rate}%</div>
                <div className="text-muted-foreground text-xs">Win Rate</div>
              </div>
              <div className="text-center">
                <div className={`font-bold font-mono ${bot.pnl_today >= 0 ? 'text-success' : 'text-danger'}`}>
                  {bot.pnl_today >= 0 ? '+' : ''}KES {bot.pnl_today.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">Today&apos;s P&L</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleStatus(bot.id, bot.status as BotStatus)}
                disabled={bot.status === 'stopped'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 ${
                  bot.status === 'running'
                    ? 'bg-warning/20 text-warning hover:bg-warning/30'
                    : 'bg-success/20 text-success hover:bg-success/30'
                }`}
              >
                {bot.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => stopBot(bot.id)}
                disabled={bot.status === 'stopped'}
                className="w-8 h-8 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 flex items-center justify-center transition-all disabled:opacity-40"
              >
                <Square className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-border text-muted-foreground hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {bots.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-white font-semibold mb-2">No bots yet</p>
          <p className="text-muted-foreground text-sm mb-6">Add a bot from the library or build your own</p>
          <Link href="/dashboard/bot-builder">
            <Button variant="primary">Build Your First Bot</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
