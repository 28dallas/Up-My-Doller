import { Info } from 'lucide-react'

interface AffiliateDisclosureProps {
  className?: string
}

/**
 * Small affiliate disclosure banner for content pages. Meets affiliate
 * compliance requirements and builds reader trust.
 */
export default function AffiliateDisclosure({ className = '' }: AffiliateDisclosureProps) {
  return (
    <div className={`flex items-start gap-2 rounded-xl border border-border bg-card/60 px-4 py-3 text-xs text-muted-foreground ${className}`}>
      <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        <strong className="text-white">Affiliate Disclosure:</strong> This page contains affiliate links. If you open a Deriv account through
        one of these links, we may earn a commission at no additional cost to you. We only recommend products and platforms we believe are
        genuinely useful. Trading involves risk — only trade with money you can afford to lose.
      </p>
    </div>
  )
}
