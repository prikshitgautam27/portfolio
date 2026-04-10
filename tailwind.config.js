/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These now reference CSS variables, so they respond to the toggle
        dark:    "var(--bg-primary)",
        darkGray:"var(--bg-secondary)",
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
}
 