function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

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
          DEFAULT: withOpacity('--color-ink-rgb'),
          50: '#2A2A30',
          100: '#222226',
          200: '#1C1C20',
          300: '#161619',
          400: '#121215',
          card: withOpacity('--color-ink-card-rgb'),
          border: withOpacity('--color-ink-border-rgb'),
        },
        warm: {
          white: withOpacity('--color-bg-rgb'),
          cream: withOpacity('--color-bg-soft-rgb'),
          card: withOpacity('--color-card-rgb'),
          border: withOpacity('--color-border-rgb'),
          muted: withOpacity('--color-muted-rgb'),
          dark: '#3A3835',
        },
        flash: {
          yellow: withOpacity('--color-cta-rgb'),
          hover: withOpacity('--color-cta-hover-rgb'),
          light: withOpacity('--color-cta-light-rgb'),
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
