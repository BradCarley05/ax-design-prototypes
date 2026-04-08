/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius-card)',
        md: 'var(--radius-element)',
        sm: 'var(--radius-button-sm)',
      },
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        card: {
          DEFAULT: 'var(--bg-content)',
          foreground: 'var(--text)',
        },
        popover: {
          DEFAULT: 'var(--bg-elevated)',
          foreground: 'var(--text)',
        },
        primary: {
          DEFAULT: 'var(--bg-button)',
          foreground: 'var(--text-button)',
        },
        secondary: {
          DEFAULT: 'var(--bg-secondary)',
          foreground: 'var(--text)',
        },
        muted: {
          DEFAULT: 'var(--neutral-200)',
          foreground: 'var(--text-light)',
        },
        accent: {
          DEFAULT: 'var(--bg-secondary-hover)',
          foreground: 'var(--text)',
        },
        destructive: {
          DEFAULT: 'var(--bg-button-negative)',
          foreground: 'var(--text-status-button)',
        },
        border: 'var(--border-medium)',
        input: 'var(--border-dark)',
        ring: 'var(--border-focus)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
