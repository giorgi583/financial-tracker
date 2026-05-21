import React from 'react'
import { Trash } from 'lucide-react'
type category = {
    name: string,
    icon: string,
    budget: number
}
const BudgetReview = () => {
    const [categories, setCategories] = React.useState<category[]>([]);
      const [selectedCategory, setSelectedCategory] = React.useState<string>('')
      const [selectedMonth, setSelectedMonth] = React.useState<string>('');
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
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
      </div>
  )
}

export default BudgetReview