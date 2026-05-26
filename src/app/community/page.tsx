import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MessageCircle, Shield, Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const RULES = [
  'Be respectful to all community members',
  'No spam, scams, or unsolicited promotions',
  'Share strategies and insights freely',
  'No guaranteed profit claims',
  'Report suspicious activity to admins',
  'English and Swahili are welcome',
]

const FEATURED_MEMBERS = [
  { name: 'AlphaTrader_KE', role: 'Top Trader', flag: 'KE', trades: '1,240+' },
  { name: 'ProfitKing254', role: 'Verified Trader', flag: 'KE', trades: '980+' },
  { name: 'SyntheticGuru_TZ', role: 'Strategy Expert', flag: 'TZ', trades: '756+' },
  { name: 'ForexMaster_UG', role: 'Forex Specialist', flag: 'UG', trades: '543+' },
]

const CHANNELS = [
  { icon: 'TG', name: 'Telegram Group', members: '12,000+', desc: 'Main community hub. Signals, strategies, and support.', link: 'https://t.me/pipsdollarprinter', cta: 'Join Telegram' },
  { icon: 'WA', name: 'WhatsApp Group', members: '3,500+', desc: 'Quick updates and mobile-friendly trading tips.', link: '#', cta: 'Join WhatsApp' },
  { icon: 'DC', name: 'Discord Server', members: '1,200+', desc: 'Deep strategy discussions and bot development.', link: '#', cta: 'Join Discord' },
]

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      <section className="pt-4 pb-10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Join Our <span className="gradient-text">Trading Community</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Connect with 12,000+ traders across Africa. Share strategies, get signals, and grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/pipsdollarprinter" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                <MessageCircle className="w-5 h-5" />
                Join Telegram Group
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        <div className="grid sm:grid-cols-3 gap-5">
          {CHANNELS.map((channel) => (
            <Card key={channel.name} glow="green" className="text-center">
              <div className="text-4xl mb-3 font-bold text-primary">{channel.icon}</div>
              <h3 className="text-white font-bold mb-1">{channel.name}</h3>
              <div className="text-primary font-mono text-sm font-bold mb-2">{channel.members} members</div>
              <p className="text-muted-foreground text-xs mb-4">{channel.desc}</p>
              <a href={channel.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full">{channel.cta}</Button>
              </a>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-gold" />
            Featured Members
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_MEMBERS.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg mx-auto mb-3">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-white font-semibold text-sm">{member.name}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{member.flag} {member.role}</div>
                <div className="text-primary font-mono text-xs mt-2">{member.trades} trades</div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Community Guidelines
          </h2>
          <Card>
            <div className="grid sm:grid-cols-2 gap-3">
              {RULES.map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-muted-foreground">{rule}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
