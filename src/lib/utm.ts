// ============================================================
// PIPS DOLLAR PRINTER — UTM Parameter Tracker
// Reads UTM params from URL on first visit and persists them
// in sessionStorage for the entire session.
// ============================================================

const SESSION_KEY = 'utm_params'

function safeParseObject<T>(value: string | null): T | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as T) : null
  } catch {
    return null
  }
}

export interface UTMParams {
  utm_source:   string | null
  utm_medium:   string | null
  utm_campaign: string | null
  utm_content:  string | null
  utm_term:     string | null
}

// ------------------------------------------------------------
// captureUTMParams
// Call once on app mount (in layout or _app).
// Reads from URL search params and writes to sessionStorage.
// Only overwrites if new UTM params are present in the URL.
// ------------------------------------------------------------
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)

  const utmSource   = params.get('utm_source')
  const utmMedium   = params.get('utm_medium')
  const utmCampaign = params.get('utm_campaign')
  const utmContent  = params.get('utm_content')
  const utmTerm     = params.get('utm_term')

  // Only write if at least one UTM param is present in the URL
  if (utmSource || utmMedium || utmCampaign || utmContent || utmTerm) {
    const payload: UTMParams = {
      utm_source:   utmSource,
      utm_medium:   utmMedium,
      utm_campaign: utmCampaign,
      utm_content:  utmContent,
      utm_term:     utmTerm,
    }
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload))
    } catch {
      // sessionStorage unavailable (private browsing edge cases)
    }
  }
}

// ------------------------------------------------------------
// getUTMParams
// Returns the stored UTM params for the current session.
// Returns null values if no UTM params were captured.
// ------------------------------------------------------------
export function getUTMParams(): UTMParams {
  const empty: UTMParams = {
    utm_source:   null,
    utm_medium:   null,
    utm_campaign: null,
    utm_content:  null,
    utm_term:     null,
  }

  if (typeof window === 'undefined') return empty

  try {
    const stored = safeParseObject<UTMParams>(sessionStorage.getItem(SESSION_KEY))
    if (!stored) {
      sessionStorage.removeItem(SESSION_KEY)
      return empty
    }
    return { ...empty, ...stored }
  } catch {
    return empty
  }
}

// ------------------------------------------------------------
// clearUTMParams
// Clears stored UTM params (e.g. after attribution is logged)
// ------------------------------------------------------------
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}

// ------------------------------------------------------------
// buildUTMUrl
// Appends UTM params to any URL string
// ------------------------------------------------------------
export function buildUTMUrl(
  baseUrl:  string,
  source:   string,
  medium:   string,
  campaign: string,
  content?: string
): string {
  try {
    const url = new URL(baseUrl)
    url.searchParams.set('utm_source',   source)
    url.searchParams.set('utm_medium',   medium)
    url.searchParams.set('utm_campaign', campaign)
    if (content) url.searchParams.set('utm_content', content)
    return url.toString()
  } catch {
    // If baseUrl is relative, just append manually
    const sep = baseUrl.includes('?') ? '&' : '?'
    let result = `${baseUrl}${sep}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
    if (content) result += `&utm_content=${content}`
    return result
  }
}
