import { useState } from "react"
import BookmarkItem from "./BookmarkItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import AnimatedButton from "./AnimatedButton"

export default function BookmarkList({ bookmarks }) {
  const navigate = useNavigate()

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
            createdDate={bookmark.createdDate}
            url={bookmark.url}
            tags={bookmark.tags}
            onDelete={() => navigate(`/?delete=${bookmark.id}`)}
            onEdit={() => navigate(`/?form=edit&id=${bookmark.id}`)}
          />
        ))}
        {Object.keys(bookmarks).length > itemsPerPage && (
          <>
            <hr className="my-2 border border-dark-ui-3 w-32 sm:w-2xs" />
            <div className="flex justify-center items-center gap-8 pb-4">
              <AnimatedButton
                className="p-2 disabled:text-dark-ui text-base-400 cursor-pointer
                  disabled:cursor-default"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                aria-label="Página anterior"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </AnimatedButton>
              <span className="text-sm md:text-base">
                {currentPage} / {Math.ceil(bookmarks.length / itemsPerPage)}{" "}
              </span>
              <AnimatedButton
                className="p-2 disabled:text-dark-ui text-base-400 cursor-pointer
                  disabled:cursor-default"
                disabled={indexOfLastItem >= bookmarks.length}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                aria-label="Próxima página"
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </AnimatedButton>
            </div>
          </>
        )}
      </section>
    </>
  )
}
