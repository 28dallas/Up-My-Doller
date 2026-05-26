'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CircleDollarSign, Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Free Bots', href: '/bots' },
  { label: 'Copy Trading', href: '/copy-trading' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <CircleDollarSign className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold">Pips Dollar Printer</div>
            <div className="text-xs text-muted-foreground">Deriv bots and copy trading for Africa</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  active ? 'bg-primary text-black' : 'text-muted-foreground hover:bg-card hover:text-white'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/auth/login" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-white transition hover:border-primary/50 hover:bg-card">
            Login
          </Link>
          <Link href="/auth/signup" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90">
            Sign Up
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-2xl px-4 py-3 text-sm font-medium transition',
                  pathname === item.href ? 'bg-primary text-black' : 'bg-card text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-semibold text-white">
                Login
              </Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)} className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-black">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
