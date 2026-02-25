import { useState } from "react"
import BookmarkItem from "./BookmarkItem"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

export default function BookmarkList({ bookmarks, onDelete, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = bookmarks.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      <section className="flex flex-col items-center gap-6 w-full">
        {currentItems.map((bookmark) => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
            title={bookmark.title}
            author={bookmark.author}
            description={bookmark.description}
            year={bookmark.year}
            date={bookmark.date}
            url={bookmark.url}
            tags={bookmark.tags}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        <hr className="my-10 w-32 sm:w-2xs border" />
        <div className="flex justify-center items-center gap-8 pb-4">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} className="text-base-200" />
          </Button>
          <span> Page {currentPage} </span>
          <Button
            disabled={indexOfLastItem >= bookmarks.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        </div>
      </section>
    </>
  )
}
