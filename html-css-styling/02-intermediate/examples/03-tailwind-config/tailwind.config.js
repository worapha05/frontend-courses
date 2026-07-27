/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          800: '#115e59',
          950: '#042f2e',
        },
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'Sarabun', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgb(4 47 46 / 0.12)',
      },
    },
  },
  plugins: [],
};
