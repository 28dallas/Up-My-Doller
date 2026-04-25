'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MOCK_BOTS, MARKET_LABELS, STRATEGY_LABELS } from '@/lib/data'
import { Search, Download, Star, AlertTriangle, Filter, X } from 'lucide-react'

const MARKETS = ['All', 'Volatility 10', 'Volatility 25', 'Volatility 75', 'Volatility 100', 'Crash 500', 'Crash 1000', 'Boom 500', 'Boom 1000', 'Step Index', 'Forex']
const STRATEGIES = ['All', 'Rise/Fall', 'Over/Under', 'Even/Odd', 'Digit Match', 'Touch/No Touch']
const RISK_LEVELS = ['All', 'Low', 'Medium', 'High']

function getWinRateBadge(rate: number): 'green' | 'yellow' | 'red' {
  if (rate >= 60) return 'green'
  if (rate >= 50) return 'yellow'
  return 'red'
}

export default function BotsPage() {
  const [search, setSearch] = useState('')
  const [market, setMarket] = useState('All')
  const [strategy, setStrategy] = useState('All')
  const [risk, setRisk] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = MOCK_BOTS.filter((bot) => {
    const matchSearch = bot.name.toLowerCase().includes(search.toLowerCase())
    const matchMarket = market === 'All' || MARKET_LABELS[bot.market] === market
    const matchStrategy = strategy === 'All' || STRATEGY_LABELS[bot.strategy_type] === strategy
    const matchRisk = risk === 'All' || bot.risk_level === risk.toLowerCase()
    return matchSearch && matchMarket && matchStrategy && matchRisk
  })

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Header */}
      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="green" className="mb-4">500+ Free Bots</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Free Trading <span className="gradient-text">Bot Library</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Download ready-made Deriv bot strategies. Tested, backtested, and optimized for African markets.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bots by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-6">
              {[
                { label: 'Market', options: MARKETS, value: market, set: setMarket },
                { label: 'Strategy', options: STRATEGIES, value: strategy, set: setStrategy },
                { label: 'Risk Level', options: RISK_LEVELS, value: risk, set: setRisk },
              ].map(({ label, options, value, set }) => (
                <div key={label}>
                  <h3 className="text-white font-semibold text-sm mb-3">{label}</h3>
                  <div className="space-y-1.5">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => set(opt)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          value === opt
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-muted-foreground hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">{filtered.length} bots found</p>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bg-card border border-border rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Market', options: MARKETS.slice(0, 6), value: market, set: setMarket },
                    { label: 'Strategy', options: STRATEGIES, value: strategy, set: setStrategy },
                    { label: 'Risk', options: RISK_LEVELS, value: risk, set: setRisk },
                  ].map(({ label, options, value, set }) => (
                    <div key={label}>
                      <p className="text-muted-foreground text-xs mb-2">{label}</p>
                      <div className="space-y-1">
                        {options.map((opt) => (
                          <button key={opt} onClick={() => set(opt)} className={`w-full text-left px-2 py-1.5 rounded text-xs transition-all ${value === opt ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white'}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-muted-foreground text-sm">{filtered.length} bots found</p>
            </div>

            {/* Bot grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((bot) => (
                <Card key={bot.id} glow="green" className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{bot.name}</h3>
                      <p className="text-muted-foreground text-xs">{MARKET_LABELS[bot.market]}</p>
                    </div>
                    {!bot.is_free && <Badge variant="gold">Pro</Badge>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getWinRateBadge(bot.win_rate)}>
                      <Star className="w-3 h-3 mr-1" />
                      {bot.win_rate}% Win Rate
                    </Badge>
                    <Badge variant="default">{STRATEGY_LABELS[bot.strategy_type]}</Badge>
                    <Badge variant={bot.risk_level === 'low' ? 'green' : bot.risk_level === 'medium' ? 'yellow' : 'red'}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {bot.risk_level.charAt(0).toUpperCase() + bot.risk_level.slice(1)} Risk
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed flex-1">{bot.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Download className="w-3.5 h-3.5" />
                      {bot.download_count.toLocaleString()}
                    </div>
                    <Button variant={bot.is_free ? 'primary' : 'outline'} size="sm">
                      <Download className="w-3.5 h-3.5" />
                      {bot.is_free ? 'Download XML' : 'Unlock Pro'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🤖</div>
                <p className="text-white font-semibold mb-2">No bots found</p>
                <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
