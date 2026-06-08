'use client'

const STATS = [
  { value: 12000, suffix: '+', label: 'Active Users', prefix: '' },
  { value: 48, suffix: 'M+', label: 'KES Paid Out', prefix: 'KES ' },
  { value: 500, suffix: '+', label: 'Trading Bots', prefix: '' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', prefix: '' },
]

export default function StatsBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-card to-gold/10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono font-extrabold text-3xl md:text-4xl text-white">
                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
