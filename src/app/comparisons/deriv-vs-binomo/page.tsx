import ComparisonPage from '@/components/learn/ComparisonPage'
import { DERIV_VS_BINOMO } from '@/lib/comparison-data'

export const metadata = {
  title: 'Deriv vs Binomo | Full Comparison 2024',
  description:
    'Clear comparison of Deriv vs Binomo across regulation, markets, bots, payouts, and suitability for automated trading. Read the full breakdown.',
}

export default function DerivVsBinomoPage() {
  return <ComparisonPage data={DERIV_VS_BINOMO} />
}
