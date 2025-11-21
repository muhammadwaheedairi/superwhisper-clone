import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        brand: {
          gray: '#111111',
          surface: '#1C1C1E',
          accent: '#3B82F6'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'audio-wave': 'audio-wave 1.2s ease-in-out infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'audio-wave': {
            '0%, 100%': { height: '20%', opacity: '0.4' },
            '50%': { height: '100%', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};

export default config;