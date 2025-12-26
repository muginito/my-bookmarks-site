import { useState } from "react"
import { useLocalStorage } from "react-use"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
import BookmarkItem from "./components/BookmarkItem.jsx"
import Header from "./components/Header.jsx"

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", [])
  const [selectedBookmark, setSelectedBookmark] = useState(null)

  //   function editBookmark(id) {
  //     const myData = bookmarks.map((b) => {
  // if (b.id === id) {
  //         return {...b, }
  //       }
  //     })
  //     setBookmarks(bookmarks.map((b) => (b.id === selectedBookmark.id ? { ...b, ...data } : b)))
  //     setSelectedBookmark(null)
  //     toggleForm(true)
  //   }

  function newBookmark(data) {
    const output = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }
    setBookmarks([...bookmarks, output])
    toggleForm(true)
  }

  const deleteBookmark = (id) => {
    const delBookmark = bookmarks.filter((b) => b.id !== id)
    setBookmarks(delBookmark)
  }

  function toggleForm() {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <>
      <Header newForm={newBookmark} />
      <section className="flex w-full flex-col items-center">
        {/* <button */}
        {/*   className="bg-base-800 cursor-pointer rounded border-2 p-2" */}
        {/*   onClick={() => */}
        {/*     setBookmarks([ */}
        {/*       ...bookmarks, */}
        {/*       { */}
        {/*         id: Date.now().toString(), */}
        {/*         title: "Teste", */}
        {/*         author: "Autor", */}
        {/*         url: "#", */}
        {/*         description: "Some article I've found", */}
        {/*         year: "2025", */}
        {/*         date: new Date().toLocaleDateString("pt-BR", { */}
        {/*           day: "2-digit", */}
        {/*           month: "long", */}
        {/*           year: "numeric", */}
        {/*         }), */}
        {/*         tags: ["tag1", "tag2"], */}
        {/*       }, */}
        {/*     ]) */}
        {/*   } */}
        {/* > */}
        {/*   New Bookmark */}
        {/* </button> */}
        {bookmarks.map((bookmark) => (
          <BookmarkItem
            bookmark={bookmark}
            key={bookmark.id}
            title={bookmark.title}
            author={bookmark.author}
            description={bookmark.description}
            year={bookmark.year}
            date={bookmark.date}
            // tags={bookmark.tags}
            handleShowForm={setIsFormOpen}
            onDelete={deleteBookmark} //Adicionar confirmação
            // onEdit={editBookmark}
            // onClick={() => (
            //   <BookmarkForm
            //     bookmarks={bookmarks}
            //     initialData={bookmark}
            //     setLoacalStorage={setBookmarks}
            //     onSubmit={handleEdit(bookmark)}
            //     onClose={() => setIsFormOpen(false)}
            //   />
            // )}
          />
        ))}
      </section>

      {/* <BookmarkList */}
      {/*   bookamrks={bookmarks} */}
      {/*   handleBookmarks={setBookmarks} */}
      {/*   handleShowForm={toggleForm} */}
      {/* /> */}
      {isFormOpen && (
        <BookmarkForm
          bookmarks={bookmarks}
          initialData={selectedBookmark}
          setLocalStorage={setBookmarks}
          mode={selectedBookmark ? "edit" : "new"}
          onSubmit={newBookmark}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  )
}

export default App
