import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import LivePlatformStats from '@/components/sections/LivePlatformStats'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FreeBotShowcase from '@/components/sections/FreeBotShowcase'
import CopyTradingSection from '@/components/sections/CopyTradingSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsBanner from '@/components/sections/StatsBanner'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CommunityCTASection from '@/components/sections/CommunityCTASection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <LivePlatformStats />
      <HowItWorksSection />
      <StatsBanner />
      <FreeBotShowcase />
      <CopyTradingSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CommunityCTASection />
      <Footer />
    </main>
  )
}
