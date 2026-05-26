import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'

const sections = [
  {
    title: '1. Platform Scope',
    body:
      'Pips Dollar Printer is an independent software platform offering simulated market dashboards, educational tools, bot-building interfaces, and copy-trading style workflows. It is not a broker, exchange, custodian, or investment manager. All live trading, if any, occurs with third-party providers such as Deriv.com under that provider’s own terms.',
  },
  {
    title: '2. User Accounts',
    body:
      'You are responsible for keeping your login credentials secure, providing accurate registration details, and ensuring that any activity conducted through your account complies with applicable laws and our platform rules. We may suspend or restrict accounts used for abuse, fraud, or activity that harms the service or other users.',
  },
  {
    title: '3. Subscriptions and Billing',
    body:
      'Paid plans may renew on the billing cycle displayed at the time of purchase unless cancelled before renewal. Access to premium features may be limited, downgraded, or paused if payment is not completed or later reversed. Where we communicate a refund or satisfaction policy, it applies only to platform subscription access and never to third-party trading losses.',
  },
  {
    title: '4. No Guarantee of Profits',
    body:
      'Nothing on the platform constitutes a guarantee of profitability, investment return, win rate, or income level. Simulations, historical examples, and strategy descriptions are provided for product demonstration and education. Your results may differ materially, and losses are possible.',
  },
  {
    title: '5. Acceptable Use',
    body:
      'You may not use the platform to conduct fraud, misrepresent performance, interfere with other users, scrape or reverse-engineer the service in prohibited ways, or distribute illegal or harmful material. We reserve the right to limit or terminate access for misuse or behavior that puts the service, team, or community at risk.',
  },
  {
    title: '6. Limitation of Liability',
    body:
      'To the maximum extent permitted by law, Pips Dollar Printer is not liable for lost profits, trading losses, data interruption, account suspension by third-party services, or indirect or consequential damages arising from your use of the platform. You remain responsible for your own trading decisions and risk management settings.',
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Terms of Service
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white">Terms that frame how the platform may be used</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            These terms govern your use of Pips Dollar Printer, including account creation, subscriptions, acceptable use, and the limits of our responsibility. By using the service, you acknowledge that trading involves risk and that the platform does not promise profits.
          </p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
