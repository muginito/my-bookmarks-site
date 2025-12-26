import { useLockBodyScroll } from "react-use"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export default function BookmarkForm({
  bookmarks,
  initialData,
  setLocalStorage,
  mode,
  // onSubmit,
  onClose,
}) {
  function onSubmit(data) {
    const output = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }
    setLocalStorage([...bookmarks, output])

    onClose()
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues:
      mode === "edit"
        ? {
            title: initialData.title,
            author: initialData.author,
            year: initialData.year,
            url: initialData.url,
            description: initialData.description,
          }
        : {
            title: "",
            author: "",
            year: "",
            url: "",
            description: "",
          },
  })

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  useLockBodyScroll()
  return (
    <div className="fixed top-0 flex justify-center">
      <div className="h-screen w-screen backdrop-blur-xs" onClick={onClose}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-dark-ui sm:border-dark-ui-3 absolute mx-auto flex h-screen w-screen flex-col p-12 focus:outline-0 sm:my-20 sm:h-[82dvh] sm:w-2xl sm:rounded-2xl sm:border-2"
      >
        <div className="mb-4 grid grid-cols-3">
          <input
            className="text-xl font-bold focus:outline-0 sm:text-2xl"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          <input
            type="text"
            placeholder="Author"
            className="focus:outline-0"
            {...register("author", { required: true })}
          />
          <input
            type="text"
            placeholder="Year of Publication"
            className="focus:outline-0 sm:text-sm"
            {...register("year", { required: true })}
          />
        </div>
        <input
          type="text"
          placeholder="Fonte/Link"
          className="text-sm focus:outline-0"
          {...register("url", { required: true })}
        />
        <hr className="border-dark-ui-3 my-2 w-full" />
        <textarea
          type="text"
          placeholder="Escreva algo..."
          className="h-full resize-none focus:outline-0"
          {...register("description", { required: true })}
        />
        <button type="submit">{initialData?.id ? "Salvar alterações" : "Salvar"}</button>
      </form>
    </div>
  )
}
