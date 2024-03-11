/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'header-color': '#1e1b4b',
        'bg-main-color': '#d4d4d4',
        'bg-main': 'bg-gray-50 dark:bg-gray-900',
        'track-card': '#4b5563',
        'hover-color': 'rgb(9, 13, 21)'
      },
      fontFamily:{
        main:['Kanit']
      }
    },
  },
  plugins: [],
}

