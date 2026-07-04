import React, { useEffect } from 'react'
import { ArrowBigDown, Check, CircleAlert, CircleCheck, Trash, TriangleAlert } from 'lucide-react'
import categories from '../assets/categories'
import { toast } from 'react-hot-toast'
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";
import { FaExclamationCircle } from 'react-icons/fa';
import ProgressChart from './RadialBarChart';
type budget = {
  id: number,
  category: string,
  amount: number,
  spent: number,
  remaining: number,
  percentage: number,
  alarming: boolean
}
const apiUrl = import.meta.env.VITE_API_URL;
const BudgetReview = ({budget, onBudgetUpdated, currency}: {budget: budget[], onBudgetUpdated: () => void; currency: string}) => {
     const totalBudget = budget?.reduce((acc, curr) => acc + (curr.amount || 0), 0);
const totalSpent = budget?.reduce((acc, curr) => acc + (curr.spent || 0), 0);

const budgetSummary = {
  totalBudget,
  totalSpent,
  remaining: totalBudget - totalSpent,
  percentage:
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0,
};     
 const deleteBudget = async (budgetId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
        if (!confirmDelete) {
          return;
        }
        try {
          const response = await fetch(`${apiUrl}/budgets/${budgetId}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Failed to delete budget');
          }
          toast.success('Budget deleted successfully');
          onBudgetUpdated();
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
      if(!budget || budget.length === 0) {
        return (
          <div className="p-5 w-full">
            <h2 className="text-3xl font-semibold">No budget set!</h2>
            <p className="mt-2 text-lg">You have not set any budget yet. <br/> Please go to Limits & goals section and set a budget to see the overview.</p>
          </div>
        )
      }
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
        <div className="bg-white rounded-2xl p-5 relative dark:bg-[var(--sidebar)] dark:text-white ">
          <h2 className="text-2xl font-semibold pb-3">Overall Budget overview</h2>
          <hr/>
          <div className="flex items-center justify-between flex-col mt-3 h-[90%]">
          <div className="flex flex-col gap-2 items-center">
          <p className="font-semibold text-2xl">Total budget: {currencySymbol} {budgetSummary.totalBudget.toFixed(2)}</p>
          <p className="font-semibold text-2xl">Spent: {currencySymbol} {budgetSummary.totalSpent.toFixed(2)}</p>
          <div ><ArrowBigDown size={25} color='var(--accent)' fill='var(--sidebar)'/></div>
          <p className="font-semibold text-2xl">Remaining: {currencySymbol} {budgetSummary.remaining.toFixed(2)}</p>
          <p className={budgetSummary.percentage > 100 ? "font-semibold text-2xl rounded-lg text-red-500 bg-red-100 p-3" : "font-semibold text-2xl rounded-lg bg-[var(--accent)] p-3"}>Usage</p>
           <div ><ArrowBigDown size={25} color='var(--accent)' fill='var(--sidebar)'/></div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-between h-full">
          <div className="flex flex-col items-center justify-center mt-5">
          <ProgressChart percentage={budgetSummary.percentage} color={'var(--accent)'}/>
  <div>
  <p className="text-center mt-5 text-2xl">You are <span className={`font-semibold ${budgetSummary.percentage > 100 ? "text-red-500" : "text-[var(--accent)]"}`}>{budgetSummary.percentage > 100 ? "over" : "under"}</span> budget</p>
  </div>
</div>
  <div className='bg-gray-500/10 p-3 rounded-lg mt-5 text-gray-600 dark:text-gray-300'>
   <p className='flex items-center gap-2'> <TriangleAlert size={20} color='var(--accent)'/> Warning! </p>
    <p> This calculations are based on <strong>your</strong> monthly category limits. Transactions that aren't in the categories that you have set budget for will not be included</p>
  </div>
  </div>
        </div>
        </div>
        <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Limits by category</h2>
          <hr />
          <div className="flex flex-col justify-between h-[95%]">
            <div>
            {budget && budget.map((budget, index) => (
            <div key={index} className="flex items-center justify-between border-2 border-[var(--accent)] gap-3 my-4 has-[button:hover]:text-white has-[button:hover]:bg-red-400 p-2 rounded-md transition-all duration-300">
              <p>{budget.category}</p>
              <p className="flex-1 text-right"> {currencySymbol} {budget.amount}</p>
              <button onClick={() => deleteBudget(budget.id)} className='text-red-600 relative peer'><Trash size={20} className='peer cursor-pointer'/>
              <p className='hidden peer-hover:block bg-gray-300 px-2 py-1 rounded-md absolute top-0 left-7 whitespace-nowrap'>Delete limit</p></button>
              
            </div>
          ))}
          </div>
          <div className='bg-gray-500/10 p-3 rounded-lg mt-5 text-gray-600 dark:text-gray-300 flex items-start flex-col gap-2'>
            <FaExclamationCircle size={20} color='var(--accent)' className='inline-block mr-2'/> 
            <p>All limits are based on your monthly category limits, so its recommended to set limits for all categories. You can inspect and delete them in this section.</p>
          </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white">
          <h2 className="text-2xl font-semibold pb-3">Progress bars</h2>
          <hr />
          <div className="w-full">
          {budget && budget.map((b, index) => (
            <div key={index} className={`grid grid-cols-[max-content_max-content_1fr] gap-3 my-4 w-full grid-rows-2 border-2 text-black border-gray-200 p-2 rounded-md ${b.alarming ? 'border-red-500 bg-red-100' : b.percentage > 80 ? 'border-yellow-500 bg-yellow-100' : 'border-green-500 bg-green-100'}`}>
              <p className="col-span-1 row-span-1 mr-4 font-semibold">{b.category}</p>
              <p className="col-span-1 row-span-1 ml-4 w-fit">{b.percentage > 100 ?  <CircleAlert color = 'red' size = {20} />  : b.percentage > 80 ? <TriangleAlert color = 'orange' size = {20}/> : <CircleCheck color = 'green' size = {20}/>}</p>
              <p className="col-span-1 row-span-1 font-semibold justify-self-end">{currencySymbol} {b.spent} / {currencySymbol} {b.amount}</p>
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