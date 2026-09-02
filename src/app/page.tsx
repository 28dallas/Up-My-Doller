'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Bot, ShieldCheck, Sparkles, UserCheck } from 'lucide-react'
import { DERIV_AFFILIATE_LINK, getDerivOAuthUrl } from '@/lib/constants'
import { getDerivSession } from '@/lib/deriv-session'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [authUrl, setAuthUrl] = useState<string | null>(null)

  useEffect(() => {
    setIsConnected(!!getDerivSession())
    setAuthUrl(getDerivOAuthUrl(window.location.origin))
  }, [])

  if (isConnected) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Deriv connected
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Welcome back — your access is live.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Your Deriv account is linked, so you can access the learning hub, recommended strategies, and the bot library without any extra barrier.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-black transition hover:bg-primary/90">
                Go to learning hub
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/bots" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-white transition hover:border-primary/50 hover:text-primary">
                Open bot library
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#020b16] px-4 py-10 text-white md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[32px] border border-cyan-400/20 bg-[#081a2d]/90 shadow-[0_30px_80px_rgba(13,148,136,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 md:p-10 lg:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Learn and Get Deriv bots
              </div>

              <h1 className="max-w-2xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
                Learn Deriv with confidence. Connect once. Unlock everything.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                SmartTraders gives you a smarter path into Deriv: discover the markets, learn the strategy basics, and access the bot tools only after your Deriv account is connected through the affiliate flow.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { icon: BookOpen, title: 'Learn fast', text: 'Understand Deriv markets, strategies, and risk in plain English.' },
                  { icon: Bot, title: 'Explore bots', text: 'Browse the bot library and recommended setups after your account is connected.' },
                  { icon: UserCheck, title: 'Connect securely', text: 'Use the official Deriv OAuth flow to link your account safely.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon className="mb-3 h-5 w-5 text-primary" />
                    <div className="mb-2 text-sm font-bold text-white">{title}</div>
                    <p className="text-xs leading-5 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-[#0c1d2d] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Access flow</div>
                  <div className="text-xs text-slate-400">3 simple steps</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    'Click any green button to open/connect your account',
                    'Create or connect your Deriv account',
                    'Unlock learning + bots',
                  ].map((step, index) => (
                    <div key={step} className="rounded-2xl border border-white/10 bg-[#091827] p-3">
                      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-black">{index + 1}</div>
                      <p className="text-sm font-medium text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#091d32] p-8 md:p-10 lg:border-l lg:border-t-0">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Required before access
              </div>
              <h2 className="text-2xl font-black text-white">Start with your Deriv account</h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Before you can open the learning portal or bot library to access all Features, you need to create an account at Deriv official site or connect your account. This ensures you have and account ready for trading before access is unlocked.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={DERIV_AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00c853] px-5 py-3.5 text-sm font-bold text-black transition hover:bg-[#00e676]"
                >
                  Open my affiliate Deriv link
                  <ArrowRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (authUrl) window.location.assign(authUrl)
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  Connect my Deriv account
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                This keeps the journey compliant and ensures your account is linked before the learning and bot education features unlock.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
