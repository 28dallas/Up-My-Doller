'use client'

import { useEffect } from 'react'
import { Check, Copy, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react'
import { useTradingStore } from '@/stores/trading-store'
import { formatPercent } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface StrategyTableProps {
  showLive?: boolean
  compact?: boolean
}

export default function StrategyTable({ showLive = true, compact = false }: StrategyTableProps) {
  const { snapshot, copiedStrategies, copyStrategy, startPolling, isLoading, error } = useTradingStore()
  const strategies = snapshot?.strategies ?? []

  const showLoadingState = isLoading && strategies.length === 0
  const showErrorState = Boolean(error) && strategies.length === 0


  useEffect(() => {
    if (!showLive) return
    return startPolling(4000)
  }, [showLive, startPolling])


  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-surface/50">
        <div>
          <h3 className="text-white font-bold text-lg">Strategy Providers</h3>
          {!compact && (
            <p className="text-muted-foreground text-sm mt-0.5">
              Live performance metrics — updated every few seconds
            </p>
          )}
        </div>
        {showLive && <Badge variant="live">LIVE</Badge>}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Strategy Name</th>
              <th className="px-4 py-3 font-semibold text-right">Win Rate</th>
              <th className="px-4 py-3 font-semibold text-right">Total Return</th>
              <th className="px-4 py-3 font-semibold text-right">Drawdown</th>
              <th className="px-6 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {strategies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm">
                  {showErrorState ? error : showLoadingState ? 'Loading strategies...' : 'No strategies available'}
                </td>
              </tr>
            ) : (

              strategies.map((strategy) => {
                const isCopied = copiedStrategies.includes(strategy.id)
                return (
                  <tr key={strategy.id} className="border-b border-border/60 table-row-hover">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          {strategy.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm">{strategy.name}</span>
                            {strategy.is_verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            )}
                          </div>
                          <span className="text-muted-foreground text-xs">{strategy.provider}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="data-cell text-primary font-semibold">
                        {strategy.win_rate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="data-cell text-primary flex items-center justify-end gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +{strategy.total_return.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="data-cell text-danger flex items-center justify-end gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        -{strategy.drawdown.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant={isCopied ? 'outline' : 'primary'}
                        onClick={() => copyStrategy(strategy.id)}
                        disabled={isCopied || strategy.status !== 'active'}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Strategy
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {strategies.map((strategy) => {
          const isCopied = copiedStrategies.includes(strategy.id)
          return (
            <div key={strategy.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{strategy.name}</span>
                  {strategy.is_verified && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                </div>
                <Badge variant="green">{formatPercent(strategy.win_rate)}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-surface rounded-lg p-2.5 border border-border">
                  <div className="text-muted-foreground">Return</div>
                  <div className="data-cell text-primary font-semibold mt-0.5">
                    +{strategy.total_return.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-surface rounded-lg p-2.5 border border-border">
                  <div className="text-muted-foreground">Drawdown</div>
                  <div className="data-cell text-danger font-semibold mt-0.5">
                    -{strategy.drawdown.toFixed(1)}%
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant={isCopied ? 'outline' : 'primary'}
                className="w-full"
                onClick={() => copyStrategy(strategy.id)}
                disabled={isCopied || strategy.status !== 'active'}
              >
                {isCopied ? 'Copied' : 'Copy Strategy'}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
