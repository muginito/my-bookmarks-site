import { useEffect, useState } from "react"

const themes = ["light", "dark"]

export function useTheme() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved && themes.includes(saved)) setTheme(saved)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    
    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
  }

  return { theme, toggleTheme }
}