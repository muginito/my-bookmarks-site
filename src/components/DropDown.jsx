import {
  faBars,
  faFileExport,
  faFileImport,
  faTrash,
  faMoon,
  faSun,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, stagger } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useTheme } from "../hooks/useTheme"

export default function DropDown({ onExport, onImport }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { theme, toggleTheme } = useTheme()
  const themeIcon = theme === "dark" ? faMoon : theme === "light" ? faSun : faDisplay
  const themeText = theme === "dark" ? "Modo Escuro" : theme === "light" ? "Modo Claro" : "Sistema"

  useEffect(() => {
    function handleClickOutside(event) {
      const menu = document.getElementById("dropdownToggle")
      if (menu && !menu.contains(event.target)) {
        setTimeout(() => setOpen(false), 100)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setOpen])

  const container = {
    closed: {
      opacity: 0,
      y: 0,
      pointerEvents: "none",
      transition: { delayChildren: stagger(0.07, { from: "last" }) },
    },
    open: {
      opacity: 1,
      y: 10,
      pointerEvents: "auto",
      transition: { delayChildren: stagger(0.12, { startDelay: 0.1 }) },
    },
  }

  const item = {
    closed: { opacity: 0, scale: 0.95, y: 0 },
    open: { opacity: 1, scale: 1, y: 0 },
  }

  return (
    <div className="relative w-fit h-fit">
      <button
        id="dropdownToggle"
        onClick={() => setOpen(!open)}
        className={`flex justify-center items-center rounded-xl w-fit h-fit p-2 text-xl
          active:scale-95 transition-all focus:outline-none cursor-pointer
          ${open ? " text-white" : "text-dark-ui-2 hover:text-dark-tx-2"}`}
        aria-label="Menu"
      >
        <FontAwesomeIcon className="text-base" icon={faBars} />
      </button>

      <motion.ul
        variants={container}
        initial={false}
        animate={open ? "open" : "closed"}
        transition={{ duration: 0.2 }}
        className="top-10 right-1/5 z-50 absolute flex flex-col sm:gap-1 bg-[#1a1a1a] shadow p-2
          border border-dark-ui-3 rounded-xl w-fit md:w-48 text-sm text-gray-200"
      >
        
        {/* opção de tema*/}
        <motion.li variants={item}>
          <button
            onClick={() => {
              toggleTheme();
              // Deixamos sem o setOpen(false) de propósito para
              // o usuário poder clicar várias vezes e ver as 3 opções de tema
            }}
            className="flex items-center gap-3 hover:bg-dark-ui-3 p-2 md:p-3 rounded-lg outline-none
              w-full hover:text-white text-left transition-all cursor-pointer"
          >
            <FontAwesomeIcon icon={themeIcon} className="w-5" />
            <span className="font-medium text-sm">{themeText}</span>
          </button>
        </motion.li>

        {/* linha divisoria */}
        <div className="h-px bg-dark-ui-3 w-full my-1"></div>

        {/*Opção de Exportar*/}
        <motion.li variants={item}>
          <button
            onClick={() => {
              if (onExport) onExport()
              setOpen(false)
            }}
            className="flex items-center gap-3 hover:bg-dark-ui-3 p-2 md:p-3 rounded-lg outline-none
              w-full hover:text-white text-left transition-all cursor-pointer"
          >
            <FontAwesomeIcon icon={faFileExport} className="w-5" />
            <span className="font-medium text-sm">Exportar</span>
          </button>
        </motion.li>

        {/* Opção de Importar */}
        <motion.li variants={item}>
          <input
            type="file"
            id="importFile"
            onChange={(e) => {
              if (onImport) onImport(e)
              setOpen(false)
            }}
            multiple={false}
            className="hidden"
          />
          <label
            htmlFor="importFile"
            className="flex items-center gap-3 hover:bg-dark-ui-3 p-2 md:p-3 rounded-lg outline-none
              w-full hover:text-white text-left transition-all cursor-pointer m-0"
          >
            <FontAwesomeIcon icon={faFileImport} className="w-5" />
            <span className="font-medium text-sm">Importar</span>
          </label>
        </motion.li>

        {/* Linha divisória */}
        <div className="h-px bg-dark-ui-3 w-full my-1"></div>

        {/* Opção de Deletar tudo */}
        <motion.li variants={item}>
          <button
            onClick={() => {
              navigate(`/?delete=all`)
              setOpen(false)
            }}
            className="flex items-center gap-3 hover:bg-red-500/10 p-2 md:p-3 rounded-lg
              outline-none w-full hover:text-red-500 text-left transition-all cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash} className="w-5 text-red-500/80 group-hover:text-red-500" />
            <span className="font-medium text-sm text-nowrap text-red-500/80 group-hover:text-red-500">Deletar Tudo</span>
          </button>
        </motion.li>
      </motion.ul>
    </div>
  )
}