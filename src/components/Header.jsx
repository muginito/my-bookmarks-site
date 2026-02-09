import InputBar from "./InputBar"

export default function Header({ newForm, onSearch }) {
  // Coloquei a função de busca do App
  return (
    <header className="flex flex-col justify-center items-center m-auto w-[75%] max-w-[900px]">
      <h1
        className="my-12 md:my-24 w-full font-heading font-bold text-yellow-400 text-3xl md:text-6xl
          text-center"
      >
        My Bookmarks
      </h1>
      <div className="flex gap-4 w-full">
        {/* <InputBar id="url" type="text" placeholder="Paste URL" /> */}
        <InputBar
          id="search"
          type="search"
          placeholder="Search..."
          // className="text-sm md:text-base md:font-normal"
          onChange={(e) => onSearch(e.target.value)}
          // Depois que o usuario digita algo, é enviado para o app atualizar o estado
        />
        <button
          className="bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit font-bold text-dark-bg-2
            text-sm md:text-base whitespace-nowrap active:scale-95 cursor-pointer"
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>
      <hr className="my-6 border border-dark-ui-3 w-full" />
    </header>
  )
}
