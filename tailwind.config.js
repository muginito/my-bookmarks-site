/** @type {import('tailwindcss').Config} */
export default {
  // A MÁGICA ACONTECE AQUI:
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // (aqui ficam as cores da paleta que criamos)
    },
  },
  plugins: [],
}