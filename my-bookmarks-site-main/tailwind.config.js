export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 🌞 TEMA CLARO
        "light-bg": "#fdf6e3",
        "light-tx": "#1a1a1a",

        // 🌙 TEMA ESCURO
        "dark-bg": "#121212",
        "dark-tx": "#f5f5f5",

        // UI (opcional, mas evita erro em classes já usadas)
        "dark-ui": "#9ca3af",
        "dark-ui-2": "#6b7280",
        "dark-ui-3": "#374151",
      },
    },
  },
  plugins: [],
}