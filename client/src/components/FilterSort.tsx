import { ChevronUp, RefreshCcw } from 'lucide-react'
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchTransactions } from '../slices/transactionsSlice';
import {toast} from 'react-hot-toast';
const isMobile = window.innerWidth < 768;
const FilterSort = ({filters, setFilters}: any) => {
    const dispatch = useAppDispatch();
    function applyFilters() {
dispatch(fetchTransactions(filters))
toast.success('Filters applied!')
    }
   
    const [showFilters, setShowFilters] = useState(false);
    if(isMobile && !showFilters) {
        return (<div className='flex-1 bg-white rounded-2xl dark:bg-[var(--sidebar)] dark:text-white p-6 shadow-md relative flex items-cente gap-5 justify-between'>
            <h2 className='font-semibold text-2xl max-sm:text-lg'>Filter & Sort</h2>
            <button onClick={() => setShowFilters(!showFilters)} className='btn rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        </div>)
    }
     return (
    (showFilters || !isMobile) && (
        <div className='flex-1 bg-white rounded-2xl p-5 shadow-md relative dark:bg-[var(--sidebar)] flex flex-col gap-2 dark:text-white'>
            <button onClick={()=> setFilters({description: '', type: '', category: '', minAmount: 0, maxAmount: 0, from: '', to: '' })} className='btn absolute top-5 right-35 max-lg:right-30 cursor-pointer rounded-full p-2  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
                <RefreshCcw size={16} />
            </button>
            <button onClick={applyFilters} className='btn absolute top-5 right-4 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                Apply Filters
        </button>
        {showFilters && (<button onClick={() => setShowFilters(false)} className='absolute top-5 right-40  rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                <ChevronUp size={16} />
        </button>)}
        <h2 className='font-semibold text-2xl max-sm:text-lg'>Filter & Sort</h2>
        <div>
            <p className='font-medium text-md mt-4'>Search by Description</p>
            <input type="text" placeholder='Search...' value={filters.description} onChange={(e) => setFilters({...filters, description: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Amount</p>
            <input type="number" placeholder='min' value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: Number(e.target.value)})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
            <input type="number" placeholder='max' value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: Number(e.target.value)})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full mt-2' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Type</p>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Category</p>
            <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">All</option>
                <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Education">Education</option>
                    <option value="Utilities">Utilities</option>
                    <option value='Salary'>Salary</option>
                    <option value='Gift'>Gift</option>
                    <option value='Investment'>Investment</option>
                    <option value='Shopping'>Shopping</option>
                    <option value='Travel'>Travel</option> 
                    <option value="Other">Other</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Filter by Date</p>
            <label className='text-sm '>From</label>   
            <input type="date" value={filters.from} onChange={(e) => setFilters({...filters, from: e.target.value})} max={new Date().toISOString().split("T")[0]} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
            <label className='text-sm mt-2'>To</label>
            <input type="date" value={filters.to} onChange={(e) => setFilters({...filters, to: e.target.value})} max={new Date().toISOString().split("T")[0]} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>Sort by Date</p>
            <select value={filters.orderBy} onChange={(e) => setFilters({...filters, orderBy: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">None</option>
                <option value="desc">Newest to Oldest</option>
                <option value="asc">Oldest to Newest</option>
            </select>
        </div>
    </div>
  )
    )
}

export default FilterSort