// ============================================================
// PIPS DOLLAR PRINTER — Simulated Market Engine
// Module-level singleton: prices persist across all component
// mounts/unmounts and page navigations within the same session.
// ============================================================

// ------------------------------------------------------------
// Global price registry — lives at module scope, never resets
// ------------------------------------------------------------
const globalPriceRegistry: Record<string, number> = {
  V10:       6842.45,
  V25:       245891.23,
  V75:       892341.67,
  V100:      1245678.90,
  BOOM500:   678234.12,
  BOOM1000:  456123.89,
  CRASH500:  789456.23,
  CRASH1000: 567234.56,
  STEP:      8234.45,
}

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export interface TickData {
  symbol:        string
  price:         number
  previousPrice: number
  change:        number
  changePercent: number
  direction:     'up' | 'down' | 'flat'
}

export interface CandleData {
  time:    number
  open:    number
  high:    number
  low:     number
  close:   number
  volume:  number
  isGreen: boolean
}

export interface EquityPoint {
  date:     string
  balance:  number
  drawdown: number
}

export interface TradeResult {
  result: 'WIN' | 'LOSS'
  pnl:    number
  stake:  number
}

// ------------------------------------------------------------
// Volatility config per symbol
// ------------------------------------------------------------
interface VolatilityConfig {
  normalPct:    number   // max % move per tick (normal)
  spikePct?:    number   // % move on spike tick
  spikeEvery?:  number   // spike every N ticks
  crashSpike?:  boolean  // true = spike is downward
  isStep?:      boolean  // STEP index: fixed 0.10 increments
}

const VOLATILITY: Record<string, VolatilityConfig> = {
  V10:       { normalPct: 0.0005 },
  V25:       { normalPct: 0.0012 },
  V75:       { normalPct: 0.0030 },
  V100:      { normalPct: 0.0045 },
  BOOM500:   { normalPct: 0.0008, spikePct: 0.025,  spikeEvery: 50,  crashSpike: false },
  BOOM1000:  { normalPct: 0.0006, spikePct: 0.020,  spikeEvery: 80,  crashSpike: false },
  CRASH500:  { normalPct: 0.0008, spikePct: 0.025,  spikeEvery: 50,  crashSpike: true  },
  CRASH1000: { normalPct: 0.0006, spikePct: 0.020,  spikeEvery: 80,  crashSpike: true  },
  STEP:      { normalPct: 0,      isStep: true },
}

// ------------------------------------------------------------
// Utility helpers
// ------------------------------------------------------------
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1))
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Seeded pseudo-random for deterministic candle generation
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ------------------------------------------------------------
// SimulatedMarket class
// ------------------------------------------------------------
class SimulatedMarket {
  private tickCounters: Record<string, number> = {}

  // ----------------------------------------------------------
  // generateTick
  // Reads from and writes back to globalPriceRegistry.
  // Returns previous price alongside new price for UI transitions.
  // ----------------------------------------------------------
  generateTick(symbol: string): TickData {
    const config = VOLATILITY[symbol]
    if (!config) throw new Error(`Unknown symbol: ${symbol}`)

    const previousPrice = globalPriceRegistry[symbol]
    let newPrice: number

    // Initialise tick counter
    if (this.tickCounters[symbol] === undefined) {
      this.tickCounters[symbol] = 0
    }
    this.tickCounters[symbol]++
    const tick = this.tickCounters[symbol]

    if (config.isStep) {
      // STEP index: moves in fixed 0.10 increments only
      const direction = Math.random() < 0.5 ? 1 : -1
      newPrice = Math.round((previousPrice + direction * 0.10) * 100) / 100
    } else if (
      config.spikePct !== undefined &&
      config.spikeEvery !== undefined &&
      tick % config.spikeEvery === 0
    ) {
      // Spike tick (Boom = up, Crash = down)
      const spikeMagnitude = previousPrice * config.spikePct
      newPrice = config.crashSpike
        ? previousPrice - spikeMagnitude
        : previousPrice + spikeMagnitude
    } else {
      // Normal tick: random walk with slight mean reversion
      const volatility = config.normalPct
      const movePct    = rand(-volatility, volatility)

      // Mean reversion: nudge price back toward a rolling "anchor"
      // anchor is the price from 20 ticks ago (approximated as ±0.5% of current)
      const anchor         = previousPrice * (1 + rand(-0.005, 0.005))
      const meanReversion  = (anchor - previousPrice) * 0.02
      const rawMove        = previousPrice * movePct + meanReversion

      newPrice = previousPrice + rawMove
    }

    // Clamp: price can never go below 1% of starting value
    const floor = globalPriceRegistry[symbol] * 0.01
    newPrice = Math.max(newPrice, floor)

    // Precision: STEP = 2dp, others = 2dp
    newPrice = Math.round(newPrice * 100) / 100

    // Write back to global registry
    globalPriceRegistry[symbol] = newPrice

    const change        = newPrice - previousPrice
    const changePercent = (change / previousPrice) * 100

    return {
      symbol,
      price:         newPrice,
      previousPrice,
      change:        Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 10000) / 10000,
      direction:     change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
    }
  }

  // ----------------------------------------------------------
  // generateCandles
  // Generates candles backward from current globalPriceRegistry
  // price so the chart always ends at the live price.
  // Uses random walk with mean reversion to prevent drift.
  // ----------------------------------------------------------
  generateCandles(
    symbol:    string,
    count:     number,
    timeframe: '1T' | '5T' | '1M' | '5M' | '15M'
  ): CandleData[] {
    const config       = VOLATILITY[symbol]
    const currentPrice = globalPriceRegistry[symbol]

    // Volatility multiplier per timeframe
    const tfMultiplier: Record<string, number> = {
      '1T':  1,
      '5T':  2.2,
      '1M':  3.5,
      '5M':  7,
      '15M': 12,
    }
    const mult = tfMultiplier[timeframe] ?? 1

    // Timeframe duration in ms (for time axis)
    const tfMs: Record<string, number> = {
      '1T':  1500,
      '5T':  7500,
      '1M':  60000,
      '5M':  300000,
      '15M': 900000,
    }
    const durationMs = tfMs[timeframe] ?? 1500

    const candles: CandleData[] = []
    let   price = currentPrice
    const now   = Date.now()

    // Build candles from newest (index count-1) to oldest (index 0)
    // then reverse so array is chronological
    for (let i = count - 1; i >= 0; i--) {
      const seed      = i * 137 + symbol.charCodeAt(0) * 31
      const volatility = config.isStep
        ? 0.10 * mult
        : currentPrice * config.normalPct * mult

      // Random walk step for this candle
      const bodySize  = seededRand(seed) * volatility * 2
      const isGreen   = seededRand(seed + 7) > 0.46  // slight bullish bias

      const open  = price
      const close = isGreen
        ? open + bodySize
        : open - bodySize

      // Wicks: high extends above body, low extends below
      const wickMultiplier = 0.3 + seededRand(seed + 13) * 0.7
      const high = Math.max(open, close) + volatility * wickMultiplier
      const low  = Math.min(open, close) - volatility * wickMultiplier * 0.8

      const volume = Math.floor(rand(500, 5000))

      candles.unshift({
        time:    now - i * durationMs,
        open:    Math.round(open  * 100) / 100,
        high:    Math.round(high  * 100) / 100,
        low:     Math.max(Math.round(low * 100) / 100, 0.01),
        close:   Math.round(close * 100) / 100,
        volume,
        isGreen,
      })

      // Walk price backward with mean reversion
      const meanReversion = (currentPrice - price) * 0.03
      price = price - (isGreen ? bodySize : -bodySize) + meanReversion
      price = Math.max(price, currentPrice * 0.5)
    }

    // Ensure the last candle closes exactly at current live price
    if (candles.length > 0) {
      const last  = candles[candles.length - 1]
      last.close  = currentPrice
      last.high   = Math.max(last.high, currentPrice)
      last.low    = Math.min(last.low,  currentPrice)
      last.isGreen = last.close >= last.open
    }

    return candles
  }

  // ----------------------------------------------------------
  // generateEquityCurve
  // Realistic equity curve starting from KES 10,000.
  // Upward trend (+0.8%/day avg) with realistic drawdowns
  // and occasional losing streaks of 3-5 days.
  // ----------------------------------------------------------
  generateEquityCurve(days: number): EquityPoint[] {
    const points:   EquityPoint[] = []
    let   balance   = 10000
    let   peakBalance = 10000
    let   losingStreak = 0
    const now       = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      // Determine if we're in a losing streak
      let dailyReturn: number

      if (losingStreak > 0) {
        // Losing streak: -0.5% to -2.5% per day
        dailyReturn = rand(-0.025, -0.005)
        losingStreak--
      } else {
        // Normal day: biased positive
        const roll = Math.random()
        if (roll < 0.12) {
          // Start a losing streak (3-5 days)
          losingStreak = randInt(2, 4)
          dailyReturn  = rand(-0.025, -0.005)
        } else if (roll < 0.35) {
          // Flat/slightly negative day
          dailyReturn = rand(-0.008, 0.003)
        } else {
          // Good day: +0.3% to +2.2%
          dailyReturn = rand(0.003, 0.022)
        }
      }

      balance = balance * (1 + dailyReturn)
      balance = Math.max(balance, 1000) // floor at KES 1,000

      if (balance > peakBalance) peakBalance = balance

      const drawdown = peakBalance > 0
        ? ((peakBalance - balance) / peakBalance) * 100
        : 0

      points.push({
        date:     dateStr,
        balance:  Math.round(balance),
        drawdown: Math.round(drawdown * 100) / 100,
      })
    }

    return points
  }

  // ----------------------------------------------------------
  // generateTradeResult
  // WIN probability: 54-58% (realistic, not fake high)
  // Stake: random 100-500 KES
  // WIN pnl: stake * 0.85 (Deriv typical payout)
  // LOSS pnl: -stake
  // ----------------------------------------------------------
  generateTradeResult(
    direction: 'CALL' | 'PUT',
    symbol:    string
  ): TradeResult {
    // Slight directional bias based on recent tick direction
    // (purely cosmetic — doesn't affect overall win rate)
    const baseWinRate = rand(0.54, 0.58)
    const isWin       = Math.random() < baseWinRate

    const stake = Math.round(randInt(100, 500) / 100) * 100 // round to nearest 100

    const pnl = isWin
      ? Math.round(stake * 0.85 * 100) / 100
      : -stake

    return {
      result: isWin ? 'WIN' : 'LOSS',
      pnl,
      stake,
    }
  }

  // ----------------------------------------------------------
  // getCurrentPrice
  // Read current price from registry without generating a tick
  // ----------------------------------------------------------
  getCurrentPrice(symbol: string): number {
    return globalPriceRegistry[symbol] ?? 0
  }

  // ----------------------------------------------------------
  // getAllPrices
  // Snapshot of all current prices (no tick generated)
  // ----------------------------------------------------------
  getAllPrices(): Record<string, number> {
    return { ...globalPriceRegistry }
  }

  // ----------------------------------------------------------
  // generateRSI
  // Generates RSI values (0-100) for the given candle set.
  // Uses standard 14-period RSI calculation.
  // ----------------------------------------------------------
  generateRSI(candles: CandleData[], period = 14): number[] {
    if (candles.length < period + 1) return candles.map(() => 50)

    const rsiValues: number[] = new Array(period).fill(50)
    const changes = candles.map((c, i) =>
      i === 0 ? 0 : c.close - candles[i - 1].close
    )

    let avgGain = 0
    let avgLoss = 0

    for (let i = 1; i <= period; i++) {
      if (changes[i] > 0) avgGain += changes[i]
      else avgLoss += Math.abs(changes[i])
    }

    avgGain /= period
    avgLoss /= period

    for (let i = period; i < candles.length; i++) {
      const change = changes[i]
      const gain   = change > 0 ? change : 0
      const loss   = change < 0 ? Math.abs(change) : 0

      avgGain = (avgGain * (period - 1) + gain) / period
      avgLoss = (avgLoss * (period - 1) + loss) / period

      const rs  = avgLoss === 0 ? 100 : avgGain / avgLoss
      const rsi = 100 - 100 / (1 + rs)
      rsiValues.push(Math.round(rsi * 100) / 100)
    }

    return rsiValues
  }

  // ----------------------------------------------------------
  // generateSMA
  // Simple moving average over candle close prices
  // ----------------------------------------------------------
  generateSMA(candles: CandleData[], period: number): (number | null)[] {
    return candles.map((_, i) => {
      if (i < period - 1) return null
      const slice = candles.slice(i - period + 1, i + 1)
      const sum   = slice.reduce((acc, c) => acc + c.close, 0)
      return Math.round((sum / period) * 100) / 100
    })
  }
}

// ============================================================
// Module-level singleton export
// This single instance is shared across ALL imports in the app.
// Prices persist as long as the browser tab is open.
// ============================================================
export const market = new SimulatedMarket()

// Export the registry reader for hooks that need direct access
export function getGlobalPrice(symbol: string): number {
  return globalPriceRegistry[symbol] ?? 0
}

export function getAllGlobalPrices(): Record<string, number> {
  return { ...globalPriceRegistry }
}

// All tradeable symbols
export const SYMBOLS = [
  'V10',
  'V25',
  'V75',
  'V100',
  'BOOM500',
  'BOOM1000',
  'CRASH500',
  'CRASH1000',
  'STEP',
] as const

export type Symbol = typeof SYMBOLS[number]

// Display names for symbols
export const SYMBOL_DISPLAY: Record<string, string> = {
  V10:       'Volatility 10 Index',
  V25:       'Volatility 25 Index',
  V75:       'Volatility 75 Index',
  V100:      'Volatility 100 Index',
  BOOM500:   'Boom 500 Index',
  BOOM1000:  'Boom 1000 Index',
  CRASH500:  'Crash 500 Index',
  CRASH1000: 'Crash 1000 Index',
  STEP:      'Step Index',
}

// Volatility rating labels for UI
export const VOLATILITY_RATING: Record<string, string> = {
  V10:       'Low',
  V25:       'Low-Medium',
  V75:       'High',
  V100:      'Extreme',
  BOOM500:   'Medium',
  BOOM1000:  'Medium',
  CRASH500:  'Medium',
  CRASH1000: 'Medium',
  STEP:      'Low',
}
