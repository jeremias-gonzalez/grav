/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"


  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#5a9a77',
        beige: '#f5f5dc',  // Agrega tu nuevo color aquí
      },
      fontFamily: {
        kelsi: ['Kelsi', 'sans-serif'],
        kelsi2:['kelsi2','sanserif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    nextui()
  ],
}

