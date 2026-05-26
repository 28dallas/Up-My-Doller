'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { CircleDollarSign, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

const priorityCountries = ['Kenya', 'Tanzania', 'Uganda', 'Nigeria', 'Ghana', 'Rwanda']
const otherAfricanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Djibouti', 'DR Congo', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Guinea', 'Guinea-Bissau',
  'Ivory Coast', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania',
  'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Senegal', 'Seychelles',
  'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Togo', 'Tunisia',
  'Zambia', 'Zimbabwe',
]
const restOfWorld = ['United Kingdom', 'United States', 'Canada', 'India', 'United Arab Emirates', 'Germany', 'France']

const countries = [...priorityCountries, ...otherAfricanCountries, ...restOfWorld]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    country: 'Kenya',
  })
  const [acceptedRisk, setAcceptedRisk] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const canSubmit = acceptedRisk && acceptedTerms && !loading

  const formErrors = useMemo(() => {
    const nextErrors: Record<string, string> = {}
    if (!form.full_name.trim()) nextErrors.full_name = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm_password) nextErrors.confirm_password = 'Passwords do not match.'
    if (!acceptedRisk) nextErrors.acceptedRisk = 'You must acknowledge the trading risk.'
    if (!acceptedTerms) nextErrors.acceptedTerms = 'You must accept the Terms and Privacy Policy.'
    return nextErrors
  }, [acceptedRisk, acceptedTerms, form])

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      setErrors({ oauth: error.message })
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          country: form.country,
        },
      },
    })

    setLoading(false)

    if (error) {
      setErrors({ submit: error.message })
      return
    }

    toast.success('Account created successfully.')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-xl rounded-[2rem] border border-border bg-card/90 p-8 shadow-2xl backdrop-blur">
        <Link href="/" className="mb-8 inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <CircleDollarSign className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-white">Pips Dollar Printer</div>
            <div className="text-xs text-muted-foreground">Build bots and copy traders without code</div>
          </div>
        </Link>

        <h1 className="text-3xl font-bold text-white">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start with the free plan and upgrade later using M-Pesa or card.</p>

        <button
          type="button"
          onClick={handleGoogle}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-white transition hover:border-primary/40 hover:bg-background"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-white">Full Name</span>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={form.full_name}
                onChange={(event) => setForm((current) => ({ ...current, full_name: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary"
                placeholder="Your full name"
              />
            </div>
            {errors.full_name && <p className="mt-1 text-xs text-red-200">{errors.full_name}</p>}
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-white">Email</span>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-200">{errors.email}</p>}
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-white">Country</span>
            <select
              value={form.country}
              onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))}
              className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
            >
              {countries.map((country) => (
                <option key={country} value={country} className="bg-slate-900 text-white">
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Password</span>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background/60 py-3 pl-11 pr-12 text-sm text-white outline-none transition focus:border-primary"
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-200">{errors.password}</p>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white">Confirm Password</span>
            <input
              type="password"
              value={form.confirm_password}
              onChange={(event) => setForm((current) => ({ ...current, confirm_password: event.target.value }))}
              className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
              placeholder="Repeat your password"
            />
            {errors.confirm_password && <p className="mt-1 text-xs text-red-200">{errors.confirm_password}</p>}
          </label>

          <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={acceptedRisk}
              onChange={(event) => setAcceptedRisk(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border bg-background text-primary"
            />
            <span>I understand that trading involves substantial risk of loss.</span>
          </label>
          {errors.acceptedRisk && <p className="-mt-2 md:col-span-2 text-xs text-red-200">{errors.acceptedRisk}</p>}

          <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border bg-background text-primary"
            />
            <span>
              I agree to the <Link href="/terms" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.acceptedTerms && <p className="-mt-2 md:col-span-2 text-xs text-red-200">{errors.acceptedTerms}</p>}

          {(errors.oauth || errors.submit) && (
            <p className="md:col-span-2 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200">
              {errors.oauth || errors.submit}
            </p>
          )}

          <Button type="submit" className="md:col-span-2 justify-center rounded-2xl py-3" disabled={!canSubmit}>
            {loading ? 'Creating account...' : 'Start Free'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
