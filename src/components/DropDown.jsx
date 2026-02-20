import { faBars, faFileExport, faFileImport, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function DropDown({ onExport, onImport, isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      const menu = document.getElementById("dropdownToggle")
      if (menu && !menu.contains(event.target)) {
        setTimeout(() => setIsMenuOpen(false), 100)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsMenuOpen])

  return (
    <div className="relative flex justify-center items-center w-12 h-12">
      {/* Botão que abre e fecha o menu */}
      <button
        id="dropdownToggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex justify-center items-center rounded-xl w-full h-full text-xl
          active:scale-95 transition-all focus:outline-none min-w-12
          ${isMenuOpen ? "bg-dark-ui-2 text-white" : "text-dark-ui-2 hover:text-dark-tx-2 hover:bg-dark-ui-3"}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <motion.div
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto", scale: 1 },
          closed: { opacity: 0, y: 10, pointerEvents: "none", scale: 0.95 },
        }}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
        className="top-16 right-0 z-50 absolute flex flex-col gap-1 bg-[#1a1a1a] shadow-2xl p-2
          border border-dark-ui-3 rounded-xl w-48 origin-bottom-right"
      >
        {/* Opção de export */}
        <button
          onClick={() => {
            if (onExport) onExport()
            setIsMenuOpen(false)
          }}
          className="flex items-center gap-3 hover:bg-dark-ui-3 p-3 rounded-lg outline-none w-full
            hover:text-white text-left transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faFileExport} className="w-5" />
          <span className="font-medium text-sm">Exportar</span>
        </button>

        {/*opção de import*/}
        <input
          type="file"
          id="importFile"
          onChange={(e) => {
            if (onImport) onImport(e)
            setIsMenuOpen(false)
          }}
          multiple={false}
          className="hidden"
        />
        <label
          htmlFor="importFile"
          className="flex items-center gap-3 hover:bg-dark-ui-3 m-0 p-3 rounded-lg outline-none
            w-full hover:text-white text-left transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faFileImport} className="w-5" />
          <span className="font-medium text-sm">Importar</span>
        </label>
        {/* Opção de Deletar Tudo */}
        <button
          onClick={() => {
            navigate(`/?delete=all`)
            setIsMenuOpen(false)
          }}
          className="flex items-center gap-3 hover:bg-red-500/10 p-3 rounded-lg outline-none w-full
            hover:text-red-500 text-left transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} className="w-5" />
          <span className="font-medium text-sm">Deletar Tudo</span>
        </button>
      </motion.div>
    </div>
  )
}
