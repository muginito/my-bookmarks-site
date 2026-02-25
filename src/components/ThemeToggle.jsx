import { useTheme } from "../hooks/useTheme"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-full font-bold border active:scale-95"
      style={{
        background: "var(--bg-2)",
        color: "var(--text)",
        borderColor: "var(--ui)",
      }}
    >
      {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"}
    </button>
  )
}