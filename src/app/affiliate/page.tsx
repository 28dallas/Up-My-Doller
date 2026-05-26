import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function AffiliatePage() {
  return (
    <PlaceholderPage
      badge="Partners"
      title="Affiliate Program"
      description="Refer traders to the platform, help them get started, and earn recurring value through a partner flow built around trust and retention."
      highlights={[
        {
          title: 'Referral-driven growth',
          description: 'The program is designed for educators, communities, creators, and traders with an engaged audience.',
        },
        {
          title: 'Platform-aligned',
          description: 'Good affiliates explain the product honestly and help referrals choose the right plan for their needs.',
        },
        {
          title: 'Long-term fit',
          description: 'The strongest partners focus on quality referrals, not hype or unrealistic promises.',
        },
      ]}
      sections={[
        {
          title: 'What Affiliates Can Expect',
          body: 'The affiliate program will cover partner onboarding, tracking, conversion visibility, and clear commission rules. It is intended to reward education, trust, and sustainable user growth rather than low-quality traffic.',
          items: [
            'Referral tracking and partner onboarding',
            'Commission details and payout expectations',
            'Guidelines for ethical promotion',
            'Support for creators and trading communities',
          ],
        },
      ]}
      ctaTitle="Ready to share Deriv with your network?"
      ctaDescription="Use your affiliate link to send traders to Deriv and track referrals through your partner flow."
      primaryHref={process.env.NEXT_PUBLIC_DERIV_URL ?? '/contact'}
      primaryLabel="Open Deriv Affiliate Link"
    />
  )
}
