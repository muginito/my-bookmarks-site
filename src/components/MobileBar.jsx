import { faFileExport, faFileImport, faSquarePlus, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"
import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function MobileBar({ onExport, onImport }) {
  // Comecei a fazer numa animação para a barra não aparecer em cima dos itens e nem no menu de pagina (logica)
  const navigate = useNavigate()
  const [isHidden, setIsHidden] = useState(false)
  const { scrollY } = useScroll()
  //Menu Dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    // se o usuario descer mais que 50px a barra some, se subir ela aparece
    if (latest > previous && latest > 50) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden right-0 bottom-0 left-0 z-50 fixed flex justify-between items-center
        bg-[#1a1a1a] px-6 border-dark-ui-3 border-t h-16"
    >
      {/* Espaçador invisivel*/}
      <div className="w-12 pointer-events-none"></div>

      {/*  Botão de adicionar Form (Centro) */}
      <button
        onClick={() => navigate("/?form=new")}
        className="flex justify-center items-center w-12 h-12 text-dark-ye text-6xl active:scale-95
          transition-all duration-150"
      >
        <FontAwesomeIcon icon={faSquarePlus} />
      </button>

      {/* Menu */}
      <div className="relative flex justify-center items-center w-12 h-12">
        {/* Botão que abre e fecha o menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex justify-center items-center rounded-xl w-full h-full text-xl
            active:scale-95 transition-all focus:outline-none
            ${isMenuOpen ? "bg-dark-ui-3 text-white" : "text-dark-ui-2 hover:bg-dark-ui-3"}`}
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
          className="absolute bottom-16 right-0 bg-[#1a1a1a] border border-dark-ui-3 rounded-xl p-2
            w-48 shadow-2xl flex flex-col gap-1 origin-bottom-right"
        >
          {/* Opção de export */}
          <button
            onClick={() => {
              if (onExport) onExport()
              setIsMenuOpen(false) // Fecha o menu ao clicar
            }}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-200
              hover:bg-dark-ui-3 hover:text-white transition-all text-left outline-none"
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
              setIsMenuOpen(false) // Fecha o menu ao selecionar
            }}
            multiple={false}
            className="hidden"
          />
          <label
            htmlFor="importFile"
            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-200
              hover:bg-dark-ui-3 hover:text-white transition-all text-left cursor-pointer m-0
              outline-none"
          >
            <FontAwesomeIcon icon={faFileImport} className="w-5" />
            <span className="font-medium text-sm">Importar</span>
          </label>
        </motion.div>
      </div>
    </motion.div>
  )
}
