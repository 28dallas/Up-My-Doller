'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, LayoutDashboard, Wrench, Gift, BarChart2,
  TrendingUp, Cpu, Zap, Target, LineChart, Copy, Bolt
} from 'lucide-react'
import { DERIV_AFFILIATE_LINK } from '@/lib/constants'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Bot Builder', href: '/dashboard/bot-builder', icon: Wrench },
  { label: 'Free Bots', href: '/bots', icon: Gift },
  { label: 'Analysis', href: '/dashboard/analysis', icon: BarChart2 },
  { label: 'D-Trader', href: '/dashboard/d-trader', icon: TrendingUp },
  { label: 'Smart Analysis', href: '/dashboard/smart-analysis', icon: Cpu },
  { label: 'Signals', href: '/dashboard/signals', icon: Zap },
  { label: 'Matches', href: '/dashboard/matches', icon: Target },
  { label: 'Charts', href: '/dashboard/charts', icon: LineChart },
  { label: 'Copy Trading', href: '/dashboard/copy-trading', icon: Copy },
  { label: 'Speedbot', href: '/dashboard/speedbot', icon: Bolt },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e2e] border-b border-[#1a2060]">
      {/* Top bar: Logo + Auth buttons */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-[#1a2060]">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-white font-bold text-base tracking-wide">Pips Dollarprinter</span>
          <span className="text-xs" style={{ color: '#aaa' }}>
            powered by{' '}
            <span className="font-bold italic" style={{ color: '#ff444f' }}>Deriv</span>
          </span>
        </Link>

        {/* Right: auth buttons + mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Telegram-style green dot */}
          <div className="hidden sm:flex items-center gap-1.5 mr-1">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          </div>

          {/* Telegram Button */}
          <a
            href="https://t.me/TRENDIF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-white text-xs font-semibold border border-[#0088cc]/30 hover:bg-[#0088cc]/15 transition-all"
          >
            <svg className="w-4 h-4 fill-current text-[#0088cc] shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.75-.75 4.35-1.06 6.03-.13.71-.39.95-.64.97-.56.05-1.03-.38-1.57-.74-.85-.56-1.33-.9-2.16-1.45-.96-.64-.34-.99.21-1.56.14-.15 2.65-2.42 2.7-2.63.01-.03.01-.14-.05-.2-.06-.06-.15-.04-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.83-2.52 2.77-1.17 3.35-1.38 3.73-1.38.08 0 .27.02.39.12.1.08.13.19.14.28.01.07.01.21 0 .28z" />
            </svg>
            <span className="hidden sm:inline">Telegram</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/254107646264"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-white text-xs font-semibold hover:bg-[#25d366]/10 transition-all"
          >
            <svg className="w-4 h-4 fill-current text-[#25d366] shrink-0" viewBox="0 0 24 24">
              <path d="M12.004 2C6.48 2 2.008 6.48 2.008 12c0 1.91.54 3.7 1.48 5.23L2.008 22l4.9-1.29c1.47.8 3.14 1.29 4.93 1.29 5.52 0 10-4.48 10-10S17.526 2 12.004 2zm5.72 13.91c-.24.68-1.21 1.25-1.81 1.33-.51.07-1.18.1-3.38-.82-2.82-1.17-4.6-4.03-4.74-4.22-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.27.54-.34.72-.34.18 0 .36 0 .51.01.16.01.37-.06.58.45.21.52.73 1.79.79 1.92.06.13.1.28.01.45-.09.18-.14.28-.28.45-.14.17-.3.38-.43.51-.15.15-.31.32-.13.63.18.3.8 1.32 1.72 2.14.92.82 1.7-1.08 1.7-1.08.18-.32.4-.26.63-.15.22.11 1.42.67 1.66.79.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded text-white text-sm font-medium border border-[#2a3080] hover:bg-[#1a2060] transition-all"
          >
            Log in
          </Link>
          <Link
            href="/dashboard/api-token"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded text-white text-sm font-medium bg-[#1a2060] hover:bg-[#2a3080] border border-[#2a3080] transition-all"
          >
            API Token
          </Link>
          <a
            href={DERIV_AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded text-black text-sm font-semibold bg-[#00c853] hover:bg-[#00e676] transition-all"
          >
            Sign up
          </a>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-white p-2 rounded hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Bottom bar: Nav items */}
      <div className="hidden sm:flex items-center gap-0 px-2 h-10 overflow-x-auto scrollbar-hide bg-[#0d1235]">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 h-full text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                active
                  ? 'text-white border-primary bg-white/5'
                  : 'text-[#8899cc] border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-[#0a0e2e] border-t border-[#1a2060]">
          <div className="px-3 py-3 space-y-0.5">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'bg-primary/15 text-primary' : 'text-[#8899cc] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-3 flex flex-col gap-2 border-t border-[#1a2060] mt-2">
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-center py-2 rounded border border-[#2a3080] text-white text-sm hover:bg-[#1a2060] transition-all">Log in</Link>
              <Link href="/dashboard/api-token" onClick={() => setIsOpen(false)} className="text-center py-2 rounded bg-[#1a2060] text-white text-sm hover:bg-[#2a3080] transition-all">API Token</Link>
              <a
                href={DERIV_AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 rounded bg-[#00c853] text-black text-sm font-semibold hover:bg-[#00e676] transition-all"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
