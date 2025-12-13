export default function BookmarkForm({ handleShowForm }) {
  return (
    <div className="fixed top-0 h-screen w-screen backdrop-blur-xs" onClick={handleShowForm}>
      <form
        action=""
        className="bg-dark-ui mx-auto flex h-screen w-screen flex-col rounded p-6 sm:mt-20 sm:h-[75dvh] sm:w-xl sm:border"
      >
        <div className="flex">
          <input className="text-xl font-bold sm:text-2xl" type="text" placeholder="Title" />
          <input type="text" placeholder="Author" />
          <input type="text" placeholder="Year of Publication" />
        </div>
        {/* <hr className="w-full" /> */}
        <input type="text" placeholder="Source" />
        <input type="text" placeholder="description" />
      </form>
    </div>
  )
}
