/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'header-linear': 'linear-gradient(180deg, #121926 55.73%, rgba(18, 25, 38, 0) 100%)',
        'header-linear-light': 'linear-gradient(180deg, #e7e7e7 55.73%, rgba(18, 25, 38, 0) 100%)'
      }
    }
  },
  plugins: []
};
