'use client'
import { useState } from 'react'
import { Cpu, TrendingUp, TrendingDown, RefreshCw, Zap, BarChart2, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const MARKETS = ['Volatility 10', 'Volatility 25', 'Volatility 75', 'Boom 1000', 'Crash 500', 'Step Index']

const RADAR_DATA = [
  { subject: 'Trend', V10: 82, V25: 65, Boom: 78 },
  { subject: 'Momentum', V10: 74, V25: 58, Boom: 85 },
  { subject: 'Volatility', V10: 45, V25: 62, Boom: 90 },
  { subject: 'Volume', V10: 88, V25: 72, Boom: 68 },
  { subject: 'Pattern', V10: 70, V25: 55, Boom: 75 },
  { subject: 'Signal', V10: 78, V25: 68, Boom: 82 },
]

const DIGIT_STATS = Array.from({ length: 10 }, (_, i) => ({
  digit: i.toString(),
  count: Math.floor(Math.random() * 80 + 20),
  pct: Math.floor(Math.random() * 15 + 5),
}))

const INSIGHTS = [
  { market: 'Volatility 10', signal: 'OVER', confidence: 84, reason: 'Last 8 ticks averaged digit 6.2. Strong over bias detected.', type: 'bullish' },
  { market: 'Boom 1000', signal: 'RISE', confidence: 79, reason: 'No spike in last 847 ticks. Spike probability increasing.', type: 'bullish' },
  { market: 'Crash 500', signal: 'FALL', confidence: 72, reason: 'Spike occurred 12 ticks ago. Downward pressure expected.', type: 'bearish' },
  { market: 'Volatility 25', signal: 'EVEN', confidence: 68, reason: 'Even digits appeared 58% of last 50 ticks.', type: 'neutral' },
  { market: 'Step Index', signal: 'OVER', confidence: 65, reason: 'Consistent upward step pattern detected over 20 ticks.', type: 'bullish' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs">
        <p className="text-muted-foreground">Digit {label}</p>
        <p className="text-primary font-bold">{payload[0]?.value} times</p>
      </div>
    )
  }
  return null
}

export default function SmartAnalysisPage() {
  const [selectedMarket, setSelectedMarket] = useState('Volatility 10')
  const [scanning, setScanning] = useState(false)
  const [lastScan, setLastScan] = useState('14:32:05')

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setLastScan(new Date().toTimeString().slice(0, 8))
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            Smart Analysis
          </h1>
          <p className="text-muted-foreground text-sm mt-1">AI-powered market pattern detection and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-xs">Last scan: {lastScan}</span>
          <Button variant="primary" size="sm" onClick={handleScan} disabled={scanning}>
            <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
            {scanning ? 'Scanning...' : 'Scan Markets'}
          </Button>
        </div>
      </div>

      {/* Market selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {MARKETS.map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMarket(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${selectedMarket === m ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* AI Insights */}
      <div>
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-gold" />
          AI Market Insights
        </h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {INSIGHTS.map((insight, i) => (
            <Card key={i} className={`border ${insight.type === 'bullish' ? 'border-success/20' : insight.type === 'bearish' ? 'border-danger/20' : 'border-border'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-sm">{insight.market}</div>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-bold ${insight.type === 'bullish' ? 'text-success' : insight.type === 'bearish' ? 'text-danger' : 'text-warning'}`}>
                    {insight.type === 'bullish' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {insight.signal}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold font-mono ${insight.confidence >= 75 ? 'text-success' : insight.confidence >= 65 ? 'text-warning' : 'text-danger'}`}>
                    {insight.confidence}%
                  </div>
                  <div className="text-muted-foreground text-xs">confidence</div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full mb-3">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${insight.confidence}%`,
                    backgroundColor: insight.confidence >= 75 ? '#00E676' : insight.confidence >= 65 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{insight.reason}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Digit analysis + Radar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Digit frequency */}
        <Card>
          <h2 className="text-white font-bold mb-1 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            Digit Frequency — {selectedMarket}
          </h2>
          <p className="text-muted-foreground text-xs mb-4">Last 500 ticks</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DIGIT_STATS} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" vertical={false} />
              <XAxis dataKey="digit" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8899AA', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {DIGIT_STATS.map((entry, i) => (
                  <rect key={i} fill={entry.count > 60 ? '#00E676' : entry.count > 40 ? '#F59E0B' : '#8899AA'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-success inline-block" />High freq</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-warning inline-block" />Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-muted-foreground inline-block" />Low</span>
          </div>
        </Card>

        {/* Radar chart */}
        <Card>
          <h2 className="text-white font-bold mb-1">Market Strength Radar</h2>
          <p className="text-muted-foreground text-xs mb-2">Multi-factor analysis comparison</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#1E2A40" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8899AA', fontSize: 11 }} />
              <Radar name="V10" dataKey="V10" stroke="#00E676" fill="#00E676" fillOpacity={0.15} />
              <Radar name="V25" dataKey="V25" stroke="#FFD700" fill="#FFD700" fillOpacity={0.1} />
              <Radar name="Boom" dataKey="Boom" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-1 text-xs">
            <span className="flex items-center gap-1 text-primary"><span className="w-2 h-2 rounded-full bg-primary inline-block" />V10</span>
            <span className="flex items-center gap-1 text-gold"><span className="w-2 h-2 rounded-full bg-gold inline-block" />V25</span>
            <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />Boom</span>
          </div>
        </Card>
      </div>

      {/* Pattern alerts */}
      <Card>
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Pattern Alerts
        </h2>
        <div className="space-y-3">
          {[
            { market: 'Volatility 10', pattern: 'Consecutive Overs', count: 5, action: 'Consider UNDER next', severity: 'warning' },
            { market: 'Boom 1000', pattern: 'Long no-spike streak', count: 847, action: 'Spike probability HIGH', severity: 'success' },
            { market: 'Volatility 25', pattern: 'Digit 7 hot streak', count: 4, action: 'Digit 7 match opportunity', severity: 'info' },
          ].map((alert, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
              alert.severity === 'warning' ? 'border-warning/20 bg-warning/5' :
              alert.severity === 'success' ? 'border-success/20 bg-success/5' :
              'border-blue-400/20 bg-blue-400/5'
            }`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                alert.severity === 'warning' ? 'bg-warning' :
                alert.severity === 'success' ? 'bg-success' : 'bg-blue-400'
              }`} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{alert.market} — {alert.pattern}</div>
                <div className="text-muted-foreground text-xs">{alert.count} occurrences · {alert.action}</div>
              </div>
              <Badge variant={alert.severity === 'warning' ? 'yellow' : alert.severity === 'success' ? 'green' : 'blue'}>
                {alert.severity === 'warning' ? 'Caution' : alert.severity === 'success' ? 'Opportunity' : 'Info'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
