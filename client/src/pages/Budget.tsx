import React from 'react'

import { Trash } from 'lucide-react'
type category = {
    name: string,
    icon: string,
    budget: number
}
const Budget = () => {
  const [categories, setCategories] = React.useState<category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('')
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl ">John's Budget</h1>
          <select className="border border-gray-300 rounded-lg px-3 py-1 " name="month" id="month">
            <option value="">Select Month</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
      <div className="p-5 grid grid-cols-2 gap-4 mt-5 w-full max-sm:grid-cols-1">
        <div className="bg-white rounded-2xl p-5 relative">
          <h2 className="text-2xl font-semibold pb-3">Monthly Budget overview</h2>
          <hr className="my-4"/>
          <p>total budget: $2,500</p>
          <p>spent: $1,800</p>
          <p>remaining: $700</p>
          <p>usage: 70%</p>
        </div>
        <div className="bg-white rounded-2xl p-5">
          <h2 className="text-2xl font-semibold pb-3">Category Budget overview</h2>
          <hr />
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between gap-3 my-4 ">
              <p>{category.name}</p>
              <p>{category.icon}</p>
              <p className="flex-1 text-right">{category.budget ? category.budget : 'no limit'}$</p>
              <p className='text-red-600 relative'><Trash className='peer cursor-pointer'/>
              <p className='hidden peer-hover:block bg-gray-300 px-2 py-1 rounded-md absolute top-0 left-7 whitespace-nowrap'>Delete limit</p></p>
              
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5">
          <h2 className="text-2xl font-semibold pb-3">progress bars</h2>
          <hr />
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between gap-3 my-4">
              <p>{category.name}</p>
              <p>{category.icon}</p>
              <div className="w-1/2 bg-gray-300 rounded-full h-4 flex-1">
                <div className="bg-blue-500 h-4 rounded-full" style={{width: `${Math.floor(Math.random() * 100)}%`}}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold pb-3">Set & Edit budgets</h2>
          <hr />
          <select name="" id="" value={selectedCategory} className='px-3 py-1 border border-gray-300 rounded-lg' onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name.toLowerCase()}>{category.name}</option>
            ))}
          </select>
            <p className='text-xl'>Limit of {selectedCategory}: ${categories.find(c => c.name.toLowerCase() === selectedCategory)?.budget || 0}</p>
            <input type="number" placeholder='add a new limit' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Save</button>
      </div>
    </div>
    </div>
  )
}

export default Budget