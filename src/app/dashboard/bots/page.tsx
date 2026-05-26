'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { bots } from '@/data/bots'

export default function DashboardBotsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'free' | 'pro'>('all')

  const visibleBots = useMemo(() => {
    return bots.filter((bot) => {
      const matchesSearch = [bot.name, bot.market, bot.tradeType].join(' ').toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || bot.tier === filter
      return matchesSearch && matchesFilter
    })
  }, [filter, search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bot Library</h1>
          <p className="text-sm text-muted-foreground">Browse strategies, compare win rates, and choose what to simulate next.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['free', 'Free'],
            ['pro', 'Pro'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value as 'all' | 'free' | 'pro')}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === value ? 'bg-primary text-black' : 'border border-border text-muted-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-2xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary"
          placeholder="Search by name, market, or trade type"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleBots.map((bot) => (
          <Card key={bot.id} glow="green" className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">{bot.name}</h2>
                <p className="text-sm text-muted-foreground">{bot.market}</p>
              </div>
              <Badge variant={bot.tier === 'pro' ? 'gold' : 'green'}>{bot.tier.toUpperCase()}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">{bot.tradeType}</Badge>
              <Badge variant={bot.riskLevel === 'Low' ? 'green' : bot.riskLevel === 'Medium' ? 'yellow' : 'red'}>{bot.riskLevel} Risk</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{bot.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-border bg-background/40 p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Win Rate</div>
                <div className="mt-1 font-bold text-white">{bot.winRate}%</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Downloads</div>
                <div className="mt-1 font-bold text-white">{bot.downloads.toLocaleString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
