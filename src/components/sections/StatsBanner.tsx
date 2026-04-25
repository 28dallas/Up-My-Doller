'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 12000, suffix: '+', label: 'Active Users', prefix: '' },
  { value: 45, suffix: 'M+', label: 'KES Paid Out', prefix: 'KES ' },
  { value: 500, suffix: '+', label: 'Trading Bots', prefix: '' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', prefix: '' },
]

function AnimatedCounter({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="font-mono font-extrabold text-3xl md:text-4xl text-white">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-card to-gold/10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
