/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        light: '#fdfdfd',
        dark: '#3F3E3E',
      },
      colors: {
        'primary-gray': '#fdfdfd',
        'primary-green': '#228C26',
        'secundary-green': '#259629',
        'input-color': '#EAEAEA',
        'dark-input-color': '#474747',
        'dark-input-icons-color': '#979797',
        'dark-input-text': '#ADADAD',
      },
      fontFamily: {
        sans: 'Inter',
        quicksand: 'Quicksand',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
