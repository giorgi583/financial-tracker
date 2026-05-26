import { Search } from "lucide-react"
import React from "react"
import { useTranslation } from "react-i18next"
const Analytics = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = React.useState("")
  const reports = [
    {
      title: "What's your biggest expense?",
      description: "Analyze your spending habits and identify areas for improvement.",
    },
    {
      title: "Biggest vs lowest monthly savings",
      description: "Analyze trends in your money savings over time.",
    },
    {
      title: "Cash flow analysis",
      description: "Understand your cash flow and identify areas for improvement.",
    } ]
   
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 max-sm:mt-8">John{t('yourAnalytics')}</h1>
      <p className="text-gray-600 dark:text-gray-400">This is the analytics page. Here you can view various metrics and insights about your finances. You can search for all the financial reports here.</p>
      <div className="mt-6 relative max-w-sm group peer focus-within:z-30 focus-within:bg-white dark:focus-within:bg-[var(--sidebar)]">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-3 text-gray-400 cursor-pointer dark:text-gray-400" size={16} />
      <div className="max-w-sm p-3 rounded bg-slate-100 dark:bg-[var(--sidebar)] group-focus-within:block hidden absolute top-12 left-0 z-30 w-full shadow-lg">
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
        <h2 className="text-xl font-semibold mb-2">What's your biggest expense?</h2>
        <p className="text-gray-600 dark:text-gray-400">Analyze your spending habits and identify areas for improvement.</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Biggest vs lowest monthly savings</h2>
        <p className="text-gray-600 dark:text-gray-400">Analyze trends in your money savings over time.</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Cash flow analysis</h2>
        <p className="text-gray-600 dark:text-gray-400">Understand your cash flow and identify areas for improvement.</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">More financial insights... </h2>
      </div>

    </div>
  )
}

export default Analytics