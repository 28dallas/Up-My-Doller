# TODO - Auth (Supabase) + Dashboard wiring

## Step 1: Repo discovery (done)
- Identified current auth pages (`src/app/auth/login/page.tsx`, `src/app/auth/signup/page.tsx`).
- Identified placeholders component (`src/components/shared/PlaceholderPage.tsx`).
- Legal pages (disclaimer/privacy/terms/cookies) already contain real content.

## Step 2: Fix tooling limitation
- The `search_files` tool currently fails due to missing `ripgrep` binary.
- Workaround: use `list_files` + `read_file` to locate PlaceholderPage usage and placeholder routes.

## Step 3: Auth wiring (Supabase)
- Add server-safe Supabase auth helpers (session retrieval).
- Add route protection for dashboard routes.
- Ensure login/signup pages properly set session and redirect.

## Step 4: Dashboard sidebar navigation
- Create `src/components/dashboard/Sidebar.tsx`.
- Update `src/app/dashboard/layout.tsx` to render Sidebar + content area.

## Step 5: Replace exactly 9 PlaceholderPage pages
- Identify the 9 routes that still render `PlaceholderPage`.
- Replace each with real content components.

## Step 6: Dynamic detail pages (Supabase-backed)
- Update `src/app/blog/[slug]/page.tsx` to fetch from Supabase.
- Update `src/app/copy-trading/[traderId]/page.tsx` to fetch from Supabase.

## Step 7: Testing
- `npm run lint`
- `npm run build`
- Manual route checks: `/dashboard` redirect, blog slug, copy-trading traderId, sidebar links.

