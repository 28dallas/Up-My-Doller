import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function DocsPage() {
  return (
    <PlaceholderPage
      badge="Documentation"
      title="Documentation"
      description="Find the core setup steps, trading tool walkthroughs, and support references you need to get started with confidence."
      highlights={[
        {
          title: 'Account setup',
          description: 'Understand sign-up, Deriv connection, API token flow, and the safest way to configure your first session.',
        },
        {
          title: 'Tool walkthroughs',
          description: 'Learn how to use the bot builder, copy trading pages, signals, analysis dashboards, and alerts.',
        },
        {
          title: 'Payments and billing',
          description: 'Get quick answers for M-Pesa, subscription activation, renewals, upgrades, and access limits.',
        },
      ]}
      sections={[
        {
          title: 'Recommended Reading Path',
          body: 'New users should begin with account setup, then move to the bot builder, signals, and wallet pages. Once that foundation is clear, the analysis and copy trading tools make much more sense and are easier to use safely.',
          items: [
            '1. Create account and connect Deriv',
            '2. Add API token and verify permissions',
            '3. Explore bot builder and free bots',
            '4. Enable alerts and review analysis pages',
          ],
        },
        {
          title: 'What This Documentation Covers',
          body: 'The docs area is intended to become the single source of truth for setup, troubleshooting, pricing FAQs, and product release notes so users do not have to rely on scattered chat replies or screenshots.',
        },
      ]}
      ctaTitle="Need hands-on help instead?"
      ctaDescription="If the docs do not answer your question yet, the support page and contact channels are the fastest next step."
      primaryHref="/dashboard/support"
      primaryLabel="Open Support"
    />
  )
}
