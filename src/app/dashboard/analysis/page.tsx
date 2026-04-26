'use client'
import { useState, useEffect } from 'react'
import { Play, RotateCcw, ChevronLeft, AlertTriangle, X } from 'lucide-react'

type Tab = 'summary' | 'transactions' | 'journal'
type ToolTab = 'analysis' | 'ldp' | 'stats'

const MARKETS = ['Volatility 10','Volatility 25','Volatility 50','Volatility 75','Volatility 100','Crash 500','Crash 1000','Boom 500','Boom 1000','Step Index']
const TRADE_TYPES = ['Even/Odd','Over/Under','Rise/Fall','Digit Match']
const BASE_PRICES: Record<string, number> = {
  'Volatility 10': 4904.49, 'Volatility 25': 2345.67, 'Volatility 50': 3456.78,
  'Volatility 75': 1234.56, 'Volatility 100': 567.89, 'Crash 500': 8765.43,
  'Crash 1000': 9876.54, 'Boom 500': 7654.32, 'Boom 1000': 6543.21, 'Step Index': 1000.00,
}

export default function AnalysisPage() {
  const [toolTab, setToolTab] = useState<ToolTab>('analysis')
  const [rightTab, setRightTab] = useState<Tab>('summary')
  const [running, setRunning] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [market, setMarket] = useState('Volatility 10')
  const [tradeType, setTradeType] = useState('Even/Odd')
  const [ticks, setTicks] = useState(120)
  const [price, setPrice] = useState(4904.49)
  const [digits, setDigits] = useState<number[]>(Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)))

  useEffect(() => {
    setPrice(BASE_PRICES[market] ?? 1000)
    setDigits(Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)))
    const interval = setInterval(() => {
      setPrice((p) => parseFloat((p + (Math.random() - 0.48) * p * 0.001).toFixed(2)))
      setDigits((d) => [Math.floor(Math.random() * 10), ...d.slice(0, 29)])
    }, 1000)
    return () => clearInterval(interval)
  }, [market])

  const evenCount = digits.filter((d) => d % 2 === 0).length
  const oddCount = digits.filter((d) => d % 2 !== 0).length
  const overCount = digits.filter((d) => d > 4).length
  const underCount = digits.filter((d) => d <= 4).length
  const lastDigit = digits[0] ?? 0
  const digitFreq = Array.from({ length: 10 }, (_, i) => ({ digit: i, count: digits.filter((d) => d === i).length }))

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
        {(['summary','transactions','journal'] as Tab[]).map((t) => (
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
              <p className="text-[#8899AA] text-sm leading-relaxed">When you&apos;re ready to trade, hit <strong className="text-white">Run</strong>.<br />You&apos;ll be able to track your bot&apos;s performance here.</p>
            </div>
            <div className="border-t border-[#1E2A40] p-4">
              <div className="flex justify-end mb-2"><button className="text-xs text-primary hover:underline">What&apos;s this?</button></div>
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                {[['Total stake','0.00'],['Total payout','0.00'],['No. of runs','0']].map(([l,v]) => (
                  <div key={l}><div className="text-xs text-[#8899AA]">{l}</div><div className="text-sm font-semibold text-white">{v}</div></div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Contracts lost','0'],['Contracts won','0'],['Profit/loss','0.00']].map(([l,v]) => (
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
    <div className="flex h-[calc(100vh-96px)] bg-[#0A0E1A] text-white overflow-hidden relative">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Tool tabs */}
        <div className="flex border-b border-[#1E2A40] bg-[#121829]">
          {[{key:'analysis',label:'AnalysisTool'},{key:'ldp',label:'LDP Tool'},{key:'stats',label:'Stats'}].map(({key,label}) => (
            <button key={key} onClick={() => setToolTab(key as ToolTab)}
              className={`flex-1 max-w-xs py-3 text-sm font-medium transition-all border-b-2 ${
                toolTab === key ? 'bg-[#1a237e] text-white border-primary' : 'text-[#8899AA] border-transparent hover:text-white hover:bg-white/5'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto bg-[#0A0E1A]">

          {/* AnalysisTool */}
          {toolTab === 'analysis' && (
            <div className="max-w-4xl mx-auto p-6 space-y-4">
              <div className="text-center py-4">
                <h1 className="text-3xl font-extrabold" style={{
                  background: 'linear-gradient(90deg, #00E676, #FFD700)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontFamily: 'Arial Black, sans-serif', letterSpacing: '1px',
                }}>
                  Binarytool Analysistool 🌐
                </h1>
              </div>

              {/* Market + Trade Type */}
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-[#8899AA] mb-2 block">Synthetic Market</label>
                    <select value={market} onChange={(e) => setMarket(e.target.value)}
                      className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                      {MARKETS.map((m) => <option key={m} className="bg-[#121829]">{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#8899AA] mb-2 block">Trade Type</label>
                    <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}
                      className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                      {TRADE_TYPES.map((t) => <option key={t} className="bg-[#121829]">{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-[#8899AA] mb-2 block">Number of Ticks to Analyze</label>
                  <input type="number" value={ticks} onChange={(e) => setTicks(Number(e.target.value))}
                    className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                </div>
              </div>

              {/* Price + counts */}
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <div className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1">CURRENT PRICE</div>
                <div className="text-4xl font-bold text-primary mb-4 font-mono">{price.toFixed(2)}</div>
                {tradeType === 'Even/Odd' && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-sm text-[#8899AA] mb-1">Even</div><div className="text-3xl font-bold text-white">{evenCount}</div></div>
                    <div><div className="text-sm text-[#8899AA] mb-1">Odd</div><div className="text-3xl font-bold text-white">{oddCount}</div></div>
                  </div>
                )}
                {tradeType === 'Over/Under' && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-sm text-[#8899AA] mb-1">Over</div><div className="text-3xl font-bold text-success">{overCount}</div></div>
                    <div><div className="text-sm text-[#8899AA] mb-1">Under</div><div className="text-3xl font-bold text-warning">{underCount}</div></div>
                  </div>
                )}
                {tradeType === 'Rise/Fall' && (
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div><div className="text-sm text-[#8899AA] mb-1">Rise</div><div className="text-3xl font-bold text-success">{overCount}</div></div>
                    <div><div className="text-sm text-[#8899AA] mb-1">Fall</div><div className="text-3xl font-bold text-danger">{underCount}</div></div>
                  </div>
                )}
                {tradeType === 'Digit Match' && (
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {digitFreq.map(({digit,count}) => (
                      <div key={digit} className="bg-[#0A0E1A] rounded p-2 border border-[#1E2A40]">
                        <div className="text-xs text-[#8899AA]">Digit {digit}</div>
                        <div className="text-lg font-bold text-white">{count}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pattern */}
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <div className="text-sm font-semibold text-[#8899AA] mb-4">
                  ⊞ {tradeType === 'Even/Odd' ? 'Even/Odd' : tradeType === 'Over/Under' ? 'Over/Under' : tradeType === 'Rise/Fall' ? 'Rise/Fall' : 'Digit'} Pattern
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {digits.map((d, i) => {
                    let label = ''
                    let bg = ''
                    if (tradeType === 'Even/Odd') { label = d % 2 === 0 ? 'E' : 'O'; bg = d % 2 === 0 ? 'bg-blue-500' : 'bg-red-500' }
                    else if (tradeType === 'Over/Under') { label = d > 4 ? 'O' : 'U'; bg = d > 4 ? 'bg-green-500' : 'bg-orange-500' }
                    else if (tradeType === 'Rise/Fall') { label = i === 0 ? '→' : digits[i] > (digits[i-1] ?? d) ? '↑' : '↓'; bg = i === 0 ? 'bg-gray-500' : digits[i] > (digits[i-1] ?? d) ? 'bg-green-500' : 'bg-red-500' }
                    else { label = d.toString(); bg = ['bg-blue-500','bg-purple-500','bg-green-500','bg-yellow-500','bg-red-500','bg-pink-500','bg-indigo-500','bg-teal-500','bg-orange-500','bg-cyan-500'][d] }
                    return (
                      <div key={i} className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white text-xs font-bold ${i === 0 ? 'ring-2 ring-offset-1 ring-gold ring-offset-[#121829] scale-110' : ''}`}>
                        {label}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${lastDigit % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'}`}>{lastDigit}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">Last Digit: {lastDigit}</div>
                    <div className={`text-xs font-medium ${lastDigit % 2 === 0 ? 'text-primary' : 'text-danger'}`}>
                      {tradeType === 'Even/Odd' ? (lastDigit % 2 === 0 ? '→ EVEN' : '→ ODD') : tradeType === 'Over/Under' ? (lastDigit > 4 ? '→ OVER' : '→ UNDER') : `→ Digit ${lastDigit}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak */}
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <div className="text-sm font-semibold text-[#8899AA] mb-3">Streak Analysis</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#0A0E1A] rounded-lg p-3 border border-[#1E2A40]">
                    <div className="text-xs text-[#8899AA]">{tradeType === 'Even/Odd' ? 'Even %' : tradeType === 'Rise/Fall' ? 'Rise %' : 'Over %'}</div>
                    <div className="text-2xl font-bold text-primary">{Math.round((evenCount / digits.length) * 100)}%</div>
                  </div>
                  <div className="bg-[#0A0E1A] rounded-lg p-3 border border-[#1E2A40]">
                    <div className="text-xs text-[#8899AA]">{tradeType === 'Even/Odd' ? 'Odd %' : tradeType === 'Rise/Fall' ? 'Fall %' : 'Under %'}</div>
                    <div className="text-2xl font-bold text-danger">{Math.round((oddCount / digits.length) * 100)}%</div>
                  </div>
                  <div className="bg-[#0A0E1A] rounded-lg p-3 border border-[#1E2A40]">
                    <div className="text-xs text-[#8899AA]">Bias</div>
                    <div className={`text-lg font-bold ${evenCount > oddCount ? 'text-primary' : 'text-danger'}`}>
                      {evenCount > oddCount ? (tradeType === 'Even/Odd' ? 'EVEN' : tradeType === 'Rise/Fall' ? 'RISE' : 'OVER') : (tradeType === 'Even/Odd' ? 'ODD' : tradeType === 'Rise/Fall' ? 'FALL' : 'UNDER')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LDP Tool */}
          {toolTab === 'ldp' && (
            <div className="max-w-4xl mx-auto p-6 space-y-4">
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <h2 className="text-lg font-bold text-white mb-4">Last Digit Prediction (LDP)</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-[#8899AA] mb-1 block">Market</label>
                    <select value={market} onChange={(e) => setMarket(e.target.value)}
                      className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                      {MARKETS.map((m) => <option key={m} className="bg-[#121829]">{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#8899AA] mb-1 block">Ticks</label>
                    <input type="number" value={ticks} onChange={(e) => setTicks(Number(e.target.value))}
                      className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#8899AA] uppercase mb-2">Current Price</div>
                <div className="text-3xl font-bold text-primary font-mono mb-4">{price.toFixed(2)}</div>
                <div className="grid grid-cols-5 gap-2">
                  {digitFreq.map(({digit,count}) => {
                    const pct = Math.round((count / digits.length) * 100)
                    return (
                      <div key={digit} className={`rounded-lg p-3 text-center border-2 ${digit === lastDigit ? 'border-primary bg-primary/10' : 'border-[#1E2A40] bg-[#0A0E1A]'}`}>
                        <div className="text-lg font-bold text-white">{digit}</div>
                        <div className="text-xs text-[#8899AA]">{count}x</div>
                        <div className="text-xs font-semibold text-primary">{pct}%</div>
                        <div className="mt-1 h-1 bg-[#1E2A40] rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          {toolTab === 'stats' && (
            <div className="max-w-4xl mx-auto p-6 space-y-4">
              <div className="bg-[#121829] rounded-lg border border-[#1E2A40] p-5">
                <h2 className="text-lg font-bold text-white mb-4">Market Statistics</h2>
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#8899AA] mb-1 block">Market</label>
                  <select value={market} onChange={(e) => setMarket(e.target.value)}
                    className="w-full border border-[#1E2A40] bg-[#0A0E1A] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-primary max-w-xs">
                    {MARKETS.map((m) => <option key={m} className="bg-[#121829]">{m}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {label:'Current Price', value:price.toFixed(2), color:'text-primary'},
                    {label:'Last Digit', value:lastDigit, color:'text-white'},
                    {label:'Even Count', value:evenCount, color:'text-blue-400'},
                    {label:'Odd Count', value:oddCount, color:'text-danger'},
                    {label:'Over Count', value:overCount, color:'text-success'},
                    {label:'Under Count', value:underCount, color:'text-warning'},
                    {label:'Even %', value:`${Math.round((evenCount/digits.length)*100)}%`, color:'text-primary'},
                    {label:'Odd %', value:`${Math.round((oddCount/digits.length)*100)}%`, color:'text-danger'},
                  ].map(({label,value,color}) => (
                    <div key={label} className="bg-[#0A0E1A] rounded-lg p-3 text-center border border-[#1E2A40]">
                      <div className="text-xs text-[#8899AA] mb-1">{label}</div>
                      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {rightPanelOpen && <RightPanel />}

      <button
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
        className="absolute top-1/2 -translate-y-1/2 w-5 h-10 bg-[#1E2A40] border border-[#1E2A40] rounded-l flex items-center justify-center hover:bg-[#2a3a50] transition-all z-10"
        style={{ right: rightPanelOpen ? '288px' : '0' }}
      >
        <ChevronLeft className={`w-3 h-3 text-[#8899AA] transition-transform ${!rightPanelOpen ? 'rotate-180' : ''}`} />
      </button>

      {showDisclaimer && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="flex items-center gap-2 bg-warning text-black px-3 py-2 rounded-lg text-xs font-semibold shadow-lg">
            <AlertTriangle className="w-3.5 h-3.5" />Risk Disclaimer
            <button onClick={() => setShowDisclaimer(false)} className="ml-1 hover:opacity-70"><X className="w-3 h-3" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
