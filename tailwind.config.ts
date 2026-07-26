import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#0f0f12',
        card: '#18181b',
        border: '#27272a',
        primary: {
          DEFAULT: '#10b981',
          foreground: '#022c22',
          muted: '#059669',
        },
        accent: '#34d399',
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        gold: '#f59e0b',
        zinc: {
          850: '#1f1f23',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(16, 185, 129, 0.25)',
        'glow-sm': '0 0 12px rgba(16, 185, 129, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
