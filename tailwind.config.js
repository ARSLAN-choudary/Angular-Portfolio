/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{html,ts}" 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-dark': 'linear-gradient(90deg,_rgba(19,_1,_34,_1)_1%,_rgba(30,_1,_51,_1)_51%,_rgba(20,_1,_26,_1)_100%)',
      },
    },
  },
  plugins: [],
}
