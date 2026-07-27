'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { DERIV_APP_ID } from '@/lib/constants'

export default function DemoModeNotice() {
  return <div className="mb-5 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm"><AlertTriangle className="w-5 h-5 shrink-0 text-warning" /><div><p className="font-semibold text-warning">Demo / preview mode — no live trades are placed here</p><p className="mt-1 text-muted-foreground">Prices, bot results, P&amp;L and copy-trader metrics shown in this workspace are sample data until live Deriv execution is completed.{!DERIV_APP_ID && ' A Deriv App ID has not yet been configured.'}</p><Link href="/disclaimer" className="mt-2 inline-block text-primary hover:underline">Read the trading-risk disclaimer</Link></div></div>
}
