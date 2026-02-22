import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import DeletionPopup from "./components/DeletionPopup.jsx"
import MobileBar from "./components/MobileBar.jsx"
import Fuse from "fuse.js"
import { useNavigate, useSearchParams } from "react-router"
import DropDown from "./components/DropDown.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons"
import AnimatedButton from "./components/AnimatedButton.jsx"
import { AnimatePresence } from "framer-motion"

function App() {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", [])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const formMode = searchParams.get("form") // "new" ou "edit"
  const editId = searchParams.get("id") // id do bookmark a ser editado
  const deleteId = searchParams.get("delete") // id do bookmark a ser deletado

  // configuração do Fuse.js (busca)
  const [search, setSearch] = useState("")
  const optionFuse = {
    keys: ["title", "author", "description", "url", "year"],
    threshold: 0.2, //sensibilidade, coloquei no "padrão  "
  }
  const fuse = new Fuse(bookmarks, optionFuse)
  // logica de filtragem, se a lista tiver vazia ele mostra a lista toda
  const searchResult = search ? fuse.search(search).map((res) => res.item) : bookmarks

  // Add Bookmark
  function handleAddBookmark(data) {
    const output = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }
    setBookmarks([output, ...bookmarks])
  }

  // Edit Bookmark
  function handleEditBookmark(data) {
    setBookmarks(bookmarks.map((b) => (String(b.id) === editId ? { ...b, ...data } : b)))
    navigate("/")
  }

  // Delete Bookmark
  function handleDeleteBookmark(id) {
    const delBookmark = bookmarks.filter((b) => String(b.id) !== id)
    setBookmarks(delBookmark)
    navigate("/")
  }

  //Delete All Bookmarks
  function deleteAllBookmarks() {
    setBookmarks([])
    navigate("/")
  }

  const showDeletePopup =
    deleteId === "all" ? (
      <DeletionPopup onConfirm={deleteAllBookmarks}>
        Esta ação irá deletar <strong className="font-bold">todos os seus bookmarks</strong>, tem
        certeza que deseja continuar?
      </DeletionPopup>
    ) : deleteId ? (
      <DeletionPopup onConfirm={() => handleDeleteBookmark(deleteId)}>
        Tem certeza que deseja deletar este bookmark?
      </DeletionPopup>
    ) : null

  const showForm = formMode ? (
    <BookmarkForm
      initialData={editId ? bookmarks.find((b) => String(b.id) === editId) : null}
      mode={formMode}
      onSubmit={formMode === "edit" ? handleEditBookmark : handleAddBookmark}
    />
  ) : null

  function exportBookmarks() {
    const dataStr = JSON.stringify(bookmarks, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "bookmarks.json"
    a.click()

    URL.revokeObjectURL(url)
  }

  function importBookmarks(event) {
    const fileInput = event.target.files[0]
    console.log(fileInput)
    if (fileInput) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const importedBookmarks = JSON.parse(reader.result)
          if (Array.isArray(importedBookmarks)) {
            setBookmarks(importedBookmarks)
          }
        } catch (error) {
          console.error("Erro ao importar bookmarks:", error)
        }
      }
      reader.readAsText(fileInput)
    }
  }

  return (
    <>
      <div className="z-2 relative mx-auto my-8 w-full text-center">
        <h1
          className="inline font-heading font-bold text-yellow-400 text-2xl sm:text-3xl md:text-4xl
            lg:text-5xl text-center"
        >
          Meus Bookmarks
        </h1>
        <div className="top-0 right-2 absolute">
          <DropDown onExport={exportBookmarks} onImport={importBookmarks} />
        </div>
      </div>

      <header
        className="top-0 z-1 sticky flex justify-center gap-4 bg-dark-bg mx-auto py-4 w-full
          max-w-4xl"
      >
        {/* Barra de busca */}
        <search
          className="flex items-center gap-3 bg-dark-ui px-4 py-2 md:py-3 rounded-full outline-2
            outline-dark-ui-3 hover:outline-yellow-400 w-[80%] duration-150 ease"
        >
          <FontAwesomeIcon icon={faSearch} className="text-dark-ui-3 text-base md:text-lg" />
          <input
            className="bg-transparent outline-none w-full"
            id="search"
            type="search"
            placeholder="Buscar"
            onChange={(e) => setSearch(e.target.value)}
          />
        </search>

        <AnimatedButton
          className="hidden 2xl:block bg-dark-ye hover:bg-yellow-300 px-4 rounded-4xl w-fit
            h-min-full font-bold text-dark-bg-2 text-sm md:text-base whitespace-nowrap
            cursor-pointer"
          onClick={() => navigate("/?form=new")}
        >
          Novo Bookmark
        </AnimatedButton>

        <AnimatedButton
          className="hidden 2xl:hidden sm:block text-dark-bg-2 text-4xl sm:text-5xl
            whitespace-nowrap cursor-pointer"
          onClick={() => navigate("/?form=new")}
          aria-label="Novo bookmark"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="text-yellow-400 hover:text-yellow-300" />
        </AnimatedButton>
      </header>
      <hr className="mx-auto mt-2 mb-6 border border-dark-ui-3 w-[70%] max-w-6xl" />
      <BookmarkList bookmarks={searchResult} onDelete={handleDeleteBookmark} />
      <MobileBar />
      <AnimatePresence>{showDeletePopup}</AnimatePresence>
      <AnimatePresence>{showForm}</AnimatePresence>
    </>
  )
}

export default App
