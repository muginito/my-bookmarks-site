import BookmarkItem from "./BookmarkItem"

export default function BookmarkList({ bookmarks, handleBookmarks, onDelete, handleShowForm }) {
  return (
    <section className="flex w-full flex-col items-center">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          title={bookmark.title}
          author={bookmark.author}
          description={bookmark.description}
          year={bookmark.year}
          date={bookmark.date}
          tags={bookmark.tags}
          handleShowForm={handleShowForm}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
