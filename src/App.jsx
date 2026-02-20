import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import DeletionPopup from "./components/DeletionPopup.jsx"
import Header from "./components/Header.jsx"
import MobileBar from "./components/MobileBar.jsx"
import Fuse from "fuse.js"
import { useNavigate, useSearchParams } from "react-router"
import DropDown from "./components/DropDown.jsx"

function App() {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", [])
  //Menu Dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  /* A seguir, vou explicar o que eu fiz com o botão de export:
  Eu não estava conseguindo dar hidden no icone do export para o mobile, aparentemente o Font injeta o SVG direto no html
  ai eu não conseguia dar hidden md:block pelo tailwind (ele não estava aceitando), então eu embrulhei ele em uma tag padrão do HTML
  assim quando o botão some, o icone tem que ir junto */
  return (
    <>
      <div className="z-2 relative flex justify-center items-center mt-8 mb-12 md:mb-18 px-6 w-full">
        <h1
          className="w-full font-heading font-bold text-yellow-400 text-2xl md:text-5xl text-center"
        >
          Meus Bookmarks
        </h1>
        <div>
          <DropDown
            onExport={exportBookmarks}
            onImport={importBookmarks}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
      <Header
        onSearch={setSearch}
        onExport={exportBookmarks}
        onImport={importBookmarks}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <hr className="mx-auto my-6 border border-dark-ui-3 w-[75%]" />
      <BookmarkList bookmarks={searchResult} onDelete={handleDeleteBookmark} />
      <MobileBar />
      {showDeletePopup}
      {showForm}
    </>
  )
}

export default App
