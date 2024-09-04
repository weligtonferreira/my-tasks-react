/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-gray': '#fdfdfd',
        'primary-green': '#228C26',
        'input-color': '#EAEAEA',
      },
      fontFamily: {
        sans: 'Inter',
        quicksand: 'Quicksand',
      },
    },
  },
  plugins: [],
};
