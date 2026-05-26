import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type Highlight = {
  title: string
  description: string
}

type Section = {
  title: string
  body: string
  items?: string[]
}

type PlaceholderPageProps = {
  title: string
  description: string
  badge?: string
  highlights?: Highlight[]
  sections?: Section[]
  ctaTitle?: string
  ctaDescription?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function PlaceholderPage({
  title,
  description,
  badge = 'Page',
  highlights = [],
  sections = [],
  ctaTitle = 'Ready for the next step?',
  ctaDescription = 'Everything on this page is now mapped out so we can keep building without leaving empty routes behind.',
  primaryHref = '/auth/signup',
  primaryLabel = 'Create Free Account',
  secondaryHref = '/pricing',
  secondaryLabel = 'View Pricing',
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-20 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {badge}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold text-white md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          {highlights.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-border bg-card/80 p-5 shadow-xl shadow-black/10 backdrop-blur"
                >
                  <h2 className="text-base font-bold text-white">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {sections.length > 0 && (
            <div className="mt-6 grid gap-5">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-3xl border border-border bg-card/80 p-7 shadow-2xl shadow-black/20 backdrop-blur"
                >
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.body}
                  </p>
                  {section.items?.length ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted-foreground"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-3xl border border-border bg-card/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl font-bold text-primary">
                PD
              </div>
              <h2 className="text-2xl font-bold text-white">{ctaTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {ctaDescription}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={primaryHref}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-black transition-all hover:opacity-90"
                >
                  {primaryLabel}
                </Link>
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/5"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
