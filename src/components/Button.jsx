export default function Button({ children, className, ...props }) {
  return (
    <button
      className="bg-dark-ui light:bg-light-ui px-5 py-2.5 border border-transparent
        hover:border-yellow-400 rounded-lg text-base transition-colors duration-250 cursor-pointer"
      {...props}
    >
      {children}
    </button>
  )
}
