
import { Plus } from 'lucide-react'
import React from 'react'
type Transaction = {
  id: number,
    type: string,
    description?: string,
    amount: number,
    category: string,
    date: string,
    createdAt: string,
    updatedAt?: string
}
const AddTransactionForm = ( {setTransactions}: {setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>}) => {
    const [transaction, setTransaction] = React.useState<Transaction>({
        id: 0,
        type: '',
        description: '',
        amount: 0,
        category: '',
        date: '',
        createdAt: '',
        updatedAt: ''
    })
    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setTransactions(prev => [...prev, {...transaction, id: prev.length + 1, createdAt: new Date().toISOString()}]);
        alert('Transaction added successfully!');
    }
  return (
    <div className='bg-white rounded-2xl p-5 shadow-md flex-1'>
        <div>
            <h2 className='text-2xl font-bold mb-4'>Add Initial Balance</h2>
            <div className='flex gap-4 mb-6 items-center relative'>
                <input id='initialBalance' type="number" placeholder='Initial Balance' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' />
                <button className='bg-linear-60 absolute right-0 from-blue-100 to-blue-200 text-blue-600 cursor-pointer rounded-lg px-4 py-2 transition active:scale-95 flex items-center justify-center'><Plus /></button>
            </div>
        </div>
        <form onSubmit={submit} className='col-span-1 md:col-span-2 lg:col-span-3'>
            <h2 className='text-2xl font-bold mb-4'>Add Transaction</h2>
            <div className='flex flex-col gap-4'>
                <label htmlFor='type'>Type</label>
                <select id='type' onChange={(e)=> setTransaction(prev => ({...prev, type: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance: base-select]'>
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <label htmlFor='description'>Description</label>
                <input id='description' onChange={(e)=> setTransaction(prev => ({...prev, description: e.target.value}))} type="text" maxLength={70} placeholder='Description' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <label htmlFor='amount'>Amount</label>
                <input id='amount' onChange={(e)=> setTransaction(prev => ({...prev, amount: Number(e.target.value) || 0}))} required type="number" placeholder='Amount' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <label htmlFor='category'>Category</label>
                <select id='category' onChange={(e)=> setTransaction(prev => ({...prev, category: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option value="">Select Category</option>
                    {/* {categories.map((category) => (
                        <option key={category.name} value={category.name.toLowerCase()}>
                            {category.icon} {category.name}
                        </option>
                    ))} */}
                </select>
                <label htmlFor='date'>Date</label>
                <input id='date' onChange={(e)=> setTransaction(prev => ({...prev, date: e.target.value}))} required type="date" name="" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                <button type="submit" className='bg-linear-60 from-blue-100 to-blue-200 text-blue-600 cursor-pointer rounded-lg px-4 py-2 transition active:scale-95 flex items-center justify-center'><Plus className='mr-2'/>Add Transaction</button>
        </div>
        </form>
    </div>
  )
}
                    

export default AddTransactionForm