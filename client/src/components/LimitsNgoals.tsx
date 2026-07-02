import React from 'react'
import { Edit, Plus, X } from 'lucide-react'
import {toast } from 'react-hot-toast'
type budget = {
  category: string,
  amount: number,
  spent: number,
  remaining: number,
  percentage: number,
  alarming: boolean
}
const LimitsNgoals = ({setBudget}: {setBudget: React.Dispatch<React.SetStateAction<budget[]>>}) => {
          const [selectedCategory, setSelectedCategory] = React.useState<string>('')
          const [limit, setLimit] = React.useState<number>(0);
          const [setLimitWindowOpen, setSetLimitWindowOpen] = React.useState<boolean>(false);
          const [editLimitWindowOpen, setEditLimitWindowOpen] = React.useState<boolean>(false);
      const setBudgets = async () => {
        try {
          const response = await fetch('http://localhost:3400/api/budgets', {
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
          setBudget((prev) => [...prev, { category: selectedCategory, amount: limit, spent: 0, remaining: limit, percentage: 0, alarming: false }]);
        } catch (error) {
          toast.error('Error creating budget, it may already exist');
          console.error('Error fetching budgets:', error);
        }
            }
            const editBudgets = async () => {
        try {
          const response = await fetch('http://localhost:3400/api/budgets', {
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
          setBudget((prev) => prev.map((category) => category.category === selectedCategory ? { ...category, amount: limit } : category));
          toast.success('Budget updated successfully!');
          console.log(data);

        } catch (error) {
          toast.error("error updating budget, you may not have set a budget for this category yet");
          console.error('Error fetching budgets:', error);
        }
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
                   <option  value="Food">Food</option>
                    <option  value="Transport">Transport</option>
                    <option  value="Entertainment">Entertainment</option>
                    <option  value="Healthcare">Healthcare</option>
                    <option  value="Clothing">Clothing</option>
                    <option  value="Education">Education</option>
                    <option  value="Utilities">Utilities</option>
                    <option  value='Shopping'>Shopping</option>
                    <option  value='Travel'>Travel</option> 
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
    </div>
  
  )
}

export default LimitsNgoals