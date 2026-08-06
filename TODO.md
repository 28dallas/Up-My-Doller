# TODO: Deriv Affiliate Educational Hub Transformation

## Phase 1 - Shared Components
- [x] Create `src/components/learn/InfoCard.tsx`
- [x] Create `src/components/learn/StepGuide.tsx`
- [x] Create `src/components/learn/YouTubeEmbed.tsx`
- [x] Create `src/components/learn/EducationalCTA.tsx`
- [x] Create `src/components/learn/RiskCalculator.tsx`
- [x] Create `src/components/learn/RelatedTools.tsx`
- [x] Create `src/components/learn/AffiliateDisclosure.tsx`
- [x] Create `src/components/learn/Newsletter.tsx`
- [x] Create `src/components/learn/ComparisonPage.tsx`

## Phase 2 - Data Layer
- [x] Create `src/lib/learn-data.ts`
- [x] Create `src/lib/comparison-data.ts`

## Phase 3 - New Pages
- [x] Create `/learn` - `src/app/learn/page.tsx`
- [x] Create `/learn/deriv-basics` - `src/app/learn/deriv-basics/page.tsx`
- [x] Create `/strategies` - `src/app/strategies/page.tsx`
- [x] Create `/strategies/[slug]` - `src/app/strategies/[slug]/page.tsx`
- [x] Create `/tools/risk-calculator` - `src/app/tools/risk-calculator/page.tsx`
- [x] Create `/tools/trading-times` - `src/app/tools/trading-times/page.tsx`
- [x] Create `/bots/recommended` - `src/app/bots/recommended/page.tsx`
- [x] Create `/refer` - `src/app/refer/page.tsx`
- [x] Create `/comparisons/deriv-vs-pocketoption` - SEO comparison page
- [x] Create `/comparisons/deriv-vs-binomo` - SEO comparison page
- [x] Create `/comparisons/deriv-vs-olymptrade` - SEO comparison page

## Phase 4 - Upgrade Existing Pages
- [x] Update `src/app/layout.tsx` - educational metadata
- [x] Update `src/components/layout/Navbar.tsx` - add Learn/Strategies/Tools
- [x] Update `src/components/layout/Footer.tsx` - add educational links
- [x] Update `src/app/page.tsx` - add StartLearningSection
- [x] Update `src/components/sections/HeroSection.tsx` - learning path CTA
- [x] Update `src/app/bots/page.tsx` - educational content
- [x] Update `src/app/blog/page.tsx` - beginner posts
- [x] Update `src/app/affiliate/page.tsx` - referral upgrade
- [x] Update `src/app/sitemap.ts` - new routes

## Phase 5 - Verification
- [x] `npm run build` — compiled successfully, types passed, 52 static pages generated
- [x] Educational pages all generate without errors
- [x] Pre-existing Supabase env error on `/auth/login` & `/auth/signup` (needs `.env.local`, unrelated to this task)
