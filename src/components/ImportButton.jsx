import { faFileImport } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ImportButton({ onImport }) {
  return (
    <div>
      <input
        type="file"
        id="importFile"
        onChange={onImport}
        multiple={false}
        accept=".json"
        className="hidden"
      />
      <label
        htmlFor="importFile"
        className="flex justify-center items-center hover:bg-dark-ui-3 rounded-xl w-12 h-12
          text-dark-ui-2 text-xl active:scale-95 transition-all cursor-pointer"
      >
        <FontAwesomeIcon icon={faFileImport} />
      </label>
    </div>
  )
}
