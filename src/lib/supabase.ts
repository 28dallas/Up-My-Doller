// ============================================================
// PIPS DOLLAR PRINTER — Supabase Client
// Typed client with all table definitions and helper functions
// ============================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ------------------------------------------------------------
// Database type definitions (mirrors supabase/schema.sql)
// ------------------------------------------------------------
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:                   string
          full_name:            string | null
          country:              string
          phone_number:         string | null
          plan:                 'free' | 'pro' | 'elite'
          plan_expires_at:      string | null
          telegram_username:    string | null
          notifications_config: Record<string, boolean>
          avatar_color:         string
          created_at:           string
          updated_at:           string
        }
        Insert: {
          id:                   string
          full_name?:           string | null
          country?:             string
          phone_number?:        string | null
          plan?:                'free' | 'pro' | 'elite'
          plan_expires_at?:     string | null
          telegram_username?:   string | null
          notifications_config?: Record<string, boolean>
          avatar_color?:        string
        }
        Update: {
          full_name?:           string | null
          country?:             string
          phone_number?:        string | null
          plan?:                'free' | 'pro' | 'elite'
          plan_expires_at?:     string | null
          telegram_username?:   string | null
          notifications_config?: Record<string, boolean>
          avatar_color?:        string
        }
      }
      saved_bots: {
        Row: {
          id:         string
          user_id:    string
          name:       string
          config:     Record<string, unknown>
          market:     string | null
          trade_type: string | null
          is_active:  boolean
          created_at: string
        }
        Insert: {
          id?:        string
          user_id:    string
          name:       string
          config:     Record<string, unknown>
          market?:    string | null
          trade_type?: string | null
          is_active?: boolean
        }
        Update: {
          name?:       string
          config?:     Record<string, unknown>
          market?:     string | null
          trade_type?: string | null
          is_active?:  boolean
        }
      }
      bot_downloads: {
        Row: {
          id:            string
          user_id:       string | null
          bot_id:        string | null
          bot_name:      string
          bot_tier:      'free' | 'pro'
          downloaded_at: string
        }
        Insert: {
          id?:           string
          user_id?:      string | null
          bot_id?:       string | null
          bot_name:      string
          bot_tier?:     'free' | 'pro'
        }
        Update: never
      }
      copied_traders: {
        Row: {
          id:                 string
          user_id:            string
          trader_id:          string
          trader_name:        string
          stake_per_trade:    number
          daily_loss_limit:   number | null
          max_trades_per_day: number | null
          is_active:          boolean
          started_at:         string
          stopped_at:         string | null
        }
        Insert: {
          id?:                string
          user_id:            string
          trader_id:          string
          trader_name:        string
          stake_per_trade:    number
          daily_loss_limit?:  number | null
          max_trades_per_day?: number | null
          is_active?:         boolean
        }
        Update: {
          stake_per_trade?:    number
          daily_loss_limit?:   number | null
          max_trades_per_day?: number | null
          is_active?:          boolean
          stopped_at?:         string | null
        }
      }
      affiliate_clicks: {
        Row: {
          id:             string
          user_id:        string | null
          source_element: string | null
          utm_source:     string | null
          utm_medium:     string | null
          utm_campaign:   string | null
          utm_content:    string | null
          page_url:       string | null
          clicked_at:     string
        }
        Insert: {
          id?:             string
          user_id?:        string | null
          source_element?: string | null
          utm_source?:     string | null
          utm_medium?:     string | null
          utm_campaign?:   string | null
          utm_content?:    string | null
          page_url?:       string | null
        }
        Update: never
      }
      email_subscribers: {
        Row: {
          id:           string
          email:        string
          source:       string | null
          utm_source:   string | null
          utm_medium:   string | null
          utm_campaign: string | null
          is_active:    boolean
          created_at:   string
        }
        Insert: {
          id?:           string
          email:         string
          source?:       string | null
          utm_source?:   string | null
          utm_medium?:   string | null
          utm_campaign?: string | null
          is_active?:    boolean
        }
        Update: {
          is_active?: boolean
        }
      }
      contact_messages: {
        Row: {
          id:         string
          name:       string | null
          email:      string | null
          subject:    string | null
          message:    string | null
          is_read:    boolean
          created_at: string
        }
        Insert: {
          id?:      string
          name?:    string | null
          email?:   string | null
          subject?: string | null
          message?: string | null
          is_read?: boolean
        }
        Update: {
          is_read?: boolean
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// ------------------------------------------------------------
// Environment variables
// ------------------------------------------------------------
const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL     ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn(
      '[Pips Dollar Printer] Supabase env vars not set. ' +
      'Copy .env.example to .env.local and fill in your values.'
    )
  }
}

// ------------------------------------------------------------
// Browser client (singleton — safe to import in client components)
// ------------------------------------------------------------
let browserClient: SupabaseClient<any> | null = null

export function getSupabaseBrowserClient(): SupabaseClient<any> {
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession:    true,
        autoRefreshToken:  true,
        detectSessionInUrl: true,
      },
    })
  }
  return browserClient
}

// Default export for convenience
export const supabase = getSupabaseBrowserClient()

// ------------------------------------------------------------
// Server client (for Server Components / Route Handlers)
// Creates a new instance each call — do not use in client components
// ------------------------------------------------------------
export function getSupabaseServerClient(): SupabaseClient<any> {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY ?? supabaseAnonKey
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession:   false,
      autoRefreshToken: false,
    },
  })
}

// ============================================================
// Helper functions
// ============================================================

// ------------------------------------------------------------
// getProfile — fetch the current user's profile row
// ------------------------------------------------------------
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[getProfile]', error.message)
    return null
  }
  return data
}

// ------------------------------------------------------------
// updateProfile — update profile fields
// ------------------------------------------------------------
export async function updateProfile(
  userId: string,
  updates: Database['public']['Tables']['profiles']['Update']
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('[updateProfile]', error.message)
    return { data: null, error }
  }
  return { data, error: null }
}

// ------------------------------------------------------------
// getSavedBots — fetch all bots saved by a user
// ------------------------------------------------------------
export async function getSavedBots(userId: string) {
  const { data, error } = await supabase
    .from('saved_bots')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getSavedBots]', error.message)
    return []
  }
  return data ?? []
}

// ------------------------------------------------------------
// saveBot — insert a new bot config
// ------------------------------------------------------------
export async function saveBot(
  userId: string,
  name:   string,
  config: Record<string, unknown>,
  market?: string,
  tradeType?: string
) {
  const { data, error } = await supabase
    .from('saved_bots')
    .insert({
      user_id:    userId,
      name,
      config,
      market:     market     ?? null,
      trade_type: tradeType  ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error('[saveBot]', error.message)
    return { data: null, error }
  }
  return { data, error: null }
}

// ------------------------------------------------------------
// logBotDownload — record a bot XML download
// ------------------------------------------------------------
export async function logBotDownload(
  userId:  string | null,
  botId:   string,
  botName: string,
  botTier: 'free' | 'pro' = 'free'
) {
  const { error } = await supabase
    .from('bot_downloads')
    .insert({ user_id: userId, bot_id: botId, bot_name: botName, bot_tier: botTier })

  if (error) console.error('[logBotDownload]', error.message)
}

// ------------------------------------------------------------
// getCopiedTraders — fetch active copied traders for a user
// ------------------------------------------------------------
export async function getCopiedTraders(userId: string) {
  const { data, error } = await supabase
    .from('copied_traders')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('started_at', { ascending: false })

  if (error) {
    console.error('[getCopiedTraders]', error.message)
    return []
  }
  return data ?? []
}

// ------------------------------------------------------------
// startCopyingTrader — insert a new copy relationship
// ------------------------------------------------------------
export async function startCopyingTrader(
  userId:           string,
  traderId:         string,
  traderName:       string,
  stakePerTrade:    number,
  dailyLossLimit?:  number,
  maxTradesPerDay?: number
) {
  const { data, error } = await supabase
    .from('copied_traders')
    .insert({
      user_id:            userId,
      trader_id:          traderId,
      trader_name:        traderName,
      stake_per_trade:    stakePerTrade,
      daily_loss_limit:   dailyLossLimit  ?? null,
      max_trades_per_day: maxTradesPerDay ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error('[startCopyingTrader]', error.message)
    return { data: null, error }
  }
  return { data, error: null }
}

// ------------------------------------------------------------
// stopCopyingTrader — deactivate a copy relationship
// ------------------------------------------------------------
export async function stopCopyingTrader(id: string) {
  const { error } = await supabase
    .from('copied_traders')
    .update({ is_active: false, stopped_at: new Date().toISOString() })
    .eq('id', id)

  if (error) console.error('[stopCopyingTrader]', error.message)
  return !error
}

// ------------------------------------------------------------
// logAffiliateClick — record a Deriv affiliate link click
// ------------------------------------------------------------
export async function logAffiliateClick(params: {
  userId?:        string | null
  sourceElement:  string
  utmSource?:     string | null
  utmMedium?:     string | null
  utmCampaign?:   string | null
  utmContent?:    string | null
  pageUrl?:       string
}) {
  const { error } = await supabase
    .from('affiliate_clicks')
    .insert({
      user_id:        params.userId        ?? null,
      source_element: params.sourceElement,
      utm_source:     params.utmSource     ?? null,
      utm_medium:     params.utmMedium     ?? null,
      utm_campaign:   params.utmCampaign   ?? null,
      utm_content:    params.utmContent    ?? null,
      page_url:       params.pageUrl       ?? (typeof window !== 'undefined' ? window.location.href : null),
    })

  if (error) console.error('[logAffiliateClick]', error.message)
}

// ------------------------------------------------------------
// subscribeEmail — add email to subscribers list
// ------------------------------------------------------------
export async function subscribeEmail(
  email:       string,
  source?:     string,
  utmSource?:  string,
  utmMedium?:  string,
  utmCampaign?: string
) {
  const { error } = await supabase
    .from('email_subscribers')
    .insert({
      email,
      source:       source      ?? 'exit_popup',
      utm_source:   utmSource   ?? null,
      utm_medium:   utmMedium   ?? null,
      utm_campaign: utmCampaign ?? null,
    })

  // Ignore duplicate email errors (code 23505)
  if (error && !error.message.includes('duplicate')) {
    console.error('[subscribeEmail]', error.message)
    return false
  }
  return true
}

// ------------------------------------------------------------
// submitContactMessage — save a contact form submission
// ------------------------------------------------------------
export async function submitContactMessage(
  name:    string,
  email:   string,
  subject: string,
  message: string
) {
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, subject, message })

  if (error) {
    console.error('[submitContactMessage]', error.message)
    return false
  }
  return true
}

// ------------------------------------------------------------
// getCurrentUser — get the authenticated user (client-side)
// ------------------------------------------------------------
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return null
  return user
}

// ------------------------------------------------------------
// signOut — sign out and clear session
// ------------------------------------------------------------
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('[signOut]', error.message)
  return !error
}
