/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#e76f51",
        "secondary": "#f4a261",
        "accent": "#e9c46a",
        "accent-light": "#e9c46a80",
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}