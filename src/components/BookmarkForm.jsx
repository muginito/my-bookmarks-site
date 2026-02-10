import { useLockBodyScroll } from "react-use"
import { useForm, useWatch } from "react-hook-form"
import { useCallback, useEffect } from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import parse from "node-html-parser"

export default function BookmarkForm({ initialData, mode, onSubmit, onClose }) {
  const { register, handleSubmit, reset, control } = useForm({
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

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [handleClose])

  function debounce(func, timeout = 100) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  async function fetchUrlMetaData(url) {
    if (!url) return ""

    const baseUrl = new URL("https://corsproxy.io")
    baseUrl.searchParams.append("url", url)

    const resp = await fetch(baseUrl)

    const nodes = parse(await resp.text())

    let metadata = {}

    nodes.querySelectorAll("meta").forEach((meta) => {
      if (meta.getAttribute("name") == "author" && metadata.author == undefined) {
        metadata.author = meta.getAttribute("content")
      }
      if (meta.getAttribute("name") == "description" && metadata.description == undefined) {
        metadata.description = meta.getAttribute("content")
      }
    })

    reset({
      ...register,
      title: nodes.querySelector("title").textContent,
      author: metadata.author,
      description: metadata.description,
    })
  }

  const watchedValue = useWatch({
    name: "url",
    compute:
      mode == "edit" ? undefined : debounce((url) => (url ? fetchUrlMetaData(url) : ""), 500),
    control,
  })

  function handleFormSubmit(data) {
    onSubmit(data)
    reset()
    onClose()
  }

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  useLockBodyScroll()
  return (
    <div className="top-0 fixed flex justify-center w-screen h-screen">
      <div className="sm:backdrop-blur-xs sm:w-screen sm:h-screen" onClick={handleClose}></div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="absolute flex flex-col bg-dark-ui sm:my-20 p-8 sm:p-10 sm:border-2
          sm:border-dark-ui-3 sm:rounded-2xl focus:outline-0 w-screen sm:w-xl h-screen sm:h-[82dvh]
          overflow-y-auto"
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
          className="mt-4 mb-8 focus:outline-0 min-h-50 text-sm resize-none grow"
          {...register("description", { required: true })}
        />
        <Button
          type="submit"
          className="bg-dark-ui light:bg-light-ui sm:m-auto mb-10 px-5 py-2.5 border
            border-transparent hover:border-yellow-400 rounded-lg text-base transition-colors
            duration-250 cursor-pointer"
        >
          {initialData?.id ? "Salvar alterações" : "Salvar"}
        </Button>
      </form>
    </div>
  )
}
