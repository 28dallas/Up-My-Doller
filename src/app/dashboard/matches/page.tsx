'use client'
import { useState } from 'react'
import { Target, TrendingUp, TrendingDown, Filter, Download } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

type Match = {
  id: string
  market: string
  pattern: string
  direction: string
  matched_at: string
  ticks: number
  result: 'win' | 'loss' | 'pending'
  pnl: number
  confidence: number
}

const MOCK_MATCHES: Match[] = [
  { id: '1', market: 'Volatility 10', pattern: 'Digit Over 5', direction: 'OVER', matched_at: '14:32:05', ticks: 1, result: 'win', pnl: 1.74, confidence: 82 },
  { id: '2', market: 'Boom 1000', pattern: 'Pre-spike Rise', direction: 'RISE', matched_at: '14:28:41', ticks: 5, result: 'win', pnl: 4.35, confidence: 79 },
  { id: '3', market: 'Volatility 25', pattern: 'Even Digit Streak', direction: 'EVEN', matched_at: '14:25:18', ticks: 1, result: 'loss', pnl: -1.00, confidence: 68 },
  { id: '4', market: 'Crash 500', pattern: 'Post-spike Fall', direction: 'FALL', matched_at: '14:21:55', ticks: 3, result: 'win', pnl: 2.61, confidence: 75 },
  { id: '5', market: 'Step Index', pattern: 'Consecutive Odds', direction: 'ODD', matched_at: '14:18:32', ticks: 1, result: 'win', pnl: 0.87, confidence: 71 },
  { id: '6', market: 'Volatility 10', pattern: 'Digit Under 5', direction: 'UNDER', matched_at: '14:15:09', ticks: 1, result: 'loss', pnl: -2.00, confidence: 65 },
  { id: '7', market: 'Volatility 75', pattern: 'Rise Momentum', direction: 'RISE', matched_at: '14:11:46', ticks: 5, result: 'win', pnl: 3.48, confidence: 77 },
  { id: '8', market: 'Boom 500', pattern: 'Pre-spike Rise', direction: 'RISE', matched_at: '14:08:23', ticks: 3, result: 'pending', pnl: 0, confidence: 80 },
]

const PATTERNS = ['All Patterns', 'Digit Over 5', 'Digit Under 5', 'Pre-spike Rise', 'Post-spike Fall', 'Even Digit Streak', 'Consecutive Odds', 'Rise Momentum']

export default function MatchesPage() {
  const [filter, setFilter] = useState('All Patterns')
  const [resultFilter, setResultFilter] = useState('All')

  const filtered = MOCK_MATCHES.filter((m) => {
    const matchPattern = filter === 'All Patterns' || m.pattern === filter
    const matchResult = resultFilter === 'All' || m.result === resultFilter.toLowerCase()
    return matchPattern && matchResult
  })

  const wins = MOCK_MATCHES.filter((m) => m.result === 'win').length
  const losses = MOCK_MATCHES.filter((m) => m.result === 'loss').length
  const totalPnl = MOCK_MATCHES.reduce((s, m) => s + m.pnl, 0)
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Matches
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Pattern match history and trade results</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Matches', value: MOCK_MATCHES.length, color: 'text-primary' },
          { label: 'Win Rate', value: `${winRate}%`, color: 'text-success' },
          { label: 'Total P&L', value: `${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)}`, color: totalPnl >= 0 ? 'text-success' : 'text-danger' },
          { label: 'Pending', value: MOCK_MATCHES.filter((m) => m.result === 'pending').length, color: 'text-warning' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center py-4">
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs mt-1">{label}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 flex-1">
          {['All', 'Win', 'Loss', 'Pending'].map((r) => (
            <button
              key={r}
              onClick={() => setResultFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${resultFilter === r ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shrink-0">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none"
          >
            {PATTERNS.map((p) => <option key={p} value={p} className="bg-card">{p}</option>)}
          </select>
        </div>
      </div>

      {/* Matches table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Market', 'Pattern', 'Direction', 'Confidence', 'Ticks', 'Time', 'Result', 'P&L'].map((h) => (
                  <th key={h} className="text-left px-3 py-3 text-muted-foreground text-xs font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((match) => (
                <tr key={match.id} className="hover:bg-white/3 transition-all">
                  <td className="px-3 py-3 text-white font-medium text-xs whitespace-nowrap">{match.market}</td>
                  <td className="px-3 py-3 text-muted-foreground text-xs whitespace-nowrap">{match.pattern}</td>
                  <td className="px-3 py-3">
                    <div className={`flex items-center gap-1 text-xs font-bold ${
                      ['RISE', 'OVER', 'EVEN', 'ODD'].includes(match.direction) ? 'text-success' : 'text-danger'
                    }`}>
                      {['RISE', 'OVER'].includes(match.direction)
                        ? <TrendingUp className="w-3.5 h-3.5" />
                        : <TrendingDown className="w-3.5 h-3.5" />
                      }
                      {match.direction}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${match.confidence}%`,
                            backgroundColor: match.confidence >= 75 ? '#00E676' : match.confidence >= 65 ? '#F59E0B' : '#EF4444',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{match.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground text-xs font-mono">{match.ticks}t</td>
                  <td className="px-3 py-3 text-muted-foreground text-xs font-mono whitespace-nowrap">{match.matched_at}</td>
                  <td className="px-3 py-3">
                    <Badge variant={match.result === 'win' ? 'green' : match.result === 'loss' ? 'red' : 'yellow'}>
                      {match.result.toUpperCase()}
                    </Badge>
                  </td>
                  <td className={`px-3 py-3 font-bold font-mono text-xs ${
                    match.result === 'pending' ? 'text-warning' :
                    match.pnl >= 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {match.result === 'pending' ? '—' : `${match.pnl >= 0 ? '+' : ''}$${match.pnl.toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <Target className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No matches found for this filter</p>
          </div>
        )}
      </Card>
    </div>
  )
}
