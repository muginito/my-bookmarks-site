import { useLockBodyScroll } from "react-use"
import { useForm, useWatch } from "react-hook-form"
import { useCallback, useEffect } from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import parse from "node-html-parser"
import { useNavigate } from "react-router"

export default function BookmarkForm({ initialData, mode, onSubmit }) {
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

  const navigate = useNavigate()

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

  const handleClose = useCallback(() => {
    reset()
    navigate("/")
  }, [reset, navigate])

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

  // function debounce(func, timeout = 100) {
  //   let timer
  //   return (...args) => {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func.apply(this, args)
  //     }, timeout)
  //   }
  // }

  const url = useWatch({
    name: "url",
    control,
  })

  useEffect(() => {
    async function fetchUrlMetaData(url) {
      if (!url) return ""

      try {
        const baseUrl = new URL("/api/fetch-metadata", window.location.origin)
        baseUrl.searchParams.append("url", url)

        const res = await fetch(baseUrl)

        if (!res.ok) {
          console.error("Failed to fetch metadata:", await res.text())
          return
        }

        const root = parse(await res.text())

        let metadata = {}

        const titleElement = root.querySelector("title")
        metadata.title = titleElement ? titleElement.textContent : ""

        root.querySelectorAll("meta").forEach((meta) => {
          if (meta.getAttribute("name") == "author" && metadata.author == undefined) {
            metadata.author = meta.getAttribute("content")
          }
          if (meta.getAttribute("name") == "description" && metadata.description == undefined) {
            metadata.description = meta.getAttribute("content")
          }
        })

        reset({
          ...register,
          title: metadata.title,
          author: metadata.author,
          description: metadata.description,
        })
      } catch (error) {
        console.error("Error fetching URL metadata:", error)
      }
    }

    if (mode !== "edit" && url) {
      const timer = setTimeout(() => {
        fetchUrlMetaData(url)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [url, mode, register, reset])

  function handleFormSubmit(data) {
    onSubmit(data)
    reset()
    navigate("/")
  }

  useLockBodyScroll()
  return (
    <div className="top-0 z-50 fixed flex justify-center sm:items-center w-screen h-screen">
      <div className="sm:backdrop-blur-xs sm:w-screen sm:h-screen" onClick={handleClose}></div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="absolute flex flex-col bg-dark-ui p-8 sm:p-10 sm:border-2 sm:border-dark-ui-3
          sm:rounded-2xl focus:outline-0 w-screen sm:w-xl h-dvh sm:max-h-[90dvh]"
      >
        <FontAwesomeIcon
          icon={faX}
          onClick={handleClose}
          className="relative hover:bg-dark-ui-3 p-2 rounded-full text-base-500 text-lg
            -translate-2.5 duration-150"
        />
        <div className="flex flex-col gap-2 sm:gap-4 mb-4">
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
          className="mt-4 mb-8 focus:outline-0 w-full text-sm resize-none grow"
          {...register("description", { required: true })}
        />
        <Button
          type="submit"
          className="bg-dark-ui mt-auto px-5 py-2.5 border border-transparent
            hover:border-yellow-400 rounded-lg text-base transition-colors duration-250
            cursor-pointer shrink-0"
        >
          {initialData?.id ? "Salvar alterações" : "Salvar"}
        </Button>
      </form>
    </div>
  )
}
