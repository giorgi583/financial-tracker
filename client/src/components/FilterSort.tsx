import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react'
import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { useTranslation } from 'react-i18next';
import { fetchTransactions } from '../slices/transactionsSlice';
import {toast} from 'react-hot-toast';
const isMobile = window.innerWidth < 768;
const FilterSort = ({filters, setFilters}: any) => {
    const dispatch = useAppDispatch();
    function applyFilters() {
dispatch(fetchTransactions(filters))
toast.success('Filters applied!')
    }
   const { t } = useTranslation()
    const [showFilters, setShowFilters] = useState(false);
    if(isMobile && !showFilters) {
        return (<div className='flex-1 bg-white rounded-2xl dark:bg-[var(--sidebar)] dark:text-white p-6 shadow-md relative flex items-cente gap-5 justify-between'>
            <h2 className='font-semibold text-2xl max-sm:text-lg'>{t('filter')} & {t('sort')}</h2>
            <button onClick={() => setShowFilters(!showFilters)} className='btn rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm'>
                {showFilters ? 'Hide Filters' : <ChevronDown size={16} />}
        </button>
        </div>)
    }
     return (
    (showFilters || !isMobile) && (
        <div className='flex-1 bg-white rounded-2xl p-5 shadow-md relative dark:bg-[var(--sidebar)] flex flex-col gap-2 dark:text-white'>
            <button onClick={()=> setFilters({description: '', type: '', category: '', minAmount: 0, maxAmount: 0, from: '', to: '' })} className='btn absolute top-2 right-5 max-lg:p-1 cursor-pointer rounded-full p-2'>
                <RefreshCcw size={16} />
            </button>
            <button onClick={applyFilters} className='btn absolute top-12 right-4 rounded-lg p-2 cursor-pointer max-xl:p-1 max-xl:top-15 max-xl:text-sm'>
               {t('apply_filters')}
        </button>
        {showFilters && (<button onClick={() => setShowFilters(false)} className='btn absolute top-7 right-15 rounded-lg cursor-pointer max-lg:text-sm'>
                <ChevronUp size={16} />
        </button>)}
        <h2 className='font-semibold text-2xl max-sm:text-base max-lg:text-lg'>{t('filter')} & {t('sort')}</h2>
        <div>
            <p className='font-medium text-md mt-4'>{t('description')}</p>
            <input id='description' name='description' type="text" placeholder={t('search')} value={filters.description} onChange={(e) => setFilters({...filters, description: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>{t('amount')}</p>
            <input id='amount' name='amount' type="number" placeholder='min' value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: Number(e.target.value)})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
            <input id='amount2' name='amount' type="number" placeholder='max' value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: Number(e.target.value)})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full mt-2' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>{t('type')} </p>
            <select id="type" name="type" value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">{t('all')}</option>
                <option value="income">{t('income')}</option>
                <option value="expense">{t('expense')}</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>{t('category')}</p>
            <select id="category" name="category" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">{t('all')}</option>
                <option value="Food">{t('Food')}</option>
                    <option value="Transport">{t('Transport')}</option>
                    <option value="Entertainment">{t('Entertainment')}</option>
                    <option value="Healthcare">{t('Healthcare')}</option>
                    <option value="Clothing">{t('Clothing')}</option>
                    <option value="Education">{t('Education')}</option>
                    <option value="Utilities">{t('Utilities')}</option>
                    <option value='Salary'>{t('Salary')}</option>
                    <option value='Gift'>{t('Gift')}</option>
                    <option value='Investment'>{t('Investment')}</option>
                    <option value='Shopping'>{t('Shopping')}</option>
                    <option value='Travel'>{t('Travel')}</option> 
                    <option value="Other">{t('Other')}</option>
            </select>
        </div>
        <div>
            <p className='font-medium text-md mt-4'>{t('filter')} {t('date')}</p>
            <label className='text-sm '>{t('from')}</label>   
            <input id='from' name='from' type="date" value={filters.from} onChange={(e) => setFilters({...filters, from: e.target.value})} max={new Date().toISOString().split("T")[0]} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
            <label className='text-sm mt-2'>{t('to')}</label>
            <input id='to' name='to' type="date" value={filters.to} onChange={(e) => setFilters({...filters, to: e.target.value})} max={new Date().toISOString().split("T")[0]} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' />
        </div>
        <div>
            <p className='font-medium text-md mt-4'>{t('sort')} {t('date')}</p>
            <select id='orderBy' name='orderBy' value={filters.orderBy} onChange={(e) => setFilters({...filters, orderBy: e.target.value})} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full'>
                <option value="">{t('none')}</option>
                <option value="desc">{t('nto')}</option>
                <option value="asc">{t('otn')}</option>
            </select>
        </div>
    </div>
  )
    )
}

export default FilterSort