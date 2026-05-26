import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'

const sections = [
  ['Information We Collect', 'We may collect account details such as your name, email address, country, platform preferences, subscription records, contact form messages, and usage analytics that help us improve the product experience.'],
  ['How We Use It', 'We use collected information to authenticate users, provide access to features, improve the platform, process billing-related workflows, respond to support requests, and measure product performance.'],
  ['Data Sharing', 'We do not sell your personal data. Information may be shared only with infrastructure providers needed to operate the product, process payments, manage authentication, or comply with legal obligations.'],
  ['Data Retention', 'We retain information only as long as reasonably necessary for service delivery, compliance, security, and support history. Some records may be removed or anonymized when no longer needed.'],
  ['Your Choices', 'You may contact us regarding account updates, deletion requests, or questions about how your information is handled. We will review such requests in line with legal, security, and operational obligations.'],
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Privacy Policy
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white">How we handle your data</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This policy outlines the categories of information we collect, how we use them, and the general protections we apply when operating the platform. Our goal is to keep data handling understandable, limited, and aligned with feature delivery.
          </p>

          <div className="mt-8 space-y-8">
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
