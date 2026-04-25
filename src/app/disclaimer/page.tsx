import PlaceholderPage from '@/components/shared/PlaceholderPage'

export default function DisclaimerPage() {
  return (
    <PlaceholderPage
      badge="Risk Notice"
      title="Disclaimer"
      description="Trading carries real risk, and every product page should reinforce that software tools, signals, and examples do not guarantee financial outcomes."
      highlights={[
        {
          title: 'Risk comes first',
          description: 'Losses are possible with manual trading, bots, copy trading, and high-frequency execution tools.',
        },
        {
          title: 'Education, not certainty',
          description: 'Examples, performance snapshots, and signals should be treated as tools for decision support, not promises.',
        },
        {
          title: 'User control matters',
          description: 'Each trader remains responsible for stakes, limits, copied strategies, and the amount of risk they choose to take.',
        },
      ]}
      sections={[
        {
          title: 'Important Notice',
          body: 'Past performance is not a guarantee of future results. Market conditions change, trader behavior changes, and automation can amplify both good and bad decisions. Users should only trade with funds they can afford to lose and should test carefully before scaling.',
          items: [
            'Signals and dashboards support decisions but do not guarantee outcomes',
            'Bot logic can still fail in poor market conditions',
            'Copied traders can experience drawdowns and losing streaks',
            'Small test sizes are safer than aggressive scaling',
          ],
        },
      ]}
      ctaTitle="Trade with a safer setup"
      ctaDescription="Use stop losses, small starting stakes, and the analysis pages before committing more capital."
      primaryHref="/dashboard/analysis"
      primaryLabel="Open Analysis"
    />
  )
}
