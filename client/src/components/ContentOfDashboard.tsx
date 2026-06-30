import { CheckCircle2Icon, ClipboardList, TriangleAlertIcon } from "lucide-react"
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import React, { useEffect, useState} from "react"
import AreaChart from "./AreaChart"
import Piechart from "./Piechart"
const ContentOfDashboard = ({title, className, data, period}: {title: string, className?: string, data?: any, period?: any }) => {
  const [currencySign, setCurrencysign] = React.useState<string>('$');
  const [netIncome, setNetIncome] = React.useState<number>(0);
  const [savingsRate, setSavingsRate] = React.useState<number>(0);
  
useEffect(() => {
  if (data?.data?.currency === 'EUR') {
    setCurrencysign('€');
  } 
   else if (data?.data?.currency === 'GEL') {
    setCurrencysign('₾');
  }
  console.log(currencySign);
  setNetIncome(Math.round((data?.data?.income - data?.data?.expense ) * 100) / 100);
  setSavingsRate(Math.round((data?.data?.income - data?.data?.expense ) / data?.data?.income * 100));
}, [data]);
  
  console.log(data.data) 
  return (
    <div className={className}>
      { data?.data?.income && data?.data?.expense ?
       <>
      <h2 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h2>
      <hr className="mb-4 text-[var(--accent)]" ></hr>
      <div className="mt-4">{title === 'Expense dynamics trend' && <AreaChart data={data.data} currencySign={currencySign}/>}
      {title === 'Spending by category' && <Piechart data={data.data} />}
      {title === 'Current balance' && <div className="flex justify-center flex-col gap-10 items-center h-full"> <p className="mt-4 text-6xl font-semibold"> {data.data?.balance} {currencySign}</p> <p className="text-2xl font-semibold flex items-center gap-2">{data.data?.balance < 0 ? <TriangleAlertIcon className="text-red-500"/> : data.data?.balance < 100 ? <TriangleAlertIcon className="text-yellow-500"/> : <CheckCircle2Icon className="text-green-500"/> } {data.data?.balance < 0 ? 'You are in debt' : data.data?.balance < 100 ? 'You are running low' : 'You are in credit'}</p> </div>}
      {title === 'Totals' && <div className="mt-4 flex gap-4 flex-col "> 
        <p className="text-green-500 text-xl font-semibold">Income: {data.data?.income || 0} {currencySign}</p>
         <p className="text-red-500 text-xl font-semibold">Expense: {data.data?.expense || 0} {currencySign}</p>
         <hr></hr>
         <p className={netIncome < 0 ? `text-red-500 text-xl font-semibold` : netIncome < 100 ? `text-yellow-500 text-xl font-semibold` : `text-green-500 text-xl font-semibold`}>Net: {netIncome} {currencySign}</p>
          <p className="text-gray-600 font-semibold dark:text-gray-400 flex items-start">Savings Rate: {savingsRate}% {savingsRate < 10 ? <FaCaretDown className="text-red-500"/> : savingsRate > 35 ? <FaCaretUp className="text-green-500"/> : '' }</p>
          </div>}
      {title === 'Recent Transactions' && <div className="mt-4 border border-[var(--dark-sidebar)] opacity-80 rounded-sm shadow-md"> <div className="grid grid-cols-3 text-lg  p-4 bg-[var(--btnbg)] text-black font-semibold"><p>Category</p> <p>Amount</p> <p>Date</p></div> {data?.data?.recentTransactions.map ((transaction: any, i: number) => <div key={transaction.id} className={`grid grid-cols-3 py-5 text-white px-4  ${i % 2 === 0 ? 'bg-[var(--sidebar)]' : 'bg-[var(--dark-sidebar)] '}`}><p>{transaction.category}</p> <p>{transaction.amount} {currencySign}</p> <p>{new Date(transaction.date.split('T')[0]).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}</p> </div>)} </div>}
      {title === 'Largest expense' && <div className="flex justify-center flex-col gap-3 text-[var(--accent)]"> <p className="mt-4 text-3xl font-semibold "><span className="text-[var(--mainbg)] dark:text-[var(--btnbg)] border-2 border-[var(--mainbg)] dark:border-[var(--btnbg)] rounded-md px-2"> {data?.data?.largestExpense?.amount || 0} {currencySign}</span></p> <p className="text-2xl font-semibold text-[var(--dark-sidebar)]">Category → {data?.data?.largestExpense?.category}</p> <p className="text-2xl text-[var(--mainbg)] dark:text-[var(--btnbg)]">Date → {new Date(data?.data?.largestExpense?.date.split('T')[0]).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</p> </div>}
      {title === 'Top categories' && <div className="mt-1 border border-[var(--sidebar)]"> <div className="grid grid-cols-3 text-lg p-2bg-[var(--dark-sidebar)] font-semibold border border-[var(--accent)]"><p className="text-left p-2">Category</p> <p className="text-right  p-2">Amount</p> <p className="text-right p-2">Percentage</p></div> {data?.data?.topCategories.map ((transaction: any, i: number) => <div key={transaction.id} className={`grid grid-cols-3  w-full`}><p className="text-left border border-r-0 border-[var(--accent)] p-2">{transaction.category}</p> <p className="text-right border-y border-[var(--accent)] p-2">{transaction.amount} {currencySign}</p> <p className="text-right border border-l-0 border-[var(--accent)] p-2">{transaction.percentage}%</p> </div>)} </div>}
      </div> 
      </>
       : 
      <p className="text-gray-300 dark:text-gray-500 text-2xl flex flex-col items-center justify-center h-full"><ClipboardList  size={50}/> No data available!</p>}
    </div>
  )
}


export default ContentOfDashboard