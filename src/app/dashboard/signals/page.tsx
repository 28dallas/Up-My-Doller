'use client'
import { useState, useEffect } from 'react'
import { Zap, TrendingUp, TrendingDown, Clock, RefreshCw, Bell, Filter } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

type Signal = {
  id: string
  market: string
  direction: 'RISE' | 'FALL' | 'OVER' | 'UNDER' | 'EVEN' | 'ODD'
  strategy: string
  confidence: number
  stake_suggestion: number
  duration: string
  timestamp: string
  status: 'active' | 'expired' | 'won' | 'lost'
  result_pnl?: number
}

const INITIAL_SIGNALS: Signal[] = [
  { id: '1', market: 'Volatility 10', direction: 'OVER', strategy: 'Over/Under', confidence: 82, stake_suggestion: 2, duration: '1 tick', timestamp: '14:32:05', status: 'active' },
  { id: '2', market: 'Boom 1000', direction: 'RISE', strategy: 'Rise/Fall', confidence: 76, stake_suggestion: 1, duration: '5 ticks', timestamp: '14:31:48', status: 'won', result_pnl: 1.74 },
  { id: '3', market: 'Volatility 25', direction: 'EVEN', strategy: 'Even/Odd', confidence: 68, stake_suggestion: 1, duration: '1 tick', timestamp: '14:31:20', status: 'lost', result_pnl: -1.00 },
  { id: '4', market: 'Crash 500', direction: 'FALL', strategy: 'Rise/Fall', confidence: 79, stake_suggestion: 0.5, duration: '3 ticks', timestamp: '14:30:55', status: 'won', result_pnl: 0.87 },
  { id: '5', market: 'Volatility 10', direction: 'UNDER', strategy: 'Over/Under', confidence: 71, stake_suggestion: 2, duration: '1 tick', timestamp: '14:30:30', status: 'active' },
  { id: '6', market: 'Step Index', direction: 'ODD', strategy: 'Even/Odd', confidence: 65, stake_suggestion: 1, duration: '1 tick', timestamp: '14:30:10', status: 'expired' },
  { id: '7', market: 'Volatility 75', direction: 'RISE', strategy: 'Rise/Fall', confidence: 73, stake_suggestion: 1, duration: '5 ticks', timestamp: '14:29:45', status: 'won', result_pnl: 1.74 },
  { id: '8', market: 'Boom 500', direction: 'RISE', strategy: 'Rise/Fall', confidence: 80, stake_suggestion: 2, duration: '3 ticks', timestamp: '14:29:20', status: 'won', result_pnl: 3.48 },
]

const DIRECTION_COLORS: Record<string, string> = {
  RISE: 'text-success', FALL: 'text-danger',
  OVER: 'text-primary', UNDER: 'text-warning',
  EVEN: 'text-blue-400', ODD: 'text-purple-400',
}

const DIRECTION_BG: Record<string, string> = {
  RISE: 'bg-success/10 border-success/30', FALL: 'bg-danger/10 border-danger/30',
  OVER: 'bg-primary/10 border-primary/30', UNDER: 'bg-warning/10 border-warning/30',
  EVEN: 'bg-blue-400/10 border-blue-400/30', ODD: 'bg-purple-400/10 border-purple-400/30',
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            backgroundColor: value >= 75 ? '#00E676' : value >= 65 ? '#F59E0B' : '#EF4444',
          }}
        />
      </div>
      <span className={`text-xs font-bold font-mono ${value >= 75 ? 'text-success' : value >= 65 ? 'text-warning' : 'text-danger'}`}>
        {value}%
      </span>
    </div>
  )
}

export default function SignalsPage() {
  const [signals, setSignals] = useState(INITIAL_SIGNALS)
  const [filter, setFilter] = useState('All')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate live signal updates
  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => {
      setLastUpdated(new Date())
      // Add a new signal occasionally
      const newSignal: Signal = {
        id: Date.now().toString(),
        market: ['Volatility 10', 'Volatility 25', 'Boom 1000', 'Crash 500'][Math.floor(Math.random() * 4)],
        direction: (['RISE', 'FALL', 'OVER', 'UNDER', 'EVEN', 'ODD'] as const)[Math.floor(Math.random() * 6)],
        strategy: ['Rise/Fall', 'Over/Under', 'Even/Odd'][Math.floor(Math.random() * 3)],
        confidence: Math.floor(Math.random() * 25 + 60),
        stake_suggestion: [0.5, 1, 2][Math.floor(Math.random() * 3)],
        duration: ['1 tick', '3 ticks', '5 ticks'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toTimeString().slice(0, 8),
        status: 'active',
      }
      setSignals((prev) => [newSignal, ...prev.slice(0, 19)])
    }, 8000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const FILTERS = ['All', 'Active', 'Won', 'Lost', 'Expired']
  const filtered = signals.filter((s) => filter === 'All' || s.status === filter.toLowerCase())

  const wonCount = signals.filter((s) => s.status === 'won').length
  const lostCount = signals.filter((s) => s.status === 'lost').length
  const winRate = wonCount + lostCount > 0 ? Math.round((wonCount / (wonCount + lostCount)) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-gold" />
            Trading Signals
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-powered signals updated in real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Updated {lastUpdated.toTimeString().slice(0, 8)}
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${autoRefresh ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            {autoRefresh ? 'Live' : 'Paused'}
          </button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4" />
            Alert Me
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Signals', value: signals.filter((s) => s.status === 'active').length, color: 'text-primary' },
          { label: 'Win Rate (today)', value: `${winRate}%`, color: 'text-success' },
          { label: 'Signals Won', value: wonCount, color: 'text-success' },
          { label: 'Signals Lost', value: lostCount, color: 'text-danger' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center py-4">
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${filter === f ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
          >
            {f}
            {f === 'Active' && (
              <span className="ml-1.5 bg-primary/30 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {signals.filter((s) => s.status === 'active').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Signals grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((signal) => (
          <div
            key={signal.id}
            className={`bg-card border rounded-xl p-4 transition-all ${
              signal.status === 'active'
                ? 'border-primary/30 shadow-[0_0_15px_rgba(0,230,118,0.08)]'
                : 'border-border'
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-bold text-sm">{signal.market}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{signal.strategy} · {signal.duration}</div>
              </div>
              <Badge variant={
                signal.status === 'active' ? 'green' :
                signal.status === 'won' ? 'green' :
                signal.status === 'lost' ? 'red' : 'default'
              }>
                {signal.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block mr-1" />}
                {signal.status.toUpperCase()}
              </Badge>
            </div>

            {/* Direction */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-3 ${DIRECTION_BG[signal.direction]}`}>
              {['RISE', 'OVER', 'EVEN'].includes(signal.direction)
                ? <TrendingUp className={`w-4 h-4 ${DIRECTION_COLORS[signal.direction]}`} />
                : <TrendingDown className={`w-4 h-4 ${DIRECTION_COLORS[signal.direction]}`} />
              }
              <span className={`font-bold text-sm ${DIRECTION_COLORS[signal.direction]}`}>{signal.direction}</span>
            </div>

            {/* Confidence */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Confidence</span>
              </div>
              <ConfidenceBar value={signal.confidence} />
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="text-muted-foreground text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {signal.timestamp}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Stake: <span className="text-white font-mono">${signal.stake_suggestion}</span></span>
                {signal.result_pnl !== undefined && (
                  <span className={`text-xs font-bold font-mono ${signal.result_pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    {signal.result_pnl >= 0 ? '+' : ''}${signal.result_pnl}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-white font-semibold">No signals found</p>
          <p className="text-muted-foreground text-sm mt-1">Try a different filter or wait for new signals</p>
        </div>
      )}
    </div>
  )
}
