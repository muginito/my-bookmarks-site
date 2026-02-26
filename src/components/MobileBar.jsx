import { faCirclePlus, faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"
import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function MobileBar() {
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

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sm:hidden right-0 bottom-0 left-0 z-50 fixed flex flex-col justify-between
        items-center bg-[#1a1a1a] px-6 border-dark-ui-3 border-t h-16"
    >
      {/*  Botão de adicionar Form (Centro) */}
      <button
        onClick={() => navigate("/?form=new")}
        className="flex items-center my-2 w-12 h-12 text-dark-ye text-5xl active:scale-95
          transition-all duration-150 justify center"
        aria-label="Novo bookmark"
      >
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
    </motion.div>
  )
}
