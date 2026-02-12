import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import DeletionPopup from "./components/DeletionPopup.jsx"
import Header from "./components/Header.jsx"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useSearchParams } from "react-router"

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

  // eslint-disable-next-line no-unused-vars
  function importBookmarks(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedBookmarks = JSON.parse(e.target.result)
          if (Array.isArray(importedBookmarks)) {
            setBookmarks(importedBookmarks)
          }
        } catch (error) {
          console.error("Erro ao importar bookmarks:", error)
        }
      }
    }
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faFileExport}
        className="top-8 right-8 absolute text-dark-ui sm:text-dark-ui-2 text-base
          hover:text-base-700 sm:text-2xl active:scale-95 duration-200 cursor-pointer"
        onClick={exportBookmarks}
      />
      <Header onSearch={setSearch} />
      <BookmarkList bookmarks={searchResult} onDelete={handleDeleteBookmark} />
      {showDeletePopup}
      {showForm}
    </>
  )
}

export default App
