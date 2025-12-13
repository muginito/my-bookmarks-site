import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan"

export default function BookmarkItem({
  url,
  title,
  author,
  year,
  description,
  date,
  handleShowForm,
}) {
  // function tagList(tags) {
  //   return tags.map((name, index) => (
  //     <div key={index} className="bookmark--tag cursor-pointer text-xs md:text-sm">
  //       #{name}
  //     </div>
  //   ))
  // }

  return (
    <div className="bookmark--card relative" onClick={handleShowForm}>
      <div className="bookmark--header">
        <h2 className="bookmark--title text-xl font-bold md:text-2xl">
          <a
            href={url}
            target="_blank"
            className="text-blue-400 underline-offset-4 hover:underline"
          >
            <div className="inline-block w-fit cursor-pointer underline-offset-4 duration-100 ease-in-out hover:underline active:scale-105">
              {title}
            </div>
          </a>
          <span className="inline-block w-fit text-base md:text-lg">
            , by {author} ({year})
          </span>
        </h2>
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-dark-tx-2 cursor-pointer hover:text-red-600"
        />
      </div>
      <p className="text-sm md:text-base">{description}</p>
      <div className="bookmark--footer text-dark-tx-2 w-full text-sm md:text-base">
        {/* dia de mês de ano */}
        <span className="text-sm md:text-base">{date}</span>
        {/* <div className="dot"></div> */}
        {/* <div className="bookmark--tags w-full">{tagList(tags)}</div> */}
      </div>
    </div>
  )
}
