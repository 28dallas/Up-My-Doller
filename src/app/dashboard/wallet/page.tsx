'use client'
import { useState } from 'react'
import { Smartphone, CreditCard, CheckCircle, Clock, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const PAYMENT_HISTORY = [
  { id: 'MP001', date: '2024-01-15', amount: 2500, method: 'M-Pesa', ref: 'QHX7K9P2L1', status: 'completed', plan: 'Pro' },
  { id: 'MP002', date: '2023-12-15', amount: 2500, method: 'M-Pesa', ref: 'RJY8M3Q4N2', status: 'completed', plan: 'Pro' },
  { id: 'MP003', date: '2023-11-15', amount: 2500, method: 'M-Pesa', ref: 'SKZ9N4R5O3', status: 'completed', plan: 'Pro' },
]

export default function WalletPage() {
  const [phone, setPhone] = useState('0712345678')
  const [paying, setPaying] = useState(false)
  const [paymentStep, setPaymentStep] = useState<'idle' | 'waiting' | 'success'>('idle')
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'elite'>('pro')

  const handleMpesaPay = async () => {
    setPaying(true)
    setPaymentStep('waiting')
    // Simulate STK push
    setTimeout(() => {
      setPaymentStep('success')
      setPaying(false)
    }, 5000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet & Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your subscription and payment history</p>
      </div>

      {/* Current plan */}
      <Card className="border-primary/30 bg-primary/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Pro Plan</span>
                <Badge variant="green">Active</Badge>
              </div>
              <p className="text-muted-foreground text-xs mt-0.5">Renews on Feb 15, 2024 · KES 2,500/month</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Upgrade to Elite</Button>
        </div>
      </Card>

      {/* M-Pesa payment */}
      <Card>
        <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-success" />
          Pay via M-Pesa
        </h2>

        {paymentStep === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm">Your subscription has been activated.</p>
            <Button variant="primary" className="mt-6" onClick={() => setPaymentStep('idle')}>Done</Button>
          </div>
        ) : paymentStep === 'waiting' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Smartphone className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Waiting for Payment...</h3>
            <p className="text-muted-foreground text-sm">Check your phone ({phone}) for the M-Pesa prompt.</p>
            <p className="text-muted-foreground text-xs mt-2">Enter your M-Pesa PIN to complete payment.</p>
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'pro', label: 'Pro Plan', price: 'KES 2,500/mo' },
                { key: 'elite', label: 'Elite Plan', price: 'KES 6,500/mo' },
              ].map(({ key, label, price }) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key as 'pro' | 'elite')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === key
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-primary font-mono text-sm mt-0.5">{price}</div>
                </button>
              ))}
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-1.5 block">M-Pesa Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <p className="text-muted-foreground text-xs mt-1.5">Must be a registered Safaricom M-Pesa number</p>
            </div>

            <div className="bg-background rounded-xl border border-border p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Plan</span>
                <span className="text-white">{selectedPlan === 'pro' ? 'Pro' : 'Elite'}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-white font-mono font-bold">KES {selectedPlan === 'pro' ? '2,500' : '6,500'}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-white font-semibold">Total</span>
                <span className="text-primary font-mono font-bold">KES {selectedPlan === 'pro' ? '2,500' : '6,500'}</span>
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={handleMpesaPay} disabled={paying}>
              <Smartphone className="w-4 h-4" />
              Pay KES {selectedPlan === 'pro' ? '2,500' : '6,500'} via M-Pesa
            </Button>

            <p className="text-center text-muted-foreground text-xs">
              Also accept: <CreditCard className="w-3 h-3 inline mx-1" />Visa/Mastercard via Stripe
            </p>
          </div>
        )}
      </Card>

      {/* Payment history */}
      <Card>
        <h2 className="text-white font-bold text-lg mb-5">Payment History</h2>
        <div className="space-y-3">
          {PAYMENT_HISTORY.map((payment) => (
            <div key={payment.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <div className="w-9 h-9 rounded-lg bg-success/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{payment.plan} Plan</div>
                <div className="text-muted-foreground text-xs">{payment.date} · Ref: {payment.ref}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-white font-mono text-sm font-bold">KES {payment.amount.toLocaleString()}</div>
                <Badge variant="green" className="text-xs">{payment.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
