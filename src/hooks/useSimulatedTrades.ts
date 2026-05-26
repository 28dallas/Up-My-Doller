// ============================================================
// useSimulatedTrades
// Fires a new simulated trade every 8-20 seconds.
// Maintains last 50 trades and calculates live statistics.
// ============================================================

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { market, SYMBOLS, SYMBOL_DISPLAY } from '@/lib/simulatedMarket'

export interface SimulatedTrade {
  id:          string
  symbol:      string
  symbolDisplay: string
  direction:   'CALL' | 'PUT'
  stake:       number
  result:      'WIN' | 'LOSS'
  pnl:         number
  entryPrice:  number
  exitPrice:   number
  timestamp:   Date
  duration:    number  // ticks
}

export interface TradeStats {
  trades:        SimulatedTrade[]
  totalPnL:      number
  todayPnL:      number
  winRate:       number
  totalTrades:   number
  wins:          number
  losses:        number
  currentStreak: number  // positive = win streak, negative = loss streak
  avgStake:      number
}

const MAX_TRADES = 50
const DIRECTIONS: Array<'CALL' | 'PUT'> = ['CALL', 'PUT']

function generateTradeId(): string {
  return `trade_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function getRandomSymbol(): string {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

function getRandomDirection(): 'CALL' | 'PUT' {
  return DIRECTIONS[Math.floor(Math.random() * 2)]
}

function getRandomInterval(min = 8000, max = 20000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function calcStats(trades: SimulatedTrade[]): Omit<TradeStats, 'trades'> {
  if (trades.length === 0) {
    return {
      totalPnL:      0,
      todayPnL:      0,
      winRate:       0,
      totalTrades:   0,
      wins:          0,
      losses:        0,
      currentStreak: 0,
      avgStake:      0,
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let totalPnL  = 0
  let todayPnL  = 0
  let wins      = 0
  let losses    = 0
  let totalStake = 0

  for (const t of trades) {
    totalPnL   += t.pnl
    totalStake += t.stake
    if (t.result === 'WIN') wins++
    else losses++
    if (new Date(t.timestamp) >= today) todayPnL += t.pnl
  }

  // Current streak: walk backward from most recent trade
  let currentStreak = 0
  const lastResult  = trades[0]?.result
  if (lastResult) {
    for (const t of trades) {
      if (t.result === lastResult) {
        currentStreak += lastResult === 'WIN' ? 1 : -1
      } else {
        break
      }
    }
  }

  return {
    totalPnL:      Math.round(totalPnL * 100) / 100,
    todayPnL:      Math.round(todayPnL * 100) / 100,
    winRate:       Math.round((wins / trades.length) * 10000) / 100,
    totalTrades:   trades.length,
    wins,
    losses,
    currentStreak,
    avgStake:      Math.round(totalStake / trades.length),
  }
}

export function useSimulatedTrades(): TradeStats {
  const [trades, setTrades] = useState<SimulatedTrade[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fireTrade = useCallback(() => {
    const symbol    = getRandomSymbol()
    const direction = getRandomDirection()
    const result    = market.generateTradeResult(direction, symbol)
    const entry     = market.getCurrentPrice(symbol)

    // Simulate slight price movement for exit price
    const exitTick  = market.generateTick(symbol)
    const exitPrice = exitTick.price

    const trade: SimulatedTrade = {
      id:            generateTradeId(),
      symbol,
      symbolDisplay: SYMBOL_DISPLAY[symbol] ?? symbol,
      direction,
      stake:         result.stake,
      result:        result.result,
      pnl:           result.pnl,
      entryPrice:    entry,
      exitPrice,
      timestamp:     new Date(),
      duration:      Math.floor(Math.random() * 8) + 3,  // 3-10 ticks
    }

    setTrades(prev => {
      const updated = [trade, ...prev]
      return updated.slice(0, MAX_TRADES)
    })

    // Schedule next trade at a random interval
    timeoutRef.current = setTimeout(fireTrade, getRandomInterval())
  }, [])

  useEffect(() => {
    // Fire first trade after a short delay so UI is ready
    timeoutRef.current = setTimeout(fireTrade, getRandomInterval(3000, 8000))

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [fireTrade])

  const stats = calcStats(trades)

  return { trades, ...stats }
}
