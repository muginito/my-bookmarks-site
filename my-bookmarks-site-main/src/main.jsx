import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/styles.css"
import "./styles/replacement.css"
import App from "./App.jsx"

//  apliquei o tema salvo ANTES do React renderizar
const theme = localStorage.getItem("theme")
if (theme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)