import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FreeBotShowcase from '@/components/sections/FreeBotShowcase'
import CopyTradingSection from '@/components/sections/CopyTradingSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StatsBanner from '@/components/sections/StatsBanner'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import CommunityCTASection from '@/components/sections/CommunityCTASection'
import MarketTicker from '@/components/shared/MarketTicker'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsBanner />
        <FreeBotShowcase />
        <CopyTradingSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CommunityCTASection />
      </main>
      <Footer />
    </>
  )
}
