'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { useUTM } from '@/hooks/useUTM'

function UTMTracker() {
  useUTM()
  return null
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <UTMTracker />
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#121829',
            color: '#f8fafc',
            border: '1px solid #1E2A40',
          },
        }}
      />
    </ThemeProvider>
  )
}
