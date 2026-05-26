import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function CareersPage() {
  return (
    <PlaceholderPage
      badge="Careers"
      title="Careers"
      description="We are building trading software that values speed, clarity, and practical outcomes for users, and we want teammates who care about the same things."
      highlights={[
        {
          title: 'Product-minded teams',
          description: 'We value people who can connect user pain points to cleaner execution, not just ship isolated features.',
        },
        {
          title: 'Fast iteration',
          description: 'The platform evolves quickly, so ownership and good judgment matter as much as raw output.',
        },
        {
          title: 'User empathy',
          description: 'Many of our users are learning while trading. Clear UX and trustworthy communication are a core part of the work.',
        },
      ]}
      sections={[
        {
          title: 'Who We Are Looking For',
          body: 'Strong fits include product engineers, frontend developers, growth-minded operators, support specialists with trading context, and content builders who can explain complex workflows simply.',
          items: [
            'Frontend and full-stack web product builders',
            'Support and success roles with platform empathy',
            'Growth, partnerships, and affiliate operations',
            'Writers who can turn process into practical guides',
          ],
        },
      ]}
      ctaTitle="Interested in working with us?"
      ctaDescription="Use the contact page with your role interest, experience summary, and links to your work."
      primaryHref="/contact"
      primaryLabel="Contact The Team"
    />
  )
}
