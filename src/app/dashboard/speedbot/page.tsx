'use client'
import { useState, useEffect, useRef } from 'react'
import { Zap, Play, Square, Settings, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

type SpeedTrade = {
  id: string
  direction: string
  result: 'win' | 'loss'
  pnl: number
  time: string
}

const MARKETS = ['Volatility 10 (1s)', 'Volatility 25 (1s)', 'Step Index']
const STRATEGIES = ['Over/Under', 'Even/Odd', 'Rise/Fall']

export default function SpeedbotPage() {
  const [running, setRunning] = useState(false)
  const [market, setMarket] = useState('Volatility 10 (1s)')
  const [strategy, setStrategy] = useState('Over/Under')
  const [stake, setStake] = useState(0.35)
  const [speed, setSpeed] = useState(1000)
  const [maxTrades, setMaxTrades] = useState(50)
  const [stopLoss, setStopLoss] = useState(10)
  const [takeProfit, setTakeProfit] = useState(20)
  const [trades, setTrades] = useState<SpeedTrade[]>([])
  const [totalPnl, setTotalPnl] = useState(0)
  const [tradeCount, setTradeCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const wins = trades.filter((t) => t.result === 'win').length
  const losses = trades.filter((t) => t.result === 'loss').length
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0

  const runTrade = () => {
    const won = Math.random() > 0.44
    const directions = strategy === 'Over/Under' ? ['OVER', 'UNDER']
      : strategy === 'Even/Odd' ? ['EVEN', 'ODD']
      : ['RISE', 'FALL']
    const direction = directions[Math.floor(Math.random() * 2)]
    const pnl = won ? parseFloat((stake * 0.87).toFixed(2)) : -stake

    const newTrade: SpeedTrade = {
      id: Date.now().toString(),
      direction,
      result: won ? 'win' : 'loss',
      pnl,
      time: new Date().toTimeString().slice(0, 8),
    }

    setTrades((prev) => [newTrade, ...prev.slice(0, 49)])
    setTotalPnl((prev) => {
      const next = parseFloat((prev + pnl).toFixed(2))
      if (next <= -stopLoss || next >= takeProfit) {
        stopBot()
      }
      return next
    })
    setTradeCount((prev) => {
      const next = prev + 1
      if (next >= maxTrades) stopBot()
      return next
    })
  }

  const startBot = () => {
    setRunning(true)
    setTrades([])
    setTotalPnl(0)
    setTradeCount(0)
    intervalRef.current = setInterval(runTrade, speed)
  }

  const stopBot = () => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Update interval speed when speed changes
  useEffect(() => {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(runTrade, speed)
    }
  }, [speed, running])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-gold" />
            Speedbot
          </h1>
          <p className="text-muted-foreground text-sm mt-1">High-frequency automated trading bot</p>
        </div>
        <Badge variant={running ? 'green' : 'default'}>
          {running ? (
            <><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block mr-1.5" />Running</>
          ) : 'Stopped'}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Config panel */}
        <Card className="lg:col-span-1 space-y-5">
          <h2 className="text-white font-bold flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            Bot Configuration
          </h2>

          <div>
            <label className="text-muted-foreground text-xs mb-2 block">Market</label>
            <div className="space-y-1.5">
              {MARKETS.map((m) => (
                <button key={m} onClick={() => !running && setMarket(m)} disabled={running}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 ${market === m ? 'bg-primary/15 text-primary border border-primary/30' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-muted-foreground text-xs mb-2 block">Strategy</label>
            <div className="space-y-1.5">
              {STRATEGIES.map((s) => (
                <button key={s} onClick={() => !running && setStrategy(s)} disabled={running}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 ${strategy === s ? 'bg-primary/15 text-primary border border-primary/30' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {[
            { key: 'stake', label: 'Stake ($)', value: stake, set: setStake, min: 0.35, max: 10, step: 0.35, format: (v: number) => `$${v}` },
            { key: 'speed', label: 'Speed (ms)', value: speed, set: setSpeed, min: 200, max: 3000, step: 100, format: (v: number) => `${v}ms` },
            { key: 'maxTrades', label: 'Max Trades', value: maxTrades, set: setMaxTrades, min: 10, max: 200, step: 10, format: (v: number) => `${v}` },
            { key: 'stopLoss', label: 'Stop Loss ($)', value: stopLoss, set: setStopLoss, min: 1, max: 100, step: 1, format: (v: number) => `$${v}` },
            { key: 'takeProfit', label: 'Take Profit ($)', value: takeProfit, set: setTakeProfit, min: 1, max: 200, step: 1, format: (v: number) => `$${v}` },
          ].map(({ key, label, value, set, min, max, step, format }) => (
            <div key={key}>
              <div className="flex justify-between mb-1.5">
                <label className="text-muted-foreground text-xs">{label}</label>
                <span className="text-primary font-mono text-xs font-bold">{format(value)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => !running && set(parseFloat(e.target.value))}
                disabled={running}
                className="w-full accent-primary disabled:opacity-50"
              />
            </div>
          ))}

          <div className="pt-2">
            {running ? (
              <Button variant="ghost" className="w-full border border-danger/30 text-danger hover:bg-danger/10" onClick={stopBot}>
                <Square className="w-4 h-4" />
                Stop Bot
              </Button>
            ) : (
              <Button variant="primary" className="w-full" onClick={startBot}>
                <Play className="w-4 h-4" />
                Start Speedbot
              </Button>
            )}
          </div>

          <div className="flex items-start gap-2 p-3 bg-warning/5 border border-warning/20 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-xs">High-frequency trading carries significant risk. Use small stakes.</p>
          </div>
        </Card>

        {/* Live stats + feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Trades', value: tradeCount, color: 'text-primary' },
              { label: 'Win Rate', value: `${winRate}%`, color: 'text-success' },
              { label: 'Total P&L', value: `${totalPnl >= 0 ? '+' : ''}$${totalPnl}`, color: totalPnl >= 0 ? 'text-success' : 'text-danger' },
              { label: 'Wins / Losses', value: `${wins}/${losses}`, color: 'text-white' },
            ].map(({ label, value, color }) => (
              <Card key={label} className="text-center py-3">
                <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
              </Card>
            ))}
          </div>

          {/* Progress bar */}
          {running && (
            <Card className="py-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-white font-mono">{tradeCount}/{maxTrades} trades</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(tradeCount / maxTrades) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className={`font-mono font-bold ${totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                  P&L: {totalPnl >= 0 ? '+' : ''}${totalPnl}
                </span>
                <span className="text-muted-foreground">
                  SL: -${stopLoss} / TP: +${takeProfit}
                </span>
              </div>
            </Card>
          )}

          {/* Trade feed */}
          <Card>
            <h2 className="text-white font-bold mb-4">Live Trade Feed</h2>
            {trades.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Start the bot to see live trades</p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-80 overflow-y-auto">
                {trades.map((trade) => (
                  <div key={trade.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/3 transition-all">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${trade.result === 'win' ? 'bg-success/20' : 'bg-danger/20'}`}>
                      {trade.result === 'win'
                        ? <TrendingUp className="w-3 h-3 text-success" />
                        : <TrendingDown className="w-3 h-3 text-danger" />
                      }
                    </div>
                    <span className={`text-xs font-bold w-12 ${['OVER', 'EVEN', 'RISE'].includes(trade.direction) ? 'text-success' : 'text-danger'}`}>
                      {trade.direction}
                    </span>
                    <span className="text-muted-foreground text-xs font-mono flex-1">{trade.time}</span>
                    <span className={`text-xs font-bold font-mono ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
