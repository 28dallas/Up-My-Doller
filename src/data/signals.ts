// ============================================================
// PIPS DOLLAR PRINTER — Seed Signals Data
// 10 pre-built signals used to populate the signals page
// on first load before the live interval fires.
// ============================================================

export interface Signal {
  id:         string
  symbol:     string
  symbolDisplay: string
  timeframe:  string
  direction:  'CALL' | 'PUT'
  strength:   'STRONG' | 'MODERATE' | 'WEAK'
  reason:     string
  entryPrice: number
  duration:   string
  timestamp:  Date
}

const now = new Date()
const minsAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000)

export const seedSignals: Signal[] = [
  {
    id:           'sig-001',
    symbol:       'V75',
    symbolDisplay: 'Volatility 75 Index',
    timeframe:    '5T',
    direction:    'CALL',
    strength:     'STRONG',
    reason:       'EMA9 crossed above EMA21 — bullish momentum confirmed',
    entryPrice:   892341.67,
    duration:     '5 Ticks',
    timestamp:    minsAgo(2),
  },
  {
    id:           'sig-002',
    symbol:       'BOOM500',
    symbolDisplay: 'Boom 500 Index',
    timeframe:    '1T',
    direction:    'CALL',
    strength:     'STRONG',
    reason:       'Boom pattern detected — spike zone approaching (~48 ticks)',
    entryPrice:   678234.12,
    duration:     '1 Tick',
    timestamp:    minsAgo(4),
  },
  {
    id:           'sig-003',
    symbol:       'CRASH500',
    symbolDisplay: 'Crash 500 Index',
    timeframe:    '1T',
    direction:    'PUT',
    strength:     'STRONG',
    reason:       'Crash pattern detected — downward spike zone approaching (~46 ticks)',
    entryPrice:   789456.23,
    duration:     '1 Tick',
    timestamp:    minsAgo(6),
  },
  {
    id:           'sig-004',
    symbol:       'V10',
    symbolDisplay: 'Volatility 10 Index',
    timeframe:    '1M',
    direction:    'CALL',
    strength:     'MODERATE',
    reason:       'RSI oversold (27.4) — mean reversion expected',
    entryPrice:   6842.45,
    duration:     '1 Minute',
    timestamp:    minsAgo(9),
  },
  {
    id:           'sig-005',
    symbol:       'V100',
    symbolDisplay: 'Volatility 100 Index',
    timeframe:    '5M',
    direction:    'PUT',
    strength:     'MODERATE',
    reason:       'RSI overbought (74.8) — pullback signal on 5M chart',
    entryPrice:   1245678.90,
    duration:     '5 Minutes',
    timestamp:    minsAgo(12),
  },
  {
    id:           'sig-006',
    symbol:       'STEP',
    symbolDisplay: 'Step Index',
    timeframe:    '1T',
    direction:    'CALL',
    strength:     'MODERATE',
    reason:       'Even digit sequence detected — statistical edge for next tick',
    entryPrice:   8234.45,
    duration:     '1 Tick',
    timestamp:    minsAgo(15),
  },
  {
    id:           'sig-007',
    symbol:       'V25',
    symbolDisplay: 'Volatility 25 Index',
    timeframe:    '5T',
    direction:    'PUT',
    strength:     'MODERATE',
    reason:       'Volatility spike (+0.31%) — reversion to mean expected',
    entryPrice:   245891.23,
    duration:     '5 Ticks',
    timestamp:    minsAgo(18),
  },
  {
    id:           'sig-008',
    symbol:       'BOOM1000',
    symbolDisplay: 'Boom 1000 Index',
    timeframe:    '1T',
    direction:    'CALL',
    strength:     'WEAK',
    reason:       'Boom 1000 spike zone approaching (~75 ticks) — early signal',
    entryPrice:   456123.89,
    duration:     '1 Tick',
    timestamp:    minsAgo(22),
  },
  {
    id:           'sig-009',
    symbol:       'CRASH1000',
    symbolDisplay: 'Crash 1000 Index',
    timeframe:    '1T',
    direction:    'PUT',
    strength:     'WEAK',
    reason:       'Crash 1000 downward spike zone approaching (~72 ticks)',
    entryPrice:   567234.56,
    duration:     '1 Tick',
    timestamp:    minsAgo(26),
  },
  {
    id:           'sig-010',
    symbol:       'V75',
    symbolDisplay: 'Volatility 75 Index',
    timeframe:    '15M',
    direction:    'CALL',
    strength:     'STRONG',
    reason:       'SMA9 above SMA21 on 15M — sustained uptrend in progress',
    entryPrice:   892341.67,
    duration:     '15 Minutes',
    timestamp:    minsAgo(31),
  },
]

// Signal reason templates used by the live signal generator
export const SIGNAL_REASONS = {
  CALL: [
    'EMA9 crossed above EMA21 — bullish momentum confirmed',
    'RSI oversold ({rsi}) — mean reversion expected',
    'SMA9 above SMA21 — sustained uptrend in progress',
    'Volatility contraction breakout — upward move likely',
    'Boom pattern detected — spike zone approaching (~{ticks} ticks)',
    'Support level held — bounce confirmed on {tf} chart',
    'Bullish engulfing candle on {tf} — strong buy signal',
    'Price above 20-period SMA — trend continuation signal',
  ],
  PUT: [
    'EMA9 crossed below EMA21 — bearish momentum confirmed',
    'RSI overbought ({rsi}) — pullback signal on {tf} chart',
    'SMA9 below SMA21 — downtrend continuation expected',
    'Volatility spike (+{pct}%) — reversion to mean expected',
    'Crash pattern detected — downward spike zone approaching (~{ticks} ticks)',
    'Resistance level rejected — reversal confirmed on {tf} chart',
    'Bearish engulfing candle on {tf} — strong sell signal',
    'Price below 20-period SMA — downtrend continuation signal',
  ],
}

export function generateSignalReason(
  direction: 'CALL' | 'PUT',
  symbol: string
): string {
  const reasons = SIGNAL_REASONS[direction]
  const template = reasons[Math.floor(Math.random() * reasons.length)]

  return template
    .replace('{rsi}',   (Math.random() * 20 + (direction === 'CALL' ? 20 : 70)).toFixed(1))
    .replace('{pct}',   (Math.random() * 0.4 + 0.1).toFixed(2))
    .replace('{ticks}', String(Math.floor(Math.random() * 20 + 40)))
    .replace('{tf}',    ['1M', '5M', '15M'][Math.floor(Math.random() * 3)])
}
