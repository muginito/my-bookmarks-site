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
  // Aproveitar que a gente vai usar motion, vou transformar essa div em motion.div e passar as regras
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" }, //A barra vai pra fora da tela
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden right-0 bottom-0 left-0 z-50 fixed flex justify-between items-center
        bg-[#1a1a1a] px-6 border-dark-ui-3 border-t h-16"
    >
      {/* Botão de exportar */}
      <button
        onClick={onExport}
        className="flex justify-center items-center hover:bg-dark-ui-3 rounded-xl w-12 h-12
          text-dark-ui-2 text-xl active:scale-95 transition-all"
      >
        <FontAwesomeIcon icon={faFileExport} />
      </button>

      {/* Botão de importar */}
      <input type="file" id="importFile" onChange={onImport} multiple={false} className="hidden" />
      <label
        htmlFor="importFile"
        className="flex justify-center items-center hover:bg-dark-ui-3 rounded-xl w-12 h-12
          text-dark-ui-2 text-xl active:scale-95 transition-all cursor-pointer"
      >
        <FontAwesomeIcon icon={faFileImport} />
      </label>

      {/* Botão de adicionar Form no mobile */}
      <button
        onClick={() => navigate("/?form=new")}
        className="flex justify-center items-center w-12 h-12 text-dark-ye text-6xl active:scale-95
          transition-all duration-150"
      >
        <FontAwesomeIcon icon={faSquarePlus} />
      </button>

      {/* Botão do MenuDropdown */}
      <div className="relative flex justify-center items-center w-12 h-12">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex justify-center items-center rounded-xl w-full h-full text-xl
            active:scale-95 transition-all focus:outline-none
            ${isMenuOpen ? "bg-dark-ui-3 text-white" : "text-dark-ui-2 hover:bg-dark-ui-3"}`}
        >
          <FontAwesomeIcon icon={faBars} />
          <motion.div
            variants={{
              open: { opacity: 1, y: 0, pointerEvents: "auto", scale: 1 },
              closed: { opacity: 0, y: 10, pointerEvents: "none", scale: 0.95 },
            }}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-[#1a1a1a] border border-dark-ui-3 rounded-xl
              p-3 w-48 shadow-2xl flex flex-col gap-2 origin-bottom-right"
          >
            <p className="text-dark-ui-2 text-sm text-center py-2 italic cursor-default">
              Aqui é onde a gente coloca os botões
            </p>
          </motion.div>
        </button>
      </div>
    </motion.div>
  )
}
