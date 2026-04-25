import { Link2, Settings, TrendingUp, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: Link2,
    title: 'Connect Your Deriv Account',
    description: 'Securely link your Deriv.com account using OAuth. Your credentials are never stored — just a secure token.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Choose or Build a Bot Strategy',
    description: 'Pick from 500+ free bots in our library or use the no-code builder to create your own custom strategy.',
    color: 'text-gold',
    bg: 'bg-gold/10',
    border: 'border-gold/30',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Start Earning on Autopilot',
    description: 'Deploy your bot and let it trade 24/7. Monitor performance in real-time and get Telegram alerts on every trade.',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/30',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-heading">How It Works</h2>
          <p className="text-muted-foreground text-lg mt-3">
            Get up and running in under 5 minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-gold/50 z-0" />

          {STEPS.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 shadow-lg`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border ${step.border} flex items-center justify-center`}>
                  <span className={`text-xs font-bold font-mono ${step.color}`}>{step.number}</span>
                </div>
              </div>

              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.description}</p>

              {/* Arrow between steps */}
              {index < STEPS.length - 1 && (
                <div className="md:hidden mt-6 text-border">
                  <ArrowRight className="w-6 h-6 rotate-90 mx-auto text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
