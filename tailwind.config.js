/** @type {import('tailwindcss').Config} */


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
      'customGreen' : '#57AC39',
      'customBlue' : '#3358DB',
      'white' : '#fffbeb',
      'red' : '#881337',
      'redWine' : '#533737',
      'black' : '#0a0a0a',
      'card' : '#D2C0C0',
      'carouselBlue' : '#3358DB',
      'customGrey' : '#D9D9D9',
      'redForButton' : '#FF0000',
    },
  },
  plugins: [],
};
