import InputBar from "./InputBar"

export default function Header({ newForm }) {
  return (
    <header className="m-auto flex w-[75%] max-w-[900px] flex-col items-center justify-center">
      <h1 className="font-heading my-12 w-screen text-center text-4xl font-bold text-yellow-400 md:my-24 md:text-5xl">
        My Bookmarks
      </h1>
      <div className="flex w-full gap-4">
        {/* <InputBar id="url" type="text" placeholder="Paste URL" /> */}
        <InputBar id="search" type="search" placeholder="Search..." />
        <button
          className="bg-dark-ye text-dark-bg-2 w-fit cursor-pointer rounded-4xl px-4 font-bold whitespace-nowrap hover:bg-yellow-300 active:scale-95"
          onClick={newForm}
        >
          New Bookmark
        </button>
      </div>
      <hr className="border-dark-ui-3 my-10 w-[125%] border" />
    </header>
  )
}
