import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'

const team = [
  ['Naomi K.', 'CEO', 'Keeps the product grounded in the needs of African traders and community growth.'],
  ['Daniel O.', 'CTO', 'Leads the simulated trading infrastructure, product reliability, and dashboard experience.'],
  ['Aisha M.', 'Head of Trading', 'Shapes signal logic, copy trading workflows, and bot strategy education.'],
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="min-h-screen">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              About Pips Dollar Printer
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-6xl">We built the platform we wished African Deriv traders already had.</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Pips Dollar Printer exists to make bot building, strategy simulation, copy trading, and performance review feel accessible without dumbing the experience down. We focus on practical workflows, clean interfaces, and realistic trading simulations that help people learn before they risk capital.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ['Mission', 'Help traders across Africa automate smarter, test faster, and make better risk-managed decisions.'],
            ['Why We Built This', 'Too many products either overpromise profits or feel too technical to use. We wanted a middle path: professional tools with honest risk framing.'],
            ['Vision', 'Become the most trusted synthetic-index tools platform for African traders, with education, simulation, and community at the core.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[2rem] border border-border bg-card/80 p-6">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border bg-card/80 p-8">
            <h2 className="text-2xl font-bold text-white">Africa-Focused by Design</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
              From M-Pesa-friendly billing language to East Africa-first messaging and realistic KES-based summaries, the product is intentionally shaped around how traders in Kenya, Tanzania, Uganda, Nigeria, Ghana, Rwanda, and the wider continent actually discover tools, learn strategies, and manage subscriptions.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Leadership Team</h2>
              <p className="mt-2 text-sm text-muted-foreground">A compact team focused on product clarity, simulated trading tools, and trader education.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {team.map(([name, role, bio]) => (
              <div key={name} className="rounded-[2rem] border border-border bg-card/80 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-lg font-bold text-primary">
                  {name.split(' ').map((part) => part[0]).join('')}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{role}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
