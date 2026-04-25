'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PricingSection from '@/components/sections/PricingSection'
import { Check, X, ChevronDown, ChevronUp, Smartphone } from 'lucide-react'
import Badge from '@/components/ui/Badge'

const FEATURES_MATRIX = [
  { feature: 'Bot Downloads per Day', free: '3', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'No-Code Bot Builder', free: false, pro: true, elite: true },
  { feature: 'Copy Trading (Traders)', free: false, pro: '3 traders', elite: 'Unlimited' },
  { feature: 'Telegram Trade Alerts', free: false, pro: true, elite: true },
  { feature: 'Real-Time P&L Dashboard', free: false, pro: true, elite: true },
  { feature: 'Advanced Strategies', free: false, pro: true, elite: true },
  { feature: 'API Access', free: false, pro: false, elite: true },
  { feature: 'Custom Bot Development', free: false, pro: false, elite: true },
  { feature: '1-on-1 Mentorship', free: false, pro: false, elite: true },
  { feature: 'VIP Signal Group', free: false, pro: false, elite: true },
  { feature: 'White-Label Bots', free: false, pro: false, elite: true },
  { feature: 'Priority Support', free: false, pro: true, elite: true },
  { feature: 'Community Access', free: true, pro: true, elite: true },
]

const FAQS = [
  { q: 'How do I pay with M-Pesa?', a: 'Click "Pay via M-Pesa" on the pricing page or dashboard. Enter your Safaricom number and you will receive an STK push prompt on your phone. Enter your M-Pesa PIN to complete payment. Subscription activates instantly.' },
  { q: 'Is my Deriv account safe?', a: 'Yes. We use Deriv official OAuth system. Your login credentials are never stored on our servers - only a secure access token that you can revoke anytime from your Deriv account.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Cancel anytime from your dashboard. You will retain access until the end of your billing period. No questions asked.' },
  { q: 'What markets do the bots support?', a: 'Our bots support all Deriv synthetic indices: Volatility 10/25/50/75/100, Crash 500/1000, Boom 500/1000, Step Index, and major forex pairs.' },
  { q: 'Do the bots guarantee profits?', a: 'No. Trading involves risk and past performance is not indicative of future results. Our bots are tools to help automate strategies - they do not guarantee profits. Always trade responsibly.' },
  { q: 'How does copy trading work?', a: 'When you copy a trader, our system mirrors their trades on your Deriv account in real time. You set your own stake size and daily loss limits. You can stop copying anytime.' },
  { q: 'What is the bot builder?', a: 'Our no-code bot builder lets you create custom Deriv DBot strategies without coding. Select your market, strategy type, set parameters, and export as XML to deploy on Deriv.' },
  { q: 'Is there a free trial for Pro?', a: 'New users get a 7-day free trial of Pro features. No credit card required. After the trial, you can subscribe via M-Pesa or card.' },
]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-primary mx-auto" />
  if (value === false) return <X className="w-4 h-4 text-muted-foreground mx-auto" />
  return <span className="text-white text-sm font-medium">{value}</span>
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <div className="pt-4">
        <PricingSection />
      </div>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Full Feature Comparison</h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-muted-foreground text-sm font-semibold">Feature</th>
                <th className="text-center px-6 py-4 text-white text-sm font-semibold">Free</th>
                <th className="text-center px-6 py-4 text-primary text-sm font-semibold">
                  Pro <Badge variant="green" className="ml-1 text-xs">Popular</Badge>
                </th>
                <th className="text-center px-6 py-4 text-gold text-sm font-semibold">Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {FEATURES_MATRIX.map((row) => (
                <tr key={row.feature} className="hover:bg-white/3 transition-all">
                  <td className="px-6 py-3.5 text-muted-foreground text-sm">{row.feature}</td>
                  <td className="px-6 py-3.5 text-center"><CellValue value={row.free} /></td>
                  <td className="px-6 py-3.5 text-center bg-primary/3"><CellValue value={row.pro} /></td>
                  <td className="px-6 py-3.5 text-center"><CellValue value={row.elite} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-success/10 to-card border border-success/20 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-7 h-7 text-success" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Pay with M-Pesa</h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
            Kenyan traders can pay via Lipa na M-Pesa. Enter your Safaricom number, receive an STK push, enter your PIN, and your subscription activates in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>Instant activation</span>
            <span>No card required</span>
            <span>Secure and encrypted</span>
          </div>
        </div>
      </section>

      <section className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-white font-medium text-sm">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 border-t border-border">
                  <p className="text-muted-foreground text-sm leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
