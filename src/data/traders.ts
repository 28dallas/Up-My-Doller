// ============================================================
// PIPS DOLLAR PRINTER — Copy Trading Leaderboard Data
// 10 traders: 4 Kenyan, 2 Tanzanian, 2 Nigerian, 1 Ugandan, 1 Ghanaian
// ============================================================

export interface Trader {
  id:               string
  name:             string
  username:         string
  country:          string
  countryCode:      string
  flag:             string
  specialty:        string
  tagline:          string
  return30d:        number   // percentage
  return90d:        number
  returnAllTime:    number
  winRate:          number   // percentage
  maxDrawdown:      number   // percentage
  totalTrades:      number
  followers:        number
  joinedMonthsAgo:  number
  preferredMarkets: string[]
  riskScore:        1 | 2 | 3 | 4 | 5   // 1=very low, 5=very high
  isVerified:       boolean
  avatarColor:      string
}

export const traders: Trader[] = [
  {
    id:               'trader-001',
    name:             'James Mwangi',
    username:         'jmwangi_trades',
    country:          'Kenya',
    countryCode:      'KE',
    flag:             '🇰🇪',
    specialty:        'Volatility Indices',
    tagline:          'Consistent gains through disciplined risk management on V75 and V100.',
    return30d:        38.4,
    return90d:        94.2,
    returnAllTime:    312.7,
    winRate:          74,
    maxDrawdown:      12.3,
    totalTrades:      4821,
    followers:        1243,
    joinedMonthsAgo:  18,
    preferredMarkets: ['V75', 'V100'],
    riskScore:        3,
    isVerified:       true,
    avatarColor:      '#16a34a',
  },
  {
    id:               'trader-002',
    name:             'Amina Hassan',
    username:         'amina_fx_tz',
    country:          'Tanzania',
    countryCode:      'TZ',
    flag:             '🇹🇿',
    specialty:        'Boom & Crash',
    tagline:          'Spike pattern specialist. I trade Boom 500 and Crash 500 exclusively.',
    return30d:        44.1,
    return90d:        108.6,
    returnAllTime:    428.3,
    winRate:          81,
    maxDrawdown:      9.8,
    totalTrades:      3204,
    followers:        987,
    joinedMonthsAgo:  24,
    preferredMarkets: ['BOOM500', 'CRASH500'],
    riskScore:        2,
    isVerified:       true,
    avatarColor:      '#9333ea',
  },
  {
    id:               'trader-003',
    name:             'Chukwuemeka Obi',
    username:         'emeka_deriv_ng',
    country:          'Nigeria',
    countryCode:      'NG',
    flag:             '🇳🇬',
    specialty:        'Step Index',
    tagline:          'Step Index is my bread and butter. Predictable, consistent, profitable.',
    return30d:        22.7,
    return90d:        61.4,
    returnAllTime:    198.5,
    winRate:          71,
    maxDrawdown:      7.2,
    totalTrades:      6102,
    followers:        756,
    joinedMonthsAgo:  30,
    preferredMarkets: ['STEP'],
    riskScore:        1,
    isVerified:       true,
    avatarColor:      '#2563eb',
  },
  {
    id:               'trader-004',
    name:             'Grace Wanjiku',
    username:         'grace_pips_ke',
    country:          'Kenya',
    countryCode:      'KE',
    flag:             '🇰🇪',
    specialty:        'Volatility 10 & 25',
    tagline:          'Low-risk, steady growth. Perfect for traders who want to sleep at night.',
    return30d:        18.3,
    return90d:        52.1,
    returnAllTime:    167.4,
    winRate:          68,
    maxDrawdown:      5.4,
    totalTrades:      8934,
    followers:        1102,
    joinedMonthsAgo:  36,
    preferredMarkets: ['V10', 'V25'],
    riskScore:        1,
    isVerified:       true,
    avatarColor:      '#dc2626',
  },
  {
    id:               'trader-005',
    name:             'Samuel Okello',
    username:         'sam_okello_ug',
    country:          'Uganda',
    countryCode:      'UG',
    flag:             '🇺🇬',
    specialty:        'Boom 1000',
    tagline:          'Patient Boom 1000 trader. I wait for the perfect setup every time.',
    return30d:        29.6,
    return90d:        78.3,
    returnAllTime:    241.9,
    winRate:          66,
    maxDrawdown:      14.1,
    totalTrades:      2187,
    followers:        534,
    joinedMonthsAgo:  14,
    preferredMarkets: ['BOOM1000'],
    riskScore:        3,
    isVerified:       false,
    avatarColor:      '#ea580c',
  },
  {
    id:               'trader-006',
    name:             'Fatuma Ally',
    username:         'fatuma_tz_pro',
    country:          'Tanzania',
    countryCode:      'TZ',
    flag:             '🇹🇿',
    specialty:        'Digit Strategies',
    tagline:          'Even/Odd and Over/Under specialist across all volatility indices.',
    return30d:        31.8,
    return90d:        82.4,
    returnAllTime:    276.1,
    winRate:          73,
    maxDrawdown:      8.6,
    totalTrades:      11203,
    followers:        892,
    joinedMonthsAgo:  28,
    preferredMarkets: ['V10', 'V25', 'STEP'],
    riskScore:        2,
    isVerified:       true,
    avatarColor:      '#0891b2',
  },
  {
    id:               'trader-007',
    name:             'Kwame Asante',
    username:         'kwame_gh_trader',
    country:          'Ghana',
    countryCode:      'GH',
    flag:             '🇬🇭',
    specialty:        'Crash Indices',
    tagline:          'Crash 500 and Crash 1000 expert. I ride every crash wave profitably.',
    return30d:        35.2,
    return90d:        91.7,
    returnAllTime:    304.8,
    winRate:          69,
    maxDrawdown:      16.3,
    totalTrades:      3876,
    followers:        678,
    joinedMonthsAgo:  20,
    preferredMarkets: ['CRASH500', 'CRASH1000'],
    riskScore:        3,
    isVerified:       true,
    avatarColor:      '#65a30d',
  },
  {
    id:               'trader-008',
    name:             'David Kamau',
    username:         'dkamau_v75',
    country:          'Kenya',
    countryCode:      'KE',
    flag:             '🇰🇪',
    specialty:        'V75 Martingale',
    tagline:          'Disciplined martingale trader on V75. Risk-managed, not reckless.',
    return30d:        41.9,
    return90d:        103.4,
    returnAllTime:    389.2,
    winRate:          62,
    maxDrawdown:      19.7,
    totalTrades:      5432,
    followers:        1456,
    joinedMonthsAgo:  22,
    preferredMarkets: ['V75'],
    riskScore:        4,
    isVerified:       true,
    avatarColor:      '#d97706',
  },
  {
    id:               'trader-009',
    name:             'Ngozi Adeyemi',
    username:         'ngozi_ng_elite',
    country:          'Nigeria',
    countryCode:      'NG',
    flag:             '🇳🇬',
    specialty:        'Multi-Market',
    tagline:          'I trade across 6 markets simultaneously. Diversification is my edge.',
    return30d:        26.4,
    return90d:        69.8,
    returnAllTime:    223.6,
    winRate:          65,
    maxDrawdown:      11.2,
    totalTrades:      7654,
    followers:        1089,
    joinedMonthsAgo:  32,
    preferredMarkets: ['V25', 'V75', 'BOOM500', 'CRASH500'],
    riskScore:        2,
    isVerified:       true,
    avatarColor:      '#9333ea',
  },
  {
    id:               'trader-010',
    name:             'Peter Njoroge',
    username:         'pete_njoroge_ke',
    country:          'Kenya',
    countryCode:      'KE',
    flag:             '🇰🇪',
    specialty:        'V100 High Frequency',
    tagline:          'High-frequency V100 trader. Fast entries, fast exits, consistent results.',
    return30d:        12.1,
    return90d:        34.7,
    returnAllTime:    142.3,
    winRate:          63,
    maxDrawdown:      22.4,
    totalTrades:      15203,
    followers:        423,
    joinedMonthsAgo:  10,
    preferredMarkets: ['V100'],
    riskScore:        4,
    isVerified:       false,
    avatarColor:      '#2563eb',
  },
]

// Sorted by 30D return descending (leaderboard default)
export const leaderboard = [...traders].sort((a, b) => b.return30d - a.return30d)

export function getTraderById(id: string): Trader | undefined {
  return traders.find(t => t.id === id)
}

export function getRiskLabel(score: number): string {
  const labels: Record<number, string> = {
    1: 'Very Low',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Very High',
  }
  return labels[score] ?? 'Unknown'
}

export function getRiskColor(score: number): string {
  const colors: Record<number, string> = {
    1: 'text-green-500',
    2: 'text-green-400',
    3: 'text-yellow-500',
    4: 'text-orange-500',
    5: 'text-red-500',
  }
  return colors[score] ?? 'text-gray-500'
}
