import InputBar from "./InputBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"
import DropDown from "./DropDown"

export default function Header({ onSearch, onExport, onImport, isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate()

  // Coloquei a função de busca do App
  return (
    <header className="flex flex-col justify-center items-center m-auto w-[75%] max-w-225">
      <div className="flex gap-4 w-full">
        <DropDown
          onExport={onExport}
          onImport={onImport}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {/* <InputBar id="url" type="text" placeholder="Paste URL" /> */}
        <InputBar
          id="search"
          type="search"
          placeholder="Buscar"
          // className="md:font-normal text-sm md:text-base"
          onChange={(e) => onSearch(e.target.value)}
          // Depois que o usuario digita algo, é enviado para o app atualizar o estado
        />
        <button
          className="hidden md:block bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit font-bold
            text-dark-bg-2 text-sm md:text-base whitespace-nowrap active:scale-95 cursor-pointer"
          onClick={() => navigate("/?form=new")}
        >
          Novo Bookmark
        </button>
      </div>
    </header>
  )
}
