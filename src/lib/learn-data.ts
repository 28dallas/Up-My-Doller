import { Bot, Trader, BlogPost } from '@/types'

// ============================================================
// EDUCATIONAL DATA ADDITIONS
// ============================================================

export type Strategy = {
  slug: string
  name: string
  tagline: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  winRate: string
  riskLevel: 'Low' | 'Medium' | 'High'
  payout: string
  markets: string[]
  summary: string
  description: string[]
  steps: { title: string; body: string }[]
  youtubeId: string
  pros: string[]
  cons: string[]
  martingaleReady: boolean
}

export const STRATEGIES: Strategy[] = [
  {
    slug: 'alembert',
    name: 'Alembert (D\u2019Alembert) Recovery',
    tagline: 'A safer alternative to Martingale — increase your stake by a fixed unit, never double it.',
    difficulty: 'Beginner',
    winRate: '55-65%',
    riskLevel: 'Low',
    payout: '~90%',
    markets: ['Volatility 10', 'Volatility 25'],
    summary:
      'Alembert is a flat-progression recovery strategy. After a loss you increase your stake by one fixed unit; after a win you decrease it by one. It is far less aggressive than Martingale and much safer for beginners.',
    description: [
      'The Alembert (or D\u2019Alembert) strategy is a "flat progression" recovery method. Instead of doubling your stake after every loss like Martingale, you only increase it by a single fixed unit.',
      'For example, with a $1 base stake, after a loss your next stake becomes $2, then $3, $4 and so on. After a win, you step back down by one unit. Because the increase is linear rather than exponential, your risk grows much more slowly.',
      'This makes Alembert significantly less risky than Martingale. The trade-off is that it recovers losses more slowly, so it requires patience and enough trades to smooth out variance.',
      'Alembert pairs best with nearly 50/50 strategies like Over/Under or Even/Odd on low-volatility indices, where your win rate is stable enough for the flat progression to work.',
    ],
    steps: [
      { title: 'Pick a near-50/50 strategy', body: 'Over/Under or Even/Odd on Volatility 10/25 gives the most stable base for Alembert.' },
      { title: 'Set your base unit', body: 'Your base stake is the fixed unit you add or subtract. Start small (e.g. $1).' },
      { title: 'Increase by one unit after a loss', body: 'After each loss, add one unit to your stake: $1 → $2 → $3 → $4.' },
      { title: 'Decrease by one unit after a win', body: 'After each win, step your stake back down by one unit.' },
      { title: 'Cap your maximum stake', body: 'Set a hard ceiling (e.g. 5-7 units) so a long losing streak cannot spiral.' },
    ],
    youtubeId: 'uXlXWFHmXNk',
    pros: ['Much safer than Martingale', 'Linearly increasing risk', 'Beginner friendly', 'Easy to understand and automate'],
    cons: ['Recovers losses more slowly', 'Needs many trades to be effective'],
    martingaleReady: false,
  },
  {
    slug: 'oscars-grind',
    name: 'Oscar\u2019s Grind',
    tagline: 'A conservative progression that grinds out steady profits with minimal risk.',
    difficulty: 'Intermediate',
    winRate: '55-60%',
    riskLevel: 'Low',
    payout: '~90%',
    markets: ['Volatility 10', 'Volatility 25', 'Step Index'],
    summary:
      'Oscar\u2019s Grind is a profit-target progression strategy. You only increase your stake after a win, and you stop increasing once you are in profit for the cycle. It keeps risk low while steadily grinding out gains.',
    description: [
      'Oscar\u2019s Grind is a conservative positive-progression strategy designed to grind out steady, small profits while keeping risk to a minimum.',
      'The core rule: increase your stake by one unit after a win, and keep it the same after a loss. You reset your stake back to the base whenever you reach a target profit for the current cycle (usually one unit).',
      'Because you only ever increase your stake after wins, your risk never compounds on losses. This makes Oscar\u2019s Grind one of the safest recovery strategies available — ideal for traders who prefer slow, consistent gains over aggressive recovery.',
      'It works best on near-50/50 markets with frequent trades, such as Volatility 10 or Step Index, where the grind has enough opportunities to play out.',
    ],
    steps: [
      { title: 'Choose a steady market', body: 'Volatility 10, Volatility 25, or Step Index provide the frequent trades you need.' },
      { title: 'Set your base stake', body: 'Start with a small base stake that represents one unit.' },
      { title: 'Increase only after a win', body: 'After a win, add one unit to your stake. After a loss, keep it the same.' },
      { title: 'Reset on target profit', body: 'Once you reach one unit of profit for the cycle, reset back to the base stake.' },
      { title: 'Set a stop loss', body: 'Always cap your session loss so a long flat streak does not drain your account.' },
    ],
    youtubeId: 'eyz6eexY0KU',
    pros: ['One of the safest progressions', 'Only increases stake after wins', 'Steady, predictable gains', 'Low emotional stress'],
    cons: ['Slow to grow profits', 'Requires patience and volume'],
    martingaleReady: false,
  },
  {
    slug: 'over-under',
    name: 'Over / Under',
    tagline: 'The most beginner-friendly strategy on Deriv — predict whether price ends over or under a barrier.',
    difficulty: 'Beginner',
    winRate: '60-70%',
    riskLevel: 'Low',
    payout: '~95%',
    markets: ['Volatility 10', 'Volatility 25', 'Volatility 50'],
    summary:
      'Over/Under bets on whether the last digit of the price will be over or under a set barrier (usually 5). It is the safest starting point for new traders and pairs perfectly with martingale recovery.',
    description: [
      'Over/Under is one of the most popular strategies on Deriv because of its simplicity and near 50/50 odds. You simply choose whether the last digit of the closing price will land above or below a barrier you set.',
      'The most common setup uses a barrier of 5. This gives almost perfectly even odds, which means with a well-managed martingale recovery system you can achieve win rates of 60-70% even without deep market analysis.',
      'Because Volatility indices run 24/7 and are not affected by economic news, Over/Under on Volatility 10 is widely considered the most predictable starting point for automated bots.',
    ],
    steps: [
      { title: 'Choose your market', body: 'Start with Volatility 10 Index — it has the lowest volatility and is most predictable for this strategy.' },
      { title: 'Set the barrier to 5', body: 'Over or Under 5 gives near 50/50 odds, ideal for a recovery-based system.' },
      { title: 'Start with minimum stake', body: 'Begin with the lowest stake ($0.35 on Deriv) and keep risk under 1-2% of your account.' },
      { title: 'Add martingale recovery', body: 'Set a 1.5x multiplier capped at 5 levels to recover losses gradually.' },
      { title: 'Set take profit & stop loss', body: 'Take profit at 2x your daily target and stop loss at your daily budget.' },
    ],
    youtubeId: 'uXlXWFHmXNk',
    pros: ['Beginner friendly', 'Near 50/50 odds', 'Works great with martingale', 'Runs 24/7 on Volatility indices'],
    cons: ['Lower payout than exact-digit strategies', 'Requires discipline with stake sizing'],
    martingaleReady: true,
  },
  {
    slug: 'rise-fall-trend',
    name: 'Rise / Fall with Trend Filter',
    tagline: 'Trade the direction of the market with a simple moving-average trend filter.',
    difficulty: 'Intermediate',
    winRate: '65-70%',
    riskLevel: 'Medium',
    payout: '~90%',
    markets: ['Volatility 25', 'Volatility 50', 'Forex'],
    summary:
      'Rise/Fall predicts whether the price will be higher or lower than the entry at expiry. Adding a moving-average trend filter significantly boosts accuracy by only taking trades aligned with the trend.',
    description: [
      'Rise/Fall is the classic high/low binary trade. You bet on whether the asset price at expiry will be higher (Rise) or lower (Fall) than the price at purchase.',
      'The key to outperforming the 50/50 coin-flip is a trend filter. A simple moving average tells you the current trend direction — only take Rise trades in uptrends and Fall trades in downtrends.',
      'This strategy works well on both synthetic Volatility indices and real forex pairs, making it one of the most versatile strategies for automated bots.',
    ],
    steps: [
      { title: 'Add a moving average indicator', body: 'Use a 20-50 period moving average to define the trend direction.' },
      { title: 'Confirm the trend', body: 'Only take Rise trades when price is above the MA, Fall trades when below.' },
      { title: 'Choose your expiry', body: 'Shorter expiries (1-5 minutes) work best for scalping the trend.' },
      { title: 'Manage risk', body: 'Skip trades during ranging or choppy markets to avoid false signals.' },
    ],
    youtubeId: 'lpPr4OjEYek',
    pros: ['Higher accuracy than blind Rise/Fall', 'Works on forex and synthetics', 'Clear trend-based rules'],
    cons: ['Can give false signals in ranging markets', 'Requires a bit of chart reading'],
    martingaleReady: true,
  },
  {
    slug: 'even-odd',
    name: 'Even / Odd Digits',
    tagline: 'A simple digit-based strategy with a 50% theoretical win rate and great martingale pairing.',
    difficulty: 'Beginner',
    winRate: '55-62%',
    riskLevel: 'Low',
    payout: '~90%',
    markets: ['Volatility 25', 'Volatility 50'],
    summary:
      'Even/Odd predicts whether the last digit of the closing price will be even or odd. The theoretical win rate is 50%, but with smart stake management and timing, traders report 55-62% win rates.',
    description: [
      'Even/Odd is one of the simplest digit strategies on Deriv. You predict whether the last digit of the closing price will be even or odd.',
      'The theoretical win rate is exactly 50%, making it a pure probability game. However, with careful timing and a martingale-based recovery system, consistency can push effective win rates higher.',
      'It is a favorite for automated bots because the rules are binary and easy to code, and it pairs exceptionally well with recovery strategies.',
    ],
    steps: [
      { title: 'Pick an even/odd market', body: 'Volatility 25 and 50 are popular choices for digit strategies.' },
      { title: 'Choose even or odd', body: 'Predict whether the last digit will be even or odd at expiry.' },
      { title: 'Use small stakes', body: 'Keep stakes small and rely on the recovery system for returns.' },
      { title: 'Cap your martingale', body: 'Limit recovery levels to avoid runaway losses on a long losing streak.' },
    ],
    youtubeId: 'K8mU4XpCzD8',
    pros: ['Simple binary rules', 'Perfect 50% theoretical odds', 'Great martingale pairing'],
    cons: ['No edge without stake management', 'Streaks can occur'],
    martingaleReady: true,
  },
  {
    slug: 'digit-match',
    name: 'Digit Match',
    tagline: 'Predict the exact last digit (0-9) for a 9x payout — high risk, high reward.',
    difficulty: 'Advanced',
    winRate: '~10% per digit',
    riskLevel: 'High',
    payout: '9x stake',
    markets: ['Step Index', 'Volatility 75'],
    summary:
      'Digit Match predicts the exact last digit from 0-9. The payout is 9x your stake, so a single win recovers many losses. It is best used with small stakes and strict risk limits.',
    description: [
      'Digit Match is the highest-reward digit strategy on Deriv. You predict the exact last digit (0-9) of the closing price, and if correct, you win 9x your stake.',
      'The theoretical win rate is just 10%, but the 9x payout means a single win recovers many losses. This makes it a "lottery" style strategy that requires very strict bankroll management.',
      'It works best with the smallest possible stakes and a tight stop loss, because long losing streaks are statistically common.',
    ],
    steps: [
      { title: 'Choose a high-frequency market', body: 'Step Index and Volatility 75 provide frequent ticks for digit trading.' },
      { title: 'Pick your digit', body: 'Select a single digit from 0-9. Some traders use hot/cold digit analysis.' },
      { title: 'Use minimum stake', body: 'Always use the smallest stake — the 9x payout does the heavy lifting.' },
      { title: 'Set a strict stop loss', body: 'Cap your daily loss because losing streaks are common with 10% hit rates.' },
    ],
    youtubeId: 'MbHCAuzm6Eo',
    pros: ['9x payout per win', 'Exciting and fast-paced', 'Single win recovers many losses'],
    cons: ['Only ~10% hit rate', 'High risk of long losing streaks', 'Not for beginners'],
    martingaleReady: false,
  },
  {
    slug: 'touch-no-touch',
    name: 'Touch / No Touch Barriers',
    tagline: 'Set barrier levels and bet on whether price touches them — ideal for low-volatility periods.',
    difficulty: 'Advanced',
    winRate: '60-70%',
    riskLevel: 'Medium',
    payout: '~80-200%',
    markets: ['Boom 500', 'Crash 500', 'Volatility 75'],
    summary:
      'Touch/No Touch sets barrier levels based on recent high/low ranges. Betting on No Touch during low-volatility periods can yield consistent returns with excellent payout potential.',
    description: [
      'Touch/No Touch is a barrier-based strategy. You set one or two barrier levels, and bet on whether the price will touch them before expiry.',
      'The No Touch trade is powerful — during quiet, low-volatility periods, you can set barriers far from the current price and collect consistent payouts as price stays within range.',
      'This strategy is more advanced because picking the right barrier distance requires an understanding of volatility and recent price ranges.',
    ],
    steps: [
      { title: 'Identify the volatility regime', body: 'No Touch works best in quiet, low-volatility periods.' },
      { title: 'Set wide barriers', body: 'Place barriers beyond the recent high/low range to improve No Touch odds.' },
      { title: 'Choose a longer expiry', body: 'Longer expiries give price more time to hit barriers — set accordingly.' },
      { title: 'Watch the payout', body: 'Wider barriers = higher payout but lower probability. Balance them.' },
    ],
    youtubeId: 'eyz6eexY0KU',
    pros: ['High payout potential', 'Excellent in low-volatility markets', 'Flexible barrier settings'],
    cons: ['Advanced concept', 'Barrier distance is tricky to set', 'Can be slow-moving'],
    martingaleReady: false,
  },
]

// ============================================================
// MARKETS GUIDE
// ============================================================

export type DerivMarket = {
  slug: string
  name: string
  icon: string
  volatility: 'Low' | 'Medium' | 'High'
  bestFor: string
  description: string
  beginnerFriendly: boolean
}

export const DERIV_MARKETS: DerivMarket[] = [
  {
    slug: 'volatility-10',
    name: 'Volatility 10 Index',
    icon: '📉',
    volatility: 'Low',
    bestFor: 'Beginners',
    description: 'The lowest-volatility synthetic index. Steady, predictable price action ideal for learning and Over/Under strategies.',
    beginnerFriendly: true,
  },
  {
    slug: 'volatility-25',
    name: 'Volatility 25 Index',
    icon: '📊',
    volatility: 'Medium',
    bestFor: 'Balanced trading',
    description: 'A moderate-volatility synthetic index with good movement for Rise/Fall and Even/Odd strategies without excessive risk.',
    beginnerFriendly: true,
  },
  {
    slug: 'volatility-75',
    name: 'Volatility 75 Index',
    icon: '📈',
    volatility: 'High',
    bestFor: 'Experienced traders',
    description: 'High-volatility synthetic index with fast, large price swings. Best suited to advanced traders who can manage risk.',
    beginnerFriendly: false,
  },
  {
    slug: 'boom-1000',
    name: 'Boom 1000 Index',
    icon: '💥',
    volatility: 'High',
    bestFor: 'Spike trading',
    description: 'Spikes upward on average every ~1000 ticks. Larger spikes but less frequent — good for Rise trades after long quiet periods.',
    beginnerFriendly: false,
  },
  {
    slug: 'crash-1000',
    name: 'Crash 1000 Index',
    icon: '📉',
    volatility: 'High',
    bestFor: 'Spike trading',
    description: 'Spikes downward on average every ~1000 ticks. Pairs with Fall trades after extended climbs.',
    beginnerFriendly: false,
  },
  {
    slug: 'step-index',
    name: 'Step Index',
    icon: '🪜',
    volatility: 'Medium',
    bestFor: 'Digit strategies',
    description: 'Moves in small, steady steps in a single direction. Ideal for Digit Match and high-frequency digit strategies.',
    beginnerFriendly: true,
  },
]

// ============================================================
// TRADING TIMES
// ============================================================

export type TradingWindow = {
  market: string
  bestTimes: string
  timezone: string
  notes: string
}

export const TRADING_TIMES: TradingWindow[] = [
  {
    market: 'Synthetic Indices (Volatility, Boom, Crash)',
    bestTimes: '24/7',
    timezone: 'All timezones',
    notes: 'Synthetic indices run continuously and are not affected by news or market sessions. Any time works — the key is consistency and avoiding overtrading.',
  },
  {
    market: 'Forex (Major Pairs)',
    bestTimes: 'London (8am-12pm) & New York (1pm-4pm GMT) overlap',
    timezone: 'GMT',
    notes: 'The London-New York overlap is the most liquid and volatile period for forex, offering the best price movement for Rise/Fall strategies.',
  },
  {
    market: 'Gold / Commodities',
    bestTimes: 'US session (1pm-5pm GMT)',
    timezone: 'GMT',
    notes: 'Gold and commodities see the most movement during the US session when US economic data is released.',
  },
  {
    market: 'Boom / Crash Indices',
    bestTimes: 'After long quiet periods',
    timezone: 'All timezones',
    notes: 'These spike on average every 500/1000 ticks. The best entry is after a notably long period without a spike — the probability increases the longer you wait.',
  },
]

// ============================================================
// RECOMMENDED BOTS
// ============================================================

export type RecommendedBot = {
  id: string
  name: string
  market: string
  strategy: string
  difficulty: string
  winRate: string
  risk: string
  bestFor: string
  description: string
  youtubeId: string
  featured?: boolean
}

export const RECOMMENDED_BOTS: RecommendedBot[] = [
  {
    id: 'volatility-crusher',
    name: 'Volatility Crusher v3',
    market: 'Volatility 10',
    strategy: 'Over / Under',
    difficulty: 'Beginner',
    winRate: '68%',
    risk: 'Low',
    bestFor: 'Brand-new traders',
    description: 'The perfect first bot. Consistent Over/Under on the lowest-volatility market with a tight stop loss.',
    youtubeId: 'uXlXWFHmXNk',
    featured: true,
  },
  {
    id: 'boom-rider-pro',
    name: 'Boom Rider Pro',
    market: 'Boom 1000',
    strategy: 'Rise / Fall',
    difficulty: 'Intermediate',
    winRate: '72%',
    risk: 'Medium',
    bestFor: 'Traders who can manage larger swings',
    description: 'Rides boom spikes on Boom 1000 with smart entry timing after quiet periods.',
    youtubeId: 'lpPr4OjEYek',
  },
  {
    id: 'even-odd-master',
    name: 'Even Odd Master',
    market: 'Volatility 25',
    strategy: 'Even / Odd',
    difficulty: 'Beginner',
    winRate: '58%',
    risk: 'Low',
    bestFor: 'Martingale fans',
    description: 'Simple Even/Odd with a capped martingale recovery system. Great for testing recovery strategies.',
    youtubeId: 'K8mU4XpCzD8',
  },
  {
    id: 'step-index-scalper',
    name: 'Step Index Scalper',
    market: 'Step Index',
    strategy: 'Digit Match',
    difficulty: 'Advanced',
    winRate: '61%',
    risk: 'Medium',
    bestFor: 'High-frequency traders',
    description: 'Digit-match scalper for Step Index with high trade frequency and small stakes.',
    youtubeId: 'MbHCAuzm6Eo',
  },
  {
    id: 'crash-hunter-elite',
    name: 'Crash Hunter Elite',
    market: 'Crash 500',
    strategy: 'Rise / Fall',
    difficulty: 'Advanced',
    winRate: '65%',
    risk: 'High',
    bestFor: 'Experienced crash traders',
    description: 'Aggressive crash trading bot for traders who understand spike timing and risk.',
    youtubeId: 'eyz6eexY0KU',
  },
]

// ============================================================
// EXTRA BLOG POSTS (beginner-focused)
// ============================================================

export const EXTRA_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Deriv for Beginners: What is Deriv and How Does It Work?',
    slug: 'deriv-for-beginners-guide',
    content: '',
    category: 'tutorial',
    author_id: 'admin',
    published_at: '2024-02-01',
    cover_image: '',
    excerpt: 'A complete plain-language introduction to Deriv — what it is, account types, markets, and how to open your first free account.',
    read_time: 9,
  },
  {
    id: 'b2',
    title: 'The 5 Best Deriv Markets for Beginners (and Which to Avoid)',
    slug: 'best-deriv-markets-for-beginners',
    content: '',
    category: 'strategy',
    author_id: 'admin',
    published_at: '2024-02-05',
    cover_image: '',
    excerpt: 'Not all Deriv markets are created equal for new traders. Here are the safest markets to start with — and the risky ones to avoid.',
    read_time: 7,
  },
  {
    id: 'b3',
    title: 'What is Martingale? A Beginner&apos;s Guide to Recovery Strategies',
    slug: 'what-is-martingale-recovery-strategy',
    content: '',
    category: 'strategy',
    author_id: 'admin',
    published_at: '2024-02-08',
    cover_image: '',
    excerpt: 'Martingale is the most talked-about strategy in automated trading. Learn how it works, the risks, and when to use it responsibly.',
    read_time: 6,
  },
{
    id: 'b4',
    title: 'How to Choose the Right Deriv Trading Bot (Buyer&apos;s Guide)',
    slug: 'how-to-choose-deriv-bot',
    content: '',
    category: 'tutorial',
    author_id: 'admin',
    published_at: '2024-02-12',
    cover_image: '',
    excerpt: 'Win rate, risk level, market, strategy type — learn exactly what to look for when picking a Deriv bot for your goals.',
    read_time: 8,
  },
  {
    id: 'b5',
    title: 'Alembert vs Martingale vs Oscar&apos;s Grind: Which Recovery Strategy is Safest?',
    slug: 'alembert-vs-martingale-vs-oscars-grind',
    content: '',
    category: 'strategy',
    author_id: 'admin',
    published_at: '2024-02-15',
    cover_image: '',
    excerpt: 'Martingale doubles your stake after every loss — but is it the best recovery system? Compare Alembert and Oscar&apos;s Grind, the safer alternatives that many professional traders prefer.',
    read_time: 9,
  },
  {
    id: 'b6',
    title: 'What is the Alembert Strategy? A Beginner&apos;s Guide to Safer Recovery',
    slug: 'what-is-alembert-strategy',
    content: '',
    category: 'strategy',
    author_id: 'admin',
    published_at: '2024-02-18',
    cover_image: '',
    excerpt: 'Alembert is a flat-progression recovery strategy that increases your stake by a fixed unit — never doubling it. Learn how it works and why it is much safer than Martingale.',
    read_time: 7,
  },
]

// ============================================================
// REFERRAL PROGRAM
// ============================================================

export const REFERRAL_TIERS = [
  {
    name: 'Invite 1 Friend',
    reward: 'Free Signal Alerts (1 month)',
    desc: 'Get 1 month of Premium Telegram signal alerts free when your first referral opens a Deriv account.',
    icon: '📡',
  },
  {
    name: 'Invite 2 Friends',
    reward: 'FREE Personalized AI Bot',
    desc: 'Unlock a custom AI-tuned bot built around your preferred market and risk level — our most popular reward.',
    icon: '🤖',
    featured: true,
  },
  {
    name: 'Invite 5 Friends',
    reward: 'Free Pro Plan (1 month)',
    desc: 'Enjoy a full month of the Pro plan with unlimited bot downloads, copy trading, and advanced strategies.',
    icon: '🚀',
  },
  {
    name: 'Invite 10 Friends',
    reward: 'Free Elite Plan (1 month)',
    desc: 'Unlock the Elite plan with mentorship, VIP signals, custom bots, and everything Pro offers.',
    icon: '👑',
  },
]
