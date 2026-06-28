import { useAppDispatch, useAppSelector } from '../hooks'
import { addTransaction } from '../slices/transactionsSlice'
import Loader from './Loader'
import { Plus } from 'lucide-react'
import React from 'react'
import { toast } from 'react-hot-toast'
type Transaction = {
  type: string;
  description?: string;
  amount: number;
  category: string;
  date: string;
};
const AddTransactionForm = () => {
    const dispatch = useAppDispatch();
const {status, error} = useAppSelector(state => state.transactions);
const [transaction, setTransaction] = React.useState<Transaction>({
    type: '',
    description: '',
    amount: 0,
    category: '',
    date: '',
});
const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
   const result = await dispatch(addTransaction(transaction))

    if (addTransaction.rejected.match(result)) {
      toast.error(error || 'Failed to add transaction') 
    }

    if (addTransaction.fulfilled.match(result)) {
      toast.success('Transaction added successfully') 
    }
}

   return (
    <div className='bg-white rounded-2xl p-5 shadow-md flex-1 dark:bg-[var(--sidebar)] dark:text-white relative'>
        <form onSubmit={submit} className='col-span-1 md:col-span-2 lg:col-span-3'>
            <h2 className='text-2xl font-bold mb-4'>Add Transaction</h2>
            <div className='flex flex-col gap-6'>
                <label htmlFor='type'>Type</label>
                <select id='type' onChange={(e)=> setTransaction(prev => ({...prev, type: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select]'>
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <label htmlFor='description'>Description</label>
                <input id='description' onChange={(e)=> setTransaction(prev => ({...prev, description: e.target.value}))} type="text" maxLength={70} placeholder='Description' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]' />
                <label htmlFor='amount'>Amount</label>
                <input id='amount' step={0.01} onChange={(e)=> setTransaction(prev => ({...prev, amount: Number(e.target.value) || 0}))} required type="number" placeholder='Amount' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]' />
                <label htmlFor='category'>Category</label>
                <select id='category' onChange={(e)=> setTransaction(prev => ({...prev, category: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Education">Education</option>
                    <option value="Utilities">Utilities</option>
                    <option value='Salary'>Salary</option>
                    <option value='Gift'>Gift</option>
                    <option value='Investment'>Investment</option>
                    <option value='Loan'>Loan</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor='date'>Date</label>
                <input id='date' max={new Date().toISOString().split("T")[0]} onChange={(e)=> setTransaction(prev => ({...prev, date: e.target.value}))} required type="date" name="" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
                <button type="submit" className='btn cursor-pointer rounded-lg px-4 py-2 transition active:scale-95 flex items-center justify-center mt-4'><Plus className='mr-2'/>Add Transaction</button>
        </div>
        </form>
    </div>    
    )}


                    

export default AddTransactionForm