import { useLockBodyScroll } from "react-use"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

export default function BookmarkForm({ initialData, mode, onSubmit, onClose }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues:
      mode === "edit" && initialData
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
    if (mode === "edit" && initialData) {
      reset(initialData)
    } else {
      reset({
        title: "",
        author: "",
        year: "",
        url: "",
        description: "",
      })
    }
  }, [initialData, mode, reset])

  function handleFormSubmit(data) {
    onSubmit(data)
    reset()
    onClose()
  }

  function handleClose() {
    reset()
    onClose()
  }

  useLockBodyScroll()
  return (
    <div className="top-0 fixed flex justify-center">
      <div className="backdrop-blur-xs w-screen h-screen" onClick={handleClose}></div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="absolute flex flex-col bg-dark-ui mx-auto sm:my-20 p-8 sm:p-10 sm:border-2
          sm:border-dark-ui-3 sm:rounded-2xl focus:outline-0 w-screen sm:w-xl h-screen sm:h-[82dvh]"
      >
        <FontAwesomeIcon
          icon={faX}
          onClick={handleClose}
          className="relative hover:bg-dark-ui-3 p-2 rounded-full text-base-500 text-lg
            -translate-2.5 duration-150"
        />
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            placeholder="Fonte/Link"
            className="my-2 focus:outline-0 text-xs"
            {...register("url", { required: false })}
          />

          <hr className="border-dark-ui-3 w-full" />

          <input
            className="focus:outline-0 font-bold text-xl sm:text-2xl"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />

          <input
            type="text"
            placeholder="Author"
            className="focus:outline-0 text-sm"
            {...register("author", { required: false })}
          />

          <input
            type="text"
            placeholder="Year of Publication"
            className="focus:outline-0 text-sm"
            {...register("year", { required: false })}
          />
        </div>
        <textarea
          type="text"
          placeholder="Escreva algo..."
          className="mt-4 mb-8 focus:outline-0 h-screen text-sm resize-none"
          {...register("description", { required: true })}
        />
        <Button type="submit">{initialData?.id ? "Salvar alterações" : "Salvar"}</Button>
      </form>
    </div>
  )
}
