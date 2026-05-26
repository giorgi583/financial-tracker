import { ChevronUp, RefreshCcw } from 'lucide-react'
import { useState } from 'react';

const isMobile = window.innerWidth < 768;
const FilterSort = () => {
    const [showFilters, setShowFilters] = useState(false);
    if(isMobile && !showFilters) {
        return (<div className='flex-1 bg-white rounded-2xl dark:bg-[var(--sidebar)] dark:text-white p-6 shadow-md relative flex items-cente gap-5 justify-between'>
            <h2 className='font-semibold text-2xl'>Filter & Sort</h2>
            <button onClick={() => setShowFilters(!showFilters)} className=' rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        </div>)
    }
     return (
    (showFilters || !isMobile) && (
        <div className='flex-1 bg-white rounded-2xl p-6 shadow-md relative dark:bg-[var(--sidebar)] flex flex-col gap-4 dark:text-white'>
            <button className='absolute top-5 right-35 max-lg:right-30 cursor-pointer rounded-full p-2  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
                <RefreshCcw size={16} />
            </button>
            <button className='absolute top-5 right-4 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                Apply Filters
        </button>
        {showFilters && (<button onClick={() => setShowFilters(false)} className='absolute top-5 right-40  rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                <ChevronUp size={16} />
        </button>)}
        <h2 className='font-semibold text-2xl max-sm:text-lg'>Filter & Sort</h2>
        <div>
            <p className='font-medium text-md mt-4'>Search by Description</p>
            <input type="text" placeholder='Search...' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Amount</p>
            <input type="number" placeholder='min' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
            <input type="number" placeholder='max' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full mt-2' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Type</p>
            <select className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Category</p>
            <select className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">All</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="clothing">Clothing</option>
                <option value="health">Health</option>
                <option value="others">Others</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Date</p>
            <select className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="this-year">This Year</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Sort by Date</p>
            <select className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
            </select>
        </div>
    </div>
  )
    )
}

export default FilterSort