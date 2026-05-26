'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import MarketTicker from '@/components/shared/MarketTicker'
import Button from '@/components/ui/Button'
import { submitContactMessage } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const ok = await submitContactMessage(form.name, form.email, form.subject, form.message)
    setLoading(false)

    if (!ok) {
      toast.error('We could not send your message right now.')
      return
    }

    toast.success('Message received. We will get back to you soon.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Navbar />
      <MarketTicker />
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="rounded-[2rem] border border-border bg-card/80 p-8">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Contact
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white">Talk to the team</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Reach out for support, billing help, partnerships, or product feedback. If you are reporting a dashboard issue, include the exact page or feature name so we can investigate faster.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border bg-background/40 p-4">
                <p className="font-semibold text-white">Support</p>
                <p className="mt-1">Account access, saved bots, copy trading controls, or payment confirmation issues.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-4">
                <p className="font-semibold text-white">Partnerships</p>
                <p className="mt-1">Affiliate, community, media, or growth collaboration opportunities.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-4">
                <p className="font-semibold text-white">Feedback</p>
                <p className="mt-1">Feature requests, UX issues, and ideas for making the platform more useful for African traders.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border bg-card/80 p-8">
            <h2 className="text-2xl font-bold text-white">Send a message</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-white">Subject</span>
                <input
                  value={form.subject}
                  onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                  className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  required
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-white">Message</span>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  rows={7}
                  className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  required
                />
              </label>
            </div>

            <Button type="submit" className="mt-6 justify-center rounded-2xl" disabled={loading}>
              {loading ? 'Sending...' : 'Submit Message'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
