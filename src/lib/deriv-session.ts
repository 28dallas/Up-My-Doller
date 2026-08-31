'use client'

export type DerivSession = { account: string; token: string; createdAt: string }
const KEY = 'pips-deriv-session'
export const DERIV_SESSION_COOKIE = 'pips_deriv_session'

function parseSessionString(raw: string | null | undefined): DerivSession | null {
  if (!raw) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<DerivSession>
    if (!parsed.account || !parsed.token || !parsed.createdAt) return null
    return {
      account: parsed.account,
      token: parsed.token,
      createdAt: parsed.createdAt,
    }
  } catch {
    return null
  }
}

export function saveDerivSession(session: DerivSession) {
  const payload = JSON.stringify(session)
  sessionStorage.setItem(KEY, payload)

  if (typeof document === 'undefined') return

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${DERIV_SESSION_COOKIE}=${encodeURIComponent(payload)}; Path=/; Max-Age=604800; SameSite=Lax${secure}`
}

export function getDerivSessionFromCookieValue(value: string | null | undefined): DerivSession | null {
  return parseSessionString(value)
}

export function hasValidDerivSession(value: string | null | undefined): boolean {
  return !!getDerivSessionFromCookieValue(value)
}

export function getDerivSession(): DerivSession | null {
  try {
    const saved = sessionStorage.getItem(KEY)
    if (saved) return JSON.parse(saved) as DerivSession

    if (typeof document === 'undefined') return null

    const cookieRow = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${DERIV_SESSION_COOKIE}=`))

    if (!cookieRow) return null

    return getDerivSessionFromCookieValue(decodeURIComponent(cookieRow.split('=')[1]))
  } catch {
    return null
  }
}

export function clearDerivSession() {
  sessionStorage.removeItem(KEY)

  if (typeof document !== 'undefined') {
    document.cookie = `${DERIV_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
  }
}
