

const Alerts = () => {
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
        <div className='bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white'>
        <h2 className="text-2xl font-semibold pb-3">Overspending alerts</h2>
        <hr className='my-4'/>
        <input type="number" placeholder='add a new limit' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        <button className='px-4 py-2 rounded-lg'>Save</button>
      </div>
    </div>
  )
}

export default Alerts