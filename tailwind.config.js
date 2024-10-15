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
        'dark-task-color': '#575757',
        'dark-complete-task-color': '#474747',
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
      transitionProperty: {
        'bg-transform': 'background-color, transform',
        'color-transform': 'color, transform',
      },
      transitionDuration: {
        'bg-transform': '0.3s, 0.2s',
        'color-transform': '0.3s, 0.25s',
      },
    },
  },
  plugins: [],
};
