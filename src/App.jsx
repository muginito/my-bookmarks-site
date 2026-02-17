import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import DeletionPopup from "./components/DeletionPopup.jsx"
import Header from "./components/Header.jsx"
import MobileBar from "./components/MobileBar.jsx"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useSearchParams } from "react-router"
import ImportButton from "./components/ImportButton.jsx"
import Button from "./components/Button.jsx"

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

  const showDeletePopup = deleteId ? (
    <DeletionPopup onConfirm={() => handleDeleteBookmark(deleteId)} />
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

  function deleteAllBookmarks() {
    setBookmarks([])
  }

  /* A seguir, vou explicar o que eu fiz com o botão de export:
  Eu não estava conseguindo dar hidden no icone do export para o mobile, aparentemente o Font injeta o SVG direto no html
  ai eu não conseguia dar hidden md:block pelo tailwind (ele não estava aceitando), então eu embrulhei ele em uma tag padrão do HTML
  assim quando o botão some, o icone tem que ir junto */
  return (
    <>
      <button
        onClick={exportBookmarks}
        className="hidden md:block top-8 right-8 absolute active:scale-95 duration-200"
      >
        <FontAwesomeIcon
          icon={faFileExport}
          className="text-dark-ui sm:text-dark-ui-2 text-base hover:text-base-700 sm:text-2xl
            cursor-pointer"
        />
      </button>
      <ImportButton onImport={importBookmarks} />
      <Button onClick={deleteAllBookmarks}>Delete All</Button>
      <Header onSearch={setSearch} />
      <BookmarkList bookmarks={searchResult} onDelete={handleDeleteBookmark} />
      <MobileBar onExport={exportBookmarks} onImport={importBookmarks} />
      {showDeletePopup}
      {showForm}
    </>
  )
}

export default App
