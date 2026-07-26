'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { saveDerivSession } from '@/lib/deriv-session'

function CallbackContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState('')
  useEffect(() => {
    const token = params.get('token1'), account = params.get('acct1')
    if (!token || !account) { setError('Deriv did not return an account connection. Please try again.'); return }
    saveDerivSession({ token, account, createdAt: new Date().toISOString() })
    const timer = window.setTimeout(() => router.replace('/dashboard'), 900)
    return () => window.clearTimeout(timer)
  }, [params, router])
  return <main className="min-h-screen bg-background grid-bg flex items-center justify-center px-4"><div className="max-w-md w-full bg-card border border-border rounded-2xl p-7 text-center">{error ? <><AlertTriangle className="w-10 h-10 text-warning mx-auto mb-3" /><h1 className="text-xl font-bold text-white">Connection not completed</h1><p className="text-muted-foreground text-sm mt-2">{error}</p><Link className="inline-block mt-5 text-primary hover:underline" href="/">Return home</Link></> : <><CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" /><h1 className="text-xl font-bold text-white">Deriv account connected</h1><p className="text-muted-foreground text-sm mt-2">Your session is stored only in this browser tab. Redirecting to your dashboard…</p></>}</div></main>
}

export default function DerivCallbackPage() {
  return <Suspense fallback={<main className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Connecting to Deriv…</main>}><CallbackContent /></Suspense>
}
