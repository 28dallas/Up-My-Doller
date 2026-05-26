'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

const MARKETS = [
  { label: 'Volatility 10 (1s)', value: 'V10', base: 1234.56 },
  { label: 'Volatility 25 (1s)', value: 'V25', base: 2345.67 },
  { label: 'Volatility 50 (1s)', value: 'V50', base: 3456.78 },
  { label: 'Volatility 75 (1s)', value: 'V75', base: 4567.89 },
  { label: 'Crash 500', value: 'C500', base: 5432.10 },
  { label: 'Crash 1000', value: 'C1000', base: 6543.21 },
  { label: 'Boom 500', value: 'B500', base: 7654.32 },
  { label: 'Boom 1000', value: 'B1000', base: 8765.43 },
]

const CONTRACT_TYPES = ['Rise/Fall', 'Over/Under', 'Even/Odd', 'Digit Match', 'Touch/No Touch']
const DURATIONS = ['1 tick', '2 ticks', '3 ticks', '5 ticks', '10 ticks', '1 min', '5 min']

type Trade = {
  id: string
  market: string
  type: string
  direction: string
  stake: number
  result: 'win' | 'loss' | 'pending'
  pnl: number
  time: string
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={chartData}>
        <YAxis domain={['auto', 'auto']} hide />
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default function DTraderPage() {
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0])
  const [contractType, setContractType] = useState('Rise/Fall')
  const [duration, setDuration] = useState('1 tick')
  const [stake, setStake] = useState(1)
  const [price, setPrice] = useState(selectedMarket.base)
  const [priceHistory, setPriceHistory] = useState<number[]>(
    Array.from({ length: 40 }, (_, i) => selectedMarket.base + (Math.random() - 0.5) * 5)
  )
  const [trades, setTrades] = useState<Trade[]>([])
  const [placing, setPlacing] = useState(false)
  const [totalPnl, setTotalPnl] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const next = parseFloat((prev + (Math.random() - 0.48) * prev * 0.002).toFixed(4))
        setPriceHistory((h) => [...h.slice(-39), next])
        return next
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setPrice(selectedMarket.base)
    setPriceHistory(Array.from({ length: 40 }, () => selectedMarket.base + (Math.random() - 0.5) * 5))
  }, [selectedMarket])

  const placeTrade = (direction: string) => {
    setPlacing(true)
    const newTrade: Trade = {
      id: Date.now().toString(),
      market: selectedMarket.value,
      type: contractType,
      direction,
      stake,
      result: 'pending',
      pnl: 0,
      time: new Date().toTimeString().slice(0, 8),
    }
    setTrades((prev) => [newTrade, ...prev])

    setTimeout(() => {
      const won = Math.random() > 0.42
      const pnl = won ? parseFloat((stake * 0.87).toFixed(2)) : -stake
      setTrades((prev) =>
        prev.map((t) => t.id === newTrade.id ? { ...t, result: won ? 'win' : 'loss', pnl } : t)
      )
      setTotalPnl((prev) => parseFloat((prev + pnl).toFixed(2)))
      setPlacing(false)
    }, 1500)
  }

  const prevPrice = priceHistory[priceHistory.length - 2] ?? price
  const rising = price >= prevPrice

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">D-Trader</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-success text-xs font-medium">Live Trading</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left: Market + Chart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Market selector */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {MARKETS.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMarket(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${selectedMarket.value === m.value ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
              >
                {m.value}
              </button>
            ))}
          </div>

          {/* Price display */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-muted-foreground text-xs">{selectedMarket.label}</div>
                <div className={`text-4xl font-bold font-mono mt-1 transition-colors ${rising ? 'text-success' : 'text-danger'}`}>
                  {price.toFixed(4)}
                </div>
                <div className={`flex items-center gap-1 text-sm mt-1 ${rising ? 'text-success' : 'text-danger'}`}>
                  {rising ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {rising ? '+' : ''}{(price - priceHistory[0]).toFixed(4)}
                </div>
              </div>
              <div className="w-40">
                <MiniChart data={priceHistory} color={rising ? '#00E676' : '#EF4444'} />
              </div>
            </div>
          </Card>

          {/* Recent trades */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Recent Trades</h2>
              <div className={`text-sm font-bold font-mono ${totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                Total: {totalPnl >= 0 ? '+' : ''}${totalPnl}
              </div>
            </div>
            {trades.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">No trades yet. Place your first trade →</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {trades.map((trade) => (
                  <div key={trade.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      trade.result === 'pending' ? 'bg-warning/20' :
                      trade.result === 'win' ? 'bg-success/20' : 'bg-danger/20'
                    }`}>
                      {trade.result === 'pending'
                        ? <RefreshCw className="w-3.5 h-3.5 text-warning animate-spin" />
                        : trade.result === 'win'
                        ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                        : <TrendingDown className="w-3.5 h-3.5 text-danger" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium">{trade.market} · {trade.direction}</div>
                      <div className="text-muted-foreground text-xs">{trade.type} · ${trade.stake} · {trade.time}</div>
                    </div>
                    <div className={`text-xs font-bold font-mono shrink-0 ${
                      trade.result === 'pending' ? 'text-warning' :
                      trade.result === 'win' ? 'text-success' : 'text-danger'
                    }`}>
                      {trade.result === 'pending' ? '...' : `${trade.pnl >= 0 ? '+' : ''}$${trade.pnl}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right: Trade panel */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-white font-bold mb-4">Place Trade</h2>

            {/* Contract type */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-2 block">Contract Type</label>
              <div className="space-y-1.5">
                {CONTRACT_TYPES.map((ct) => (
                  <button
                    key={ct}
                    onClick={() => setContractType(ct)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${contractType === ct ? 'bg-primary/15 text-primary border border-primary/30' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-2 block">Duration</label>
              <div className="grid grid-cols-3 gap-1.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${duration === d ? 'bg-primary text-black' : 'bg-background border border-border text-muted-foreground hover:text-white'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Stake */}
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <label className="text-muted-foreground text-xs">Stake (USD)</label>
                <span className="text-primary font-mono text-sm font-bold">${stake}</span>
              </div>
              <input
                type="range" min={0.35} max={100} step={0.5}
                value={stake}
                onChange={(e) => setStake(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-muted-foreground text-xs mt-1">
                <span>$0.35</span><span>$100</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[1, 2, 5, 10].map((v) => (
                  <button key={v} onClick={() => setStake(v)} className="flex-1 py-1 rounded bg-border text-muted-foreground text-xs hover:text-white hover:bg-white/10 transition-all">
                    ${v}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout preview */}
            <div className="bg-background rounded-xl border border-border p-3 mb-4 text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Stake</span>
                <span className="text-white font-mono">${stake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potential payout</span>
                <span className="text-success font-mono font-bold">+${(stake * 0.87).toFixed(2)}</span>
              </div>
            </div>

            {/* Trade buttons */}
            {contractType === 'Rise/Fall' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => placeTrade('RISE')}
                  disabled={placing}
                  className="flex flex-col items-center gap-1 py-4 rounded-xl bg-success/20 border border-success/30 text-success hover:bg-success/30 transition-all disabled:opacity-50"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-sm">RISE</span>
                </button>
                <button
                  onClick={() => placeTrade('FALL')}
                  disabled={placing}
                  className="flex flex-col items-center gap-1 py-4 rounded-xl bg-danger/20 border border-danger/30 text-danger hover:bg-danger/30 transition-all disabled:opacity-50"
                >
                  <TrendingDown className="w-6 h-6" />
                  <span className="font-bold text-sm">FALL</span>
                </button>
              </div>
            )}
            {contractType === 'Over/Under' && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => placeTrade('OVER')} disabled={placing} className="flex flex-col items-center gap-1 py-4 rounded-xl bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-all disabled:opacity-50">
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-sm">OVER</span>
                </button>
                <button onClick={() => placeTrade('UNDER')} disabled={placing} className="flex flex-col items-center gap-1 py-4 rounded-xl bg-warning/20 border border-warning/30 text-warning hover:bg-warning/30 transition-all disabled:opacity-50">
                  <TrendingDown className="w-6 h-6" />
                  <span className="font-bold text-sm">UNDER</span>
                </button>
              </div>
            )}
            {contractType === 'Even/Odd' && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => placeTrade('EVEN')} disabled={placing} className="flex flex-col items-center gap-1 py-4 rounded-xl bg-blue-400/20 border border-blue-400/30 text-blue-400 hover:bg-blue-400/30 transition-all disabled:opacity-50">
                  <span className="text-2xl font-bold">2</span>
                  <span className="font-bold text-sm">EVEN</span>
                </button>
                <button onClick={() => placeTrade('ODD')} disabled={placing} className="flex flex-col items-center gap-1 py-4 rounded-xl bg-purple-400/20 border border-purple-400/30 text-purple-400 hover:bg-purple-400/30 transition-all disabled:opacity-50">
                  <span className="text-2xl font-bold">3</span>
                  <span className="font-bold text-sm">ODD</span>
                </button>
              </div>
            )}
            {(contractType === 'Digit Match' || contractType === 'Touch/No Touch') && (
              <Button variant="primary" className="w-full" onClick={() => placeTrade(contractType)} disabled={placing}>
                {placing ? 'Placing...' : `Place ${contractType} Trade`}
              </Button>
            )}
          </Card>

          {/* Risk disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-warning/5 border border-warning/20 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-xs">Trading involves risk. Only trade with money you can afford to lose.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
