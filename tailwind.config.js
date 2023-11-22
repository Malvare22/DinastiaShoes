/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'green' : '#57AC39',
      'blue' : '#3358DB',
      'white' : colors.white,
      'red' : '#881337',
      'redWine' : '#533737',
      'black' : '#0a0a0a',
      'card' : '#D2C0C0',
      'blueDark' : '#3358DB',
      'lightGrey' : '#D9D9D9',
      'orange' : '#FF0000',
      'grey' : '#706B6B',
      'yellow' : '#D4B92E',
      'darkRed' : '#AC3939',
      'lightRed' : '#AC3939',
      'standardWhite': colors.white,
      'standardGrey': colors.grey,
      'pink': "#D5BBBB",
      'grisAzulado': '#73AAB6'
    },
  },
  plugins: [],
};
