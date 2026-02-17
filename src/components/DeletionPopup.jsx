import { useLockBodyScroll } from "react-use"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function DeletionPopup({ onConfirm, children }) {
  useLockBodyScroll()

  const navigate = useNavigate()

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        navigate("/")
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [navigate])

  return (
    <div className="top-0 fixed flex justify-center">
      <div className="backdrop-brightness-90 w-screen h-screen" onClick={() => navigate("/")}></div>
      <div
        className="top-18 absolute flex flex-col justify-center items-center bg-dark-ui mx-auto p-6
          border-2 sm:border-dark-ui-3 rounded-2xl"
      >
        <h1 className="p-2">Confirme</h1>
        <p className="p-4">{children}</p>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="bg-dark-bg-2 hover:bg-red-600 shadow px-12 py-2 rounded-2xl duration-200
              ease-in-out"
            onClick={onConfirm}
          >
            Sim
          </button>
          <button
            className="bg-dark-bg-2 hover:bg-dark-ui-2 shadow px-12 py-2 rounded-2xl duration-200
              ease-in-out"
            onClick={() => navigate("/")}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}
