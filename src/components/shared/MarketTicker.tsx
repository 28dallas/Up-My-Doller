'use client'

import { ArrowDownRight, ArrowUpRight, Radio } from 'lucide-react'
import { useMarketData } from '@/hooks/useMarketData'
import { SYMBOLS } from '@/lib/simulatedMarket'
import { cn } from '@/lib/utils'

export default function MarketTicker() {
  const { prices, isLive } = useMarketData()

  return (
    <div className="sticky top-16 z-40 overflow-hidden border-b border-border bg-card/95 backdrop-blur">
      <div className="flex h-9 items-center gap-4 px-4 text-xs">
        <div className="flex shrink-0 items-center gap-2 text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary">
            <Radio className={cn('h-3 w-3', isLive && 'animate-pulse')} />
            LIVE
          </span>
        </div>
        <div className="ticker-track flex min-w-max items-center gap-3">
          {[...SYMBOLS, ...SYMBOLS].map((symbol, index) => {
            const tick = prices[symbol]
            const positive = (tick?.changePercent ?? 0) >= 0
            return (
              <div
                key={`${symbol}-${index}`}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1 transition-colors',
                  tick?.direction === 'up' && 'border-success/30 bg-success/10',
                  tick?.direction === 'down' && 'border-danger/30 bg-danger/10',
                  tick?.direction === 'flat' && 'border-border bg-background/50'
                )}
              >
                <span className="font-semibold text-white">{symbol}</span>
                <span className="font-mono text-muted-foreground">
                  {tick?.price.toLocaleString('en-KE', { maximumFractionDigits: 2 }) ?? '--'}
                </span>
                <span className={cn('inline-flex items-center gap-0.5 font-semibold', positive ? 'text-success' : 'text-danger')}>
                  {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(tick?.changePercent ?? 0).toFixed(2)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
