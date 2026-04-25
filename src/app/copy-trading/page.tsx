'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { MOCK_TRADERS } from '@/lib/data'
import { CheckCircle, TrendingUp, Users, ArrowUpDown, ChevronDown } from 'lucide-react'

type SortKey = 'win_rate' | 'monthly_roi' | 'total_trades' | 'followers'

export default function CopyTradingPage() {
  const [sortKey, setSortKey] = useState<SortKey>('monthly_roi')
  const [period, setPeriod] = useState('30d')
  const [minWinRate, setMinWinRate] = useState(0)

  const sorted = [...MOCK_TRADERS]
    .filter((t) => t.win_rate >= minWinRate)
    .sort((a, b) => b[sortKey] - a[sortKey])

  const handleSort = (key: SortKey) => setSortKey(key)

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Header */}
      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="blue" className="mb-4">Copy Trading</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Top Trader <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Copy Africa&apos;s best Deriv traders. Mirror their trades automatically and earn while you learn.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Period filter */}
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            {['7d', '30d', 'All Time'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium transition-all ${period === p ? 'bg-primary text-black' : 'text-muted-foreground hover:text-white'}`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Min win rate */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
            <span className="text-muted-foreground text-sm">Min Win Rate:</span>
            <select
              value={minWinRate}
              onChange={(e) => setMinWinRate(Number(e.target.value))}
              className="bg-transparent text-white text-sm focus:outline-none"
            >
              <option value={0}>Any</option>
              <option value={60}>60%+</option>
              <option value={65}>65%+</option>
              <option value={70}>70%+</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">Rank</th>
                <th className="text-left px-5 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">Trader</th>
                {[
                  { key: 'win_rate' as SortKey, label: 'Win Rate' },
                  { key: 'monthly_roi' as SortKey, label: 'Monthly ROI' },
                  { key: 'total_trades' as SortKey, label: 'Total Trades' },
                  { key: 'followers' as SortKey, label: 'Followers' },
                ].map(({ key, label }) => (
                  <th key={key} className="text-left px-5 py-4">
                    <button
                      onClick={() => handleSort(key)}
                      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${sortKey === key ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
                    >
                      {label}
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                ))}
                <th className="text-left px-5 py-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">Fee/mo</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((trader, index) => (
                <tr key={trader.id} className="hover:bg-white/3 transition-all">
                  <td className="px-5 py-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-gold/20 text-gold' :
                      index === 1 ? 'bg-white/10 text-white/70' :
                      index === 2 ? 'bg-warning/20 text-warning' :
                      'bg-border text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                        {trader.display_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-semibold text-sm">{trader.display_name}</span>
                          {trader.is_verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                        </div>
                        <p className="text-muted-foreground text-xs truncate max-w-[160px]">{trader.bio}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={trader.win_rate >= 70 ? 'green' : trader.win_rate >= 60 ? 'yellow' : 'red'}>
                      {trader.win_rate}%
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-success font-bold font-mono text-sm">+{trader.monthly_roi}%</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-white font-mono text-sm">{trader.total_trades.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Users className="w-3.5 h-3.5" />
                      {trader.followers}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-white text-sm font-mono">${trader.subscription_fee}/mo</span>
                  </td>
                  <td className="px-5 py-4">
                    <Button variant="primary" size="sm">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Copy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {sorted.map((trader, index) => (
            <div key={trader.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${index === 0 ? 'bg-gold/20 text-gold' : 'bg-border text-muted-foreground'}`}>
                  {index + 1}
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                  {trader.display_name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold text-sm">{trader.display_name}</span>
                    {trader.is_verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </div>
                <Button variant="primary" size="sm">Copy</Button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-success font-bold font-mono text-sm">+{trader.monthly_roi}%</div>
                  <div className="text-muted-foreground text-xs">Monthly ROI</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{trader.win_rate}%</div>
                  <div className="text-muted-foreground text-xs">Win Rate</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{trader.followers}</div>
                  <div className="text-muted-foreground text-xs">Followers</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
