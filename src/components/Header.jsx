import InputBar from "./InputBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"

export default function Header({ onSearch, onExport }) {
  const navigate = useNavigate()

  // Coloquei a função de busca do App
  return (
    <header className="flex flex-col justify-center items-center m-auto w-[75%] max-w-225">
      <h1
        className="my-12 md:my-24 w-full font-heading font-bold text-yellow-400 text-3xl md:text-6xl
          text-center"
      >
        Meus Bookmarks
      </h1>
      <div className="flex gap-4 w-full">
        {/* <InputBar id="url" type="text" placeholder="Paste URL" /> */}
        <InputBar
          id="search"
          type="search"
          placeholder="Search..."
          // className="md:font-normal text-sm md:text-base"
          onChange={(e) => onSearch(e.target.value)}
          // Depois que o usuario digita algo, é enviado para o app atualizar o estado
        />
        <button
          className="hidden md:block bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit font-bold
            text-dark-bg-2 text-sm md:text-base whitespace-nowrap active:scale-95 cursor-pointer"
          onClick={() => navigate("/?form=new")}
        >
          New Bookmark
        </button>
      </div>
      <hr className="my-6 border border-dark-ui-3 w-full" />
      {/* Export, NewForm e Mudar tema (não adicionado) para a versão mobile */}
      <div
        className="md:hidden right-0 bottom-0 left-0 z-50 fixed flex justify-between items-center
          bg-[#1a1a1a] px-6 border-dark-ui-3 border-t h-16"
      >
        {/* Botão de exportar */}
        <button
          onClick={onExport}
          className="flex justify-center items-center hover:bg-dark-ui-3 rounded-xl w-12 h-12
            text-gray-300 text-xl active:scale-95 transition-all"
        >
          <FontAwesomeIcon icon={faFileExport} />
        </button>

        {/* Botão de adicionar Form no mobile */}
        <button
          onClick={newForm}
          className="flex justify-center items-center bg-dark-ye pb-1 rounded-xl w-12 h-12
            font-normal text-dark-bg-2 text-3xl active:scale-95 transition-all"
        >
          +
        </button>

        {/* Coloquei um espaçador invisivel pro botão "+" ficar no centro */}
        <div className="w-12 pointer-events-none"></div>
      </div>
    </header>
  )
}
