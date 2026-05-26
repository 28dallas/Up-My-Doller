-- ============================================================
-- PIPS DOLLAR PRINTER — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ------------------------------------------------------------
-- EXTENSIONS
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- ------------------------------------------------------------
-- profiles
-- Extended user data linked to auth.users
-- Auto-populated via trigger on signup
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id                    uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name             text,
  country               text DEFAULT 'Kenya',
  phone_number          text,
  plan                  text DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'elite')),
  plan_expires_at       timestamptz,
  telegram_username     text,
  notifications_config  jsonb DEFAULT '{}'::jsonb,
  avatar_color          text DEFAULT '#16a34a',
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- saved_bots
-- Bots created by users in the no-code bot builder
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_bots (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name        text NOT NULL,
  config      jsonb NOT NULL,
  market      text,
  trade_type  text,
  is_active   boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- bot_downloads
-- Tracks every bot XML download per user
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bot_downloads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users ON DELETE CASCADE,
  bot_id        text,
  bot_name      text NOT NULL,
  bot_tier      text DEFAULT 'free' CHECK (bot_tier IN ('free', 'pro')),
  downloaded_at timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- copied_traders
-- Active copy-trading relationships
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.copied_traders (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  trader_id           text NOT NULL,
  trader_name         text NOT NULL,
  stake_per_trade     numeric NOT NULL CHECK (stake_per_trade > 0),
  daily_loss_limit    numeric CHECK (daily_loss_limit > 0),
  max_trades_per_day  integer CHECK (max_trades_per_day > 0),
  is_active           boolean DEFAULT true,
  started_at          timestamptz DEFAULT now(),
  stopped_at          timestamptz
);

-- ------------------------------------------------------------
-- affiliate_clicks
-- Tracks clicks on Deriv affiliate links with UTM attribution
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users ON DELETE SET NULL,
  source_element  text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_content     text,
  page_url        text,
  clicked_at      timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- email_subscribers
-- Exit-intent popup + newsletter signups
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text UNIQUE NOT NULL,
  source      text DEFAULT 'exit_popup',
  utm_source  text,
  utm_medium  text,
  utm_campaign text,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- contact_messages
-- Contact form submissions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text,
  email       text,
  subject     text,
  message     text,
  is_read     boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- ------------------------------------------------------------
-- handle_new_user()
-- Auto-creates a profile row when a new user signs up
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, country)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'country', 'Kenya')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------
-- update_updated_at()
-- Keeps updated_at current on any row update
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Auto-update updated_at on profiles
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_bots       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_downloads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copied_traders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- profiles policies
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "own_profile_select" ON public.profiles;
CREATE POLICY "own_profile_select"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "own_profile_insert" ON public.profiles;
CREATE POLICY "own_profile_insert"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "own_profile_update" ON public.profiles;
CREATE POLICY "own_profile_update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "own_profile_delete" ON public.profiles;
CREATE POLICY "own_profile_delete"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- ------------------------------------------------------------
-- saved_bots policies
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "own_bots" ON public.saved_bots;
CREATE POLICY "own_bots"
  ON public.saved_bots FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------
-- bot_downloads policies
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "own_downloads_select" ON public.bot_downloads;
CREATE POLICY "own_downloads_select"
  ON public.bot_downloads FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "own_downloads_insert" ON public.bot_downloads;
CREATE POLICY "own_downloads_insert"
  ON public.bot_downloads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------
-- copied_traders policies
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "own_copied" ON public.copied_traders;
CREATE POLICY "own_copied"
  ON public.copied_traders FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------
-- affiliate_clicks policies
-- Anyone (including anonymous) can insert a click
-- Users can only read their own clicks
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "insert_clicks" ON public.affiliate_clicks;
CREATE POLICY "insert_clicks"
  ON public.affiliate_clicks FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "own_clicks_select" ON public.affiliate_clicks;
CREATE POLICY "own_clicks_select"
  ON public.affiliate_clicks FOR SELECT
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- email_subscribers policies
-- Anyone can subscribe; no reads via client
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "insert_subscribers" ON public.email_subscribers;
CREATE POLICY "insert_subscribers"
  ON public.email_subscribers FOR INSERT
  WITH CHECK (true);

-- ------------------------------------------------------------
-- contact_messages policies
-- Anyone can submit; no reads via client
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "insert_contact" ON public.contact_messages;
CREATE POLICY "insert_contact"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_saved_bots_user_id       ON public.saved_bots(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_downloads_user_id    ON public.bot_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_copied_traders_user_id   ON public.copied_traders(user_id);
CREATE INDEX IF NOT EXISTS idx_copied_traders_active    ON public.copied_traders(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_user_id ON public.affiliate_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email  ON public.email_subscribers(email);

-- ============================================================
-- DONE
-- ============================================================
-- After running this schema:
-- 1. Enable Google OAuth in Supabase Auth → Providers
-- 2. Set your Site URL in Supabase Auth → URL Configuration
-- 3. Add redirect URLs: https://yourdomain.com/auth/callback
-- ============================================================
