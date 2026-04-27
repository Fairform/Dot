import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dot: {
          bg:       '#F7F6F3',
          black:    '#111111',
          charcoal: '#222222',
          grey: {
            50:  '#FAFAF9',
            100: '#F5F4F1',
            200: '#E8E7E3',
            300: '#D1D0CB',
            400: '#A8A79F',
            500: '#6B6A63',
            600: '#4A4942',
          },
          accent: '#5B6AF0',
          // Pastel card backgrounds
          pastel: {
            pink:    '#FDE8E8',
            green:   '#E3F0E8',
            lavender:'#EAE8F7',
            peach:   '#FDF0E3',
            sky:     '#E3EDF7',
            mint:    '#E3F5F0',
          },
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif:   ['Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        site:    '1120px',
        prose:   '640px',
        narrow:  '480px',
      },
      boxShadow: {
        card:   '0 1px 3px rgba(0,0,0,0.06)',
        'card-md': '0 4px 20px rgba(0,0,0,0.08)',
        pill:   '0 2px 8px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}

export default config
