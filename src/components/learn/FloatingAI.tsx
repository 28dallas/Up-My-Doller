'use client'
import { useEffect, useRef, useState } from 'react'
import { Bot, X, Send, Sparkles, TrendingUp, Percent, Clock, BookOpen, UserPlus, Gift } from 'lucide-react'
import { DERIV_AFFILIATE_LINK } from '@/lib/constants'

type Message = {
  role: 'bot' | 'user'
  text: string
}

const QUICK_ACTIONS = [
  'Best market for beginners?',
  'Compare Volatility vs Boom/Crash',
  'What is martingale?',
  'Which strategy is safest?',
  'Best time to trade forex?',
  'How do I open an account?',
]

const MARKET_ANSWERS: Record<string, string> = {
  beginner:
    'For absolute beginners, I recommend the **Volatility 10 Index** with an Over/Under strategy. It has the lowest volatility, runs 24/7, and is the most predictable market on Deriv. Pair it with a small stake ($0.35) and a capped martingale (5 levels max). Market difficulty: Low.',
  'compare-markets':
    '**Volatility indices** (10/25/50/75) move steadily and are great for consistent Over/Under and Even/Odd strategies. **Boom & Crash** indices spike sharply every ~500/1000 ticks — high reward but high risk, best for experienced spike traders. **Step Index** moves in small steps, ideal for digit strategies. **Forex** follows real-world sessions (best during London–New York overlap).',
  martingale:
    'Martingale doubles (or multiplies by a set factor) your stake after each loss, so one win recovers all previous losses. It works over short runs but a long losing streak can quickly exceed your budget. **Always cap your levels** (3-5 max), use a multiplier of 1.5x, and keep your total recovery within your daily budget. Safer alternatives: **Alembert** (adds 1 unit) and **Oscar\'s Grind** (increases stake only after a win).',
  safest:
    'The **Over/Under** strategy on **Volatility 10** is the safest combination on Deriv. It has near 50/50 odds, a 60-70% effective win rate with good stake management, and uses the lowest-volatility market. Avoid Digit Match (10% hit rate) and aggressive Boom/Crash until you have experience. Always set a take profit and stop loss.',
  'forex-time':
    'Forex is most active during the **London (8am-12pm GMT)** and **New York (1pm-4pm GMT)** sessions, especially the London–New York overlap. For gold and commodities, trade during the US session (1pm-5pm GMT). Synthetic indices (Volatility, Boom, Crash, Step) trade 24/7 with no session restrictions.',
}

const DEFAULT_ANSWER =
  "I can help you understand Deriv markets, strategies, risk management, and bots. Try asking about Volatility indices, Boom/Crash, Step Index, forex, martingale, or the safest strategy. You can also ask me to compare markets or recommend a bot."

function renderInline(text: string) {
  const parts = text.split('**')
  return parts.map((p, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="text-white font-semibold">{p}</strong>
    }
    return <span key={i}>{p}</span>
  })
}

export default function FloatingAI() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hi! I\'m your Deriv AI trading assistant. I can help you pick markets, compare strategies, understand risk, and find the right bot. What would you like to know?',
    },
  ])
const [typing, setTyping] = useState(false)
  const [showAccountCTA, setShowAccountCTA] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  const getAnswer = (raw: string): string => {
    const q = raw.toLowerCase()
    if (/(volatility|vol 10|vol10)/.test(q) && /(beginner|start|new)/.test(q)) return MARKET_ANSWERS.beginner
    if (/(boom|crash).*volatility|compare.*(market|index)|volatility.*vs/.test(q)) return MARKET_ANSWERS['compare-markets']
    if (/martingale/.test(q)) return MARKET_ANSWERS.martingale
    if (/(safest|safe|low.?risk|which strategy)/.test(q)) return MARKET_ANSWERS.safest
    if (/(time|when|session|hours).*(forex|trade)/.test(q) || /best time/.test(q)) return MARKET_ANSWERS['forex-time']
    if (/(bot|recommend)/.test(q)) return 'For a first bot, try the **Volatility Crusher v3** (Over/Under on Volatility 10, 68% win rate, low risk). For martingale fans, **Even Odd Master** on Volatility 25. For spike traders, **Boom Rider Pro** on Boom 1000. You can browse all recommended bots on the /bots/recommended page.'
    if (/(account|open|sign|start trading|join|register|create)/.test(q)) {
      setShowAccountCTA(true)
      return 'Great! Opening a free Deriv account is the first step. **Use the green "Open Free Deriv Account" button on this site** — it takes just 2 minutes, requires no credit card, and you get a free demo account with virtual funds to practice risk-free. I recommend starting on the demo account, then funding with a small amount once you\'re confident. Tap the button below to get started!'
    }
    return DEFAULT_ANSWER
  }

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg) return
    setMessages((m) => [...m, { role: 'user', text: msg }])
    setInput('')
    setTyping(true)
    setShowAccountCTA(false)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getAnswer(msg) }])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open AI trading assistant"
        className="fixed bottom-6 left-4 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(16,185,129,0.45)] transition-all hover:scale-105 animate-float"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">AI Assistant</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl overflow-hidden border border-primary/30 bg-[#0a0e2e] shadow-2xl shadow-black/60">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/10 border-b border-primary/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-white font-bold text-sm flex items-center gap-1.5">
                  Deriv AI Assistant <Sparkles className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Online · helps all markets
                </div>
              </div>
            </div>
<button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Persistent affiliate CTA bar */}
          <a
            href={DERIV_AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 px-4 py-2.5 bg-[#00c853] text-black hover:bg-[#00e676] transition-colors"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <UserPlus className="w-4 h-4" /> Open Free Deriv Account
            </span>
            <span className="text-sm font-extrabold">→</span>
          </a>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto px-4 py-4 space-y-3 bg-[#0d1235]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-black rounded-br-sm font-medium'
                      : 'bg-card border border-border text-muted-foreground rounded-bl-sm'
                  }`}
                >
                  {m.role === 'bot' ? renderInline(m.text) : m.text}
                </div>
              </div>
            ))}
{typing && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            {showAccountCTA && !typing && (
              <div className="rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/15 to-accent/10 p-4 text-center">
                <Gift className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-white font-bold text-sm mb-1">Get Your Free Deriv Account</div>
                <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                  Free to join · No credit card · 2 minutes · Demo account included
                </p>
                <a
                  href={DERIV_AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#00c853] px-4 py-2.5 text-sm font-bold text-black hover:bg-[#00e676] transition-all"
                >
                  <UserPlus className="w-4 h-4" /> Open Free Deriv Account →
                </a>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="px-3 py-2 border-t border-[#1a2060] bg-[#0a0e2e] flex gap-2 overflow-x-auto scrollbar-hide">
            {QUICK_ACTIONS.map((label) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="shrink-0 px-3 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-all"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-[#1a2060] bg-[#0a0e2e]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about markets, strategies, risk..."
              className="flex-1 bg-[#0d1235] border border-[#1a2060] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#8899cc] focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={() => send()}
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-black hover:bg-accent transition-all"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer links */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#0a0e2e] border-t border-[#1a2060] text-[11px] text-[#8899cc]">
            <a href="/learn" className="flex items-center gap-1 hover:text-primary transition-colors"><BookOpen className="w-3 h-3" /> Learn</a>
            <a href="/tools/risk-calculator" className="flex items-center gap-1 hover:text-primary transition-colors"><Percent className="w-3 h-3" /> Risk</a>
            <a href="/strategies" className="flex items-center gap-1 hover:text-primary transition-colors"><TrendingUp className="w-3 h-3" /> Strategies</a>
            <a href="/tools/trading-times" className="flex items-center gap-1 hover:text-primary transition-colors"><Clock className="w-3 h-3" /> Times</a>
          </div>
        </div>
      )}
    </>
  )
}
