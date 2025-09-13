/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        cursive: ['"Playwrite DE Grund"', 'cursive'],
      },
    },
  },
  plugins: [],
}