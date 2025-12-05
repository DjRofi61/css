/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Arabic"', 'Inter', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#e11d48',
          dark: '#be123c'
        }
      }
    }
  },
  plugins: [require('tailwindcss-rtl')]
};
