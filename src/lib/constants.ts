const affiliateToken = process.env.NEXT_PUBLIC_DERIV_AFFILIATE_TOKEN || 'FA33FFDD-3AFC-47A5-BDD5-E838068CEE7A'
const campaign = process.env.NEXT_PUBLIC_DERIV_CAMPAIGN || 'dynamicworks'

export const DERIV_APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID || ''
export const DERIV_AFFILIATE_TOKEN = affiliateToken
export const DERIV_CAMPAIGN = campaign
// The canonical partner link for every new-account CTA on this site.
export const DERIV_AFFILIATE_LINK = process.env.NEXT_PUBLIC_DERIV_AFFILIATE_LINK ||
  'https://deriv.partners/rx?sidc=FA33FFDD-3AFC-47A5-BDD5-E838068CEE7A&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU334550'
export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/TRENDIF'
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/254107646264'

export function getDerivOAuthUrl(origin: string) {
  if (!DERIV_APP_ID) return null
  const url = new URL('https://oauth.deriv.com/oauth2/authorize')
  url.searchParams.set('app_id', DERIV_APP_ID)
  url.searchParams.set('affiliate_token', DERIV_AFFILIATE_TOKEN)
  url.searchParams.set('utm_campaign', DERIV_CAMPAIGN)
  url.searchParams.set('redirect_uri', `${origin}/auth/deriv/callback`)
  return url.toString()
}
