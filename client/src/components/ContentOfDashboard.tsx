import { ClipboardList } from "lucide-react"
import React, { useEffect, useState} from "react"
import AreaChart from "./AreaChart"
import Piechart from "./Piechart"
const ContentOfDashboard = ({title, className, data, period}: {title: string, className?: string, data?: any, period?: any }) => {
  const [currencySign, setCurrencysign] = React.useState<string>('$');
  const [netIncome, setNetIncome] = React.useState<number>(0);
useEffect(() => {
  if (data?.data?.currency === 'EUR') {
    setCurrencysign('€');
  } else if (data?.data?.currency === 'USD') {
    setCurrencysign('$');
  } else {
    setCurrencysign('₾');
  }
  setNetIncome(Math.round((data?.data?.income - data?.data?.expense ) * 100) / 100);
}, [data]);
  
  console.log(data.data) 
  return (
    <div className={className}>
      { data ?
       <>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <hr></hr>
      <div>{title === 'Expense dynamics trend' && <AreaChart data={data.data} currencySign={currencySign}/>}
      {title === 'Spending by category' && <Piechart data={data.data} />}
      {title === 'Current balance' && <div> <p className="mt-4 text-2xl">Balance: {data.data?.balance} {currencySign}</p> </div>}
      {title === 'Totals' && <div className="mt-4 flex gap-3 flex-col "> 
        <p className="text-green-500 text-xl">Income: {data.data?.income || 0} {currencySign}</p>
         <p className="text-red-500 text-xl">Expense: {data.data?.expense || 0} {currencySign}</p>
         <hr></hr>
         <p className={netIncome < 0 ? `text-red-500 text-xl` : netIncome < 100 ? `text-yellow-500 text-xl` : `text-green-500 text-xl`}>Net: {netIncome} {currencySign}</p>
          </div>}
      {title === 'Recent Transactions' && <div className="mt-4 bg-amber-100 border border-amber-300 rounded-lg p-4"> <div className="grid grid-cols-3 mb-3 text-lg font-semibold"><p>Category</p> <p>Amount</p> <p>Date</p></div> {data?.data?.recentTransactions.map ((transaction: any, i: number) => <div key={transaction.id} className={`grid grid-cols-3 py-3 px-2 mb-3 ${i % 2 === 0 ? 'bg-amber-200' : 'bg-amber-50'}`}><p>{transaction.category}</p> <p>{transaction.amount} {currencySign}</p> <p>{transaction.date.split('T')[0]}</p> </div>)} </div>}
      {title === 'Largest expense' && <div> <p className="mt-4 text-2xl">Amount: {data?.data?.largestExpense.amount || 0} {currencySign}</p> <p className="text-lg">Category: {data?.data?.largestExpense.category}</p> <p>Date: {data?.data?.largestExpense.date.split('T')[0]}</p> </div>}
      {title === 'Top categories' && <div className="mt-4 bg-amber-100 border border-amber-300 rounded-lg p-4"> <div className="grid grid-cols-3 mb-3 text-lg font-semibold"><p>Category</p> <p>Amount</p> <p>Percentage</p></div> {data?.data?.topCategories.map ((transaction: any, i: number) => <div key={transaction.id} className={`grid grid-cols-3 py-3 px-2 mb-3 ${i % 2 === 0 ? 'bg-amber-200' : 'bg-amber-50'}`}><p>{transaction.category}</p> <p>{transaction.amount} {currencySign}</p> <p>{transaction.percentage}%</p> </div>)} </div>}
      </div> 
      </>
       : 
      <p className="text-gray-300 dark:text-gray-500 text-2xl flex flex-col items-center justify-center h-full"><ClipboardList  size={50}/> No data available!</p>}
    </div>
  )
}

export default ContentOfDashboard