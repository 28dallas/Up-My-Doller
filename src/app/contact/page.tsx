import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function ContactPage() {
  return (
    <PlaceholderPage
      badge="Support"
      title="Contact Us"
      description="Reach the team for product support, partnership conversations, billing help, or technical issues related to your account."
      highlights={[
        {
          title: 'Support requests',
          description: 'Best for login issues, access problems, payment questions, and account setup help.',
        },
        {
          title: 'Partnerships',
          description: 'Use this channel for affiliate opportunities, media requests, and collaboration ideas.',
        },
        {
          title: 'Response quality',
          description: 'The goal is clear, actionable help, not generic replies. Include screenshots and route names where possible.',
        },
      ]}
      sections={[
        {
          title: 'Best Way To Reach Us',
          body: 'For urgent trading-tool issues, start with the in-platform support route so the context is already tied to the feature you were using. For business requests, contact us with a short summary, timeline, and the reason you are reaching out.',
          items: [
            'Product support for dashboard and bot builder issues',
            'Billing help for upgrades, renewals, and failed payments',
            'Affiliate and partnership conversations',
            'Feedback and feature requests from active traders',
          ],
        },
      ]}
      ctaTitle="Need a faster route?"
      ctaDescription="Open the support center from inside the dashboard for product-specific help and guidance."
      primaryHref="/dashboard/support"
      primaryLabel="Go To Support"
    />
  )
}
