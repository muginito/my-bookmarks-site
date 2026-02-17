import InputBar from "./InputBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router"

export default function Header({ onSearch }) {
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
          Novo Bookmark
        </button>
      </div>
      <hr className="my-6 border border-dark-ui-3 w-full" />
    </header>
  )
}
