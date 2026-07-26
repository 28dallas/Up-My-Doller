import Link from 'next/link'
import { AlertTriangle, ShieldCheck } from 'lucide-react'

export default function RiskNotice() {
  return <section className="border-y border-warning/25 bg-warning/5"><div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs"><div className="flex gap-2"><AlertTriangle className="w-4 h-4 text-warning shrink-0" /><p className="text-muted-foreground"><strong className="text-warning">Risk warning:</strong> Deriv products include CFDs and synthetic indices with a high risk of loss. Ensure you understand the risks involved before trading.</p></div><div className="flex items-center gap-1.5 text-muted-foreground whitespace-nowrap"><ShieldCheck className="w-4 h-4 text-primary" />Non-custodial: we never see or store your Deriv password.<Link href="/disclaimer" className="text-primary hover:underline ml-1">Read disclaimer</Link></div></div></section>
}
