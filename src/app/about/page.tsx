import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function AboutPage() {
  return (
    <PlaceholderPage
      badge="Company"
      title="About Pips Dollar Printer"
      description="We build practical trading tools for Deriv users who want structure, speed, and clearer decision-making without a heavy learning curve."
      highlights={[
        {
          title: 'Built for real traders',
          description: 'The product is designed around the daily workflow of synthetic-index traders, not generic finance dashboards.',
        },
        {
          title: 'No-code first',
          description: 'From bot building to copy trading and alerts, the goal is to reduce setup friction and help traders move faster.',
        },
        {
          title: 'Africa-focused',
          description: 'Pricing, payment methods, and product language are shaped around the needs of traders across Kenya, Uganda, Tanzania, and beyond.',
        },
      ]}
      sections={[
        {
          title: 'What We Are Building',
          body: 'Pips Dollar Printer combines a Deriv bot builder, copy trading tools, performance tracking, educational resources, and trade alerts in one place. Instead of forcing users to stitch together several apps, the platform aims to make research, setup, execution, and review feel connected.',
          items: [
            'Visual bot builder for faster strategy setup',
            'Copy trading views with trader comparisons',
            'Performance dashboards and signal workflows',
            'Education for beginners and experienced traders',
          ],
        },
        {
          title: 'Our Product Direction',
          body: 'We are focused on clarity, trust, and repeatable workflows. That means simpler navigation, transparent pricing, meaningful risk warnings, and tools that are useful even before a user becomes fully advanced.',
        },
      ]}
      ctaTitle="Want to see the platform in action?"
      ctaDescription="Start with the free tools, explore the dashboards, and upgrade only when you need deeper automation and analysis."
    />
  )
}
