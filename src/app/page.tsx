'use client'

import { useSearchParams } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import LivePlatformStats from '@/components/sections/LivePlatformStats'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FreeBotShowcase from '@/components/sections/FreeBotShowcase'
import CopyTradingSection from '@/components/sections/CopyTradingSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsBanner from '@/components/sections/StatsBanner'
import DerivLiveFeed from '@/components/sections/DerivLiveFeed'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CommunityCTASection from '@/components/sections/CommunityCTASection'
import MpesaGuideSection from '@/components/sections/MpesaGuideSection'
import StartLearningSection from '@/components/sections/StartLearningSection'
import RiskNotice from '@/components/shared/RiskNotice'
import { getDerivOAuthUrl } from '@/lib/constants'

export default function HomePage() {
  const searchParams = useSearchParams()
  const isAffiliate = !!(
    searchParams.get('utm_source') === 'CU334550' ||
    searchParams.get('utm_medium') === 'affiliate' ||
    searchParams.get('utm_campaign') === 'dynamicworks' ||
    searchParams.get('sidc') ||
    searchParams.get('affiliate') === '1' ||
    searchParams.get('from') === 'deriv'
  )

  if (isAffiliate) {
    const authUrl = getDerivOAuthUrl(window.location.origin)

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010d18] px-4 py-10 text-white">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.12),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />

          <div className="absolute left-10 top-1/2 h-28 w-16 -translate-y-1/2 rounded-t-[8px] rounded-b-[4px] bg-[#0dd4b3]/80 shadow-[0_0_20px_rgba(13,212,179,0.25)]" />
          <div className="absolute left-24 top-[58%] h-20 w-12 rounded-t-[8px] rounded-b-[4px] bg-[#f0596f]/80 shadow-[0_0_20px_rgba(240,89,111,0.25)]" />
          <div className="absolute right-10 top-1/2 h-24 w-16 -translate-y-1/2 rounded-t-[8px] rounded-b-[4px] bg-[#0dd4b3]/80 shadow-[0_0_20px_rgba(13,212,179,0.25)]" />
          <div className="absolute right-24 top-[58%] h-20 w-12 rounded-t-[8px] rounded-b-[4px] bg-[#f0596f]/80 shadow-[0_0_20px_rgba(240,89,111,0.25)]" />
        </div>

        <div className="relative z-10 w-full max-w-[760px] rounded-[32px] border border-cyan-400/20 bg-[#071b2d]/90 p-6 shadow-[0_0_60px_rgba(25,211,190,0.08)] sm:p-8">
          <div className="mb-8 text-center">
            <div className="mb-5 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[30px] border border-[#f4c9d5]/20 bg-[#f6dfe8]/10 text-[4rem] font-black text-[#f5dfe8] shadow-[0_0_30px_rgba(245,223,232,0.12)]">
                d
              </div>
            </div>

            <div className="text-[2.8rem] font-black uppercase leading-none tracking-[-0.07em] sm:text-[4.3rem]">
              <span className="text-[#ff4655]">DB</span>
              <span className="text-[#1ee6c4]">Traders</span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[0.62rem] uppercase tracking-[0.26em] text-slate-300">
              <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-cyan-300">Trading Hub</span>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-300">Live</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0d1d2a]/80 px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-8">
            <div className="text-center">
              <h1 className="text-[2.1rem] font-black tracking-[-0.05em] text-white sm:text-[2.7rem]">
                Welcome to DBTraders
              </h1>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">Empowering your financial journey.</p>
            </div>

            <div className="mt-7">
              <div className="flex h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-500" />
              </div>
              <div className="mt-2 text-right text-xs font-semibold tracking-[0.18em] text-slate-300">35%</div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-300">
              <div className="h-3 w-3 rounded-full border border-cyan-300 bg-cyan-400/20" />
              <span>Connecting to Volatility Markets...</span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { label: 'Advanced Charts', color: 'bg-cyan-500/10 text-cyan-300' },
                { label: 'Trading Bots', color: 'bg-emerald-500/10 text-emerald-300' },
                { label: 'Copy Trading', color: 'bg-violet-500/10 text-violet-300' },
              ].map(({ label, color }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${color} ring-1 ring-white/10`}>
                    <span className="text-lg font-bold">{label.charAt(0)}</span>
                  </div>
                  <span className="text-[11px] text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={authUrl || 'https://deriv.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00c853] px-6 py-4 text-base font-bold text-black shadow-[0_0_28px_rgba(0,200,83,0.25)] transition hover:bg-[#00e676]"
              >
                Continue with Deriv
              </a>

              <a
                href={authUrl || 'https://deriv.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary/20"
              >
                Create a free Deriv account
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <HeroSection />
      <RiskNotice />
      <StartLearningSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <LivePlatformStats />
      <HowItWorksSection />
      <StatsBanner />
      <DerivLiveFeed />
      <FreeBotShowcase />
      <CopyTradingSection />
      <MpesaGuideSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CommunityCTASection />
      <Footer />
    </main>
  )
}
