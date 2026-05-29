
import { ClipboardListIcon } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { fetchTransactions } from "../slices/transactionsSlice";
import { useEffect } from "react";
import Loader from "./Loader";

const isMobile = window.innerWidth <= 768;
const TransList = ({filters}: any) => {
    const dispatch = useAppDispatch()
  const { transactions, status } = useAppSelector((state) => state.transactions)
    console.log(transactions)
    useEffect(() => {
    dispatch(fetchTransactions(filters)) // ← fetch on mount
  }, [dispatch])
 
  return (
    <div className="flex-1 min-w-0">
        <h2 className='text-2xl font-bold mb-4'>Transaction List</h2>
        <table className='bg-white rounded-lg shadow-md max-md:mb-20 table-auto w-full dark:bg-[var(--sidebar)] dark:text-white'>
            {status === 'loading' && (
                <div className="w-full h-full relative">
                    <Loader />
                </div>
            )}
            <thead>
                <tr className='bg-[var(--accent)] text-left dark:bg-[var(--dark)] dark:text-white'>
                    <th className='text-left py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>Type</th>
                {isMobile ? null : <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>Description</th>}
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>Amount</th>
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>Category</th>
                    <th className='py-2 px-4 max-sm:px-1 max-sm:text-sm truncate overflow-hidden whitespace-nowrap'>Date</th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.length > 0 ? transactions.map((tx: any) => (
                    <tr key={tx.id}>
                        <td className={tx.type === 'income' ? 'py-2 px-4 text-green-500 max-sm:px-1 max-sm:text-sm' : 'py-2 px-4 text-red-500 max-sm:px-1 max-sm:text-sm'}>
                            {tx.type}
                        </td>
                        {isMobile ? null : <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.description}</td>}
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.amount}</td>
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{tx.category}</td>
                        <td className='py-2 px-4 max-sm:px-1 max-sm:text-sm'>{new Date(tx.date).toLocaleDateString('en-GB')}</td>
                    </tr>
                )) : (
                    <tr>
                        <td className='py-10 px-4 text-gray-200 text-5xl' colSpan={6} align="center" rowSpan={6}>
                           <ClipboardListIcon size={70}/> No data found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default TransList
