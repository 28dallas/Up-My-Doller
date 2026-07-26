'use client'

import { useState } from 'react'
import { Link2 } from 'lucide-react'
import { getDerivOAuthUrl } from '@/lib/constants'

export default function DerivConnectButton({ className, children = 'Connect Deriv' }: { className?: string; children?: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const connect = () => {
    const url = getDerivOAuthUrl(window.location.origin)
    if (!url) { setMessage('Deriv connection is being configured. Please use “Open Free Account” or contact support.'); return }
    window.location.assign(url)
  }
  return <div><button type="button" onClick={connect} className={className}><Link2 className="w-4 h-4" />{children}</button>{message && <p className="mt-2 text-xs text-warning max-w-xs">{message}</p>}</div>
}
