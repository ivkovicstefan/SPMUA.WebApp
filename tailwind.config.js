/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          50: '#fcf9eb',
          100: '#FFF8DE',
          200: '#fcf2ca',
          300: '#fff1ba',
          400: '#ffeca3',
          500: '#D2AC00',
          600: '#c39900'
        }
      }
    },
  },
  plugins: [],
}

