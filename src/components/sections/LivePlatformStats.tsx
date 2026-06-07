'use client'
import { useEffect, useRef, useState } from 'react'

interface AnimatedLiveCounterProps {
  target: number
  prefix?: string
  suffix?: string
  decimals?: number
}

function AnimatedLiveCounter({ target, prefix = '', suffix = '', decimals = 0 }: AnimatedLiveCounterProps) {
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
              setCount(current)
            }
          }, duration / steps)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString()

  return (
    <div ref={ref} className="font-mono font-extrabold text-3xl md:text-5xl text-primary drop-shadow-[0_0_15px_rgba(0,230,118,0.2)]">
      {prefix}{formattedCount}{suffix}
    </div>
  )
}

export default function LivePlatformStats() {
  return (
    <section className="py-12 bg-slate-950 border-y border-border/80 relative">
      <div className="absolute inset-0 bg-[#050711] opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
          
          <div className="space-y-2">
            <AnimatedLiveCounter target={4200000000} prefix="KES " suffix="+" />
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Total Profit Generated
            </div>
          </div>
          
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-border/40 py-6 md:py-0">
            <AnimatedLiveCounter target={12847} />
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Daily Active Traders
            </div>
          </div>
          
          <div className="space-y-2">
            <AnimatedLiveCounter target={94.7} suffix="%" decimals={1} />
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Success Rate
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
