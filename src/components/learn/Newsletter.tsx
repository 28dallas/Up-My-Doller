'use client'
import { useState } from 'react'
import { Mail, CheckCircle, Send } from 'lucide-react'

interface NewsletterProps {
  title?: string
  description?: string
  className?: string
}

/**
 * Client-side newsletter / lead-capture form. In production, wire `onSubmit`
 * to your email provider (e.g. Resend, ConvertKit, Mailchimp) or a Supabase
 * `newsletter` table. For now it stores the email in localStorage and shows
 * a success state so the flow is fully functional in the demo.
 */
export default function Newsletter({
  title = 'Get Free Trading Tips & Strategy Updates',
  description = 'Join our newsletter for beginner-friendly Deriv guides, strategy breakdowns, and exclusive bot recommendations. No spam, unsubscribe anytime.',
  className = '',
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    try {
      const existing = JSON.parse(localStorage.getItem('pdp_newsletter') || '[]')
      existing.push({ email, at: new Date().toISOString() })
      localStorage.setItem('pdp_newsletter', JSON.stringify(existing))
    } catch {
      // storage unavailable — still show success in demo
    }
    setStatus('success')
  }

  return (
    <section className={`py-14 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-10 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-5">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-7 leading-relaxed">{description}</p>

          {status === 'success' ? (
            <div className="mx-auto max-w-md rounded-2xl border border-primary/30 bg-primary/5 p-5 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary shrink-0" />
              <div className="text-left">
                <div className="text-white font-semibold text-sm">You&apos;re subscribed!</div>
                <div className="text-muted-foreground text-xs mt-0.5">Check your inbox for the next update.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-black hover:bg-accent transition-all"
              >
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="mt-4 text-[11px] text-muted-foreground">
            <strong className="text-white">Affiliate Disclosure:</strong> We may earn a commission from links on this page, at no cost to you.
          </p>
        </div>
      </div>
    </section>
  )
}
