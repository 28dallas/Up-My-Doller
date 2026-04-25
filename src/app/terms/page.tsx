import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function TermsPage() {
  return (
    <PlaceholderPage
      badge="Legal"
      title="Terms of Service"
      description="These terms summarize how the platform should be used, how subscriptions behave, and what responsibilities users take on when using automation and trading tools."
      highlights={[
        {
          title: 'Use responsibly',
          description: 'Users are responsible for how they deploy bots, alerts, and copy trading settings on their own accounts.',
        },
        {
          title: 'Subscription clarity',
          description: 'Plan access, renewals, cancellations, and upgrade rules should be clearly described and easy to understand.',
        },
        {
          title: 'No false promises',
          description: 'The platform provides software and information tools, not guaranteed outcomes or financial certainty.',
        },
      ]}
      sections={[
        {
          title: 'Core Expectations',
          body: 'Users should provide accurate account details, protect access to their sessions, avoid abusive or deceptive platform usage, and understand that software tools do not remove market risk. The full legal version should also cover billing, suspension rights, acceptable use, and limitation of liability.',
          items: [
            'Account ownership and access responsibilities',
            'Subscription terms and cancellation rules',
            'Acceptable product usage and conduct',
            'Risk acknowledgment for trading activity',
          ],
        },
      ]}
      ctaTitle="Want the practical version?"
      ctaDescription="The pricing and support pages explain the product side of subscriptions and access in plainer language."
      primaryHref="/pricing"
      primaryLabel="Review Plans"
      secondaryHref="/dashboard/support"
      secondaryLabel="Support Center"
    />
  )
}
