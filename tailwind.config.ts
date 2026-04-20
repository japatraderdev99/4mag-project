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
        ink: '#0D0D0D',
        paper: '#F0EBE0',
        red: '#C8001E',
        muted: '#5A5A5A',
      },
      fontFamily: {
        display: ['var(--font-basteleur)', 'serif'],
        body: ['var(--font-switzer)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-departure)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': 'clamp(5rem, 18vw, 22rem)',
        'display-lg': 'clamp(3rem, 10vw, 12rem)',
      },
      letterSpacing: {
        'widest': '0.25em',
      },
      animation: {
        'marquee': 'marquee 24s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config