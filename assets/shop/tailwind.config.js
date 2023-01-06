const colors = require('tailwindcss/colors')

/** @deprecated */
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,js}'],
  theme: {
    colors: {
      ...colors,
      primary: {
        text: '#0f172a'
      }
    },
    extend: {
      fontFamily: {
        poppins: ['\'Poppins\'', 'sans-serif']
      }
    }
  },
  plugins: []
}
