import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: 'By creating an account or using any part of the SmartTraders platform, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform. These terms apply to all users including free, Pro, and Elite subscribers.',
  },
  {
    title: '2. Account Responsibilities',
    body: 'You are responsible for maintaining the security of your account credentials. You must provide accurate information during registration. You may not share your account with others or use the platform for any unlawful purpose. We reserve the right to suspend accounts that violate these terms.',
  },
  {
    title: '3. Subscription Plans & Billing',
    body: 'SmartTraders offers Free, Pro (KES 2,500/month), and Elite (KES 6,500/month) plans. Subscriptions are billed monthly. You may cancel at any time from your dashboard — access continues until the end of the current billing period. No refunds are issued for partial months. We reserve the right to change pricing with 30 days notice.',
  },
  {
    title: '4. Acceptable Use',
    body: 'You may not use the platform to engage in market manipulation, fraud, or any activity that violates Deriv\'s terms of service. You may not reverse-engineer, scrape, or redistribute platform content or bot files without written permission. Automated access to the platform outside of approved API integrations is prohibited.',
  },
  {
    title: '5. Trading Risk Acknowledgment',
    body: 'Trading synthetic indices and other financial instruments involves substantial risk of loss. SmartTraders provides software tools, signals, and educational content — not financial advice. Past performance of any bot, trader, or strategy is not indicative of future results. You acknowledge that you may lose some or all of your trading capital.',
  },
  {
    title: '6. Bot & Strategy Tools',
    body: 'Bots and strategies provided on the platform are for informational and automation purposes only. SmartTraders does not guarantee any specific outcome from using these tools. You are solely responsible for the stakes, risk settings, and trading decisions made using our tools on your Deriv account.',
  },
  {
    title: '7. Copy Trading',
    body: 'When you copy a trader, you acknowledge that the copied trader\'s performance may change at any time. SmartTraders does not guarantee the continued performance of any trader on the platform. You retain full control over your account and can stop copying at any time. Losses incurred through copy trading are your responsibility.',
  },
  {
    title: '8. Intellectual Property',
    body: 'All platform content, including bot files, UI designs, strategy logic, and written content, is the intellectual property of SmartTraders. You may not copy, distribute, or create derivative works without explicit written permission.',
  },
  {
    title: '9. Limitation of Liability',
    body: 'SmartTraders shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform, including trading losses, data loss, or service interruptions. Our total liability to you shall not exceed the amount you paid in the 30 days preceding the claim.',
  },
  {
    title: '10. Termination',
    body: 'We may suspend or terminate your account at any time for violation of these terms, fraudulent activity, or at our discretion with reasonable notice. Upon termination, your access to paid features will cease immediately.',
  },
  {
    title: '11. Changes to Terms',
    body: 'We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of material changes via email or in-platform notification.',
  },
  {
    title: '12. Governing Law',
    body: 'These terms are governed by the laws of Kenya. Any disputes shall be resolved through good-faith negotiation first, and if unresolved, through the courts of Nairobi, Kenya.',
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-8">
          <p className="text-warning text-sm font-medium">
            ⚠️ Important: Trading involves substantial risk of loss. Please read Section 5 (Trading Risk Acknowledgment) carefully before using any trading tools on this platform.
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
          <p className="text-muted-foreground text-sm mb-4">Questions about these terms?</p>
          <Link href="/contact" className="text-primary hover:underline text-sm font-medium">Contact our support team</Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
