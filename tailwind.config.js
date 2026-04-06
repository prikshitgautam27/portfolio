/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0e27",
        darkGray: "#1a1f3a",
      },
    },
  },
  plugins: [],
}
