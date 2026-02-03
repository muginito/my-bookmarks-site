import { useLockBodyScroll } from "react-use"

export default function DeletionPopup({ onConfirm, onCancel }) {
  useLockBodyScroll()

  return (
    <div className="fixed top-0 flex justify-center">
      <div className="h-screen w-screen backdrop-brightness-90" onClick={onCancel}></div>
      <div className="bg-dark-ui sm:border-dark-ui-3 absolute top-12 mx-auto flex flex-col items-center justify-center rounded-2xl border-2 p-6">
        <h1 className="p-2">Confirme</h1>
        <p className="p-4">Tem certeza que deseja deletar este bookmark?</p>
        <div className="mt-4 flex w-full justify-around">
          <button
            className="bg-dark-bg-2 rounded-2xl px-12 py-2 shadow duration-200 ease-in-out hover:bg-red-600"
            onClick={onConfirm}
          >
            Sim
          </button>
          <button
            className="bg-dark-bg-2 hover:bg-dark-ui-2 rounded-2xl px-12 py-2 shadow duration-200 ease-in-out"
            onClick={onCancel}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}
