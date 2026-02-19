import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function InputBar({ id, type, placeholder, onChange, value }) {
  return (
    <div
      className="flex items-center gap-3 bg-dark-ui px-4 py-3 rounded-full outline-2
        outline-dark-ui-3 hover:outline-yellow-400 w-full duration-150 ease"
    >
      <FontAwesomeIcon icon={faSearch} className="text-dark-ui-3" />
      <input
        className="flex-1 bg-transparent outline-none w-full"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
// O "onChange" é um alarme, pra toda vez que algúem digitar uma letra e joga isso pra função do "pai"
