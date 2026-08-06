import ComparisonPage from '@/components/learn/ComparisonPage'
import { DERIV_VS_OLYMPTRADE } from '@/lib/comparison-data'

export const metadata = {
  title: 'Deriv vs Olymp Trade | Full Comparison 2024',
  description:
    'In-depth Deriv vs Olymp Trade comparison covering regulation, markets, automation, and which platform suits beginners and bot traders.',
}

export default function DerivVsOlymptradePage() {
  return <ComparisonPage data={DERIV_VS_OLYMPTRADE} />
}
