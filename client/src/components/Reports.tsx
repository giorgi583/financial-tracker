import React from 'react'
import Piechart from './Piechart'
import { XIcon, Search, PieChart, TrendingUp, BarChart2Icon, ArrowRight } from 'lucide-react';
const Reports = ({spendingByCategory, setCategory, incomeByCategory, trend,  topSpendingDays, trendByCategory}: {spendingByCategory: any, setCategory: any, incomeByCategory: any, trend: any, topSpendingDays: any, trendByCategory: any}) => {
   const reports = [
      {
        key: "spendingByCategory",
        title: "Spending by category",
        icon: PieChart,
        description: "Analyze your spending habits and identify areas for improvement.",
      },
      { 
        key: "incomeByCategory",
        title: "Income by category",
        icon: PieChart,
        description: "Analyze your income sources and identify areas for improvement.",
      },
      {
        key: "expenseTrend",
        icon: TrendingUp,
        title: "Expense dynamics trend",
        description: "Understand your spending patterns and identify areas for improvement.",
      },
      {
        key: "balaceTrend",
        icon: TrendingUp,
        title: "Expense dynamics trend",
        description: "Understand your spending patterns and identify areas for improvement.",
      },
      {
        key: "topSpendingDays",
        icon: TrendingUp,
        title: "Top spending days",
        description: "Identify days with high spending and potential areas for improvement.",
      },
      {
        key: "trendByCategory",
        icon: TrendingUp,
        title: "Expense dynamics by category",
        description: "Understand your spending patterns and identify areas for improvement.",
      },
      {
        key: "cashFlow",
        icon: BarChart2Icon,
        title: "Cash flow analysis",
        description: "Understand your cash flow and identify areas for improvement.",
      } ]
  const [open, setOpen] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState("")
    console.log("spendingByCategory", spendingByCategory);
  console.log("incomeByCategory", incomeByCategory);
  console.log("trend", trend);
  console.log("topSpendingDays", topSpendingDays);
  console.log("trendByCategory", trendByCategory);
    return (
    <div>
      <div className="mt-6 relative max-w-sm group peer focus-within:z-30 focus-within:bg-white dark:focus-within:bg-[var(--sidebar)]">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-3 text-gray-400 cursor-pointer dark:text-gray-400" size={16} />
      <div className="max-w-sm p-3 rounded bg-slate-100 dark:bg-[var(--sidebar)] group-focus-within:block hidden absolute top-12 left-0 z-30 w-full shadow-lg max-h-100 overflow-y-scroll scrollbar-hide">
        {reports.filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase())).map((report, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer">
            <h3 className="text-lg font-medium">{report.title || "Not found"}</h3>
            <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
          </div>
        )).length > 0 ? reports.filter((report) => report.title.toLowerCase().includes(searchTerm.toLowerCase())).map((report, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer dark:bg-slate-700 dark:hover:bg-slate-600">
            <h3 className="text-lg font-medium">{report.title || "Not found"}</h3>
            <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
          </div>
        )) : <div className="flex flex-col items-center justify-center py-6">
          <Search className="mx-auto text-gray-400" size={50} />
          <p className="p-4 text-gray-600 dark:text-gray-400">No reports found.</p></div> }
      </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-600/60 z-20 hidden peer-focus-within:block"></div>
<div className="mt-6">
  {reports.map((report, index) => (
    <div key={index} onClick={() => setOpen(report.key)} className="mb-4 p-4 bg-slate-200/60 rounded hover:bg-slate-300/80 transition cursor-pointer dark:bg-slate-600 dark:hover:bg-slate-700 group overflow-hidden">
      <div className="flex items-center gap-5">
        <report.icon className="mr-2" size={40} />
      
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium">{report.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{report.description}</p> </div> 
      <div className="ml-auto translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"><ArrowRight  size={40} /></div>
      </div>
    </div>
  ))}
</div>
    {(open === 'spendingByCategory' && spendingByCategory) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-white dark:bg-[var(sidebar)] min-w-200 relative pt-10'><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5'/></button><Piechart data={spendingByCategory} /></div></div>}
    {(open === 'incomeByCategory' && incomeByCategory) && <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-lg bg-black/30 flex justify-center items-center"> <div className='bg-white dark:bg-[var(sidebar)] min-w-200 relative pt-10'><button className='absolute top-3 right-3 p-2 cursor-pointer hover:bg-red-600' onClick={() => setOpen('')}><XIcon className='w-5 h-5'/></button><Piechart data={incomeByCategory} /></div></div>}
    </div>
  )
}

export default Reports