import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Gift, Users, CheckCircle, Copy, Share2 } from 'lucide-react'
import EducationalCTA from '@/components/learn/EducationalCTA'
import RelatedTools from '@/components/learn/RelatedTools'
import { REFERRAL_TIERS } from '@/lib/learn-data'

const HOW_IT_WORKS = [
  { step: '1', title: 'Share your unique link', desc: 'Get your personal referral link and share it on Telegram, WhatsApp, or any social channel.' },
  { step: '2', title: 'Friends open a Deriv account', desc: 'Your friends click your link and open a free Deriv account. No purchase needed to count.' },
  { step: '3', title: 'Unlock premium rewards', desc: 'Track your progress and unlock free premium features as you hit each referral milestone.' },
]

export default function ReferPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-6">
            Referral Program
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Invite Friends, <span className="gradient-text">Unlock Premium Features</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            The fastest way to upgrade your trading experience is to share it. Invite 2 friends and get a free personalized AI bot built around
            your strategy — plus premium signals, Pro, and even Elite access.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-black hover:bg-accent transition-all">
              <Copy className="w-4 h-4" /> Copy Your Referral Link
            </button>
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-white hover:border-primary/40 hover:bg-white/5 transition-all">
              How It Works
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Users, value: '2', label: 'Friends to unlock AI bot' },
              { icon: Gift, value: 'Free', label: 'Premium signals' },
              { icon: CheckCircle, value: '100%', label: 'Free Deriv signup counts' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-extrabold text-white">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold text-lg mx-auto mb-4">
                {step}
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards tiers */}
      <section className="py-16 bg-surface/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Unlock Rewards</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Every referral counts. Reach a milestone and the reward is unlocked automatically.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REFERRAL_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-6 text-center flex flex-col ${tier.featured ? 'border-primary/40 bg-gradient-to-b from-primary/10 to-card shadow-[0_0_20px_rgba(0,230,118,0.1)]' : 'border-border bg-card'}`}
              >
                {tier.featured && <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Most Popular</div>}
                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{tier.name}</h3>
                <div className={`font-extrabold text-lg mb-auto mt-2 ${tier.featured ? 'text-primary' : 'text-white'}`}>{tier.reward}</div>
                <p className="text-muted-foreground text-xs leading-relaxed mt-3">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share channels */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Share Where Your Friends Are</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Pick your favorite channel and share your referral link. Every free Deriv signup through your link counts toward your rewards.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { channel: 'Telegram', desc: 'Share in trading groups', color: '#0088cc' },
            { channel: 'WhatsApp', desc: 'Send to friends & family', color: '#25d366' },
            { channel: 'YouTube', desc: 'Mention in your videos', color: '#ff0000' },
            { channel: 'TikTok', desc: 'Short trading tips', color: '#ffffff' },
          ].map(({ channel, desc, color }) => (
            <div key={channel} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${color}1a`, color }}>
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{channel}</h3>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-primary/10 to-card border border-primary/20 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to start inviting?</h2>
          <p className="text-muted-foreground mb-6">
            Create your free account and get your personal referral link in seconds. Invite 2 friends to unlock your free AI bot!
          </p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-all">
            Get My Referral Link <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <EducationalCTA
        title="Build your trading edge"
        description="Open a free Deriv account and start your trading journey — then invite friends to unlock premium rewards."
        secondaryHref="/learn"
        secondaryLabel="Start Learning"
      />
      <RelatedTools />
      <Footer />
    </main>
  )
}
