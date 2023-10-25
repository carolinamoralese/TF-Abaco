/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'naranja': '#f58634',
      'verde-claro': '#8cc63f',
      'amarillo': '#d2de38',
      'gris-oscuro':'#4d4d4d'
    },
    extend: {},
  },
  plugins: [],
}