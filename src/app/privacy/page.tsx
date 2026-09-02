import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly: name, email address, phone number, and referral code during registration. We also collect usage data such as pages visited, features used, and session duration to improve the platform. When you connect your Deriv account, we store only the API token you provide — never your Deriv login credentials.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to operate and improve the platform, process payments, send trade alerts and notifications you have opted into, provide customer support, and detect fraudulent or abusive activity. We do not sell your personal data to third parties.',
  },
  {
    title: '3. Deriv API Tokens',
    body: 'When you add a Deriv API token, it is encrypted and stored securely. We use it only to execute the trading actions you configure on the platform. You can revoke access at any time by deleting the token from your SmartTraders dashboard or from your Deriv account settings. We never store your Deriv username or password.',
  },
  {
    title: '4. Payment Information',
    body: 'M-Pesa payments are processed via the Safaricom Daraja API. We store your M-Pesa phone number and transaction reference numbers for billing records. We do not store your M-Pesa PIN or any card details. Card payments (where available) are processed by Stripe — we do not store card numbers on our servers.',
  },
  {
    title: '5. Telegram Integration',
    body: 'If you connect Telegram for trade alerts, we store your Telegram Chat ID to send notifications. We do not access your Telegram messages, contacts, or any other Telegram data beyond what is needed to send alerts.',
  },
  {
    title: '6. Data Sharing',
    body: 'We share data only with service providers necessary to operate the platform: Supabase (database), Safaricom Daraja (M-Pesa payments), Stripe (card payments), and Vercel (hosting). All providers are bound by data processing agreements. We do not share your data with advertisers or data brokers.',
  },
  {
    title: '7. Data Retention',
    body: 'We retain your account data for as long as your account is active. Payment records are retained for 7 years for legal and tax compliance. If you delete your account, personal data is removed within 30 days, except where retention is required by law.',
  },
  {
    title: '8. Your Rights',
    body: 'You have the right to access, correct, or delete your personal data. You can update your profile information from the Settings page. To request full data deletion or export, contact our support team. We will respond within 30 days.',
  },
  {
    title: '9. Cookies',
    body: 'We use essential cookies for authentication and session management. We use analytics cookies to understand how the platform is used. You can manage cookie preferences in your browser settings. See our Cookie Policy for more details.',
  },
  {
    title: '10. Security',
    body: 'We use industry-standard encryption for data in transit (HTTPS/TLS) and at rest. API tokens are encrypted before storage. We conduct regular security reviews. Despite these measures, no system is 100% secure — please use a strong, unique password for your account.',
  },
  {
    title: '11. Children\'s Privacy',
    body: 'SmartTraders is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has created an account, please contact us immediately.',
  },
  {
    title: '12. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-platform notification. Continued use of the platform after changes constitutes acceptance of the updated policy.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
          <p className="text-primary text-sm">
            We collect only what we need to operate the platform. We do not sell your data. You can delete your account and data at any time.
          </p>
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
          <p className="text-muted-foreground text-sm mb-4">Privacy questions or data requests?</p>
          <Link href="/contact" className="text-primary hover:underline text-sm font-medium">Contact our support team</Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
