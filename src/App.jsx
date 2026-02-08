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

  // Open New Form
  function handleOpenNewForm() {
    setSelectedBookmark(null)
    setIsFormOpen(true)
  }

  // Open Edit Form
  function handleOpenEditForm(id) {
    const bookmark = bookmarks.find((b) => b.id === id)
    if (bookmark) {
      setSelectedBookmark(bookmark)
      setIsFormOpen(true)
    }
  }

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
    setBookmarks(bookmarks.map((b) => (b.id === selectedBookmark.id ? { ...b, ...data } : b)))
  }

  // Close Form
  function handleCloseForm() {
    setIsFormOpen(false)
    setSelectedBookmark(null)
  }

  // Delete Bookmark
  function handleDeleteBookmark(id) {
    if (delConfirm.show && delConfirm.id) {
      const delBookmark = bookmarks.filter((b) => b.id !== id)
      setBookmarks(delBookmark)
      setDelConfirm({ show: false, id: null })
    } else {
      setDelConfirm({ show: true, id: id })
    }
  }
  // function handleDeleteBookmark(id) {
  //   const delBookmark = bookmarks.filter((b) => b.id !== id)
  //   setBookmarks(delBookmark)
  // }

  function showDeleteToast() {
    return (
      delConfirm.show && (
        <DeletionPopup
          onConfirm={() => handleDeleteBookmark(delConfirm.id)}
          onCancel={() => setDelConfirm({ show: false, id: null })}
        />
      )
    )
  }

  function showForm() {
    return (
      isFormOpen && (
        <BookmarkForm
          initialData={selectedBookmark}
          mode={selectedBookmark ? "edit" : "new"}
          onSubmit={selectedBookmark ? handleEditBookmark : handleAddBookmark}
          onClose={handleCloseForm}
        />
      )
    )
  }

  return (
    <>
      <Header newForm={handleOpenNewForm} />
      <BookmarkList
        bookmarks={bookmarks}
        onDelete={handleDeleteBookmark}
        onEdit={handleOpenEditForm}
      />
      {showDeleteToast()}
      {showForm()}
    </>
  )
}

export default App
