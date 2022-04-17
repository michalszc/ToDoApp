const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
   extend: {
    keyframes: {
      lineThrough:{
        '0%':  { width : '0' },
        '100%': { width: '100%' }
      }
    },
    animation: {
      lineThrough: 'lineThrough 1s linear 0s 1 normal forwards'
    },
    screens: {
      ...defaultTheme.screens,
      'xs': '500px',
      's': {'min': '560px', 'max': '640px'},
      'sm': {'min': '640px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max': '1535px'},
      '2xl': {'min': '1536px'},
    },
  },
 },
 variants: {
  extend: {},
 },
 plugins: [],
 }