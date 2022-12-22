/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#71EF71',
        secondary: '#FF6AF6',
        iconcolor: '#636B6C',
        
        gray: {
          100: '#E6E9EA',
          300: '#A5A5A5',
          600: '#2D2D2D',
          700: '#292929',
          800: '#242424',
          900: '#0E0E0E',
        }
      },
    },
  },
  plugins: [],
}
