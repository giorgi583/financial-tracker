import React, { useEffect } from 'react'
import { Check, CircleAlert, CircleCheck, Trash, TriangleAlert } from 'lucide-react'
import categories from '../assets/categories'
import { toast } from 'react-hot-toast'
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";
type budget = {
  id: number,
  category: string,
  amount: number,
  spent: number,
  remaining: number,
  percentage: number,
  alarming: boolean
}
const BudgetReview = ({budget, setBudget, currency}: {budget: budget[], setBudget: React.Dispatch<React.SetStateAction<budget[]>>, currency: string}) => {
     const totalBudget = budget?.reduce((acc, curr) => acc + (curr.amount || 0), 0);
const totalSpent = budget?.reduce((acc, curr) => acc + (curr.spent || 0), 0);

const budgetSummary = {
  totalBudget,
  totalSpent,
  remaining: totalBudget - totalSpent,
  percentage:
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0,
};      const deleteBudget = async (budgetId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
        if (!confirmDelete) {
          return;
        }
        try {
          const response = await fetch(`http://localhost:3400/api/budgets/${budgetId}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to delete budget');
          }
          setBudget((prev) => prev.filter((b) => b.id !== budgetId));
          toast.success('Budget deleted successfully');
        } catch (error) {
          console.error('Error deleting budget:', error);
          toast.error('Failed to delete budget');
        }
      };
      const currencySymbol =
  {
    USD: "$",
    EUR: "€",
    GEL: "₾",
  }[currency] ?? "$";
      console.log('budget:', budget);
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
        <div className="bg-white rounded-2xl p-5 relative dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Overall Budget overview</h2>
          <hr className="my-4"/>
          <p>total budget: {currencySymbol} {budgetSummary.totalBudget.toFixed(2)}</p>
          <p>spent: {currencySymbol} {budgetSummary.totalSpent.toFixed(2)}</p>
          <p>remaining: {currencySymbol} {budgetSummary.remaining.toFixed(2)}</p>
          <p>usage: {budgetSummary.percentage}%</p>
          <div className="flex items-center justify-center">
          <RadialBarChart
  width={150}
  height={150}
  cx="50%"
  cy="50%"
  innerRadius="70%"
  outerRadius="100%"
  barSize={10}
  data={[{value: Math.min(budgetSummary.percentage, 100)}]}
  startAngle={90}
  endAngle={-270}
>
  <PolarAngleAxis
    type="number"
    domain={[0, 100]}
    angleAxisId={0}
    tick={false}
  />
  <RadialBar
    dataKey="value"
    background 
    cornerRadius={10}
    fill={budgetSummary.percentage > 100 ? "#ef4444" : "var(--accent)"}
  />
  <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-black text-lg font-bold"
    >
        {Math.round(budgetSummary.percentage)}%
    </text>
</RadialBarChart>
</div>
        </div>
        <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Limits by category</h2>
          <hr />
          {budget && budget.map((budget, index) => (
            <div key={index} className="flex items-center justify-between border-2 border-[var(--accent)] gap-3 my-4 has-[button:hover]:text-white has-[button:hover]:bg-red-400 p-2 rounded-md transition-all duration-300">
              <p>{budget.category}</p>
              <p className="flex-1 text-right"> {currencySymbol} {budget.amount}</p>
              <button onClick={() => deleteBudget(budget.id)} className='text-red-600 relative peer'><Trash className='peer cursor-pointer'/>
              <p className='hidden peer-hover:block bg-gray-300 px-2 py-1 rounded-md absolute top-0 left-7 whitespace-nowrap'>Delete limit</p></button>
              
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">progress bars</h2>
          <hr />
          <div className="w-full">
          {budget && budget.map((b, index) => (
            <div key={index} className={`grid grid-cols-3 gap-3 my-4 w-full grid-rows-2 border-2 border-gray-200 p-2 rounded-md ${b.alarming ? 'border-red-500 bg-red-100' : b.percentage > 80 ? 'border-yellow-500 bg-yellow-100' : 'border-green-500 bg-green-100'}`}>
              <p className="col-span-1 row-span-1 mr-4 font-semibold">{b.category}</p>
              <p className="col-span-1 row-span-1 ml-4">{b.percentage > 100 ? <CircleAlert color = 'red' size = {20}/> : b.percentage > 80 ? <TriangleAlert color = 'orange' size = {20}/> : <CircleCheck color = 'green' size = {20}/>}</p>
              <p className="col-span-1 row-span-1 text-right">{currencySymbol} {b.spent} / {currencySymbol} {b.amount}</p>
              <div className=" bg-gray-300 rounded-full h-4  col-span-3">
              <div className= {`${b.percentage > 100 ? 'bg-red-500' : b.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'} h-4 rounded-full transition-all duration-300`} style={{ width: `${b.percentage > 100 ? 100 : b.percentage}%` }}></div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
  )
}

export default BudgetReview