import { useLockBodyScroll } from "react-use"
import { useForm, useWatch } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faSpinner } from "@fortawesome/free-solid-svg-icons"
import parse from "node-html-parser"
import { useNavigate } from "react-router"
import AnimatedButton from "./AnimatedButton"
import { motion } from "framer-motion"

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

  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false)
  const [fetchError, setFetchError] = useState(null)

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

  const url = useWatch({
    name: "url",
    control,
  })

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchUrlMetaData(url) {
      if (!url) return

      setIsFetchingMetadata(true)
      setFetchError(null)
      const startTime = Date.now()

      try {
        const baseUrl = new URL("/api/fetch-metadata", window.location.origin)
        baseUrl.searchParams.append("url", url)

        const res = await fetch(baseUrl, { signal: abortController.signal })

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
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

        // Garante loading mínimo de 400ms
        const elapsed = Date.now() - startTime
        const delay = Math.max(0, 400 - elapsed)

        await new Promise((resolve) => setTimeout(resolve, delay))

        reset({
          ...register,
          title: metadata.title,
          author: metadata.author,
          description: metadata.description,
        })

        setFetchError(null)
      } catch (error) {
        if (error.name === "AbortError") {
          // Cancelamento não é erro, apenas ignora
          return
        }

        // Apenas erros críticos (rede, timeout, HTTP errors)
        setFetchError("Não foi possível buscar metadados")
        console.error("Error fetching URL metadata:", error)
      } finally {
        setIsFetchingMetadata(false)
      }
    }

    if (mode !== "edit" && url) {
      const timer = setTimeout(() => {
        fetchUrlMetaData(url)
      }, 500)

      return () => {
        clearTimeout(timer)
        abortController.abort()
      }
    } else {
      setIsFetchingMetadata(false)
      setFetchError(null)
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
      <div className="sm:backdrop-blur-xs sm:w-screen sm:h-screen" onClick={handleFormSubmit}></div>
      <motion.form
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="absolute flex flex-col bg-dark-ui p-8 sm:p-10 sm:border-2 sm:border-dark-ui-3
          sm:rounded-2xl focus:outline-0 w-screen sm:w-xl h-dvh sm:max-h-[90dvh]"
      >
        <button
          aria-label="Fechar formulário"
          type="button"
          className="self-start mb-4"
          onClick={handleClose}
        >
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-base-200 drop-shadow-lg rounded-full text-base-500 text-lg
              duration-150"
          />
        </button>
        <div className="flex flex-col gap-2 sm:gap-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Fonte/Link"
              className={`my-2 focus:outline-0 text-xs w-full
                ${isFetchingMetadata ? "pr-8 truncate" : ""}`}
              {...register("url", { required: false })}
            />
            {isFetchingMetadata && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 text-sm
                  animate-spin"
              />
            )}
          </div>
          {fetchError && <p className="text-red-500 text-xs mt-1">{fetchError}</p>}

          <hr className="border-dark-ui-3 w-full" />

          <input
            className="focus:outline-0 font-bold text-xl sm:text-2xl"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />

          <input
            type="text"
            placeholder="Autor"
            className="focus:outline-0 text-sm"
            {...register("author", { required: false })}
          />

          <input
            type="text"
            placeholder="Ano de Publicação"
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
        <AnimatedButton
          type="submit"
          className="bg-dark-ui hover:bg-dark-ui-2 m-auto px-5 py-2.5 border border-transparent
            hover:border-yellow-400 rounded-lg w-fit hover:text-white text-base text-center
            transition-colors duration-250 cursor-pointer shrink-0"
        >
          {initialData?.id ? "Salvar alterações" : "Salvar"}
        </AnimatedButton>
      </motion.form>
    </div>
  )
}
