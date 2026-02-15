import InputBar from "./InputBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"

export default function Header({ newForm, onSearch, onExport }) {
  // Coloquei a função de busca do App
  return (
    <header className="flex flex-col justify-center items-center m-auto w-[75%] max-w-[900px]">
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
          className="bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit font-bold text-dark-bg-2
            text-sm md:text-base whitespace-nowrap active:scale-95 cursor-pointer hidden md:block"
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>
      <hr className="my-6 border border-dark-ui-3 w-full" />
      {/* Export, NewForm e Mudar tema (não adicionado) para a versão mobile */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1a1a1a] border-t
          border-dark-ui-3 z-50 flex items-center justify-between px-6"
      >
        {/* Botão de exportar */}
        <button
          onClick={onExport}
          className=" hover:bg-dark-ui-3 w-12 h-12 flex items-center justify-center
            rounded-xl text-gray-300 active:scale-95 transition-all text-xl"
        >
          <FontAwesomeIcon icon={faFileExport} />
        </button>

        {/* Botão de adicionar Form no mobile */}
        <button
          onClick={newForm}
          className="bg-dark-ye text-dark-bg-2 w-12 h-12 rounded-xl text-3xl font-normal flex
            items-center justify-center active:scale-95 transition-all pb-1"
        >
          +
        </button>

        {/* Coloquei um espaçador invisivel pro botão "+" ficar no centro */}
        <div className="w-12 pointer-events-none"></div>
      </div>
    </header>
  )
}
