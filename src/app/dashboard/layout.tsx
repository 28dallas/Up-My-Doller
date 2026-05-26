'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  CircleDollarSign,
  Cpu,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  Zap,
  BarChart2,
} from 'lucide-react'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { getAvatarProps } from '@/lib/botEngine'
import { getCurrentUser, supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Bot Builder', href: '/dashboard/bot-builder', icon: Cpu },
  { label: 'Bot Library', href: '/dashboard/bots', icon: Download },
  { label: 'Signals', href: '/dashboard/signals', icon: Zap },
  { label: 'Copy Trading', href: '/dashboard/copy-trading', icon: Users },
  { label: 'Analysis', href: '/dashboard/analysis', icon: BarChart2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [checking, setChecking] = useState(true)
  const [userName, setUserName] = useState('Trader')

  const currentItem = useMemo(
    () => items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ?? items[0],
    [pathname]
  )

  useEffect(() => {
    let mounted = true

    const loadSession = async () => {
      const user = await getCurrentUser()
      if (!mounted) return

      if (!user) {
        router.replace('/auth/login')
        return
      }

      setUserName((user.user_metadata.full_name as string) || user.email?.split('@')[0] || 'Trader')
      setChecking(false)
    }

    loadSession()
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/auth/login')
      }
    })

    return () => {
      mounted = false
      data.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/auth/login')
    router.refresh()
  }

  const avatar = getAvatarProps(userName)

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="rounded-3xl border border-border bg-card/80 px-6 py-4 text-sm text-muted-foreground">
          Loading your dashboard...
        </div>
      </div>
    )
  }

  const sidebar = (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card/80 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <CircleDollarSign className="h-5 w-5" />
        </div>
        <div>
          <div className="font-bold text-white">Pips Dollar Printer</div>
          <div className="text-xs text-muted-foreground">Trader workspace</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                active ? 'bg-primary text-black' : 'text-muted-foreground hover:bg-background/60 hover:text-white'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-background/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: avatar.color }}>
            {avatar.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{userName}</div>
            <div className="text-xs text-muted-foreground">Free plan</div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-white transition hover:border-danger/40 hover:bg-danger/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">{sidebar}</div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 lg:hidden">
            <div className="h-full max-w-xs">{sidebar}</div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 lg:hidden"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">{currentItem.label}</h1>
                <p className="text-xs text-muted-foreground">Simulated live trading environment</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-white">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black">
                  3
                </span>
              </button>
              <Link href="/dashboard/settings" className="hidden items-center gap-3 rounded-full border border-border bg-card/70 px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: avatar.color }}>
                  {avatar.initials}
                </div>
                <span className="text-sm font-medium text-white">{userName}</span>
              </Link>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
