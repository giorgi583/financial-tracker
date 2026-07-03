import React from 'react'
import { Edit, Plus, X } from 'lucide-react'
import {toast } from 'react-hot-toast'
import categories from '../assets/categories'
const apiUrl = import.meta.env.VITE_API_URL;
const LimitsNgoals = ({onBudgetUpdated}: {onBudgetUpdated: () => void}) => {
          const [selectedCategory, setSelectedCategory] = React.useState<string>('')
          const [limit, setLimit] = React.useState<number>(0);
          const [setLimitWindowOpen, setSetLimitWindowOpen] = React.useState<boolean>(false);
          const [editLimitWindowOpen, setEditLimitWindowOpen] = React.useState<boolean>(false);
          const [goalToSet, setGoalToSet] = React.useState<string>('');
          const [goalAmount, setGoalAmount] = React.useState<number>(0);
          const [goalTitle, setGoalTitle] = React.useState<string>('');
          const [goalDeadline, setGoalDeadline] = React.useState<string>('');
          const [goalWindowOpen, setGoalWindowOpen] = React.useState<boolean>(false);
      const setBudgets = async () => {
        try {
          const response = await fetch(`${apiUrl}/budgets`, {
            method: 'POST',
            body: JSON.stringify({ category: selectedCategory, amount: limit }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          if(!data.success) {
            throw new Error(data.error);
          }
          toast.success('Budget created successfully!');
          console.log(data);
          onBudgetUpdated();
        } catch (error) {
          toast.error('Error creating budget, it may already exist');
          console.error('Error fetching budgets:', error);
        }
        setSelectedCategory('');
        setLimit(0);
            }
            const editBudgets = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/budgets`, {
            method: 'PATCH',
            body: JSON.stringify({ category: selectedCategory, amount: limit }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          if(!data.success) {
            throw new Error(data.error);
          }
          toast.success('Budget updated successfully!');
          onBudgetUpdated();
        } catch (error) {
          toast.error("error updating budget, you may not have set a budget for this category yet");
          console.error('Error fetching budgets:', error);
        }
        setSelectedCategory('');
        setLimit(0);
            }
            const setGoals = async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              try {
                const response = await fetch(`${apiUrl}/goals`, {
                  method: 'POST',
                  body: JSON.stringify({ type: goalToSet, category: selectedCategory || null, targetAmount: goalAmount, title: goalTitle, deadline: goalDeadline || null }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                });
                const data = await response.json();
                if(!data.success) {
                  throw new Error(data.error);
                }
                toast.success('Goal created successfully!');
                console.log(data);
              } catch (error) {
                toast.error('Error creating goal, it may already exist');
                console.error('Error fetching budgets:', error);
              }
              setGoalToSet('');
              setGoalAmount(0);
              setGoalTitle('');
              setGoalDeadline('');
              setGoalWindowOpen(false);
              setSelectedCategory('');
            }
  return (
    <div className="p-5 grid grid-cols-3 gap-4 mt-5 w-full max-md:grid-cols-1 max-xl:grid-cols-2">
    
      <div className="bg-white rounded-2xl p-5  dark:bg-[var(--sidebar)] dark:text-white shadow">
      <h2 className="text-2xl font-semibold pb-3 mb-5">Set new Limits</h2>
        
          <button onClick={() => {setSetLimitWindowOpen(true); console.log(setLimitWindowOpen)}} className='btn py-2 mt-5 rounded-lg flex items-center gap-1 justify-start group'><Plus className='scale-0 group-hover:scale-100 transition-all duration-300 ' size={18}/>Add</button>
      </div>
       { (setLimitWindowOpen || editLimitWindowOpen) && 
       <div className = "fixed top-0 left-0 w-full h-full backdrop-blur bg-black/20 flex items-center justify-center z-50">

           <div className="bg-white rounded-2xl p-5 flex flex-col gap-6 dark:bg-[var(--sidebar)] dark:text-white relative min-w-100 max-w-lg">
            <button onClick={() => {  setSetLimitWindowOpen(false), setEditLimitWindowOpen(false); setSelectedCategory(''), setLimit(0);}} className='bg-red-500 text-white px-2 py-2 cursor-pointer active:bg-red-700 rounded-lg absolute top-2 right-2'><X/></button>
          {setLimitWindowOpen && <h2 className="text-2xl font-semibold pb-3">Set a new Limit</h2>}
           { editLimitWindowOpen && <h2 className="text-2xl font-semibold pb-3 mb-5">Edit Limits</h2>}
          <select name="" id="" value={selectedCategory} className='px-3 py-1 border border-gray-300 rounded-lg' onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option className='flex items-center gap-2' key={category.name} value={category.name}>{category.name}<p>{category.icon}</p></option>
            ))}
          </select>
          <div className='flex flex-col gap-2'>
            <label>{editLimitWindowOpen ? 'Enter a new' : 'Set'} Limit</label>
            <input type="number" placeholder='add a new limit' value={limit} onChange={(e) => setLimit(parseFloat(e.target.value) || 0)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/> </div>
            {selectedCategory &&  limit>0 && <p className='text-xl py-5 font-semibold'>Monthly limit of {selectedCategory}: {limit}</p>}
           {setLimitWindowOpen && <button onClick={setBudgets} className='btn px-4 py-2 rounded-lg'>Save</button>}
            {editLimitWindowOpen && <button onClick={editBudgets} className='btn px-4 py-2 rounded-lg'>Save</button>}
      </div>
      </div>}
      <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow">
          <h2 className="text-2xl font-semibold pb-3">Edit limits</h2>
          <button onClick={() => {setEditLimitWindowOpen(true), setSetLimitWindowOpen(false)}} className='btn  py-2 mt-5 rounded-lg flex items-center gap-1 justify-start group'><Edit className='scale-0 group-hover:scale-100 transition-all duration-300 ' size={18}/>Edit</button>
      </div>
      <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow">
        <h2 className="text-2xl font-semibold pb-3">Set your goals</h2>
        <div className='flex flex-col gap-3'>
        <button onClick={() => {setGoalToSet('Long_term_savings'); setGoalWindowOpen(true)}} className='bg-amber-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Long term savings</button>
        <button onClick={() => {setGoalToSet('Monthly_savings'); setGoalWindowOpen(true)}} className='bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Monthly savings</button>
        <button onClick={() => {setGoalToSet('Cut_down_spending'); setGoalWindowOpen(true)}} className='bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Cut down spending</button>
        <button onClick={() => {setGoalToSet('Increase_monthly_income'); setGoalWindowOpen(true)}} className='bg-cyan-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Increase monthly income</button>
        </div>
      </div>
      {goalWindowOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur bg-black/20 flex items-center justify-center z-50">
          <form onSubmit={setGoals} className="bg-white rounded-2xl p-5 flex flex-col gap-6 dark:bg-[var(--sidebar)] dark:text-white relative min-w-100 max-w-lg">
            <button onClick={() => {setGoalToSet(''); setGoalWindowOpen(false)}} className='bg-red-500 text-white px-2 py-2 cursor-pointer rounded absolute top-2 right-2'><X/></button>
            <h2 className="text-2xl font-semibold pb-3">Set a new Goal</h2>
            {goalToSet && <p className='text-xl py-5 font-semibold'>{goalToSet}</p>}
            <div className='flex flex-col gap-4'>
              <label>Enter your goal amount</label>
              <input required type="number" placeholder='add amount' value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            </div>
            {goalToSet === 'Long_term_savings' && 
            <div className='flex flex-col gap-4'>
              <label>Enter your target date</label>
              <input required type="date" placeholder='add a date' value={goalDeadline} onChange={(e) => setGoalDeadline(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            </div>
            }
            <input required type="text" placeholder='add a title for your goal' value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            {goalToSet === 'Cut_down_spending' &&
            <div className='flex flex-col gap-4'>
              <label>Choose Category</label>
              <select required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
               {categories.map((category) => (
              <option className='flex items-center gap-3' key={category.name} value={category.name}>{category.name}<p>{category.icon}</p></ option>
            ))}
              </select>
            </div>}
            <button type='submit' className='btn px-4 py-2 rounded-lg'>Save</button>
          </form>
        </div>
      )}
    </div>
  
  )
}

export default LimitsNgoals