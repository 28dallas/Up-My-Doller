import ComparisonPage from '@/components/learn/ComparisonPage'
import { DERIV_VS_POCKETOPTIONS } from '@/lib/comparison-data'

export const metadata = {
  title: 'Deriv vs Pocket Option | Full Comparison 2024',
  description:
    'Honest comparison of Deriv vs Pocket Option covering regulation, markets, bots, payouts, and which is better for beginners. Read the full breakdown.',
}

export default function DerivVsPocketOptionPage() {
  return <ComparisonPage data={DERIV_VS_POCKETOPTIONS} />
}
