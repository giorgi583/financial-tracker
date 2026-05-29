

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center absolute bg-gray-700/40 z-50">
        <div className="animate-spin grid grid-cols-2 gap-2 z-60">
      <div className="animate-bounce bg-[var(--accent)] rounded-full h-4 w-4  "></div>
      <div className="animate-bounce bg-gray-700 transition-all delay-200 rounded-full h-4 w-4"></div>
      <div className="animate-bounce bg-sky-700 rounded-full h-4 w-4  "></div>
      <div className="animate-bounce bg-indigo-700 rounded-full h-4 w-4  "></div>
      </div>
    </div>
  )
}

export default Loader