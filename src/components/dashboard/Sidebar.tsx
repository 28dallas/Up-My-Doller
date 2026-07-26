'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  Copy,
  Wrench,
  BarChart2,
  TrendingUp,
  Cpu,
  Zap,
  Target,
  LineChart,
  Bolt,
  Wallet,
  Settings,
  Bell,
  MessageCircle,
  Key,
  Shield,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { label: 'Analysis', href: '/dashboard/analysis', icon: BarChart2 },
  { label: 'API Token', href: '/dashboard/api-token', icon: Key },
  { label: 'Bot Builder', href: '/dashboard/bot-builder', icon: Wrench },
  { label: 'Charts', href: '/dashboard/charts', icon: LineChart },
  { label: 'Copy Trading', href: '/dashboard/copy-trading', icon: Copy },
  { label: 'D-Trader', href: '/dashboard/d-trader', icon: TrendingUp },
  { label: 'My Bots', href: '/dashboard/my-bots', icon: Bot },
  { label: 'Matches', href: '/dashboard/matches', icon: Target },
  { label: 'Signals', href: '/dashboard/signals', icon: Zap },
  { label: 'Smart Analysis', href: '/dashboard/smart-analysis', icon: Cpu },
  { label: 'Speedbot', href: '/dashboard/speedbot', icon: Bolt },
  { label: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { label: 'Support', href: '/dashboard/support', icon: MessageCircle },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Security', href: '/dashboard/settings', icon: Shield },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r border-border bg-surface/30">
      <div className="h-full px-4 py-5 overflow-y-auto">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-extrabold text-sm">DB</span>
            </div>
            <div>
              <div className="text-white text-sm font-bold">Dashboard</div>
              <div className="text-muted-foreground text-xs">Your trading workspace</div>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href + label}
                href={href}
                className={
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ' +
                  (active
                    ? 'bg-primary/10 border border-primary/30 text-white'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent')
                }
              >
                <Icon className={"w-4 h-4 shrink-0 " + (active ? 'text-primary' : 'text-muted-foreground')} />
                <span className="truncate">{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-6 text-xs text-muted-foreground leading-relaxed">
          Tip: use the menu to jump between trading tools and account settings.
        </div>
      </div>
    </aside>
  )
}

