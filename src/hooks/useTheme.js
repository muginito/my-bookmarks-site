import { useEffect, useState } from "react"

const themes = ["light", "dark", "auto"]

export function useTheme() {
  const [theme, setTheme] = useState("auto")

  // carregar tema salvo
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) setTheme(saved)
  }, [])

  // aplicar tema no html
  useEffect(() => {
    const html = document.documentElement

    if (theme === "dark") {
      html.classList.add("dark")
    } else if (theme === "light") {
      html.classList.remove("dark")
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      html.classList.toggle("dark", prefersDark)
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length]
    setTheme(next)
  }

  return { theme, toggleTheme }
}