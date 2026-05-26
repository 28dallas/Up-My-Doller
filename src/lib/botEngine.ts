// ============================================================
// PIPS DOLLAR PRINTER — Bot Engine
// Handles bot config validation, XML generation, and
// localStorage persistence for running bot states.
// ============================================================

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export interface BotConfig {
  market:         string   // Display name e.g. "Volatility 75 Index"
  marketSymbol:   string   // API symbol e.g. "R_75"
  direction:      'CALL' | 'PUT' | 'BOTH'
  tradeType:      'Rise/Fall' | 'Over/Under' | 'Even/Odd' | 'Digit Match'
  stake:          number
  martingale:     boolean
  martingaleFactor?: number
  maxStakeCap?:   number
  takeProfit:     number
  stopLoss:       number
  maxTrades:      number
  timeLimit?:     number   // minutes, optional
}

export interface BotDefinition {
  id:           string
  name:         string
  config:       BotConfig
  createdAt:    string
  isRunning:    boolean
  tradesCount:  number
  currentPnL:   number
  startedAt?:   string
}

export interface RunningBotState {
  id:          string
  isRunning:   boolean
  tradesCount: number
  currentPnL:  number
  startedAt:   string | null
}

// Deriv API symbol mapping
export const MARKET_SYMBOL_MAP: Record<string, string> = {
  V10:       'R_10',
  V25:       'R_25',
  V75:       'R_75',
  V100:      'R_100',
  BOOM500:   'BOOM500',
  BOOM1000:  'BOOM1000',
  CRASH500:  'CRASH500',
  CRASH1000: 'CRASH1000',
  STEP:      'stpRNG',
}

// Contract type mapping for XML
const CONTRACT_TYPE_MAP: Record<string, string> = {
  'Rise/Fall':   'CALL',
  'Over/Under':  'DIGITOVER',
  'Even/Odd':    'DIGITEVEN',
  'Digit Match': 'DIGITMATCH',
}

// localStorage key prefix
const LS_PREFIX = 'pdp_bot_state_'

function parseRunningBotState(raw: string | null): RunningBotState | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<RunningBotState>
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.id === 'string' &&
      typeof parsed.isRunning === 'boolean' &&
      typeof parsed.tradesCount === 'number' &&
      typeof parsed.currentPnL === 'number'
    ) {
      return {
        id: parsed.id,
        isRunning: parsed.isRunning,
        tradesCount: parsed.tradesCount,
        currentPnL: parsed.currentPnL,
        startedAt: typeof parsed.startedAt === 'string' || parsed.startedAt === null ? parsed.startedAt : null,
      }
    }
  } catch {
    return null
  }
  return null
}

// ============================================================
// XML Generator
// Generates a Deriv-compatible bot XML file from a BotDefinition
// ============================================================
export function generateBotXML(bot: {
  name:         string
  marketSymbol: string
  tradeType:    string
  config: {
    stake:           number
    martingale:      boolean
    martingaleFactor?: number
    maxStakeCap?:    number
    takeProfit:      number
    stopLoss:        number
    maxTrades:       number
    timeLimit?:      number
    direction?:      string
  }
}): string {
  const derivSymbol    = MARKET_SYMBOL_MAP[bot.marketSymbol] ?? bot.marketSymbol
  const contractType   = CONTRACT_TYPE_MAP[bot.tradeType]    ?? 'CALL'
  const martingaleFactor = bot.config.martingale
    ? (bot.config.martingaleFactor ?? 2)
    : 1
  const maxStakeCap    = bot.config.maxStakeCap ?? bot.config.stake * 10
  const generatedAt    = new Date().toISOString()
  const safeName       = bot.name.replace(/[<>&"']/g, '_')

  return `<?xml version="1.0" encoding="UTF-8"?>
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="trade" id="main_trade_block">
    <field name="MARKET_SYMBOL">${derivSymbol}</field>
    <field name="CONTRACT_TYPE">${contractType}</field>
    <field name="DURATION_TYPE">t</field>
    <field name="DURATION_VALUE">5</field>
    <field name="INITIAL_STAKE">${bot.config.stake}</field>
    <field name="CURRENCY">USD</field>
    <field name="MARTINGALE_ENABLED">${bot.config.martingale ? 'true' : 'false'}</field>
    <field name="MARTINGALE_FACTOR">${martingaleFactor}</field>
    <field name="MAX_STAKE_CAP">${maxStakeCap}</field>
    <field name="TAKE_PROFIT">${bot.config.takeProfit}</field>
    <field name="STOP_LOSS">${bot.config.stopLoss}</field>
    <field name="MAX_TRADES">${bot.config.maxTrades || 999}</field>
    <field name="BOT_NAME">${safeName}</field>
    <field name="GENERATED_BY">Pips Dollar Printer</field>
    <field name="GENERATED_AT">${generatedAt}</field>
  </block>
</xml>`
}

// ============================================================
// downloadBotXML
// Triggers a browser file download of the bot XML
// ============================================================
export function downloadBotXML(bot: {
  name:         string
  marketSymbol: string
  tradeType:    string
  config: {
    stake:           number
    martingale:      boolean
    martingaleFactor?: number
    maxStakeCap?:    number
    takeProfit:      number
    stopLoss:        number
    maxTrades:       number
    timeLimit?:      number
    direction?:      string
  }
}): void {
  const xml      = generateBotXML(bot)
  const blob     = new Blob([xml], { type: 'application/xml' })
  const url      = URL.createObjectURL(blob)
  const filename = `${bot.name.toLowerCase().replace(/\s+/g, '-')}-deriv-bot.xml`

  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ============================================================
// Bot Config Validator
// Returns array of error messages (empty = valid)
// ============================================================
export function validateBotConfig(config: Partial<BotConfig>): string[] {
  const errors: string[] = []

  if (!config.marketSymbol) {
    errors.push('Please select a market.')
  }
  if (!config.stake || config.stake < 100) {
    errors.push('Minimum stake is KES 100.')
  }
  if (!config.takeProfit || config.takeProfit <= 0) {
    errors.push('Take profit must be greater than 0.')
  }
  if (!config.stopLoss || config.stopLoss <= 0) {
    errors.push('Stop loss must be greater than 0.')
  }
  if (config.martingale && (!config.martingaleFactor || config.martingaleFactor < 1.1)) {
    errors.push('Martingale multiplier must be at least 1.1.')
  }
  if (
    config.martingale &&
    config.maxStakeCap &&
    config.stake &&
    config.maxStakeCap < config.stake
  ) {
    errors.push('Max stake cap must be greater than or equal to initial stake.')
  }
  if (!config.maxTrades || config.maxTrades < 1) {
    errors.push('Max trades must be at least 1.')
  }

  return errors
}

// ============================================================
// localStorage persistence for running bot states
// Bots survive page refresh
// ============================================================

export function saveBotState(botId: string, state: RunningBotState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${LS_PREFIX}${botId}`, JSON.stringify(state))
  } catch {
    // localStorage full or unavailable
  }
}

export function loadBotState(botId: string): RunningBotState | null {
  if (typeof window === 'undefined') return null
  try {
    const key = `${LS_PREFIX}${botId}`
    const parsed = parseRunningBotState(localStorage.getItem(key))
    if (!parsed) {
      localStorage.removeItem(key)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function clearBotState(botId: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(`${LS_PREFIX}${botId}`)
  } catch {
    // ignore
  }
}

export function getAllRunningBotIds(): string[] {
  if (typeof window === 'undefined') return []
  const ids: string[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(LS_PREFIX)) {
        const state = parseRunningBotState(localStorage.getItem(key))
        if (state) {
          if (state.isRunning) ids.push(state.id)
        } else {
          localStorage.removeItem(key)
        }
      }
    }
  } catch {
    // ignore
  }
  return ids
}

export function getRunningBotsCount(): number {
  return getAllRunningBotIds().length
}

// ============================================================
// Bot summary text generator
// Produces the human-readable summary shown in the bot builder
// ============================================================
export function generateBotSummary(config: Partial<BotConfig>, name?: string): string {
  if (!config.marketSymbol || !config.stake) {
    return 'Configure your bot settings above to see a summary.'
  }

  const market    = config.market    ?? config.marketSymbol
  const direction = config.direction ?? 'CALL'
  const stake     = config.stake     ?? 0
  const tp        = config.takeProfit ?? 0
  const sl        = config.stopLoss   ?? 0
  const maxTrades = config.maxTrades  ?? 999
  const botName   = name ?? 'This bot'

  let summary = `${botName} will trade ${market} with ${direction} contracts at KES ${stake.toLocaleString()}.`

  if (config.martingale && config.martingaleFactor) {
    summary += ` On each loss, the stake will multiply by ${config.martingaleFactor}x`
    if (config.maxStakeCap) {
      summary += ` up to a maximum of KES ${config.maxStakeCap.toLocaleString()}`
    }
    summary += '.'
  }

  summary += ` It will stop at KES ${tp.toLocaleString()} profit or KES ${sl.toLocaleString()} loss`

  if (maxTrades < 999) {
    summary += `, or after ${maxTrades} trades`
  }

  if (config.timeLimit) {
    summary += `, or after ${config.timeLimit} minutes`
  }

  summary += '.'

  return summary
}

// ============================================================
// Format helpers used across dashboard components
// ============================================================
export function formatKES(amount: number): string {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return amount < 0 ? `-KES ${formatted}` : `KES ${formatted}`
}

export function formatPnL(pnl: number): string {
  const abs = Math.abs(pnl)
  const formatted = abs.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return pnl >= 0 ? `+KES ${formatted}` : `-KES ${formatted}`
}

export function formatWinRate(wins: number, total: number): string {
  if (total === 0) return '0.0%'
  return `${((wins / total) * 100).toFixed(1)}%`
}

// Generate initials + deterministic color from a name string
export function getAvatarProps(name: string): { initials: string; color: string } {
  const colors = [
    '#16a34a', '#2563eb', '#9333ea', '#dc2626',
    '#ea580c', '#0891b2', '#65a30d', '#d97706',
  ]
  const initials = name
    .split(' ')
    .map(w => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = colors[Math.abs(hash) % colors.length]

  return { initials, color }
}
