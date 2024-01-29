/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'moon': "url('/assets/icons/icon-moon.svg')"
      },
    fontFamily: {
      'nunitoSans': ['"NunitoSans"', 'Arial', 'sans-serif'],
      'hanken': ['"Hanken"', 'Arial', 'sans-serif']
    }
  },
  plugins: [],
  }
}
