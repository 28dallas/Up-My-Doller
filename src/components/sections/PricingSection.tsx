'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { PRICING_TIERS } from '@/lib/data'

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg mt-3">
            Start free. Upgrade when you&apos;re ready to scale.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-all ${annual ? 'bg-primary' : 'bg-border'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-muted-foreground'}`}>
              Annual
              <Badge variant="green" className="ml-2">2 months free</Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier) => {
            const price_usd = annual ? Math.round(tier.price_usd * 10) : tier.price_usd
            const price_kes = annual ? Math.round(tier.price_kes * 10) : tier.price_kes

            return (
              <div key={tier.name} className={`relative ${tier.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}>
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="gold" className="px-4 py-1 text-xs font-bold">
                      <Zap className="w-3 h-3 mr-1" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full flex flex-col ${
                    tier.highlighted
                      ? 'border-primary/50 shadow-[0_0_30px_rgba(0,230,118,0.15)]'
                      : ''
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                    <p className="text-muted-foreground text-sm">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    {tier.price_usd === 0 ? (
                      <div className="text-4xl font-extrabold text-white">Free</div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold text-white">${price_usd}</span>
                          <span className="text-muted-foreground text-sm">/{annual ? 'year' : 'month'}</span>
                        </div>
                        <div className="text-muted-foreground text-sm mt-1 font-mono">
                          KES {price_kes.toLocaleString()}/{annual ? 'year' : 'month'}
                        </div>
                      </>
                    )}
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={tier.price_usd === 0 ? '/auth/signup' : '/pricing'}>
                    <Button
                      variant={tier.highlighted ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Link>

                  {tier.price_usd > 0 && (
                    <p className="text-center text-muted-foreground text-xs mt-3">
                      Pay via M-Pesa or Card
                    </p>
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
