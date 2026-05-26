// ============================================================
// useMarketData
// Returns live ticking prices for all 9 symbols.
// Updates every 1500ms via setInterval.
// Reads from the persistent globalPriceRegistry via market.generateTick()
// so prices never reset on component mount/unmount.
// ============================================================

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { market, SYMBOLS, type TickData } from '@/lib/simulatedMarket'

export type PriceMap = Record<string, TickData>

interface UseMarketDataReturn {
  prices:   PriceMap
  isLive:   boolean
  getPrice: (symbol: string) => TickData | null
}

// Seed initial prices synchronously so first render never shows zeros
function buildInitialPrices(): PriceMap {
  const map: PriceMap = {}
  for (const symbol of SYMBOLS) {
    // generateTick mutates globalPriceRegistry and returns tick data
    map[symbol] = market.generateTick(symbol)
  }
  return map
}

export function useMarketData(): UseMarketDataReturn {
  const [prices, setPrices] = useState<PriceMap>(buildInitialPrices)
  const [isLive, setIsLive] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => {
    setPrices(prev => {
      const next = { ...prev }
      for (const symbol of SYMBOLS) {
        next[symbol] = market.generateTick(symbol)
      }
      return next
    })
  }, [])

  useEffect(() => {
    setIsLive(true)
    intervalRef.current = setInterval(tick, 1500)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause ticking when tab is hidden to save resources
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsLive(false)
      } else {
        // Resume on tab focus
        intervalRef.current = setInterval(tick, 1500)
        setIsLive(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [tick])

  const getPrice = useCallback(
    (symbol: string): TickData | null => prices[symbol] ?? null,
    [prices]
  )

  return { prices, isLive, getPrice }
}
