import { useAppDispatch, useAppSelector } from '../hooks'
import { addTransaction } from '../slices/transactionsSlice'
import { Plus } from 'lucide-react'
import {useTranslation} from 'react-i18next'
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
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
const { error} = useAppSelector(state => state.transactions);
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
            <h2 className='text-2xl font-bold mb-4'>{t('addTransaction')}</h2>
            <div className='flex flex-col gap-6'>
                <label htmlFor='type'>{t('type')}</label>
                <select name='type' id='type' onChange={(e)=> setTransaction(prev => ({...prev, type: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select]'>
                    <option value="">{t('select')} {t('type')}</option>
                    <option disabled={transaction.category === 'Food' || transaction.category === 'Transport' || transaction.category === 'Entertainment' || transaction.category === 'Healthcare' || transaction.category === 'Utilities' || transaction.category === 'Clothing' || transaction.category === 'Education' || transaction.category === 'Shopping' || transaction.category === 'Travel'} value="income">{t('income')}</option>
                    <option disabled={transaction.category === 'Salary' || transaction.category === 'Investment' || transaction.category === 'Gift'} value="expense">{t('expense')}</option>
                </select>
                <label htmlFor='description'>{t('description')}</label>
                <input name='desc' id='description' onChange={(e)=> setTransaction(prev => ({...prev, description: e.target.value}))} type="text" maxLength={70} placeholder={t('description')} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]' />
                <label htmlFor='amount'>{t('amount')}</label>
                <input name='amount' id='amount' step={0.01} onChange={(e)=> setTransaction(prev => ({...prev, amount: Number(e.target.value) || 0}))} required type="number" placeholder={t('amount')} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]' />
                <label htmlFor='category'>{t('category')}</label>
                <select name='category' id='category' onChange={(e)=> setTransaction(prev => ({...prev, category: e.target.value}))} required className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
                    <option value="">{t('select')} {t('category')}</option>
                    <option disabled={transaction.type === 'income'} value="Food">{t('Food')}</option>
                    <option disabled={transaction.type === 'income'} value="Transport">{t('Transport')}</option>
                    <option disabled={transaction.type === 'income'} value="Entertainment">{t('Entertainment')}</option>
                    <option disabled={transaction.type === 'income'} value="Healthcare">{t('Healthcare')}</option>
                    <option disabled={transaction.type === 'income'} value="Clothing">{t('Clothing')}</option>
                    <option disabled={transaction.type === 'income'} value="Education">{t('Education')}</option>
                    <option disabled={transaction.type === 'income'} value="Utilities">{t('Utilities')}</option>
                    <option disabled={transaction.type === 'expense'} value='Salary'>{t('Salary')}</option>
                    <option disabled={transaction.type === 'expense'} value='Gift'>{t('Gift')}</option>
                    <option disabled={transaction.type === 'expense'} value='Investment'>{t('Investment')}</option>
                    <option disabled={transaction.type === 'income'} value='Shopping'>{t('Shopping')}</option>
                    <option disabled={transaction.type === 'income'} value='Travel'>{t('Travel')}</option> 
                    <option value="Other">{t('Other')}</option>
                </select>
                <label htmlFor='date'>{t('date')}</label>
                <input id='date' max={new Date().toISOString().split("T")[0]} onChange={(e)=> setTransaction(prev => ({...prev, date: e.target.value}))} required type="date" name="date" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
                <button type="submit" className='btn cursor-pointer rounded-lg px-4 py-2 transition active:scale-95 flex items-center justify-center mt-4'><Plus className='mr-2'/>{t('addTransaction')}</button>
        </div>
        </form>
    </div>    
    )}


                    

export default AddTransactionForm