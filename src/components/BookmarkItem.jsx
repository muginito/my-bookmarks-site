import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan"

export default function BookmarkItem({
  url,
  bookmark,
  title,
  author,
  year,
  description,
  date,
  onEdit,
  onDelete,
}) {
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleCardClick = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      return
    }
    onEdit(bookmark.id)
  }

  return (
    <div
      className="relative bg-dark-bg-2 p-6 border-2 border-dark-ui-2 rounded-2xl w-xs sm:w-sm
        md:w-lg max-w-xl min-h-80"
      onClick={handleCardClick}
    >
      <div className="flex justify-between mb-1 bookmark--header">
        <h2 className="font-bold text-xl md:text-2xl bookmark--title">
          {isValidUrl(url) ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="inline-block w-fit hover:underline underline-offset-4 active:scale-105
                  duration-200 ease-in-out cursor-pointer"
              >
                {title}
              </div>
            </a>
          ) : (
            <div className="inline-block w-fit cursor-pointer">{title}</div>
          )}
          {year && (
            <span className="invisible sm:visible w-fit text-base md:text-lg sm:"> ({year})</span>
          )}
        </h2>

        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-dark-ui-3 hover:text-red-600 text-lg md:text-xl active:scale-95
            duration-150 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(bookmark.id)
          }}
        />
      </div>
      {author && <span className="w-fit text-sm md:text-base">{author}</span>}
      <p className="my-8 text-sm md:text-base whitespace-pre-wrap">{description}</p>
      {/* <div className="w-full text-dark-tx-2 text-sm md:text-base bookmark--footer"> */}
      {/* dia de mês de ano */}
      <span className="bottom-6 absolute text-dark-tx-2 text-sm md:text-base">{date}</span>
      {/* </div> */}
    </div>
  )
}
