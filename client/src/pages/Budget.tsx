import React from 'react'
import Alerts from '../components/Alerts'
import BudgetReview from '../components/BudgetReview'
import LimitsNgoals from '../components/LimitsNgoals'
import { Trash } from 'lucide-react'
type category = {
    name: string,
    icon: string,
    budget: number
}
const Budget = () => {
  const [categories, setCategories] = React.useState<category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('')
  const [selectedMonth, setSelectedMonth] = React.useState<string>('');
  const [setcion, setSetcion] = React.useState<string>('overview');
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl max-sm:mt-8">John's Budget</h1>
          <select className="border border-gray-300 rounded-lg px-3 py-1 " name="month" id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
      <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm">
        <button onClick={() => setSetcion('overview')} className={`${setcion === 'overview' ? 'bg-linear-to-r from-blue-100 to-blue-200 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Overview</button>
        <button onClick={() => setSetcion('limits')} className={`${setcion === 'limits' ? 'bg-linear-to-r from-blue-100 to-blue-200 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Limits & Goals</button>
        <button onClick={() => setSetcion('alerts')} className={`${setcion === 'alerts' ? 'bg-linear-to-r from-blue-100 to-blue-200 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Alerts</button>
      </div>
      {setcion === 'overview' && <BudgetReview />}
      {setcion === 'limits' && <LimitsNgoals />}
      {setcion === 'alerts' && <Alerts />}
    </div>
  )
}

export default Budget