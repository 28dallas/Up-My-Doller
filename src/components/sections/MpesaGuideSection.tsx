import { CreditCard, ArrowDownToLine, ArrowUpFromLine, ExternalLink } from 'lucide-react'

const steps = [
  ['1', 'Open a Deriv account', 'Use the free-account link and complete Deriv verification.'],
  ['2', 'Choose a payment option', 'In Deriv Cashier, select a supported local payment method or payment agent.'],
  ['3', 'Confirm before sending', 'Check the recipient and amount inside Deriv. Never send money to unverified contacts.'],
]

export default function MpesaGuideSection() {
  return <section className="py-16"><div className="max-w-7xl mx-auto px-4"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8"><div className="flex items-start gap-3 mb-6"><div className="p-2.5 rounded-xl bg-primary/15"><CreditCard className="w-6 h-6 text-primary" /></div><div><h2 className="text-2xl font-bold text-white">Kenya deposits & withdrawals</h2><p className="text-muted-foreground text-sm mt-1">A quick M-Pesa and local-payment checklist. Availability depends on your Deriv account and location.</p></div></div><div className="grid md:grid-cols-3 gap-4">{steps.map(([number, title, description]) => <div key={number} className="bg-background/60 border border-border rounded-xl p-4"><span className="text-primary font-mono font-bold">{number}</span><h3 className="text-white font-semibold mt-2">{title}</h3><p className="text-muted-foreground text-sm mt-1">{description}</p></div>)}</div><div className="mt-5 flex flex-wrap gap-3"><a href="https://deriv.com/help-centre/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"><ArrowDownToLine className="w-4 h-4" />Deposit help <ExternalLink className="w-3.5 h-3.5" /></a><a href="https://deriv.com/help-centre/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"><ArrowUpFromLine className="w-4 h-4" />Withdrawal help <ExternalLink className="w-3.5 h-3.5" /></a></div></div></div></section>
}
