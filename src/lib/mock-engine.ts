import { LiveMarketSnapshot, OpenTrade, Strategy } from '@/types'

const BASE_STRATEGIES: Omit<Strategy, 'win_rate' | 'total_return' | 'drawdown' | 'last_updated'>[] = [
  { id: 's1', name: 'Volatility Pulse Pro', provider: 'DB_Master', market: 'volatility', followers: 2847, min_stake: 1, is_verified: true, status: 'active' },
  { id: 's2', name: 'Boom Surge Elite', provider: 'IndexKing', market: 'boom_crash', followers: 1923, min_stake: 2, is_verified: true, status: 'active' },
  { id: 's3', name: 'Crash Hunter X', provider: 'SynthPro', market: 'boom_crash', followers: 1456, min_stake: 1, is_verified: true, status: 'active' },
  { id: 's4', name: 'Even Odd Matrix', provider: 'DigitFlow', market: 'synthetic', followers: 987, min_stake: 0.5, is_verified: false, status: 'active' },
  { id: 's5', name: 'Forex Momentum AI', provider: 'FX_Alpha', market: 'forex', followers: 756, min_stake: 5, is_verified: true, status: 'active' },
  { id: 's6', name: 'Step Index Scalper', provider: 'StepBot', market: 'step_index', followers: 634, min_stake: 1, is_verified: true, status: 'active' },
  { id: 's7', name: 'V75 Sniper', provider: 'VolKing', market: 'volatility', followers: 512, min_stake: 1, is_verified: false, status: 'paused' },
  { id: 's8', name: 'Rise Fall Dominator', provider: 'TrendLab', market: 'synthetic', followers: 1102, min_stake: 2, is_verified: true, status: 'active' },
]

const BASE_STATS: Record<string, { win_rate: number; total_return: number; drawdown: number }> = {
  s1: { win_rate: 78.4, total_return: 142.6, drawdown: 6.2 },
  s2: { win_rate: 74.1, total_return: 98.3, drawdown: 9.1 },
  s3: { win_rate: 71.8, total_return: 87.5, drawdown: 11.4 },
  s4: { win_rate: 68.2, total_return: 54.7, drawdown: 8.8 },
  s5: { win_rate: 65.9, total_return: 43.2, drawdown: 12.3 },
  s6: { win_rate: 72.5, total_return: 76.1, drawdown: 7.5 },
  s7: { win_rate: 63.4, total_return: 38.9, drawdown: 15.2 },
  s8: { win_rate: 76.3, total_return: 112.4, drawdown: 5.9 },
}

let stateCache: LiveMarketSnapshot | null = null
let lastTick = 0

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function jitter(value: number, delta: number, min: number, max: number) {
  const change = (Math.random() - 0.5) * delta * 2
  return clamp(parseFloat((value + change).toFixed(2)), min, max)
}

function generateOpenTrades(strategies: Strategy[]): OpenTrade[] {
  const active = strategies.filter((s) => s.status === 'active').slice(0, 3)
  const directions: OpenTrade['direction'][] = ['CALL', 'PUT', 'OVER', 'UNDER']
  const markets = ['Volatility 75', 'Boom 1000', 'Crash 500', 'Step Index', 'EUR/USD']

  return active.map((strategy, i) => {
    const isWin = Math.random() > 0.35
    return {
      id: `trade-${strategy.id}-${Date.now()}-${i}`,
      strategy_id: strategy.id,
      strategy_name: strategy.name,
      market: markets[i % markets.length],
      direction: directions[i % directions.length],
      stake: strategy.min_stake * (1 + i),
      profit_loss: isWin ? parseFloat((Math.random() * 45 + 5).toFixed(2)) : parseFloat((-(Math.random() * 20 + 2)).toFixed(2)),
      status: Math.random() > 0.6 ? 'open' : isWin ? 'won' : 'lost',
      opened_at: new Date(Date.now() - (i + 1) * 120000).toISOString(),
    }
  })
}

export function generateLiveSnapshot(): LiveMarketSnapshot {
  const now = Date.now()
  const shouldRefresh = !stateCache || now - lastTick > 3000

  if (!shouldRefresh && stateCache) {
    return stateCache
  }

  const strategies: Strategy[] = BASE_STRATEGIES.map((base) => {
    const stats = BASE_STATS[base.id]
    const cached = stateCache?.strategies.find((s) => s.id === base.id)

    return {
      ...base,
      win_rate: jitter(cached?.win_rate ?? stats.win_rate, 0.2, 55, 85),
      total_return: jitter(cached?.total_return ?? stats.total_return, 0.5, 20, 200),
      drawdown: jitter(cached?.drawdown ?? stats.drawdown, 0.15, 3, 20),
      last_updated: new Date().toISOString(),
    }
  })

  const prevBalance = stateCache?.balance ?? 12450.75
  const prevPnl = stateCache?.today_pnl ?? 342.18

  const snapshot: LiveMarketSnapshot = {
    timestamp: new Date().toISOString(),
    balance: jitter(prevBalance, 12, 8000, 25000),
    today_pnl: jitter(prevPnl, 8, -200, 800),
    win_rate: jitter(stateCache?.win_rate ?? 74.2, 0.2, 60, 82),
    active_trades: Math.floor(Math.random() * 3) + 1,
    strategies: strategies.sort((a, b) => b.total_return - a.total_return),
    open_trades: generateOpenTrades(strategies),
  }

  stateCache = snapshot
  lastTick = now
  return snapshot
}

export function getBaseStrategies(): Strategy[] {
  return BASE_STRATEGIES.map((base) => ({
    ...base,
    ...BASE_STATS[base.id],
    last_updated: new Date().toISOString(),
  }))
}
