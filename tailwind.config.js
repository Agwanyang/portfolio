/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        copper: 'var(--copper)',
        'copper-dark': 'var(--copper-dark)',
        line: 'var(--line)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        luxury: 'var(--shadow)',
      },
    },
  },
  plugins: [],
}
