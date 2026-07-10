
import { ArrowDown, ArrowUp, CheckSquare, ChevronLeft, ClipboardListIcon, Edit, Trash2, X } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { fetchTransactions, removeTransaction, editTransaction } from "../slices/transactionsSlice";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";

const isMobile = window.innerWidth <= 768;
const TransList = ({filters}: any) => {
const { t } = useTranslation()
    const dispatch = useAppDispatch()
  const { transactions, status } = useAppSelector((state) => state.transactions)
    console.log(transactions)
    useEffect(() => {
    dispatch(fetchTransactions(filters)) // ← fetch on mount
  }, [dispatch])
 function deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        dispatch(removeTransaction(id))
        toast.success('Transactions deleted successfully!') }
    }
function updateTransaction(id: any, editedValues: any) {
    if(confirm('Are you sure you want to edit this transaction?')) {
         dispatch(editTransaction({id, ...editedValues}))
        toast.success('Transaction edited successfully!')
        setEditPanelOpen(false)
        dispatch(fetchTransactions(filters))
    }
}
const [editedValues, setEditedValues] = useState<any>({}); 
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  return (
    <div className="flex-1 min-w-0">
        <h2 className='text-2xl font-bold mb-4'>{t('transList')}</h2>
        <table className='bg-white rounded-lg shadow-md max-md:mb-20 table-auto w-[95%] dark:bg-[var(--sidebar)] dark:text-white'>
            {status === 'loading' && (
                <div className="w-full h-full relative">
                    <Loader />
                </div>
            )}
            <thead>
                <tr className='bg-[var(--accent)] text-left dark:bg-[var(--dark)] dark:text-white'>
                    <th className='text-left py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>{t('type')}</th>
                {isMobile ? null : <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>{t('description')}</th>}
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>{t('amount')}</th>
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>{t('category')}</th>
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap flex gap-2 items-center'>{t('date')} {filters.orderBy === 'asc' ? <ArrowDown size={16} /> : filters.orderBy === 'desc' && <ArrowUp size={16} /> }</th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.length > 0 ? transactions.map((tx: any) => (
                    <>
                    <tr key={tx.id} className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100/30 dark:hover:bg-gray-600/20  relative group ${tx.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`} style ={{backgroundColor: (tx.id === transactionToEdit && editPanelOpen) ? 'var(--btnbg)' : '', color: (tx.id === transactionToEdit && editPanelOpen) ? 'var(--dark-sidebar)' : ''}}>
                        <td className={tx.type === 'income' ? 'py-2 px-4 text-green-500 max-sm:px-1 max-sm:text-sm' : 'py-2 px-4 text-red-500 max-sm:px-1 max-sm:text-sm'}>
                            {tx.type}
                        </td>
                        {isMobile ? null : <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.description}</td>}
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.amount}</td>
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.category}</td>
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{new Date(tx.date).toLocaleDateString('en-GB')}</td>
                        <td className={`py-2 px-4 max-sm:px-1 max-sm:text-sm absolute -right-10 group-hover:flex hidden gap-4`}>
                         <button onClick={() => deleteTransaction(tx.id)} className={`text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded cursor-pointer`}>
                            <Trash2 size={18} />
                        </button>
                        <button onClick={() => {setTransactionToEdit(tx.id); setEditPanelOpen(true); setEditedValues({                   // pre-fill form with current values
    type: tx.type,
    description: tx.description,
    amount: tx.amount,
    category: tx.category,
    date: tx.date.split('T')[0]
  });}} className='text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer'>
                            <Edit size={18} />
                        </button>
                        </td>
                       {isMobile && <td className="py-2 px-4 max-sm:px-1 max-sm:text-sm absolute -right-6 gap-4"> <button onClick={() => {setTransactionToEdit(tx.id); setEditPanelOpen(true); setEditedValues({                   // pre-fill form with current values
    type: tx.type,
    description: tx.description,
    amount: tx.amount,
    category: tx.category,
    date: tx.date.split('T')[0]
  });}}><ChevronLeft size={15} /></button> <button><Trash2 size={15} /></button></td>}
                    </tr>
                    {editPanelOpen && transactionToEdit === tx.id && (
                        <tr className='bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 relative'>
                            <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>
                                <select id="type" name="type" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full' value={editedValues?.type} onChange={(e) => setEditedValues({...editedValues, type: e.target.value})}>
                                    <option value="income" selected={tx.type === 'income'}>Income</option>
                                    <option value="expense" selected={tx.type === 'expense'}>Expense</option>
                                </select>
                            </td>
                            {isMobile ? null : <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>
                                <input id="description" name="description" type="text" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' value={editedValues?.description} onChange={(e) => setEditedValues({...editedValues, description: e.target.value})} />
                            </td>}
                            <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>
                                <input id="amount" name="amount" type="number" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' value={editedValues?.amount} onChange={(e) => setEditedValues({...editedValues, amount: Number(e.target.value)})} />
                            </td>
                            <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>
                                <select id="category" name="category" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] [appearance: base-select] w-full' value={editedValues?.category} onChange={(e) => setEditedValues({...editedValues, category: e.target.value})}>
                                    <option value="Food" selected={tx.category === 'Food'}>Food</option>
                                    <option value="Transport" selected={tx.category === 'Transport'}>Transport</option>
                                    <option value="Entertainment" selected={tx.category === 'Entertainment'}>Entertainment</option>
                                    <option value="Healthcare" selected={tx.category === 'Healthcare'}>Healthcare</option>
                                    <option value="Utilities" selected={tx.category === 'Utilities'}>Utilities</option>
                                    <option value="Clothing" selected={tx.category === 'Clothing'}>Clothing</option>
                                    <option value="Salary" selected={tx.category === 'Salary'}>Salary</option>
                                    <option value="Gift" selected={tx.category === 'Gift'}>Gift</option>
                                    <option value="Shopping" selected={tx.category === 'Shopping'}>Shopping</option>
                                    <option value="Investment" selected={tx.category === 'Investment'}>Investment</option>
                                    <option value="Travel" selected={tx.category === 'Travel'}>Travel</option>
                                    <option value="Other" selected={tx.category === 'Other'}>Other</option>
                                    </select>
                            </td>
                            <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>
                                <input id="date" name="date" type="date" className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-full' value={editedValues?.date} onChange={(e) => setEditedValues({...editedValues, date: e.target.value})} />
                            </td>
                            <td className={`py-2 px-4 max-sm:px-1 max-sm:text-sm absolute -right-12 flex flex-col gap-1 -top-1`}>
                                <button onClick={() => updateTransaction(transactionToEdit, editedValues)}  className='px-1 py-1 rounded-lg bg-white/40 cursor-pointer'><CheckSquare size={17} color='green' /></button>
                                <button onClick={() => setEditPanelOpen(false)} className='bg-white/40 px-1 py-1 rounded-lg cursor-pointer'><X size={17} color='red' /></button>
                            </td>
                        </tr>
                    )}
                    </>
                )) : (
                    <tr>
                        <td className='py-10 px-4 text-gray-200 text-5xl' colSpan={6} align="center" rowSpan={6}>
                           <ClipboardListIcon size={70}/> {t('transListEmpty')}
                        </td>
                    </tr>
                )}
                
            </tbody>
        </table>
    </div>
  )
}

export default TransList
