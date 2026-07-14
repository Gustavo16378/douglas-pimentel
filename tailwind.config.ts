import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design palette (from the Claude Design export)
        ink: '#14120f', // primary dark background
        'ink-soft': '#1a1816', // dark text on cream / floating button
        'ink-panel': '#1c1a17', // calculator card
        'ink-deep': '#0f0d0b', // footer
        cream: '#f5f1ea', // off-white surface
        'cream-2': '#ece5d8', // testimonial card
        sand: '#e3ded3', // body backdrop behind the sheet
        gold: '#c9a86a',
        'gold-light': '#ddb87c', // hover
        'gold-dark': '#8a6a35', // labels on cream
      },
      fontFamily: {
        sans: ['Public Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      maxWidth: {
        sheet: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config
