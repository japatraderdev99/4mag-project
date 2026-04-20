import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:   '#1A1714',
        paper: '#E9E3D6',
        sand:  '#A09688',
        red:   '#7D2218',
        muted: '#7A7265',
      },
      fontFamily: {
        // ITC Avant Garde Gothic Pro (Adobe Fonts) — add Typekit kit when available
        display: ['itc-avant-garde-gothic-pro', 'var(--font-jakarta)', 'sans-serif'],
        // Plus Jakarta Sans — body/copy (local TTF)
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        // DepartureMono — small labels
        mono:    ['var(--font-departure)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': 'clamp(3.5rem, 12vw, 10rem)',
        'display-lg': 'clamp(2rem, 7vw, 6rem)',
        'display-sm': 'clamp(1.4rem, 4vw, 3rem)',
      },
      letterSpacing: {
        widest: '0.25em',
        label:  '0.18em',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
