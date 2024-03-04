/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 0 0 100px rgba(0, 0, 0, 0.5)',
      },
      animation:{
        'bounce':'bounce 0.3s infinite',
        'animateCloud': 'animateCloud 2.5s linear infinite'
      },
      keyframes:{
        bounce: {
          '0%, 100%': {transform: 'translate(0, 0)'},
          '50%': {transform: 'translateY(5px)'},
        },
        animateCloud: {
          '0%': {transform: 'translateY(-100%)'},
          "100%": {transform: 'translateY(800%)'},
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

