'use client'

import { create } from 'zustand'
import { LiveMarketSnapshot, OpenTrade, Strategy } from '@/types'

interface TradingState {
  snapshot: LiveMarketSnapshot | null
  isLoading: boolean
  isLive: boolean
  copiedStrategies: string[]
  error: string | null
  fetchLiveData: () => Promise<void>
  startPolling: (intervalMs?: number) => () => void
  copyStrategy: (strategyId: string) => void
  removeCopiedStrategy: (strategyId: string) => void
}

const defaultSnapshot: LiveMarketSnapshot = {
  timestamp: new Date().toISOString(),
  balance: 12450.75,
  today_pnl: 342.18,
  win_rate: 74.2,
  active_trades: 2,
  strategies: [],
  open_trades: [],
}

const pollCleanupRef: { current: (() => void) | null } = { current: null }

export const useTradingStore = create<TradingState>((set, get) => ({
  snapshot: null,
  isLoading: false,
  isLive: false,
  copiedStrategies: [],
  error: null,

  fetchLiveData: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch('/api/market/live')
      if (!res.ok) throw new Error('Failed to fetch live data')
      const data: LiveMarketSnapshot = await res.json()
      set({ snapshot: data, isLoading: false, isLive: true })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Unknown error',
        isLoading: false,
        snapshot: get().snapshot ?? defaultSnapshot,
      })
    }
  },

  startPolling: (intervalMs = 4000) => {
    // Prevent multiple polling intervals if startPolling() is called repeatedly
    // (e.g. due to remounts).
    if (pollCleanupRef.current) pollCleanupRef.current()

    // Mark loading immediately if we’re starting fresh.
    get().fetchLiveData()

    const interval = setInterval(() => get().fetchLiveData(), intervalMs)
    set({ isLive: true })

    const cleanup = () => {
      clearInterval(interval)
      pollCleanupRef.current = null
      set({ isLive: false })
    }

    pollCleanupRef.current = cleanup
    return cleanup
  },

  copyStrategy: (strategyId: string) => {
    const current = get().copiedStrategies
    if (!current.includes(strategyId)) {
      set({ copiedStrategies: [...current, strategyId] })
    }
  },

  removeCopiedStrategy: (strategyId: string) => {
    set({ copiedStrategies: get().copiedStrategies.filter((id) => id !== strategyId) })
  },
}))

export function selectStrategies(state: TradingState): Strategy[] {
  return state.snapshot?.strategies ?? []
}

export function selectOpenTrades(state: TradingState): OpenTrade[] {
  return state.snapshot?.open_trades ?? []
}
