import InputBar from "./InputBar"

export default function Header({ newForm, onSearch }) {
  // Coloquei a função de busca do App
  return (
    <header className="m-auto flex w-[75%] max-w-[900px] flex-col items-center justify-center">
      <h1 className="font-heading my-12 w-full text-center text-3xl font-bold text-yellow-400 md:my-24 md:text-5xl">
        My Bookmarks
      </h1>
      <div className="flex w-full gap-4">
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
          className="bg-dark-ye text-dark-bg-2 w-fit cursor-pointer rounded-4xl px-4 text-sm font-bold whitespace-nowrap hover:bg-yellow-300 active:scale-95 md:text-base"
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>
      <hr className="border-dark-ui-3 my-10 w-full border" />
    </header>
  )
}
