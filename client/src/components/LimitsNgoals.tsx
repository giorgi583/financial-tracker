import React from 'react'
import { Plus } from 'lucide-react'
type category = {
    name: string,
    icon: string,
    budget: number
}
const LimitsNgoals = () => {
     const [categories, setCategories] = React.useState<category[]>([]);
          const [selectedCategory, setSelectedCategory] = React.useState<string>('')
          const [selectedMonth, setSelectedMonth] = React.useState<string>('');
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Set & Edit Limits</h2>
          <hr />
          <select name="" id="" value={selectedCategory} className='px-3 py-1 border border-gray-300 rounded-lg' onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name.toLowerCase()}>{category.name}</option>
            ))}
          </select>
            <p className='text-xl'>Limit of {selectedCategory}: ${categories.find(c => c.name.toLowerCase() === selectedCategory)?.budget || 0}</p>
            <input type="number" placeholder='add a new limit' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            <button className='px-4 py-2 rounded-lg'>Save</button>
      </div>
      <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Create Goals</h2>
          <hr />
          <label htmlFor="">Set monthly savings goal</label>
          <div className='relative'>
         <input type="number" className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
      <button className='p-3 rounded absolute right-[1px] top-[1px] cursor-pointer'><Plus size={16} color='blue' className='cursor-pointer active:scale-90'/></button></div>
      </div>
    </div>
  )
}

export default LimitsNgoals