import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import DeletionPopup from "./components/DeletionPopup.jsx"
import Header from "./components/Header.jsx"

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", [])
  const [selectedBookmark, setSelectedBookmark] = useState(null)
  const [delConfirm, setDelConfirm] = useState({ show: false, id: null })

  function handleOpenNewForm() {
    setSelectedBookmark(null)
    setIsFormOpen(true)
  }

  function handleOpenEditForm(id) {
    const bookmark = bookmarks.find((b) => b.id === id)
    if (bookmark) {
      setSelectedBookmark(bookmark)
      setIsFormOpen(true)
    }
  }

  function handleAddBookmark(data) {
    const output = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
    }
    setBookmarks([output, ...bookmarks])
  }

  function handleEditBookmark(data) {
    setBookmarks(
      bookmarks.map((b) =>
        b.id === selectedBookmark.id ? { ...b, ...data } : b
      )
    )
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setSelectedBookmark(null)
  }

  function handleDeleteBookmark(id) {
    setBookmarks(bookmarks.filter((b) => b.id !== id))
  }

  return (
    <>
      <Header newForm={handleOpenNewForm} />

      <BookmarkList
        bookmarks={bookmarks}
        onDelete={handleDeleteBookmark}
        onEdit={handleOpenEditForm}
      />

      {isFormOpen && (
        <BookmarkForm
          initialData={selectedBookmark}
          mode={selectedBookmark ? "edit" : "new"}
          onSubmit={selectedBookmark ? handleEditBookmark : handleAddBookmark}
          onClose={handleCloseForm}
        />
      )}

      {delConfirm.show && <DeletionPopup />}
    </>
  )
}

export default App