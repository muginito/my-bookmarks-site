import BookmarkItem from "./BookmarkItem"

export default function BookmarkList({ bookmarks, onDelete, onEdit }) {
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
          url={bookmark.url}
          tags={bookmark.tags}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  )
}
