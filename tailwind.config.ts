import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="espresso"]'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FAF0F2',
          100: '#F4DEE2',
          200: '#E9BEC6',
          300: '#D7A7B1',
          400: '#BA6676',
          500: '#993D4B',
          600: '#84323E',
          700: '#722F37', // Brand Burgundy
          800: '#5A252C',
          900: '#431C21',
          950: '#2A1014',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F8F4E7', // Brand Cream / Parchment
          200: '#F0E8CE',
          300: '#E5D8B0',
          400: '#DAC690',
          500: '#CDB16E',
          600: '#BA9B53',
          700: '#9A7D3E',
          800: '#7B6334',
          900: '#5F4D2B',
          950: '#3A2E1A',
        },
        'dusty-pink': {
          50: '#FBF5F7',
          100: '#F6EBF0',
          200: '#EDD6E0',
          300: '#D7A7B1', // Brand Dusty Pink
          400: '#C78C98',
          500: '#B06E7C',
          600: '#995664',
          700: '#7F434F',
          800: '#683641',
          900: '#542D35',
          950: '#35181E',
        },
        espresso: {
          50: '#F5F3F4',
          100: '#E8E5E6',
          200: '#D2CDCE',
          300: '#ABA3A5',
          400: '#7D7376',
          500: '#5C5255',
          600: '#463D40',
          700: '#342B2E',
          800: '#261F21',
          900: '#1C1417', // Brand Espresso Ink
          950: '#110C0E',
        },
        'candle-gold': {
          50: '#FAF6ED',
          100: '#F4ECDA',
          200: '#EADBB6',
          300: '#DFC58C',
          400: '#D9A760', // Brand Candlelight Gold
          500: '#C78B3F',
          600: '#A96E2E',
          700: '#865324',
          800: '#6D4220',
          900: '#57361D',
          950: '#331D0E',
        },
        'warm-oak': {
          50: '#F7F3F0',
          100: '#ECE3DD',
          200: '#DAC7BA',
          300: '#C3A694',
          400: '#AC826C',
          500: '#90644D',
          600: '#754D38',
          700: '#5E3B2A',
          800: '#4A2E20', // Brand Warm Oak
          900: '#3B241A',
          950: '#23140E',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
        reading: ['var(--font-lora)', 'Merriweather', 'serif'],
      },
      boxShadow: {
        'candle-glow': '0 0 25px -4px rgba(217, 167, 96, 0.45), 0 0 10px -2px rgba(217, 167, 96, 0.25)',
        'candle-glow-lg': '0 0 45px -4px rgba(217, 167, 96, 0.6), 0 0 20px -2px rgba(217, 167, 96, 0.35)',
        'rose-glow': '0 0 25px -4px rgba(215, 167, 177, 0.45)',
        'burgundy-glow': '0 0 30px -4px rgba(114, 47, 55, 0.5)',
        'shelf': '0 20px 25px -5px rgba(28, 20, 23, 0.4), 0 8px 10px -6px rgba(28, 20, 23, 0.3)',
        'book-spine': '-4px 0 10px rgba(0, 0, 0, 0.35), inset 2px 0 3px rgba(255, 255, 255, 0.15)',
        'book-cover': '6px 8px 20px rgba(28, 20, 23, 0.35), 0 0 0 1px rgba(217, 167, 96, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-warm': 'pulseWarm 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '25%': { opacity: '0.7', transform: 'scale(0.98)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
          '75%': { opacity: '0.8', transform: 'scale(0.99)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
