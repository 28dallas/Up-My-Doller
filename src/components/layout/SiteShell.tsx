'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import FloatingAI from '@/components/learn/FloatingAI'
import { DERIV_AFFILIATE_LINK } from '@/lib/constants'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isAffiliateFunnel =
    pathname === '/' && (
      searchParams.get('utm_source') === 'CU334550' ||
      searchParams.get('utm_medium') === 'affiliate' ||
      searchParams.get('utm_campaign') === 'dynamicworks' ||
      searchParams.get('sidc') !== null ||
      searchParams.get('affiliate') === '1' ||
      searchParams.get('from') === 'deriv'
    )

  if (isAffiliateFunnel) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <FloatingAI />
      <a
        href={DERIV_AFFILIATE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Free Deriv Account"
        className="fixed right-4 bottom-6 z-50 hidden items-center justify-center gap-2 rounded-full bg-[#00c853] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(0,200,83,0.35)] transition-all hover:bg-[#00e676] hover:shadow-[0_12px_36px_rgba(0,200,83,0.45)] md:inline-flex"
      >
        Open Free Deriv Account →
      </a>
      <a
        href={DERIV_AFFILIATE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Free Deriv Account"
        className="fixed inset-x-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-[#00c853] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(0,200,83,0.35)] transition-all hover:bg-[#00e676] hover:shadow-[0_12px_36px_rgba(0,200,83,0.45)] md:hidden"
      >
        Open Free Deriv Account →
      </a>
      <div className="pb-28">{children}</div>
    </>
  )
}
