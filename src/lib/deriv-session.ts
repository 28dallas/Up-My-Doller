'use client'

export type DerivSession = { account: string; token: string; createdAt: string }
const KEY = 'pips-deriv-session'
export function saveDerivSession(session: DerivSession) { sessionStorage.setItem(KEY, JSON.stringify(session)) }
export function getDerivSession(): DerivSession | null { try { const saved = sessionStorage.getItem(KEY); return saved ? JSON.parse(saved) as DerivSession : null } catch { return null } }
export function clearDerivSession() { sessionStorage.removeItem(KEY) }
