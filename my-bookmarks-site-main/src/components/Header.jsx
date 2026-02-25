import InputBar from "./InputBar"
import ThemeToggle from "./ThemeToggle"

export default function Header({ newForm, onSearch }) {
  // Header principal do app
  return (
    //  "relative" permite posicionar o botão de tema no canto sem quebrar layout
    <header className="relative flex flex-col justify-center items-center m-auto w-[75%] max-w-[900px]">

      {/*  BOTÃO DE TEMA (canto superior direito) */}
      <div className="absolute top-0 right-0 mt-4">
        <ThemeToggle />
      </div>

      {/* 🔹 TÍTULO */}
      <h1
        className="
          my-12 md:my-24 w-full
          font-heading font-bold
          text-yellow-400
          text-3xl md:text-6xl
          text-center
        "
      >
        Meus Bookmarks
      </h1>

      {/* BARRA DE BUSCA + BOTÃO */}
      <div className="flex gap-4 w-full">
        <InputBar
          id="search"
          type="search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          // Sempre que digita, envia o valor pro App
        />

        <button
          className="
            px-4 rounded-4xl w-fit
            font-bold text-sm md:text-base
            whitespace-nowrap
            active:scale-95 cursor-pointer
            transition
            bg-yellow-400 text-black
            hover:bg-yellow-300
          "
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>

      {/* 🔹 LINHA DIVISÓRIA (respeita claro/escuro) */}
      <hr className="my-6 w-full border dark:border-dark-ui-3 border-light-ui-3" />
    </header>
  )
}