import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. No Financial Advice',
    body: 'DBTraders is a software platform that provides trading tools, automation, signals, and educational content. Nothing on this platform constitutes financial advice, investment advice, or a recommendation to buy or sell any financial instrument. All content is for informational and educational purposes only.',
  },
  {
    title: '2. Trading Risk Warning',
    body: 'Trading synthetic indices, forex, and other financial instruments on Deriv involves a high level of risk and may not be suitable for all investors. You may lose some or all of your invested capital. You should never trade with money you cannot afford to lose. The high degree of leverage available in trading can work against you as well as for you.',
  },
  {
    title: '3. Past Performance',
    body: 'Past performance of any bot, strategy, signal, or copied trader shown on this platform is not indicative of future results. Win rates, ROI figures, and P&L statistics displayed are historical data and do not guarantee similar future performance. Market conditions change constantly and strategies that worked previously may not work in the future.',
  },
  {
    title: '4. Bot & Automation Risk',
    body: 'Automated trading bots can execute trades rapidly and may amplify both gains and losses. A bot that performs well in certain market conditions may perform poorly or cause significant losses in different conditions. Always test bots with small stakes before scaling. Monitor your bots regularly — do not leave them running unattended for extended periods.',
  },
  {
    title: '5. Copy Trading Risk',
    body: 'When you copy a trader, you are mirroring their trading decisions on your own account. The trader you copy may experience losing streaks, change their strategy, or stop trading at any time. DBTraders does not vet, endorse, or guarantee the performance of any trader on the platform. You are solely responsible for the decision to copy any trader and for the resulting outcomes.',
  },
  {
    title: '6. Signal Disclaimer',
    body: 'Trading signals provided on the platform are generated algorithmically based on historical patterns and statistical analysis. They are not guaranteed to be accurate or profitable. Signals should be used as one input in your trading decision — not as the sole basis for placing trades. Always apply your own judgment and risk management.',
  },
  {
    title: '7. Deriv Platform Risk',
    body: 'DBTraders integrates with Deriv via API. We are not affiliated with, endorsed by, or responsible for Deriv\'s platform, pricing, availability, or terms. Any issues with Deriv\'s platform, including outages, pricing changes, or account restrictions, are outside our control.',
  },
  {
    title: '8. User Responsibility',
    body: 'You are solely responsible for all trading decisions made using this platform. This includes the choice of bots, stake sizes, risk settings, traders to copy, and signals to act on. DBTraders provides tools — the decisions and their consequences are yours.',
  },
  {
    title: '9. Regulatory Notice',
    body: 'DBTraders is a software tools provider and is not a licensed financial advisor, broker, or investment manager. We do not hold any financial services license. Users are responsible for ensuring that their trading activities comply with the laws and regulations of their country of residence.',
  },
]

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-warning mb-6">
            Risk Notice
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-5 mb-8 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-warning font-semibold text-sm mb-1">High Risk Warning</p>
            <p className="text-warning/80 text-sm leading-relaxed">
              Trading synthetic indices and other financial instruments involves substantial risk of loss and is not suitable for all investors. Only trade with money you can afford to lose completely.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.map(({ title, body }) => (
            <div key={title} className="border-b border-border pb-8 last:border-0">
              <h2 className="text-white font-bold text-lg mb-3">{title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-card border border-border rounded-xl p-6 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            By using DBTraders, you confirm that you have read and understood this disclaimer and accept full responsibility for your trading decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/analysis" className="text-primary hover:underline text-sm font-medium">Open Analysis Tools</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-white text-sm">View Plans</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
