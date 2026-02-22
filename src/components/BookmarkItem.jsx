import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan"
import { motion } from "framer-motion"
import AnimatedButton from "./AnimatedButton"

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
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-dark-bg-2 shadow p-6 border-2 border-dark-ui-2 rounded-2xl w-xs sm:w-sm
        md:w-lg max-w-xl min-h-80"
      onClick={handleCardClick}
    >
      <div className="flex justify-between mb-1 bookmark--header">
        <div className="font-bold text-xl md:text-2xl bookmark--title">
          {isValidUrl(url) ? (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit text-blue-400 hover:underline underline-offset-4
                cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {title}
            </motion.a>
          ) : (
            <h2 className="inline text-dark-ye">{title}</h2>
          )}
          {year && (
            <span className="invisible sm:visible w-fit text-base md:text-lg"> ({year})</span>
          )}
        </div>

        <AnimatedButton aria-label="Deletar bookmark">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-dark-ui-3 hover:text-red-600 text-lg md:text-xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(bookmark.id)
            }}
          />
        </AnimatedButton>
      </div>
      {author && <span className="w-fit text-sm md:text-base">{author}</span>}
      <p className="my-8 text-sm md:text-base whitespace-pre-wrap">{description}</p>
      {/* dia de mês de ano */}
      <span className="bottom-6 absolute text-dark-tx-2 text-sm md:text-base">{date}</span>
    </motion.div>
  )
}
