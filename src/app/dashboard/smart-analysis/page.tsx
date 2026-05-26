'use client'
import { useState, useEffect } from 'react'
import { Play, RotateCcw, AlertTriangle, X, ChevronLeft, Upload, Download, Settings } from 'lucide-react'

type Tab = 'summary' | 'transactions' | 'journal'
type ToolTab = 'smart' | 'manual'

const MARKETS = [
  'Volatility 10 (1s)', 'Volatility 25 (1s)', 'Volatility 50 (1s)',
  'Volatility 75 (1s)', 'Volatility 100 (1s)',
  'Crash 500', 'Crash 1000', 'Boom 500', 'Boom 1000', 'Step Index',
]

export default function SmartAnalysisPage() {
  const [toolTab, setToolTab] = useState<ToolTab>('smart')
  const [rightTab, setRightTab] = useState<Tab>('summary')
  const [running, setRunning] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const [market, setMarket] = useState('')
  const [ticks, setTicks] = useState(1000)
  const [ldp, setLdp] = useState(0)
  const [ldpTicks, setLdpTicks] = useState(1)
  const [stake, setStake] = useState(0.5)
  const [martingale, setMartingale] = useState(1.2)
  const [selectedDigit, setSelectedDigit] = useState<number | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [digits, setDigits] = useState<number[]>([])

  // Simulate live price + digits when market selected
  useEffect(() => {
    if (!market) return
    const bases: Record<string, number> = {
      'Volatility 10 (1s)': 4904.49, 'Volatility 25 (1s)': 2345.67,
      'Volatility 50 (1s)': 3456.78, 'Volatility 75 (1s)': 1234.56,
      'Volatility 100 (1s)': 567.89, 'Crash 500': 8765.43,
      'Crash 1000': 9876.54, 'Boom 500': 7654.32, 'Boom 1000': 6543.21, 'Step Index': 1000.00,
    }
    const base = bases[market] ?? 1000
    setPrice(base)
    setDigits(Array.from({ length: 100 }, () => Math.floor(Math.random() * 10)))
    const interval = setInterval(() => {
      setPrice((p) => p ? parseFloat((p + (Math.random() - 0.48) * p * 0.001).toFixed(2)) : base)
      setDigits((d) => [Math.floor(Math.random() * 10), ...d.slice(0, 99)])
    }, 500)
    return () => clearInterval(interval)
  }, [market])

  // Digit stats
  const digitStats = Array.from({ length: 10 }, (_, i) => ({
    digit: i,
    count: digits.filter((d) => d === i).length,
    pct: digits.length > 0 ? (digits.filter((d) => d === i).length / digits.length * 100) : 0,
  }))

  const evenCount = digits.filter((d) => d % 2 === 0).length
  const oddCount = digits.filter((d) => d % 2 !== 0).length
  const overCount = digits.filter((d) => d > 4).length
  const underCount = digits.filter((d) => d <= 4).length
  const matchCount = selectedDigit !== null ? digits.filter((d) => d === selectedDigit).length : 0

  const evenPct = digits.length > 0 ? (evenCount / digits.length * 100) : 0
  const oddPct = digits.length > 0 ? (oddCount / digits.length * 100) : 0
  const overPct = digits.length > 0 ? (overCount / digits.length * 100) : 0
  const underPct = digits.length > 0 ? (underCount / digits.length * 100) : 0
  const matchPct = digits.length > 0 && selectedDigit !== null ? (matchCount / digits.length * 100) : 0

  const RightPanel = () => (
    <div className="w-72 border-l border-[#1E2A40] bg-[#121829] flex flex-col shrink-0">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E2A40]">
        <button
          onClick={() => setRunning(!running)}
          className={`flex items-center gap-2 px-5 py-2 rounded font-semibold text-sm transition-all ${running ? 'bg-danger hover:bg-danger/90 text-white' : 'bg-primary hover:bg-primary/90 text-black'}`}
        >
          <Play className="w-4 h-4" style={{ fill: running ? 'white' : 'black' }} />
          {running ? 'Stop' : 'Run'}
        </button>
        <span className="text-xs">
          {running
            ? <span className="flex items-center gap-1 text-primary font-medium"><span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />Bot is running</span>
            : <span className="text-[#8899AA]">Bot is not running</span>}
        </span>
      </div>
      <div className="flex border-b border-[#1E2A40]">
        {(['summary', 'transactions', 'journal'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setRightTab(t)}
            className={`flex-1 py-2.5 text-xs font-medium capitalize transition-all border-b-2 ${rightTab === t ? 'border-primary text-primary' : 'border-transparent text-[#8899AA] hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto flex flex-col">
        {rightTab === 'summary' && (
          <>
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <p className="text-[#8899AA] text-sm leading-relaxed">
                When you&apos;re ready to trade, hit <strong className="text-white">Run</strong>.<br />
                You&apos;ll be able to track your bot&apos;s performance here.
              </p>
            </div>
            <div className="border-t border-[#1E2A40] p-4">
              <div className="flex justify-end mb-2"><button className="text-xs text-primary hover:underline">What&apos;s this?</button></div>
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                {[['Total stake','0.00 AUD'],['Total payout','0.00 AUD'],['No. of runs','0']].map(([l,v]) => (
                  <div key={l}><div className="text-xs text-[#8899AA]">{l}</div><div className="text-sm font-semibold text-white">{v}</div></div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Contracts lost','0'],['Contracts won','0'],['Total profit/loss','0.00 AUD']].map(([l,v]) => (
                  <div key={l}><div className="text-xs text-[#8899AA]">{l}</div><div className="text-sm font-semibold text-white">{v}</div></div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-[#1E2A40] rounded text-sm text-[#8899AA] hover:bg-white/5 flex items-center justify-center gap-1 transition-all">
                <RotateCcw className="w-3.5 h-3.5" />Reset
              </button>
            </div>
          </>
        )}
        {rightTab === 'transactions' && <div className="flex-1 flex items-center justify-center p-6 text-center"><p className="text-[#8899AA] text-sm">No transactions yet.</p></div>}
        {rightTab === 'journal' && <div className="flex-1 flex items-center justify-center p-6 text-center"><p className="text-[#8899AA] text-sm">Journal is empty.</p></div>}
      </div>
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-96px)] bg-[#f0f0f0] overflow-hidden relative">

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Tool tabs */}
        <div className="flex border-b border-gray-300 bg-white">
          {[{key:'smart',label:'Smart Analysis'},{key:'manual',label:'Manual'}].map(({key,label}) => (
            <button key={key} onClick={() => setToolTab(key as ToolTab)}
              className={`flex-1 max-w-xs py-3 text-sm font-medium transition-all border-b-2 ${
                toolTab === key ? 'bg-[#1a237e] text-white border-[#1a237e]' : 'text-gray-600 border-transparent hover:bg-gray-50'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto bg-[#f0f0f0]">

          {/* Smart Analysis tab */}
          {toolTab === 'smart' && (
            <div className="p-3 space-y-3">

              {/* Top controls bar */}
              <div className="flex items-center gap-3 flex-wrap bg-white rounded border border-gray-200 px-3 py-2">
                {/* Market selector */}
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:border-blue-500 bg-white min-w-[140px]"
                >
                  <option value="">SELECT MARKET</option>
                  {MARKETS.map((m) => <option key={m}>{m}</option>)}
                </select>

                {/* Ticks */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Ticks</span>
                  <input type="number" value={ticks} onChange={(e) => setTicks(Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-600">PRICE</span>
                  <span className="text-xs text-blue-600 font-semibold">
                    {market && price ? price.toFixed(2) : 'Updating...'}
                  </span>
                </div>

                {/* Manual LDP dropdown */}
                <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none bg-white">
                  <option>Select an Option</option>
                  <option>Manual LDP</option>
                  <option>Auto LDP</option>
                </select>

                {/* Upload / Download / Strategies */}
                <div className="flex items-center gap-2 ml-auto">
                  <button className="flex flex-col items-center gap-0.5 text-red-500 hover:opacity-80 transition-all">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Upload</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 text-green-500 hover:opacity-80 transition-all">
                    <Download className="w-5 h-5" />
                    <span className="text-xs">Download</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 text-green-600 hover:opacity-80 transition-all">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-xs">Strategies</span>
                  </button>
                </div>
              </div>

              {/* LDP controls */}
              <div className="flex items-center gap-4 bg-white rounded border border-gray-200 px-4 py-2">
                {[
                  { label: 'LDP:', value: ldp, set: setLdp, min: 0, max: 9 },
                  { label: 'Ticks', value: ldpTicks, set: setLdpTicks, min: 1, max: 100 },
                  { label: 'Stake', value: stake, set: setStake, min: 0.35, max: 100, step: 0.5 },
                  { label: 'Martingale', value: martingale, set: setMartingale, min: 1, max: 5, step: 0.1 },
                ].map(({ label, value, set, min, max, step }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 whitespace-nowrap">{label}</span>
                    <input
                      type="number" value={value} min={min} max={max} step={step ?? 1}
                      onChange={(e) => set(parseFloat(e.target.value))}
                      className="w-14 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none text-center"
                    />
                  </div>
                ))}
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* Main grid: 2 columns */}
              <div className="grid grid-cols-2 gap-3">

                {/* Left: Digit selector */}
                <div className="bg-white rounded border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 text-center mb-4">Click on circles to select Prediction</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: 10 }, (_, i) => {
                      const stat = digitStats[i]
                      const isSelected = selectedDigit === i
                      const pct = stat.pct.toFixed(1)
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDigit(isSelected ? null : i)}
                          className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 transition-all mx-auto ${
                            isSelected
                              ? 'bg-purple-600 border-purple-400 text-white shadow-lg scale-110'
                              : 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                          }`}
                        >
                          <span className="text-base font-bold leading-none">{i}</span>
                          <span className="text-xs opacity-80">{market ? `${pct}%` : 'NaN%'}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right: Trade buttons */}
                <div className="bg-white rounded border border-gray-200 p-4 flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-700 text-center mb-4">Click on the button to take a trade</h3>
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded transition-all">
                      Over {market ? `${overPct.toFixed(1)}%` : 'NaN%'}
                    </button>
                    <button className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded transition-all">
                      Under {market ? `${underPct.toFixed(1)}%` : 'NaN%'}
                    </button>
                    <button className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded transition-all">
                      Matches {market ? `${matchPct.toFixed(1)}%` : 'NaN%'}
                    </button>
                    <button className="w-10 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-all">
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom grid: Even/Odd + Rise/Fall */}
              <div className="grid grid-cols-2 gap-3">

                {/* Even/Odd */}
                <div className="bg-white rounded border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">Even Odd</h3>
                  <div className="flex items-center gap-4 mb-3 justify-center">
                    {[
                      { label: 'Ticks', value: 1 },
                      { label: 'Stake', value: 0.5 },
                      { label: 'Martingale', value: 1.2 },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{label}</span>
                        <input type="number" defaultValue={value}
                          className="w-12 border border-gray-300 rounded px-1 py-0.5 text-xs text-center focus:outline-none" />
                      </div>
                    ))}
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mb-3">Click on the button to take a trade</p>
                  <div className="flex rounded overflow-hidden">
                    <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all">
                      Even {market ? `${evenPct.toFixed(1)}%` : 'NaN%'}
                    </button>
                    <button className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all">
                      Odd {market ? `${oddPct.toFixed(1)}%` : 'NaN%'}
                    </button>
                  </div>
                </div>

                {/* Rise/Fall */}
                <div className="bg-white rounded border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">Rise/Fall</h3>
                  <div className="flex items-center gap-4 mb-3 justify-center">
                    {[
                      { label: 'Ticks', value: 1 },
                      { label: 'Stake', value: 0.5 },
                      { label: 'Martingale', value: 1.2 },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{label}</span>
                        <input type="number" defaultValue={value}
                          className="w-12 border border-gray-300 rounded px-1 py-0.5 text-xs text-center focus:outline-none" />
                      </div>
                    ))}
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 text-center mb-3">Click on the button to take a trade</p>
                  <div className="flex rounded overflow-hidden">
                    <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all">
                      Rise {market ? `${overPct.toFixed(2)}%` : '0.00%'}
                    </button>
                    <button className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all">
                      Fall {market ? `${underPct.toFixed(2)}%` : '0.00%'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manual tab */}
          {toolTab === 'manual' && (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="bg-white rounded border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Manual Trading</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Market</label>
                    <select value={market} onChange={(e) => setMarket(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                      <option value="">Select Market</option>
                      {MARKETS.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Stake</label>
                    <input type="number" value={stake} onChange={(e) => setStake(parseFloat(e.target.value))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                {market && price && (
                  <div className="mb-4 p-3 bg-gray-50 rounded border">
                    <div className="text-xs text-gray-500">Current Price</div>
                    <div className="text-2xl font-bold text-blue-600 font-mono">{price.toFixed(2)}</div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition-all">Rise</button>
                  <button className="py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-all">Fall</button>
                  <button className="py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-all">Even</button>
                  <button className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition-all">Odd</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {rightPanelOpen && <RightPanel />}

      <button
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
        className="absolute top-1/2 -translate-y-1/2 w-5 h-10 bg-gray-200 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-300 transition-all z-10"
        style={{ right: rightPanelOpen ? '288px' : '0' }}
      >
        <ChevronLeft className={`w-3 h-3 text-gray-500 transition-transform ${!rightPanelOpen ? 'rotate-180' : ''}`} />
      </button>

      {showDisclaimer && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-lg text-xs font-semibold shadow-lg">
            <AlertTriangle className="w-3.5 h-3.5" />Risk Disclaimer
            <button onClick={() => setShowDisclaimer(false)} className="ml-1 hover:opacity-70"><X className="w-3 h-3" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
