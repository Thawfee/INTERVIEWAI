/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070E',
          900: '#080B15',
          850: '#0B0F1C',
          800: '#0F1424',
          700: '#161C30',
          600: '#1E2740',
        },
        cyan: {
          glow: '#38E1FF',
        },
        violet: {
          glow: '#8B7CFF',
        },
        mist: {
          100: '#EDF1FA',
          200: '#C7CEDE',
          300: '#9AA3BC',
          400: '#6E7793',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(56, 225, 255, 0.35)',
        'glow-violet': '0 0 40px -10px rgba(139, 124, 255, 0.4)',
        card: '0 20px 60px -20px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
