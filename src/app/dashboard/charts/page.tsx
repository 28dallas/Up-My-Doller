'use client'
import { useState, useEffect } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine
} from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

const MARKETS = [
  'Volatility 10 (1s)', 'Volatility 25 (1s)', 'Volatility 50 (1s)',
  'Volatility 75 (1s)', 'Volatility 100 (1s)',
  'Crash 500', 'Crash 1000', 'Boom 500', 'Boom 1000', 'Step Index',
]

const TIMEFRAMES = ['1T', '5T', '10T', '1M', '5M', '15M', '1H']

function generateOHLC(count: number, base: number) {
  const data = []
  let price = base
  for (let i = 0; i < count; i++) {
    const open = price
    const change = (Math.random() - 0.48) * base * 0.003
    const close = open + change
    const high = Math.max(open, close) + Math.random() * base * 0.001
    const low = Math.min(open, close) - Math.random() * base * 0.001
    price = close
    data.push({
      time: `${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      open: parseFloat(open.toFixed(4)),
      close: parseFloat(close.toFixed(4)),
      high: parseFloat(high.toFixed(4)),
      low: parseFloat(low.toFixed(4)),
      bullish: close >= open,
      body: [Math.min(open, close), Math.max(open, close)],
      wick: [low, high],
      volume: Math.floor(Math.random() * 100 + 20),
    })
  }
  return data
}

const CustomCandlestick = (props: any) => {
  const { x, y, width, height, payload } = props
  if (!payload) return null
  const { open, close, high, low, bullish } = payload
  const color = bullish ? '#00E676' : '#EF4444'
  const candleX = x + width / 2

  return (
    <g>
      {/* Wick */}
      <line x1={candleX} y1={y} x2={candleX} y2={y + height} stroke={color} strokeWidth={1} />
      {/* Body */}
      <rect
        x={x + 1}
        y={Math.min(props.openY, props.closeY)}
        width={width - 2}
        height={Math.abs(props.openY - props.closeY) || 1}
        fill={color}
        stroke={color}
      />
    </g>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0]?.payload
    if (!d) return null
    const bullish = d.close >= d.open
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-xs space-y-1 min-w-[140px]">
        <p className="text-muted-foreground font-medium">{d.time}</p>
        <p className="text-white">O: <span className="font-mono">{d.open}</span></p>
        <p className="text-white">H: <span className="font-mono text-success">{d.high}</span></p>
        <p className="text-white">L: <span className="font-mono text-danger">{d.low}</span></p>
        <p className={bullish ? 'text-success' : 'text-danger'}>C: <span className="font-mono font-bold">{d.close}</span></p>
      </div>
    )
  }
  return null
}

export default function ChartsPage() {
  const [market, setMarket] = useState('Volatility 10 (1s)')
  const [timeframe, setTimeframe] = useState('1T')
  const [data, setData] = useState(() => generateOHLC(60, 1234.56))
  const [currentPrice, setCurrentPrice] = useState(data[data.length - 1]?.close ?? 0)
  const [priceChange, setPriceChange] = useState(0)

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1]
        const change = (Math.random() - 0.48) * last.close * 0.002
        const newClose = parseFloat((last.close + change).toFixed(4))
        const newCandle = {
          time: new Date().toTimeString().slice(0, 5),
          open: last.close,
          close: newClose,
          high: Math.max(last.close, newClose) + Math.random() * 0.001,
          low: Math.min(last.close, newClose) - Math.random() * 0.001,
          bullish: newClose >= last.close,
          body: [Math.min(last.close, newClose), Math.max(last.close, newClose)],
          wick: [0, 0],
          volume: Math.floor(Math.random() * 100 + 20),
        }
        setPriceChange(parseFloat((newClose - prev[0].open).toFixed(4)))
        setCurrentPrice(newClose)
        return [...prev.slice(-59), newCandle]
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Regenerate data on market change
  useEffect(() => {
    const base = market.includes('Volatility 10') ? 1234.56
      : market.includes('Volatility 25') ? 2345.67
      : market.includes('Boom') ? 8765.43
      : market.includes('Crash') ? 5432.10
      : 1000.00
    const newData = generateOHLC(60, base)
    setData(newData)
    setCurrentPrice(newData[newData.length - 1].close)
  }, [market])

  const bullish = priceChange >= 0
  const lastCandle = data[data.length - 1]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Charts</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Live market price charts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-success text-xs font-medium">Live</span>
        </div>
      </div>

      {/* Market selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {MARKETS.map((m) => (
          <button
            key={m}
            onClick={() => setMarket(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${market === m ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:text-white'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Price header */}
      <Card className="py-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-muted-foreground text-xs mb-1">{market}</div>
            <div className="text-3xl font-bold font-mono text-white">{currentPrice.toFixed(4)}</div>
            <div className={`flex items-center gap-1 text-sm font-semibold mt-1 ${bullish ? 'text-success' : 'text-danger'}`}>
              {bullish ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {bullish ? '+' : ''}{priceChange.toFixed(4)}
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {[
              { label: 'Open', value: lastCandle?.open.toFixed(4) },
              { label: 'High', value: lastCandle?.high.toFixed(4), color: 'text-success' },
              { label: 'Low', value: lastCandle?.low.toFixed(4), color: 'text-danger' },
              { label: 'Close', value: lastCandle?.close.toFixed(4) },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="text-muted-foreground text-xs">{label}</div>
                <div className={`font-mono font-bold text-sm ${color ?? 'text-white'}`}>{value}</div>
              </div>
            ))}
          </div>
          {/* Timeframe selector */}
          <div className="ml-auto flex bg-background border border-border rounded-lg overflow-hidden">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${timeframe === tf ? 'bg-primary text-black' : 'text-muted-foreground hover:text-white'}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main chart */}
      <Card className="p-4">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A40" />
            <XAxis dataKey="time" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} interval={9} />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: '#8899AA', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.toFixed(2)}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={currentPrice} stroke="#00E676" strokeDasharray="4 4" strokeWidth={1} />
            {/* Render candle bodies as bars */}
            <Bar dataKey="close" fill="transparent" shape={(props: any) => {
              const { x, y, width, payload } = props
              if (!payload) return <g />
              const bullish = payload.close >= payload.open
              const color = bullish ? '#00E676' : '#EF4444'
              return (
                <g>
                  <rect
                    x={x + 1}
                    y={Math.min(y, y + (payload.open - payload.close))}
                    width={Math.max(width - 2, 1)}
                    height={Math.max(Math.abs(payload.open - payload.close) * 50, 1)}
                    fill={color}
                    opacity={0.85}
                  />
                </g>
              )
            }} />
            <Line type="monotone" dataKey="close" stroke="#00E676" strokeWidth={1.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Volume chart */}
      <Card className="p-4">
        <div className="text-muted-foreground text-xs mb-3 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          Volume
        </div>
        <ResponsiveContainer width="100%" height={80}>
          <ComposedChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
              {data.map((entry, i) => (
                <rect key={i} fill={entry.bullish ? '#00E67640' : '#EF444440'} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Market info cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '24h High', value: Math.max(...data.map((d) => d.high)).toFixed(4), color: 'text-success' },
          { label: '24h Low', value: Math.min(...data.map((d) => d.low)).toFixed(4), color: 'text-danger' },
          { label: 'Avg Volume', value: Math.round(data.reduce((s, d) => s + d.volume, 0) / data.length).toString(), color: 'text-white' },
          { label: 'Candles', value: data.length.toString(), color: 'text-primary' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="py-3 text-center">
            <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
