// ============================================================
// PIPS DOLLAR PRINTER — Bot Library Data
// 20 bots: 14 free + 6 pro, covering all 9 symbols
// ============================================================

export interface BotConfigData {
  stake:            number
  duration:         number
  durationUnit:     'ticks' | 'minutes'
  martingale:       boolean
  martingaleFactor?: number
  maxStakeCap?:     number
  takeProfit:       number
  stopLoss:         number
  maxTrades:        number
}

export interface Bot {
  id:           string
  name:         string
  market:       string
  marketSymbol: string
  category:     'volatility' | 'boom-crash' | 'step'
  winRate:      number
  riskLevel:    'Low' | 'Medium' | 'High'
  tradeType:    'Rise/Fall' | 'Over/Under' | 'Even/Odd' | 'Digit Match'
  downloads:    number
  description:  string
  tier:         'free' | 'pro'
  tags:         string[]
  config:       BotConfigData
}

export const bots: Bot[] = [
  // ──────────────────────────────────────────────
  // VOLATILITY BOTS
  // ──────────────────────────────────────────────
  {
    id:           'v75-crusher',
    name:         'Volatility Crusher',
    market:       'Volatility 75 Index',
    marketSymbol: 'V75',
    category:     'volatility',
    winRate:      67,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    7842,
    description:  'Trend-following bot for V75 using EMA crossover logic with martingale recovery.',
    tier:         'free',
    tags:         ['trending', 'ema', 'martingale', 'v75'],
    config: {
      stake:           200,
      duration:        5,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2,
      maxStakeCap:     3200,
      takeProfit:      1500,
      stopLoss:        800,
      maxTrades:       50,
    },
  },
  {
    id:           'v10-scalper',
    name:         'V10 Micro Scalper',
    market:       'Volatility 10 Index',
    marketSymbol: 'V10',
    category:     'volatility',
    winRate:      62,
    riskLevel:    'Low',
    tradeType:    'Rise/Fall',
    downloads:    5231,
    description:  'Low-risk scalping bot for V10. Small consistent gains with tight stop loss.',
    tier:         'free',
    tags:         ['scalping', 'low-risk', 'v10', 'beginner'],
    config: {
      stake:        100,
      duration:     3,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   500,
      stopLoss:     300,
      maxTrades:    100,
    },
  },
  {
    id:           'v25-steady',
    name:         'V25 Steady Grinder',
    market:       'Volatility 25 Index',
    marketSymbol: 'V25',
    category:     'volatility',
    winRate:      64,
    riskLevel:    'Low',
    tradeType:    'Rise/Fall',
    downloads:    4108,
    description:  'Consistent low-volatility strategy for V25. Ideal for beginners building confidence.',
    tier:         'free',
    tags:         ['steady', 'beginner', 'v25', 'low-risk'],
    config: {
      stake:        150,
      duration:     5,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   600,
      stopLoss:     400,
      maxTrades:    80,
    },
  },
  {
    id:           'v100-rocket',
    name:         'V100 Rocket Rider',
    market:       'Volatility 100 Index',
    marketSymbol: 'V100',
    category:     'volatility',
    winRate:      58,
    riskLevel:    'High',
    tradeType:    'Rise/Fall',
    downloads:    3654,
    description:  'High-volatility momentum bot for V100. High risk, high reward — not for beginners.',
    tier:         'free',
    tags:         ['momentum', 'high-risk', 'v100', 'advanced'],
    config: {
      stake:           300,
      duration:        3,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2.5,
      maxStakeCap:     4800,
      takeProfit:      2000,
      stopLoss:        1000,
      maxTrades:       30,
    },
  },
  {
    id:           'v75-digit-even',
    name:         'V75 Even/Odd Oracle',
    market:       'Volatility 75 Index',
    marketSymbol: 'V75',
    category:     'volatility',
    winRate:      72,
    riskLevel:    'Low',
    tradeType:    'Even/Odd',
    downloads:    6120,
    description:  'Digit-based even/odd strategy for V75. Near 50/50 odds with slight statistical edge.',
    tier:         'free',
    tags:         ['digit', 'even-odd', 'v75', 'statistical'],
    config: {
      stake:        200,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   800,
      stopLoss:     500,
      maxTrades:    200,
    },
  },
  {
    id:           'v10-over-under',
    name:         'V10 Over/Under Pro',
    market:       'Volatility 10 Index',
    marketSymbol: 'V10',
    category:     'volatility',
    winRate:      68,
    riskLevel:    'Low',
    tradeType:    'Over/Under',
    downloads:    2987,
    description:  'Over/Under digit strategy for V10. Targets last digit above or below 5.',
    tier:         'free',
    tags:         ['digit', 'over-under', 'v10', 'low-risk'],
    config: {
      stake:        100,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   400,
      stopLoss:     250,
      maxTrades:    150,
    },
  },
  {
    id:           'v75-pro-trend',
    name:         'V75 Pro Trend Engine',
    market:       'Volatility 75 Index',
    marketSymbol: 'V75',
    category:     'volatility',
    winRate:      74,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    1203,
    description:  'Advanced multi-indicator trend engine for V75. Uses RSI + EMA confluence for high-accuracy entries.',
    tier:         'pro',
    tags:         ['pro', 'rsi', 'ema', 'v75', 'advanced'],
    config: {
      stake:           250,
      duration:        5,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 1.8,
      maxStakeCap:     2000,
      takeProfit:      2500,
      stopLoss:        1000,
      maxTrades:       60,
    },
  },
  {
    id:           'v100-digit-match',
    name:         'V100 Digit Sniper',
    market:       'Volatility 100 Index',
    marketSymbol: 'V100',
    category:     'volatility',
    winRate:      52,
    riskLevel:    'High',
    tradeType:    'Digit Match',
    downloads:    891,
    description:  'Pro digit match strategy for V100. High payout per win compensates for lower frequency.',
    tier:         'pro',
    tags:         ['pro', 'digit', 'match', 'v100', 'high-payout'],
    config: {
      stake:           500,
      duration:        1,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 3,
      maxStakeCap:     8000,
      takeProfit:      3000,
      stopLoss:        1500,
      maxTrades:       40,
    },
  },

  // ──────────────────────────────────────────────
  // BOOM & CRASH BOTS
  // ──────────────────────────────────────────────
  {
    id:           'boom500-spike-rider',
    name:         'Boom 500 Spike Rider',
    market:       'Boom 500 Index',
    marketSymbol: 'BOOM500',
    category:     'boom-crash',
    winRate:      61,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    5876,
    description:  'Catches upward spike events on Boom 500. Enters CALL just before expected spike zone.',
    tier:         'free',
    tags:         ['boom', 'spike', 'boom500', 'momentum'],
    config: {
      stake:        200,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   1000,
      stopLoss:     600,
      maxTrades:    40,
    },
  },
  {
    id:           'crash500-dip-catcher',
    name:         'Crash 500 Dip Catcher',
    market:       'Crash 500 Index',
    marketSymbol: 'CRASH500',
    category:     'boom-crash',
    winRate:      59,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    4932,
    description:  'Enters PUT positions ahead of crash events on Crash 500. Rides the downward spike.',
    tier:         'free',
    tags:         ['crash', 'spike', 'crash500', 'put'],
    config: {
      stake:        200,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   1000,
      stopLoss:     600,
      maxTrades:    40,
    },
  },
  {
    id:           'boom1000-patient',
    name:         'Boom 1000 Patient Hunter',
    market:       'Boom 1000 Index',
    marketSymbol: 'BOOM1000',
    category:     'boom-crash',
    winRate:      63,
    riskLevel:    'Low',
    tradeType:    'Rise/Fall',
    downloads:    3201,
    description:  'Waits for optimal entry on Boom 1000 before the spike. Lower frequency, higher accuracy.',
    tier:         'free',
    tags:         ['boom', 'boom1000', 'patient', 'low-frequency'],
    config: {
      stake:        300,
      duration:     2,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   1200,
      stopLoss:     700,
      maxTrades:    25,
    },
  },
  {
    id:           'crash1000-sniper',
    name:         'Crash 1000 Sniper',
    market:       'Crash 1000 Index',
    marketSymbol: 'CRASH1000',
    category:     'boom-crash',
    winRate:      60,
    riskLevel:    'Low',
    tradeType:    'Rise/Fall',
    downloads:    2788,
    description:  'Precision crash event detection for Crash 1000. Fewer trades, better entries.',
    tier:         'free',
    tags:         ['crash', 'crash1000', 'sniper', 'precision'],
    config: {
      stake:        300,
      duration:     2,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   1200,
      stopLoss:     700,
      maxTrades:    25,
    },
  },
  {
    id:           'boom-crash-combo',
    name:         'Boom & Crash Combo Pro',
    market:       'Boom 500 Index',
    marketSymbol: 'BOOM500',
    category:     'boom-crash',
    winRate:      69,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    987,
    description:  'Pro strategy trading both Boom and Crash indices simultaneously. Hedged approach for consistent returns.',
    tier:         'pro',
    tags:         ['pro', 'boom', 'crash', 'hedged', 'combo'],
    config: {
      stake:           400,
      duration:        1,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2,
      maxStakeCap:     6400,
      takeProfit:      3000,
      stopLoss:        1500,
      maxTrades:       50,
    },
  },

  // ──────────────────────────────────────────────
  // STEP INDEX BOTS
  // ──────────────────────────────────────────────
  {
    id:           'step-even-odd',
    name:         'Step Index Even/Odd',
    market:       'Step Index',
    marketSymbol: 'STEP',
    category:     'step',
    winRate:      71,
    riskLevel:    'Low',
    tradeType:    'Even/Odd',
    downloads:    8012,
    description:  'Most popular Step Index bot. Exploits the fixed-increment nature of Step for even/odd predictions.',
    tier:         'free',
    tags:         ['step', 'even-odd', 'beginner', 'popular'],
    config: {
      stake:        100,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   500,
      stopLoss:     300,
      maxTrades:    200,
    },
  },
  {
    id:           'step-over-under',
    name:         'Step Index Over/Under',
    market:       'Step Index',
    marketSymbol: 'STEP',
    category:     'step',
    winRate:      68,
    riskLevel:    'Low',
    tradeType:    'Over/Under',
    downloads:    6543,
    description:  'Over/Under digit strategy optimised for Step Index fixed increments. Very consistent.',
    tier:         'free',
    tags:         ['step', 'over-under', 'consistent', 'low-risk'],
    config: {
      stake:        100,
      duration:     1,
      durationUnit: 'ticks',
      martingale:   false,
      takeProfit:   400,
      stopLoss:     250,
      maxTrades:    200,
    },
  },
  {
    id:           'step-martingale',
    name:         'Step Index Martingale',
    market:       'Step Index',
    marketSymbol: 'STEP',
    category:     'step',
    winRate:      65,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    3421,
    description:  'Martingale recovery system for Step Index. Recovers losses quickly due to fixed price movement.',
    tier:         'free',
    tags:         ['step', 'martingale', 'recovery', 'medium-risk'],
    config: {
      stake:           100,
      duration:        1,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2,
      maxStakeCap:     1600,
      takeProfit:      800,
      stopLoss:        500,
      maxTrades:       100,
    },
  },
  {
    id:           'step-digit-match',
    name:         'Step Digit Match Pro',
    market:       'Step Index',
    marketSymbol: 'STEP',
    category:     'step',
    winRate:      54,
    riskLevel:    'High',
    tradeType:    'Digit Match',
    downloads:    712,
    description:  'Pro digit match for Step Index. High payout ratio compensates for lower win rate.',
    tier:         'pro',
    tags:         ['pro', 'step', 'digit', 'match', 'high-payout'],
    config: {
      stake:           300,
      duration:        1,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2.5,
      maxStakeCap:     4800,
      takeProfit:      2000,
      stopLoss:        1000,
      maxTrades:       60,
    },
  },
  {
    id:           'v25-pro-scalper',
    name:         'V25 Pro Scalper Elite',
    market:       'Volatility 25 Index',
    marketSymbol: 'V25',
    category:     'volatility',
    winRate:      73,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    1456,
    description:  'Elite scalping system for V25 with dynamic stake sizing and multi-timeframe confirmation.',
    tier:         'pro',
    tags:         ['pro', 'scalping', 'v25', 'elite', 'dynamic'],
    config: {
      stake:           200,
      duration:        3,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 1.5,
      maxStakeCap:     1600,
      takeProfit:      2000,
      stopLoss:        800,
      maxTrades:       80,
    },
  },
  {
    id:           'boom500-pro-spike',
    name:         'Boom 500 Spike Master Pro',
    market:       'Boom 500 Index',
    marketSymbol: 'BOOM500',
    category:     'boom-crash',
    winRate:      71,
    riskLevel:    'Medium',
    tradeType:    'Rise/Fall',
    downloads:    1089,
    description:  'Pro-grade spike detection for Boom 500 using tick pattern analysis. Highest accuracy Boom bot.',
    tier:         'pro',
    tags:         ['pro', 'boom', 'boom500', 'spike', 'pattern'],
    config: {
      stake:           350,
      duration:        1,
      durationUnit:    'ticks',
      martingale:      true,
      martingaleFactor: 2,
      maxStakeCap:     5600,
      takeProfit:      3500,
      stopLoss:        1500,
      maxTrades:       45,
    },
  },
]

// Helper: get bots by category
export function getBotsByCategory(category: Bot['category'] | 'all'): Bot[] {
  if (category === 'all') return bots
  return bots.filter(b => b.category === category)
}

// Helper: get bots by tier
export function getBotsByTier(tier: Bot['tier'] | 'all'): Bot[] {
  if (tier === 'all') return bots
  return bots.filter(b => b.tier === tier)
}

// Helper: get a single bot by id
export function getBotById(id: string): Bot | undefined {
  return bots.find(b => b.id === id)
}

// Helper: sort bots
export type BotSortKey = 'downloads' | 'winRate' | 'name' | 'riskLevel'

export function sortBots(list: Bot[], key: BotSortKey): Bot[] {
  return [...list].sort((a, b) => {
    switch (key) {
      case 'downloads': return b.downloads - a.downloads
      case 'winRate':   return b.winRate - a.winRate
      case 'name':      return a.name.localeCompare(b.name)
      case 'riskLevel': {
        const order = { Low: 0, Medium: 1, High: 2 }
        return order[a.riskLevel] - order[b.riskLevel]
      }
      default: return 0
    }
  })
}
