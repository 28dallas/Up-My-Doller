'use client'
import Link from 'next/link'
import { Play, TrendingUp, Users, Bot, Activity } from 'lucide-react'
import Button from '@/components/ui/Button'

function AnimatedChart() {
  return (
    <div className="relative w-full h-64 md:h-80">
      {/* Chart container */}
      <div className="absolute inset-0 bg-card border border-border rounded-2xl overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid-bg opacity-50" />

        {/* Candlestick SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          {/* Green line chart */}
          <polyline
            points="0,160 40,140 80,120 120,130 160,90 200,70 240,80 280,50 320,40 360,30 400,20"
            fill="none"
            stroke="#00E676"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
          />
          {/* Area fill */}
          <polygon
            points="0,160 40,140 80,120 120,130 160,90 200,70 240,80 280,50 320,40 360,30 400,20 400,200 0,200"
            fill="url(#greenGradient)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E676" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating stats */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <div className="text-xs text-muted-foreground">Portfolio Value</div>
          <div className="text-success font-mono font-bold text-sm">+KES 45,230</div>
        </div>

        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <div className="text-xs text-muted-foreground">Win Rate</div>
          <div className="text-primary font-mono font-bold text-sm">74.3%</div>
        </div>

        <div className="absolute bottom-4 right-4 bg-success/20 border border-success/30 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-success text-xs font-semibold">Bot Running</span>
          </div>
        </div>

        {/* Candlesticks decorative */}
        <div className="absolute bottom-8 left-4 flex items-end gap-1.5 opacity-60">
          {[30, 45, 25, 55, 35, 60, 40, 70, 50, 65].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="w-0.5 h-2 bg-current opacity-50" style={{ color: i % 2 === 0 ? '#00E676' : '#EF4444' }} />
              <div
                className="w-3 rounded-sm"
                style={{
                  height: `${h * 0.4}px`,
                  backgroundColor: i % 2 === 0 ? '#00E676' : '#EF4444',
                  opacity: 0.7,
                }}
              />
              <div className="w-0.5 h-2 bg-current opacity-50" style={{ color: i % 2 === 0 ? '#00E676' : '#EF4444' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating bot card */}
      <div className="absolute -bottom-4 -left-4 bg-card border border-primary/30 rounded-xl p-3 shadow-[0_0_20px_rgba(0,230,118,0.2)] animate-float">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-white text-xs font-semibold">Volatility Crusher</div>
            <div className="text-success text-xs">+KES 1,240 today</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-medium">#1 Deriv Bot Platform in Africa</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Build Profitable{' '}
              <span className="gradient-text">Trading Bots</span>{' '}
              Without Coding
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Professional Deriv bot builder with copy trading, free bots, and advanced strategies.
              Start trading smarter today — no coding required.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg">
                  <TrendingUp className="w-5 h-5" />
                  Start Free
                </Button>
              </Link>
              <button className="flex items-center gap-2 border border-border text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/5 transition-all group">
                <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <Play className="w-3 h-3 text-primary fill-primary" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Users, label: '10,000+', sub: 'Active Traders' },
                { icon: Bot, label: '500+', sub: 'Free Bots' },
                { icon: Activity, label: '99.9%', sub: 'Uptime' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={sub} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm font-mono">{label}</div>
                    <div className="text-muted-foreground text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chart visual */}
          <div className="relative">
            <AnimatedChart />
          </div>
        </div>
      </div>
    </section>
  )
}
