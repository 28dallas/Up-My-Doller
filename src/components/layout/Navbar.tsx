'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, LayoutDashboard, Wrench, Gift, BarChart2,
  TrendingUp, Cpu, Zap, Target, LineChart, Copy, Bolt
} from 'lucide-react'

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
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          </div>

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
          <Link
            href="/auth/signup"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded text-white text-sm font-medium bg-[#2a3090] hover:bg-[#3a40a0] transition-all"
          >
            Sign up
          </Link>

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
              <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="text-center py-2 rounded bg-[#2a3090] text-white text-sm hover:bg-[#3a40a0] transition-all">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
