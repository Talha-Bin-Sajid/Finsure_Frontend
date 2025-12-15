/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Define theme colors that work for both light and dark modes
        primary: {
          DEFAULT: '#0ab6ff',
          hover: '#14e7ff',
        },
        dark: {
          bg: {
            primary: '#0c111a',
            secondary: '#151c27',
          },
          text: {
            primary: '#e7f0fa',
            secondary: '#e7f0fa/60',
          },
        },
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f5f7fa',
          },
          text: {
            primary: '#1a202c',
            secondary: '#718096',
          },
        },
      },
    },
  },
  plugins: [],
};