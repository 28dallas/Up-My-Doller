'use client'
import { Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import { MOCK_TESTIMONIALS } from '@/lib/data'

export default function TestimonialsSection() {
  const doubled = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS]

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="section-heading">What Our Traders Say</h2>
          <p className="text-muted-foreground text-lg mt-3">
            Join thousands of profitable traders across Africa
          </p>
        </div>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        <div className="flex gap-5 animate-scroll" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <div key={`${t.id}-${i}`} className="w-72 shrink-0">
              <Card className="h-full">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.flag} {t.country}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
