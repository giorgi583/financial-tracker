import { CheckCircle2Icon, ClipboardList, TriangleAlertIcon } from "lucide-react"
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import React, { useEffect} from "react"
import AreaChart from "./AreaChart"
import { useTranslation } from "react-i18next";
import Piechart from "./Piechart"
const ContentOfDashboard = ({title, className, data}: {title: string, className?: string, data?: any}) => {
  const [currencySign, setCurrencysign] = React.useState<string>('$');
  const [netIncome, setNetIncome] = React.useState<number>(0);
  const [savingsRate, setSavingsRate] = React.useState<number>(0);
  const { t } = useTranslation();
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
      <div className="mt-4">{title === t('expenseDynamicsTrend') && <AreaChart data={data.data} />}
      {title === t('spendingByCategory') && <Piechart data={data.data?.spendingByCategory} />}
      {title === t('currentBalance') && <div className="flex justify-center flex-col gap-10 items-center h-full"> <p className="mt-4 text-6xl font-semibold"> {data.data?.balance} {currencySign}</p> <p className="text-2xl font-semibold flex items-center gap-2">{data.data?.balance < 0 ? <TriangleAlertIcon className="text-red-500"/> : data.data?.balance < 100 ? <TriangleAlertIcon className="text-yellow-500"/> : <CheckCircle2Icon className="text-green-500"/> } {data.data?.balance < 0 ? 'You are in debt' : data.data?.balance < 100 ? 'You are running low' : 'You are in credit'}</p> </div>}
      {title === t('totals') && <div className="mt-4 flex gap-4 flex-col "> 
        <p className="text-green-500 text-xl font-semibold">{t('income')}: {data.data?.income || 0} {currencySign}</p>
         <p className="text-red-500 text-xl font-semibold">{t('expense')}: {data.data?.expense || 0} {currencySign}</p>
         <hr></hr>
         <p className={netIncome < 0 ? `text-red-500 text-xl font-semibold` : netIncome < 100 ? `text-yellow-500 text-xl font-semibold` : `text-green-500 text-xl font-semibold`}>{t('net')}: {netIncome} {currencySign}</p>
          <p className="text-gray-600 font-semibold dark:text-gray-400 flex items-start">{t('savingsRate')}: {savingsRate}% {savingsRate < 10 ? <FaCaretDown className="text-red-500"/> : savingsRate > 35 ? <FaCaretUp className="text-green-500"/> : '' }</p>
          </div>}
      {title === t('recentTransactions') && <div className="mt-4 border border-[var(--dark-sidebar)] opacity-80 rounded-sm shadow-md"> <div className="grid grid-cols-3 text-lg p-4 max-[1400px]:p-1 max-[1400px]:py-4 bg-[var(--btnbg)] text-black font-semibold"><p className="text-left max-2xl:text-base">{t('category')}</p> <p className="text-center max-2xl:text-base">{t('amount')}</p> <p className="text-right max-2xl:text-base">{t('date')}</p></div> {data?.data?.recentTransactions.map ((transaction: any, i: number) => <div key={transaction.id} className={`grid grid-cols-3 py-5 max-[1400px]:p-1 max-[1400px]:py-4 text-white px-4  ${i % 2 === 0 ? 'bg-[var(--sidebar)]' : 'bg-[var(--dark-sidebar)] '}`}><p className="text-left">{transaction.category}</p> <p className="text-center">{transaction.amount} {currencySign}</p> <p className="text-right">{new Date(transaction.date.split('T')[0]).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: '2-digit'})}</p> </div>)} </div>}
      {title === t('largestExpense') && <div className="flex justify-center flex-col gap-3 text-[var(--accent)]"> <p className="mt-4 text-3xl font-semibold "><span className="text-[var(--mainbg)] dark:text-[var(--btnbg)] border-2 border-[var(--mainbg)] dark:border-[var(--btnbg)] rounded-md px-2"> {data?.data?.largestExpense?.amount || 0} {currencySign}</span></p> <p className="text-2xl font-semibold text-[var(--dark-sidebar)]">{t('category')} → {data?.data?.largestExpense?.category}</p> <p className="text-2xl text-[var(--mainbg)] dark:text-[var(--btnbg)]">{t('date')} → {new Date(data?.data?.largestExpense?.date.split('T')[0]).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</p> </div>}
      {title === t('topCategories') && <div className="mt-1 border border-[var(--sidebar)]"> <div className="grid grid-cols-3 text-lg max-2xl:text-sm font-semibold border border-[var(--accent)]"><p className="text-left px-2 py-2 max-2xl:px-1">{t('category')}</p> <p className="text-right px-2 py-2 max-2xl:px-1">{t('amount')}</p> <p className="text-right px-2 py-2 max-2xl:px-1">{t('percentage')}</p></div> {data?.data?.topCategories.map ((transaction: any) => <div key={transaction.id} className={`grid grid-cols-3  w-full`}><p className="text-left border border-r-0 border-[var(--accent)] px-2 py-2 max-2xl:px-1">{transaction.category}</p> <p className="text-right border-y border-[var(--accent)] px-2 py-2 max-2xl:px-1">{transaction.amount} {currencySign}</p> <p className="text-right border border-l-0 border-[var(--accent)] px-2 py-2 max-2xl:px-1">{transaction.percentage}%</p> </div>)} </div>}
      </div> 
      </>
       : 
      <p className="text-gray-300 dark:text-gray-500 text-2xl flex flex-col items-center justify-center h-full"><ClipboardList  size={50}/> {t('noData')}</p>}
    </div>
  )
}


export default ContentOfDashboard