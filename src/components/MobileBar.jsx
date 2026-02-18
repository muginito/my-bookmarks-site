import { faFileExport, faFileImport, faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"
import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function MobileBar({ onExport, onImport }) {
  // Comecei a fazer numa animação para a barra não aparecer em cima dos itens e nem no menu de pagina (logica)
  const navigate = useNavigate()
  const [isHidden, setIsHidden] = useState(false)
  const { scrollY } = useScroll()

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

      {/* Coloquei um espaçador invisivel pro botão "+" ficar no centro */}
      <div className="w-12 pointer-events-none"></div>
    </motion.div>
  )
}
