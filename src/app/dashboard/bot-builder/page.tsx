'use client'
import { useState, useRef } from 'react'
import { Monitor, Play, RotateCcw, ChevronLeft, ChevronRight, X, AlertTriangle } from 'lucide-react'

type Tab = 'summary' | 'transactions' | 'journal'
type View = 'home' | 'builder' | 'quick'

export default function BotBuilderPage() {
  const [tab, setTab] = useState<Tab>('summary')
  const [view, setView] = useState<View>('home')
  const [running, setRunning] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex h-[calc(100vh-96px)] bg-[#0A0E1A] text-white overflow-hidden">

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-[#1E2A40] bg-[#121829]">
          {['↺','📂','💾','⇅','📈','⬇'].map((icon, i) => (
            <button key={i} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-[#8899AA] text-sm transition-all">{icon}</button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary/20 text-primary text-sm">🧱</button>
          <div className="flex items-center gap-1 ml-2">
            {['↩','↪','🔍+','🔍-'].map((icon, i) => (
              <button key={i} className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-[#8899AA] text-sm">{icon}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[#0A0E1A]">

          {view === 'home' && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <h2 className="text-2xl font-semibold text-white mb-4">Load or build your bot</h2>
              <div className="w-24 border-t border-[#1E2A40] mb-6" />
              <p className="text-[#8899AA] text-sm mb-10 max-w-lg">
                Import a bot from your computer or Google Drive, build it from scratch, or start with a quick strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {/* My computer */}
                <button onClick={() => fileRef.current?.click()} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 rounded-xl border-2 border-[#1E2A40] bg-[#121829] flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <Monitor className="w-10 h-10 text-primary" />
                  </div>
                  <span className="text-sm text-[#8899AA] group-hover:text-primary transition-colors">My computer</span>
                </button>
                <input ref={fileRef} type="file" accept=".xml" className="hidden" />

                {/* Google Drive */}
                <button className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 rounded-xl border-2 border-[#1E2A40] bg-[#121829] flex items-center justify-center group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all">
                    <svg className="w-10 h-10" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                    </svg>
                  </div>
                  <span className="text-sm text-[#8899AA] group-hover:text-yellow-400 transition-colors">Google Drive</span>
                </button>

                {/* Bot builder */}
                <button onClick={() => setView('builder')} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 rounded-xl border-2 border-[#1E2A40] bg-[#121829] flex items-center justify-center group-hover:border-teal-400 group-hover:bg-teal-400/10 transition-all">
                    <svg className="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-[#8899AA] group-hover:text-teal-400 transition-colors">Bot builder</span>
                </button>

                {/* Quick strategy */}
                <button onClick={() => setView('quick')} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 rounded-xl border-2 border-[#1E2A40] bg-[#121829] flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-[#8899AA] group-hover:text-primary transition-colors">Quick strategy</span>
                </button>
              </div>
            </div>
          )}

          {view === 'builder' && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setView('home')} className="text-primary hover:underline text-sm">← Back</button>
                <span className="text-[#8899AA] text-sm">/ Bot Builder</span>
              </div>
              <div className="bg-[#121829] border-2 border-dashed border-[#1E2A40] rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">🧱</div>
                  <p className="text-[#8899AA] font-medium">Drag blocks here to build your strategy</p>
                  <p className="text-[#8899AA]/60 text-sm mt-1">Use the blocks menu on the left to get started</p>
                </div>
              </div>
            </div>
          )}

          {view === 'quick' && (
            <div className="p-6 max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setView('home')} className="text-primary hover:underline text-sm">← Back</button>
                <span className="text-[#8899AA] text-sm">/ Quick Strategy</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Strategy Builder</h3>
              <div className="space-y-4">
                {[
                  { label: 'Market', options: ['Volatility 10 (1s)', 'Volatility 25 (1s)', 'Boom 1000', 'Crash 500'] },
                  { label: 'Trade Type', options: ['Rise/Fall', 'Over/Under', 'Even/Odd', 'Digit Match'] },
                  { label: 'Contract Type', options: ['Rise', 'Fall'] },
                  { label: 'Duration', options: ['1 tick', '2 ticks', '3 ticks', '5 ticks'] },
                ].map(({ label, options }) => (
                  <div key={label}>
                    <label className="text-sm font-medium text-[#8899AA] mb-1 block">{label}</label>
                    <select className="w-full border border-[#1E2A40] bg-[#121829] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                      {options.map((o) => <option key={o} className="bg-[#121829]">{o}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-[#8899AA] mb-1 block">Stake (USD)</label>
                  <input type="number" defaultValue="0.5" min="0.35" step="0.5"
                    className="w-full border border-[#1E2A40] bg-[#121829] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                </div>
                <button onClick={() => setRunning(true)} className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-2.5 rounded-lg transition-all">
                  Apply Strategy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      {rightPanelOpen && (
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
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-xs font-medium capitalize transition-all border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-[#8899AA] hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto flex flex-col">
            {tab === 'summary' && (
              <>
                <div className="flex-1 flex items-center justify-center p-6 text-center">
                  {running
                    ? <div><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="text-[#8899AA] text-sm">Bot is running...</p></div>
                    : <p className="text-[#8899AA] text-sm leading-relaxed">When you&apos;re ready to trade, hit <strong className="text-white">Run</strong>.<br />You&apos;ll be able to track your bot&apos;s performance here.</p>
                  }
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
            {tab === 'transactions' && <div className="flex-1 flex items-center justify-center p-6 text-center"><p className="text-[#8899AA] text-sm">No transactions yet.</p></div>}
            {tab === 'journal' && <div className="flex-1 flex items-center justify-center p-6 text-center"><p className="text-[#8899AA] text-sm">Journal is empty.</p></div>}
          </div>
        </div>
      )}

      <button
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
        className="absolute top-1/2 -translate-y-1/2 w-5 h-10 bg-[#1E2A40] border border-[#1E2A40] rounded-l flex items-center justify-center hover:bg-[#2a3a50] transition-all z-10"
        style={{ right: rightPanelOpen ? '288px' : '0' }}
      >
        <ChevronRight className={`w-3 h-3 text-[#8899AA] transition-transform ${rightPanelOpen ? '' : 'rotate-180'}`} />
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
