import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function CookiesPage() {
  return (
    <PlaceholderPage
      badge="Legal"
      title="Cookie Policy"
      description="Cookies and similar storage help the platform remember sessions, preferences, and analytics signals that improve reliability and product decisions."
      highlights={[
        {
          title: 'Essential usage',
          description: 'Some storage is required for login state, session continuity, and product functionality.',
        },
        {
          title: 'Preference memory',
          description: 'User settings, dismissed notices, and saved interface choices can be preserved between visits.',
        },
        {
          title: 'Analytics support',
          description: 'Usage trends help identify what pages are useful, where users get stuck, and what needs improvement.',
        },
      ]}
      sections={[
        {
          title: 'How Cookies Are Used',
          body: 'Cookies may be used for authentication, session continuity, analytics, and interface preferences. The formal policy should eventually explain the categories in more exact legal language, including how long each category is retained and how users can manage consent.',
          items: [
            'Essential authentication and session cookies',
            'Preference storage for UX improvements',
            'Performance and analytics signals',
            'Future consent and cookie-management controls',
          ],
        },
      ]}
      ctaTitle="Need more control?"
      ctaDescription="As the policy matures, users should be able to review and manage non-essential tracking more clearly."
      primaryHref="/privacy"
      primaryLabel="View Privacy Policy"
    />
  )
}
