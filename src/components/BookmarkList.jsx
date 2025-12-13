import { useLocalStorage } from "react-use"
import BookmarkItem from "./BookmarkItem"

export default function BookmarkList({ handleShowForm }) {
  const [bookmarks, saveBookmarks] = useLocalStorage("bookmarks", [])

  return (
    <section className="flex w-full flex-col items-center">
      <button
        className="bg-base-800 cursor-pointer rounded border-2 p-2"
        onClick={() =>
          saveBookmarks([
            {
              id: Date.now().toString(),
              title: "Teste",
              author: "Autor",
              url: "#",
              description: "Some article I've found",
              year: "2025",
              date: new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              tags: ["tag1", "tag2"],
            },
            ...bookmarks,
          ])
        }
      >
        New Bookmark
      </button>
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          title={bookmark.title}
          author={bookmark.author}
          description={bookmark.description}
          year={bookmark.year}
          date={bookmark.date}
          tags={bookmark.tags}
          handleShowForm={handleShowForm}
        />
      ))}
    </section>
  )
}
