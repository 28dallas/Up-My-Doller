import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Briefcase, Code, HeadphonesIcon, PenTool, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const OPEN_ROLES = [
  {
    title: 'Senior Frontend Engineer',
    type: 'Full-time · Remote',
    icon: Code,
    desc: 'Build and improve the trading dashboard, bot builder, and real-time data interfaces using Next.js and TypeScript.',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
  },
  {
    title: 'Trading Content Writer',
    type: 'Contract · Remote',
    icon: PenTool,
    desc: 'Write practical trading guides, strategy breakdowns, and product tutorials for Deriv traders across Africa.',
    skills: ['Trading knowledge', 'Clear writing', 'SEO basics', 'Deriv familiarity'],
  },
  {
    title: 'Community Support Specialist',
    type: 'Part-time · Remote',
    icon: HeadphonesIcon,
    desc: 'Help traders in our Telegram community and dashboard support center with product questions and trading issues.',
    skills: ['Telegram', 'Deriv platform', 'Customer empathy', 'Swahili/English'],
  },
  {
    title: 'Growth & Partnerships Manager',
    type: 'Full-time · Remote',
    icon: TrendingUp,
    desc: 'Drive affiliate partnerships, influencer relationships, and community growth across East Africa.',
    skills: ['Partnerships', 'Social media', 'Trading communities', 'East Africa market'],
  },
]

const PERKS = [
  'Fully remote — work from anywhere in Africa',
  'Competitive pay in KES or USD',
  'M-Pesa salary payments available',
  'Free Pro plan subscription',
  'Work directly with the founding team',
  'Fast-moving, low-bureaucracy environment',
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Hero */}
      <section className="pt-4 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Build the Future of <span className="gradient-text">African Trading</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We&apos;re a small, fast-moving team building trading software for thousands of Deriv traders across Africa. If you care about practical outcomes and user empathy, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-10 border-y border-border bg-surface/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: 'Remote-first', label: 'Work from anywhere' },
              { value: 'Small team', label: 'High ownership, low politics' },
              { value: 'Fast iteration', label: 'Ship and improve quickly' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-extrabold text-primary">{value}</div>
                <div className="text-muted-foreground text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-3">Open Roles</h2>
        <p className="text-muted-foreground mb-10">All roles are remote. We hire across East Africa and beyond.</p>
        <div className="space-y-5">
          {OPEN_ROLES.map(({ title, type, icon: Icon, desc, skills }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-white font-bold">{title}</h3>
                    <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-0.5">{type}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
                <Link href="/contact"
                  className="shrink-0 flex items-center gap-1 text-primary text-sm font-medium hover:underline group-hover:gap-2 transition-all">
                  Apply <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-surface/30 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Why Work With Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We&apos;re building something that genuinely helps people. Our users are real traders trying to improve their financial lives — and the work you do here directly impacts them.
              </p>
              <div className="space-y-3">
                {PERKS.map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <Briefcase className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-white font-bold text-lg mb-3">Don&apos;t see your role?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                We&apos;re always open to strong people who care about the product. Send us a short note about who you are, what you&apos;re good at, and why you want to work on this.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-all text-sm">
                Send an Open Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
