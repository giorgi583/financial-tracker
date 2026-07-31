import React from 'react'
import Piechart from './Piechart'
import categories from '../assets/categories'
import { XIcon, Search, PieChart, TrendingUp, BarChart2Icon, ArrowRight } from 'lucide-react';
import AreaChart2 from './AreaChart2';
import BarChart from './BarChart';
import DoubleBarChart from './DoubleBarChart';
import { useTranslation } from 'react-i18next';

const Reports = ({spendingByCategory, granularity, setCategory, category, incomeByCategory, trend,  topSpendingDays, trendByCategory}: {spendingByCategory: any, granularity: any, setCategory: any, category: any, incomeByCategory: any, trend: any, topSpendingDays: any, trendByCategory: any}) => {
  const { t } = useTranslation(); 
  const reports = [
      {
        key: "spendingByCategory",
        data: spendingByCategory,
        title: "Spending by category",
        icon: PieChart,
        description: "Analyze your spending habits and identify areas for improvement.",
      },
      { 
        key: "incomeByCategory",
        data: incomeByCategory,
        title: "Income by category",
        icon: PieChart,
        description: "Analyze your income sources and identify areas for improvement.",
      },
      {
        key: "expenseTrend",
        icon: TrendingUp,
        data: trend,
        title: "Expense dynamics trend",
        description: "Understand your spending patterns over time and identify areas for improvement.",
      },
      {
        key: "incomeTrend",
        data: trend,
        icon: TrendingUp,
        title: "Income dynamics trend",
        description: "Understand your income patterns over time and identify areas for improvement.",
      },
      {
        key: "savingsTrend",
        icon: TrendingUp,
        data: trend,
        title: "Savings dynamics trend",
        description: "Understand your savings over time and identify areas for improvement.",
      },
      {
        key: "topSpendingDays",
        icon: BarChart2Icon,
        data: topSpendingDays,
        title: "Top spending days",
        description: "Identify days with high spending and potential areas for improvement.",
      },
      {
        key: "trendByCategory",
        icon: TrendingUp,
        data: trendByCategory,
        title: "Trend by category",
        description: "Deep dive into your spending categories and identify areas for improvement.",
      },
      {
        key: "incomeExpenseAnalysis",
        icon: BarChart2Icon,
        data: trend,
        title: "Cash flow analysis (Income vs. Expense)",
        description: "Understand your cash flow and identify areas for improvement.",
      } ]
      
  const [open, setOpen] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState("")
    console.log("spendingByCategory", spendingByCategory);
  console.log("incomeByCategory", incomeByCategory);
  console.log("trend", trend);
  console.log("topSpendingDays", topSpendingDays);
  console.log("trendByCategory", trendByCategory);
  const grouped = trend?.reduce((acc: any, item: any) => {
  
  if (!acc[item.period]) {  
    acc[item.period] = {
      income: 0,
      expense: 0,
    };
  }

  acc[item.period][item.type] += item.amount;

  return acc;
}, {} as Record<string, { income: number; expense: number }>);

const incomeTrend = grouped && Object.entries(grouped).map(([period, values]: any) => ({
  period,
  amount: values.income,
}));
const expenseTrend = grouped && Object.entries(grouped).map(([period, values]: any) => ({
  period,
  amount: values.expense,
}));
const savingsTrend = grouped && Object.entries(grouped).map(([period, values]: any) => ({
  period,
  amount: values.income - values.expense,
}));
const incomeVsExpense = grouped && Object.entries(grouped).map(([period, values]: any) => ({
  period,
  income: values.income,
  expense: values.expense,
})) 

    return (
    <div>
      <div className="mt-6 relative max-w-sm group peer focus-within:z-30 focus-within:bg-white dark:focus-within:bg-[var(--sidebar)]">
        <input 
          id="search"
          name="search"
          type="text" 
          placeholder={`${t('search')}...`} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-3 text-gray-400 cursor-pointer dark:text-gray-400" size={16} />
      <div className="max-w-sm p-3 rounded bg-slate-100 dark:bg-[var(--sidebar)] group-focus-within:block hidden absolute top-12 left-0 right-0 z-30 w-auto shadow-lg max-h-100 overflow-y-scroll scrollbar-hide">
        {reports.filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.description.toLowerCase().includes(searchTerm.toLowerCase())).map((report, index) => (
          <div key={index}  className="mb-4 p-4 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer">
            <h3 className="text-lg font-medium">{report.title || "Not found"}</h3>
            <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
          </div>
        )).length > 0 ? reports.filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase())).map((report, index) => (
          <div onMouseDown={() => { setOpen(report.key)}} key={index} className="mb-4 p-4 max-sm:p-2 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer dark:bg-slate-700 dark:hover:bg-slate-600" style={{opacity: report.data?.length > 0 ? 1 : 0.8, pointerEvents: report.data?.length > 0 ? "auto" : "none"}}>
            <h3 className="text-lg font-medium">{report.title || "Not found"}</h3>
            <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
          </div>
        )) : <div className="flex flex-col items-center justify-center py-6">
          <Search className="mx-auto text-gray-400" size={50} />
          <p className="p-4 text-gray-600 dark:text-gray-400">{t('noRpts')}</p></div> }
      </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-600/60 z-20 hidden peer-focus-within:block"></div>
<div className="mt-6">
  {reports.map((report, index) => (
  <div key={index} onClick={() => setOpen(report.key)} className={`mb-4 p-4 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer dark:bg-slate-600 dark:hover:bg-slate-700 group overflow-hidden duration-300 ease-in-out`} style={{opacity: report.data?.length > 0 ? 1 : 0.8, pointerEvents: report.data?.length > 0 ? "auto" : "none"}}>
      <div className="flex items-center gap-5">
        <report.icon className="mr-2" size={40} />
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium">{report.title}</h3>
     {report.data?.length > 0 ? <p className="text-gray-600 dark:text-gray-400">{report.description}</p> : <p className="text-red-600 dark:text-red-400">Not available!</p>} </div> 
      {report.key === "trendByCategory" && 
      <select name="category" id="category" className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => e.stopPropagation()} onChange={(e) => setCategory(e.target.value)} value={category}>
      {categories.map((category, index) => (
        <option key={index} value={category.name}>{category.name}{category.icon}</option>
      ))}
        </select>
      }
      <div className="ml-auto translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"><ArrowRight  size={40} /></div>
      </div>
    </div>
  ))}
</div>
    {(open === 'spendingByCategory' && spendingByCategory && spendingByCategory.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Expense by category</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><Piechart data={spendingByCategory} /></div></div>}
    {(open === 'incomeByCategory' && incomeByCategory && incomeByCategory.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Income by category</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><Piechart data={incomeByCategory} /></div></div>}
    {(open === 'trendByCategory' && trendByCategory && trendByCategory.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Spending trend on {category}</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><AreaChart2 data={trendByCategory} granularity={granularity} /></div></div>}
    {(open === 'expenseTrend' && expenseTrend && expenseTrend.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Your expense dynamics trend</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><AreaChart2 data={expenseTrend} granularity={granularity} /></div></div>}
    {(open === 'incomeTrend' && incomeTrend && incomeTrend.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Your income dynamics trend</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><AreaChart2 data={incomeTrend} granularity={granularity} /></div></div>}
    {(open === 'savingsTrend' && savingsTrend && savingsTrend.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Your savings dynamics trend</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><AreaChart2 data={savingsTrend} granularity={granularity} /></div></div>}
    {(open === 'topSpendingDays' && topSpendingDays && topSpendingDays.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Your Top 5 Spending Days</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><BarChart data={topSpendingDays} granularity={granularity} /></div></div>}
        {(open === 'incomeExpenseAnalysis' && incomeVsExpense && incomeVsExpense.length > 0) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] min-w-[80%] p-10 relative pt-10 rounded-2xl'><h3 className='text-xl font-semibold my-4'>Your cash flow</h3><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5 text-black dark:text-white'/></button><DoubleBarChart data={incomeVsExpense} granularity={granularity} /></div></div>}

    </div>
  )
}

export default Reports