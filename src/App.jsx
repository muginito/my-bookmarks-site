// import { useState } from 'react'
// import './App.css'
import InputBar from "./components/InputBar.jsx"
import Bookmark from "./components/Bookmark.jsx"
// import Header from './components/Header.jsx'

// function BookmarkForm() {
//
// }
//
// function BookmarkItem() {
//
// }
//
// function BookmarkList({ bookmarks }) {
//   const bookmarksItems = []
//
//   return (
//
//   )
// }

function App() {
  // const [count, setCount] = useState(0)

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

      <section className="flex w-full flex-col items-center">
        <Bookmark />
        <Bookmark />
        <Bookmark />
      </section>
    </>
  )
}

export default App
