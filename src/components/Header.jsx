import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Header({ onSearch }) {
  const navigate = useNavigate()

  return (
    <header className="top-0 z-1 sticky flex justify-center bg-dark-bg mx-auto">
      <div className="flex gap-4 px-4 w-full max-w-5xl">
        <search className="w-full">
          <div
            className="flex items-center gap-3 bg-dark-ui px-4 py-3 rounded-full outline-2
              outline-dark-ui-3 hover:outline-yellow-400 w-full duration-150 ease"
          >
            <FontAwesomeIcon icon={faSearch} className="text-dark-ui-3" />
            <input
              className="bg-transparent outline-none w-full"
              id="search"
              type="search"
              placeholder="Buscar"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </search>
        <button
          className="hidden md:block bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit
            h-min-full font-bold text-dark-bg-2 text-sm md:text-base whitespace-nowrap
            active:scale-95 cursor-pointer"
          onClick={() => navigate("/?form=new")}
        >
          Novo Bookmark
        </button>
      </div>
    </header>
  )
}
