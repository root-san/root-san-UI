/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#428C95',
        'primary-hover': '#337881',
        secondary: '#FFFFFF', // white
        text: '#171923', // gray 900
        'text-secondary': '#718096', // gray 500
        background: '#F1F2F6', // main BG
        warning: '#F56565', // red 500
        selected: '#3182CE', // blue 500
        'background-secondary': '#A0AEC0', // gray 400
      },
    },
  },
  plugins: [],
}
