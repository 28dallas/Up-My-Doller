import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      badge="Legal"
      title="Privacy Policy"
      description="This page explains the high-level approach to how user information, account data, and support interactions are handled on the platform."
      highlights={[
        {
          title: 'Minimum necessary data',
          description: 'The platform should only request the information needed to operate features, process access, and provide support.',
        },
        {
          title: 'Secure access',
          description: 'Sensitive account workflows should rely on secure tokens and revocable permissions wherever possible.',
        },
        {
          title: 'Clear expectations',
          description: 'Users should be able to understand what is collected, why it is collected, and how long it is retained.',
        },
      ]}
      sections={[
        {
          title: 'Privacy Principles',
          body: 'We aim to keep user trust by limiting unnecessary collection, protecting credentials, and making support and billing workflows easier to understand. The formal legal version of this policy should eventually define data categories, retention windows, and user rights in detail.',
          items: [
            'Account and authentication information',
            'Subscription and billing-related records',
            'Support conversations and diagnostic details',
            'Analytics used to improve product quality',
          ],
        },
      ]}
      ctaTitle="Questions about data handling?"
      ctaDescription="Use the contact page if you need clarification on what information is used for support, billing, or account access."
      primaryHref="/contact"
      primaryLabel="Ask A Privacy Question"
    />
  )
}
