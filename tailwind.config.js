/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          500: '#D2AC00',
          600: '#C39F00'
        }
      }
    },
  },
  plugins: [],
}

