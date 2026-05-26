// ============================================================
// useBotRunner
// Accepts a bot config and manages its simulated trade loop.
// Running state persists in localStorage across page refreshes.
// ============================================================

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { market } from '@/lib/simulatedMarket'
import {
  saveBotState,
  loadBotState,
  clearBotState,
  type BotConfig,
  type RunningBotState,
} from '@/lib/botEngine'
import type { SimulatedTrade } from './useSimulatedTrades'

export interface BotRunnerState {
  isRunning:    boolean
  tradesCount:  number
  currentPnL:   number
  winRate:      number
  wins:         number
  losses:       number
  startedAt:    Date | null
  recentTrades: SimulatedTrade[]
  start:        () => void
  stop:         () => void
  reset:        () => void
}

function generateTradeId(): string {
  return `bot_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function getRandomInterval(min = 6000, max = 15000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useBotRunner(
  botId:  string,
  config: Partial<BotConfig>
): BotRunnerState {
  const [isRunning,    setIsRunning]    = useState(false)
  const [tradesCount,  setTradesCount]  = useState(0)
  const [currentPnL,   setCurrentPnL]   = useState(0)
  const [wins,         setWins]         = useState(0)
  const [losses,       setLosses]       = useState(0)
  const [startedAt,    setStartedAt]    = useState<Date | null>(null)
  const [recentTrades, setRecentTrades] = useState<SimulatedTrade[]>([])

  const timeoutRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pnlRef        = useRef(0)
  const tradesRef     = useRef(0)
  const winsRef       = useRef(0)
  const lossesRef     = useRef(0)
  const isRunningRef  = useRef(false)

  // Sync refs with state for use inside timeout callbacks
  useEffect(() => { pnlRef.current      = currentPnL  }, [currentPnL])
  useEffect(() => { tradesRef.current   = tradesCount  }, [tradesCount])
  useEffect(() => { winsRef.current     = wins         }, [wins])
  useEffect(() => { lossesRef.current   = losses       }, [losses])
  useEffect(() => { isRunningRef.current = isRunning   }, [isRunning])

  // Restore state from localStorage on mount
  useEffect(() => {
    const saved = loadBotState(botId)
    if (saved?.isRunning) {
      setIsRunning(true)
      setTradesCount(saved.tradesCount)
      setCurrentPnL(saved.currentPnL)
      setStartedAt(saved.startedAt ? new Date(saved.startedAt) : new Date())
      pnlRef.current    = saved.currentPnL
      tradesRef.current = saved.tradesCount
      isRunningRef.current = true
    }
  }, [botId])

  const fireTrade = useCallback(() => {
    if (!isRunningRef.current) return

    const symbol    = config.marketSymbol ?? 'V75'
    const direction = config.direction === 'BOTH'
      ? (Math.random() < 0.5 ? 'CALL' : 'PUT')
      : (config.direction ?? 'CALL')

    const result    = market.generateTradeResult(direction as 'CALL' | 'PUT', symbol)
    const entry     = market.getCurrentPrice(symbol)
    const exitTick  = market.generateTick(symbol)

    // Check take profit / stop loss
    const newPnL = pnlRef.current + result.pnl
    const tp     = config.takeProfit ?? Infinity
    const sl     = config.stopLoss   ?? Infinity

    const trade: SimulatedTrade = {
      id:            generateTradeId(),
      symbol,
      symbolDisplay: config.market ?? symbol,
      direction:     direction as 'CALL' | 'PUT',
      stake:         result.stake,
      result:        result.result,
      pnl:           result.pnl,
      entryPrice:    entry,
      exitPrice:     exitTick.price,
      timestamp:     new Date(),
      duration:      Math.floor(Math.random() * 8) + 3,
    }

    const newTradesCount = tradesRef.current + 1
    const newWins        = result.result === 'WIN' ? winsRef.current + 1 : winsRef.current
    const newLosses      = result.result === 'LOSS' ? lossesRef.current + 1 : lossesRef.current

    pnlRef.current    = newPnL
    tradesRef.current = newTradesCount
    winsRef.current   = newWins
    lossesRef.current = newLosses

    setCurrentPnL(newPnL)
    setTradesCount(newTradesCount)
    setWins(newWins)
    setLosses(newLosses)
    setRecentTrades(prev => [trade, ...prev].slice(0, 20))

    // Persist updated state
    const state: RunningBotState = {
      id:          botId,
      isRunning:   true,
      tradesCount: newTradesCount,
      currentPnL:  newPnL,
      startedAt:   startedAt?.toISOString() ?? new Date().toISOString(),
    }
    saveBotState(botId, state)

    // Auto-stop on take profit or stop loss
    const hitTP = newPnL >= tp
    const hitSL = newPnL <= -sl
    const hitMaxTrades = config.maxTrades ? newTradesCount >= config.maxTrades : false

    if (hitTP || hitSL || hitMaxTrades) {
      isRunningRef.current = false
      setIsRunning(false)
      saveBotState(botId, { ...state, isRunning: false })
      return
    }

    // Schedule next trade
    timeoutRef.current = setTimeout(fireTrade, getRandomInterval())
  }, [botId, config, startedAt])

  // Start the trade loop when isRunning becomes true
  useEffect(() => {
    if (isRunning && isRunningRef.current) {
      timeoutRef.current = setTimeout(fireTrade, getRandomInterval(2000, 6000))
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isRunning, fireTrade])

  const start = useCallback(() => {
    const now = new Date()
    setIsRunning(true)
    setStartedAt(now)
    isRunningRef.current = true

    const state: RunningBotState = {
      id:          botId,
      isRunning:   true,
      tradesCount: tradesRef.current,
      currentPnL:  pnlRef.current,
      startedAt:   now.toISOString(),
    }
    saveBotState(botId, state)
  }, [botId])

  const stop = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    isRunningRef.current = false
    setIsRunning(false)

    const state: RunningBotState = {
      id:          botId,
      isRunning:   false,
      tradesCount: tradesRef.current,
      currentPnL:  pnlRef.current,
      startedAt:   startedAt?.toISOString() ?? null,
    }
    saveBotState(botId, state)
  }, [botId, startedAt])

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    isRunningRef.current = false
    pnlRef.current       = 0
    tradesRef.current    = 0
    winsRef.current      = 0
    lossesRef.current    = 0

    setIsRunning(false)
    setTradesCount(0)
    setCurrentPnL(0)
    setWins(0)
    setLosses(0)
    setStartedAt(null)
    setRecentTrades([])
    clearBotState(botId)
  }, [botId])

  const winRate = (wins + losses) > 0
    ? Math.round((wins / (wins + losses)) * 10000) / 100
    : 0

  return {
    isRunning,
    tradesCount,
    currentPnL,
    winRate,
    wins,
    losses,
    startedAt,
    recentTrades,
    start,
    stop,
    reset,
  }
}
