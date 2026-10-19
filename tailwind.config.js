/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E0E10',
          50: '#2A2A30',
          100: '#222226',
          200: '#1C1C20',
          300: '#161619',
          400: '#121215',
          card: '#161619',
          border: '#28282E',
        },
        warm: {
          white: '#F6F1E9',
          cream: '#EDE6DA',
          card: '#FFFFFF',
          border: '#E8E1D5',
          muted: '#8C857B',
          dark: '#3A3835',
        },
        flash: {
          yellow: '#FFC531',
          hover: '#E5B02B',
          light: '#FFF4D6',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      borderRadius: {
        'card': '20px',
        'card-sm': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 16px 40px rgba(0, 0, 0, 0.1)',
        'glow-yellow': '0 0 50px rgba(255, 197, 49, 0.25)',
        'glow-yellow-sm': '0 0 25px rgba(255, 197, 49, 0.2)',
        'dark-card': '0 10px 30px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
      }
    },
  },
  plugins: [],
}
