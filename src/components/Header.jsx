import InputBar from "./InputBar"
import ThemeToggle from "./ThemeToggle.jsx"

export default function Header({ newForm }) {
  return (
    <header className="relative flex flex-col justify-center items-center m-auto w-[75%] max-w-[900px]">

      {/* BOTÃO DE TEMA */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <h1
        className="
          my-12 md:my-24 w-full
          font-heading font-bold
          text-yellow-400
          text-3xl md:text-6xl
          text-center
        "
      >
        My Bookmarks
      </h1>

      <div className="flex gap-4 w-full">
        <InputBar
          id="search"
          type="search"
          placeholder="Search..."
        />

        <button
          className="
            bg-yellow-400 hover:bg-yellow-300
            px-4 rounded-4xl w-fit
            font-bold text-black
            text-sm md:text-base
            whitespace-nowrap
            active:scale-95 cursor-pointer
          "
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>

      <hr className="my-6 border border-dark-ui-3 w-full" />
    </header>
  )
}