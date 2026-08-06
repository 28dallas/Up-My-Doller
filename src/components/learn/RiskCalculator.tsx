'use client'
import { useState } from 'react'
import { Calculator, AlertTriangle, TrendingUp, ShieldAlert } from 'lucide-react'

const STRATEGY_MODELS = [
  { id: 'over-under', label: 'Over / Under', baseWin: 0.65, payout: 0.95 },
  { id: 'rise-fall', label: 'Rise / Fall + Trend', baseWin: 0.68, payout: 0.9 },
  { id: 'even-odd', label: 'Even / Odd', baseWin: 0.58, payout: 0.9 },
  { id: 'digit-match', label: 'Digit Match (9x)', baseWin: 0.1, payout: 9.0 },
]

function formatMoney(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function RiskCalculator() {
  const [strategy, setStrategy] = useState('over-under')
  const [stake, setStake] = useState(1)
  const [martingaleMultiplier, setMartingaleMultiplier] = useState(1.5)
  const [maxLevels, setMaxLevels] = useState(5)
  const [budget, setBudget] = useState(50)

  const model = STRATEGY_MODELS.find((s) => s.id === strategy)!

// Simulate a recovery sequence
  const sequence: { level: number; stake: number; cumulative: number }[] = []
  let cumulative = 0
  let currentStake = stake
  for (let i = 0; i < maxLevels; i++) {
    cumulative += currentStake
    sequence.push({ level: i + 1, stake: currentStake, cumulative })
    currentStake = currentStake * martingaleMultiplier
  }

  const totalAtMax = sequence[maxLevels - 1]?.cumulative || 0
  const wouldBreakBudget = totalAtMax > budget
  const winAtLevel = (level: number) => sequence[level - 1].stake * model.payout

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-white">Risk Calculator</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Strategy</label>
            <div className="grid grid-cols-2 gap-2">
              {STRATEGY_MODELS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStrategy(s.id)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all text-left ${
                    strategy === s.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Base Stake (USD)</label>
            <input
              type="number"
              min="0.35"
              step="0.1"
              value={stake}
              onChange={(e) => setStake(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Martingale Multiplier</label>
            <input
              type="number"
              min="1"
              step="0.1"
              value={martingaleMultiplier}
              onChange={(e) => setMartingaleMultiplier(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Max Recovery Levels</label>
              <input
                type="number"
                min="1"
                step="1"
                value={maxLevels}
                onChange={(e) => setMaxLevels(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Daily Budget (USD)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={budget}
                onChange={(e) => setBudget(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-7">
          <h3 className="text-white font-bold mb-5">Recovery Sequence</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground text-xs border-b border-border">
                  <th className="pb-2">Level</th>
                  <th className="pb-2">Stake</th>
                  <th className="pb-2">Cumulative</th>
                  <th className="pb-2">Win Payout</th>
                </tr>
              </thead>
              <tbody>
                {sequence.map((s) => (
                  <tr key={s.level} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 text-white font-medium">{s.level}</td>
                    <td className="py-2.5 font-mono text-white">${formatMoney(s.stake)}</td>
                    <td className="py-2.5 font-mono text-muted-foreground">${formatMoney(s.cumulative)}</td>
                    <td className="py-2.5 font-mono text-primary">+${formatMoney(winAtLevel(s.level))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk verdict */}
        <div className={`rounded-2xl border p-5 ${wouldBreakBudget ? 'border-danger/40 bg-danger/10' : 'border-primary/30 bg-primary/5'}`}>
          <div className="flex items-start gap-3">
            {wouldBreakBudget ? (
              <ShieldAlert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            ) : (
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            )}
            <div>
              <div className={`font-bold text-sm ${wouldBreakBudget ? 'text-danger' : 'text-primary'}`}>
                {wouldBreakBudget ? 'Risk Alert: Budget would be exceeded' : 'Looks Safe Within Budget'}
              </div>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                Maximum cumulative loss at level {maxLevels} is <strong className="text-white">${formatMoney(totalAtMax)}</strong> against your
                daily budget of <strong className="text-white">${formatMoney(budget)}</strong>.
                {wouldBreakBudget
                  ? ' This recovery sequence risks more than your daily budget allows.'
                  : ' This recovery sequence fits within your daily budget.'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <div className="text-warning font-bold text-sm">How to use this</div>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                Martingale multiplies your stake after each loss to recover previous losses with one win. While it can be profitable over short
                runs, a long losing streak can quickly exceed your budget. Always cap your recovery levels and never risk money you cannot
                afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
