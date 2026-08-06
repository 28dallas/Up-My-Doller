import Link from 'next/link'
import { ArrowRight, GraduationCap, Info } from 'lucide-react'
import { getAffiliateLink } from '@/lib/constants'

interface EducationalCTAProps {
  primaryLabel?: string
  primaryHref?: string
  secondaryHref?: string
  secondaryLabel?: string
  title?: string
  description?: string
  /** Per-page UTM attribution term, e.g. 'strategies-over-under' */
  utmSource?: string
  /** Show the affiliate disclosure note under the CTAs */
  disclosure?: boolean
}

export default function EducationalCTA({
  primaryLabel = 'Open Free Deriv Account',
  primaryHref,
  secondaryHref = '/learn',
  secondaryLabel = 'Continue Learning',
  title = 'Ready to put this into practice?',
  description = 'Open a free Deriv account in minutes, then explore our bot library, strategies, and tools to start trading smarter.',
  utmSource,
  disclosure = true,
}: EducationalCTAProps) {
  // If no explicit href, build a per-page tagged affiliate link.
  const resolvedHref = primaryHref ?? (utmSource ? getAffiliateLink(utmSource) : getAffiliateLink('default'))
  const isExternal = resolvedHref.startsWith('http')
  return (
    <section className="py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40" />
          <div className="relative">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-5">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {isExternal ? (
                <a
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c853] px-6 py-3 text-sm font-bold text-black hover:bg-[#00e676] transition-all"
                >
                  {primaryLabel} <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href={resolvedHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black hover:bg-accent transition-all"
                >
                  {primaryLabel} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-white hover:border-primary/40 hover:bg-white/5 transition-all"
              >
                {secondaryLabel}
              </Link>
            </div>
            {disclosure && (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <Info className="w-3 h-3 shrink-0" />
                If you open an account through a link on this page, we may earn a commission at no extra cost to you.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
