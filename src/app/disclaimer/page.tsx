import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Trading Disclaimer
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white">Important risk notice</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              Pips Dollar Printer is not a broker, not a portfolio manager, and not a financial advisor. The platform provides software tools, simulations, signals, and educational interfaces only.
            </p>
            <p>
              All references to strategies, performance, trade examples, signals, or trader rankings are informational or simulated unless clearly stated otherwise. They do not constitute financial advice, investment recommendations, or guarantees of future results.
            </p>
            <p>
              Trading synthetic indices and other speculative instruments involves significant risk, including the risk of substantial losses. Copy trading and automation can amplify both strong and poor decisions. You remain solely responsible for stake size, stop-loss settings, copied trader selection, and any real-money trading activity conducted with third-party brokers such as Deriv.com.
            </p>
            <p>
              If you choose to trade live, do so only with funds you can afford to lose, test strategies carefully, and understand that past performance is not indicative of future outcomes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
