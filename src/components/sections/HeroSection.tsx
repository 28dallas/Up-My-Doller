'use client'
import Link from 'next/link'
import { Play, TrendingUp, Users, Bot, Activity } from 'lucide-react'
import Button from '@/components/ui/Button'
import { DERIV_AFFILIATE_LINK } from '@/lib/constants'

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
            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#ff444f]/10 border border-[#ff444f]/20 rounded-full px-4 py-1.5">
                <span className="text-[#ff444f] text-sm font-semibold">⚡ Powered by Deriv Technology</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-semibold">#1 Deriv Bot Platform in Africa</span>
              </div>
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
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href={DERIV_AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00c853] px-7 py-4 text-lg font-bold text-black shadow-[0_0_30px_rgba(0,200,83,0.3)] hover:shadow-[0_0_38px_rgba(0,200,83,0.45)] animate-pulse transition-all"
                >
                  <TrendingUp className="w-5 h-5" />
                  Open Free Deriv Account →
                </a>
                <a
                  href="https://youtu.be/uXlXWFHmXNk?si=08FuFrRUFXbSDcns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-border text-white font-semibold px-6 py-3 rounded-full hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-primary bg-black/10 text-primary shadow-sm transition-all group-hover:bg-primary/15">
                    <Play className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span>Watch Demo</span>
                    <span className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-primary font-semibold">
                      Video Tutorial
                    </span>
                  </div>
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground max-w-xl">
                  Free to join • No credit card • Trusted by Deriv
                </p>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Quick tutorial preview: watch how to set up your free Deriv bot, connect your account, and start trading with proven strategies in minutes.
                </p>
              </div>

              {/* Social Join Row */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/TRENDIF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[#0088cc]/30 hover:bg-[#0088cc]/15 text-white transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-[#0088cc] shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.75-.75 4.35-1.06 6.03-.13.71-.39.95-.64.97-.56.05-1.03-.38-1.57-.74-.85-.56-1.33-.9-2.16-1.45-.96-.64-.34-.99.21-1.56.14-.15 2.65-2.42 2.7-2.63.01-.03.01-.14-.05-.2-.06-.06-.15-.04-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.83-2.52 2.77-1.17 3.35-1.38 3.73-1.38.08 0 .27.02.39.12.1.08.13.19.14.28.01.07.01.21 0 .28z" />
                  </svg>
                  Join Telegram &rarr;
                </a>
                <a
                  href="https://wa.me/254107646264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[#25d366]/30 hover:bg-[#25d366]/15 text-white transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-[#25d366] shrink-0" viewBox="0 0 24 24">
                    <path d="M12.004 2C6.48 2 2.008 6.48 2.008 12c0 1.91.54 3.7 1.48 5.23L2.008 22l4.9-1.29c1.47.8 3.14 1.29 4.93 1.29 5.52 0 10-4.48 10-10S17.526 2 12.004 2zm5.72 13.91c-.24.68-1.21 1.25-1.81 1.33-.51.07-1.18.1-3.38-.82-2.82-1.17-4.6-4.03-4.74-4.22-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.27.54-.34.72-.34.18 0 .36 0 .51.01.16.01.37-.06.58.45.21.52.73 1.79.79 1.92.06.13.1.28.01.45-.09.18-.14.28-.28.45-.14.17-.3.38-.43.51-.15.15-.31.32-.13.63.18.3.8 1.32 1.72 2.14.92.82 1.7-1.08 1.7-1.08.18-.32.4-.26.63-.15.22.11 1.42.67 1.66.79.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
                  </svg>
                  Join WhatsApp &rarr;
                </a>
              </div>
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
