import { useState } from "react"
// import './App.css'
// import { useLocalStorage } from "react-use"
import InputBar from "./components/InputBar.jsx"
import BookmarkList from "./components/BookmarkList.jsx"
import BookmarkForm from "./components/BookmarkForm.jsx"
// import Header from './components/Header.jsx'

function App() {
  const [showForm, setShowForm] = useState(false)

  function toggleForm() {
    setShowForm(!showForm)
  }

  return (
    <>
      <header className="m-auto flex w-[75%] max-w-[900px] flex-col items-center justify-center">
        <h1 className="font-heading my-12 w-screen text-center text-4xl font-bold text-yellow-400 md:my-24 md:text-5xl">
          My Bookmarks
        </h1>
        <div className="flex w-full flex-col gap-4">
          <InputBar id="url" type="text" placeholder="Paste URL" />
          <InputBar id="search" type="search" placeholder="Search..." />
        </div>
        <hr />
      </header>

      <BookmarkList handleShowForm={toggleForm} />
      {/* <BookmarkItem */}
      {/*   title="Title" */}
      {/*   author="author" */}
      {/*   description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." */}
      {/*   year="2025" */}
      {/*   date="04 de dezembro de 2025" */}
      {/*   tags={["tag1", "tag2", "tag3"]} */}
      {/* /> */}
      {/* <BookmarkItem */}
      {/*   title="Title" */}
      {/*   author="author" */}
      {/*   description="Brief description" */}
      {/*   year="2025" */}
      {/*   date="04 de dezembro de 2025" */}
      {/*   tags={["tag1", "tag2", "tag3"]} */}
      {/* /> */}
      {/* <BookmarkItem */}
      {/*   title="Title" */}
      {/*   author="author" */}
      {/*   description="Brief description" */}
      {/*   year="2025" */}
      {/*   date="04 de dezembro de 2025" */}
      {/*   tags={["tag1", "tag2", "tag3"]} */}
      {/* /> */}
      {showForm && <BookmarkForm handleShowForm={toggleForm} />}
    </>
  )
}

export default App
