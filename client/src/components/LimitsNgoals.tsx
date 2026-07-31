import React, { useEffect} from 'react'
import { ArrowBigDownDash, CheckCircle, CheckCircleIcon, CircleAlertIcon, Edit, Plus, X, Trash,  ClipboardList, ArrowBigRightDashIcon } from 'lucide-react'
import {toast } from 'react-hot-toast'
import categories from '../assets/categories'
import ProgressChart from './RadialBarChart';
const apiUrl = import.meta.env.VITE_API_URL;
const LimitsNgoals = ({onBudgetUpdated, onGoalsUpdated, currency, goals}: {onBudgetUpdated: () => void, onGoalsUpdated: () => void, currency: string, goals: any}) => {
          const [selectedCategory, setSelectedCategory] = React.useState<string>('')
          const [limit, setLimit] = React.useState<number>(0);
          const [setLimitWindowOpen, setSetLimitWindowOpen] = React.useState<boolean>(false);
          const [editLimitWindowOpen, setEditLimitWindowOpen] = React.useState<boolean>(false);
          const [goalToSet, setGoalToSet] = React.useState<string>('');
          const [goalAmount, setGoalAmount] = React.useState<number>(0);
          const [goalTitle, setGoalTitle] = React.useState<string>('');
          const [goalDeadline, setGoalDeadline] = React.useState<string>('');
          const [goalWindowOpen, setGoalWindowOpen] = React.useState<boolean>(false);
          const [longTermSavings, setLongTermSavings] = React.useState<any>([]);
          const [cutDownSpending, setCutDownSpending] = React.useState<any>([]);
          const [monthlySavings, setmonthlySavings] = React.useState<any>([]);
          const [monthlyIncome, setMonthlyIncome] = React.useState<any>([]);
          const [editGoalWindowOpen, setEditGoalWindowOpen] = React.useState<boolean>(false);
           const currencySymbol =
  {
    USD: "$",
    EUR: "€",
    GEL: "₾",
  }[currency] ?? "$";
  console.log(cutDownSpending);
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
                  body: JSON.stringify({ type: goalToSet, ...selectedCategory ? { category: selectedCategory } : {}, targetAmount: goalAmount, title: goalTitle, ...goalDeadline ? { deadline: goalDeadline } : {} }),
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
                onGoalsUpdated();
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
            const editGoals = async (id: number) => {
              console.log(typeof goalAmount, goalAmount);
              try {
                const response = await fetch(`${apiUrl}/goals/${id}`, {
                  method: 'PATCH',
                  body: JSON.stringify({ targetAmount: goalAmount, ...goalTitle ? { title: goalTitle } : {}, ...goalDeadline ? { deadline: goalDeadline } : {} }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                });
                const data = await response.json();
                if(!data.success) {
                  throw new Error(data.error);
                }
                toast.success('Goal updated successfully!');
                onGoalsUpdated();
                console.log(data);
                }
                 catch (error) {
                  toast.error("error updating goal, you may not have set a goal for this category yet");
                  console.error('Error fetching budgets:', error);
                }
                setGoalToSet('');
                setEditGoalWindowOpen(false);
                setGoalTitle('');
                setGoalAmount(0);
                setGoalDeadline('');
                }
              const deleteGoals = async (id: number) => {
                const confirm = window.confirm('Are you sure you want to delete this goal?');
                if (!confirm) {
                  return;
                }
                try {
                  const response = await fetch(`${apiUrl}/goals/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                  });
                  const data = await response.json();
                  if(!data.success) {
                    throw new Error(data.error);
                  }
                  toast.success('Goal deleted successfully!');
                  onGoalsUpdated();
                  console.log(data);
                } catch (error) {
                  toast.error("error deleting goal, you may not have set a goal for this category yet");
                  console.error('Error fetching budgets:', error);
                }
              }
            const handleGoalSubmit = (goal: any) => {
              switch(goal) {
                case 'long_term_savings':
                  const id = longTermSavings[0]?.id;
                  editGoals(id);
                  break;
                case 'cut_down_spending':
                  const id2 = cutDownSpending.find((goal: any) => goal.category === selectedCategory)?.id;
                  editGoals(id2);
                  break;
                case 'monthly_savings':
                  const id3 = monthlySavings[0]?.id;
                  editGoals(id3);
                  break;
                case 'monthly_income':
                  const id4 = monthlyIncome[0]?.id;
                  editGoals(id4);
                  break;
                default:
                  break;
              }
            }
            const divideGoals = ()=> {
              const longTermSaving = goals.filter((goal: any) => goal.type === 'Long_term_savings');
              const shortTermGoals = goals.filter((goal: any) => goal.type === 'monthly_savings');
              const cutDownSpending = goals.filter((goal: any) => goal.type === 'Cut_down_spending');
              const increaseMonthlyIncome = goals.filter((goal: any) => goal.type === 'Increase_monthly_income');
              setLongTermSavings(longTermSaving);
              setCutDownSpending(cutDownSpending);
              setmonthlySavings(shortTermGoals);
              setMonthlyIncome(increaseMonthlyIncome);
            }
            useEffect(() => {
              divideGoals();
            },[goals])
  return (
    <div>
    <div className="p-5 grid grid-cols-3 grid-rows-1 max-lg:grid-cols-2 gap-4 mt-5 w-full max-md:grid-cols-1">
    
      <div className="bg-white rounded-2xl p-5 row-span-1 dark:bg-[var(--sidebar)] dark:text-white shadow-xl">       
          <button onClick={() => {setSetLimitWindowOpen(true); console.log(setLimitWindowOpen)}} className='btn w-full h-full rounded-lg flex flex-col items-center gap-5 text-4xl justify-center group opacity-80 hover:opacity-100 border-4 border-dashed border-[var(--accent)] active:scale-95'>Add a new Limit<Plus className='scale-0 group-hover:scale-100 transition-all duration-300 ' size={45}/></button>
      </div>
       { (setLimitWindowOpen || editLimitWindowOpen) && 
       <div className = "fixed top-0 left-0 w-full h-full backdrop-blur bg-black/20 flex items-center justify-center z-50">

           <div className="bg-white rounded-2xl p-5 flex flex-col gap-6 dark:bg-[var(--sidebar)] dark:text-white relative min-w-100 max-w-lg">
            <button onClick={() => {  setSetLimitWindowOpen(false), setEditLimitWindowOpen(false); setSelectedCategory(''), setLimit(0);}} className='bg-red-500 text-white px-2 py-2 cursor-pointer active:bg-red-700 rounded-lg absolute top-2 right-2'><X/></button>
          {setLimitWindowOpen && <h2 className="text-2xl font-semibold pb-3">Set a new Limit</h2>}
           { editLimitWindowOpen && <h2 className="text-2xl font-semibold pb-3 mb-5">Edit Limits</h2>}
          <select name="category" id="category" value={selectedCategory} className='px-3 py-1 border border-gray-300 rounded-lg' onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option className='flex items-center gap-2' key={category.name} value={category.name}>{category.name}<p>{category.icon}</p></option>
            ))}
          </select>
          <div className='flex flex-col gap-2'>
            <label>{editLimitWindowOpen ? 'Enter a new' : 'Set'} Limit</label>
            <input name='limit' id='limit' type="number" placeholder='add a new limit' value={limit} onChange={(e) => setLimit(parseFloat(e.target.value) || 0)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/> </div>
            {selectedCategory &&  limit>0 && <p className='text-xl py-5 font-semibold'>Monthly limit of {selectedCategory}: {limit}</p>}
           {setLimitWindowOpen && <button onClick={setBudgets} className='btn px-4 py-2 rounded-lg'>Save</button>}
            {editLimitWindowOpen && <button onClick={editBudgets} className='btn px-4 py-2 rounded-lg'>Save</button>}
      </div>
      </div>}
      <div className="bg-white rounded-2xl row-span-1 p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-xl">
          <button onClick={() => {setEditLimitWindowOpen(true), setSetLimitWindowOpen(false)}} className='btn w-full h-full rounded-lg flex items-center flex-col text-4xl gap-5 justify-center group opacity-80 active:scale-95 border-4 border-dashed border-[var(--accent) hover:opacity-100'>Update Your Limits<Edit className='scale-0 group-hover:scale-100 transition-all duration-300 ' size={40}/></button>
      </div>
      <div className="bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-xl row-span-1">
        <h2 className="text-2xl font-semibold pb-3">Set your goals</h2>
        <div className='flex flex-col gap-3 '>
        <button onClick={() => {setGoalToSet('Long_term_savings'); setGoalWindowOpen(true)}} className='bg-amber-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Long term savings</button>
        <button onClick={() => {setGoalToSet('monthly_savings'); setGoalWindowOpen(true)}} className='bg-indigo-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Monthly savings</button>
        <button onClick={() => {setGoalToSet('Cut_down_spending'); setGoalWindowOpen(true)}} className='bg-green-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Cut down spending</button>
        <button onClick={() => {setGoalToSet('Increase_monthly_income'); setGoalWindowOpen(true)}} className='bg-cyan-500 px-4 py-2 rounded-lg cursor-pointer hover:opacity-80 active:scale-95'>Increase monthly income</button>
        </div>
      </div>
      {goalWindowOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur bg-black/20 flex items-center justify-center z-50">
          <form onSubmit={setGoals} className="bg-white rounded-2xl p-5 flex flex-col gap-6 dark:bg-[var(--sidebar)] dark:text-white relative min-w-100 max-w-lg">
            <button onClick={() => {setGoalToSet(''); setGoalWindowOpen(false)}} className='bg-red-500 text-white px-2 py-2 cursor-pointer rounded absolute top-2 right-2'><X/></button>
            <h2 className="text-2xl font-semibold pb-3">Set a new Goal</h2>
            {goalToSet && <p className='text-xl py-5 font-semibold'>{goalToSet.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>}
            <div className='flex flex-col gap-4'>
              <label>Enter your goal amount</label>
              <input required name='goalAmount' id='goalAmount' type="number" placeholder='add amount' value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            </div>
            {goalToSet === 'Long_term_savings' && 
            <div className='flex flex-col gap-4'>
              <label>Enter your target date</label>
              <input required name='goalDeadline' id='goalDeadline' type="date" placeholder='add a date' value={goalDeadline} onChange={(e) => setGoalDeadline(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            </div>
            }
            <input required name='goalTitle' id='goalTitle' type="text" placeholder='add a title for your goal' value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            {goalToSet === 'Cut_down_spending' &&
            <div className='flex flex-col gap-4'>
              <label>Choose Category</label><span className='text-sm text-gray-500'>your can only set one goal for each category!</span>
              <select required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'>
               <option value=''>Select a category</option>
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
      <div className='grid grid-cols-2 gap-4 grid-rows-[1fr_2fr] max-xl:grid-rows-2 max-[900px]:grid-cols-1 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-xl'>
      
      {monthlySavings.length > 0 ? <div className='bg-violet-500/25 rounded-lg p-5 text-violet-500 relative'>
      <button className='absolute top-5 right-5 text-xl flex gap-2 max-xl:flex-col max-sm:text-sm max-sm:right-2'><Edit onClick={() => {setGoalToSet('monthly_savings'); setEditGoalWindowOpen(true)}} className='cursor-pointer active:scale-95'/><Trash onClick={()=> deleteGoals(monthlySavings[0]?.id)} className='cursor-pointer active:scale-95'/></button>
      <h3 className='text-2xl font-semibold mb-5 max-xl:text-xl'>Your monthly savings goal</h3>
      <div className='flex items-center gap-5 max-xl:flex-col'>
       <div className='rounded bg-violet-100 p-5 flex flex-col gap-2 text-xl max-xl:text-lg max-xl:p-3'>
        <p className='font-semibold'>targeted amount: {currencySymbol} {monthlySavings[0]?.targetAmount}</p>
        <p>Current savings: {currencySymbol} {monthlySavings[0]?.currentAmount}</p>
        <p> {Math.ceil((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime() -
      new Date().getTime()
    ) / (1000 * 60 * 60 * 24)
  )}{' '}
  days left</p>
       </div>
       <div>
        <ProgressChart percentage={monthlySavings[0]?.percentage || 0} color='violet'/>
       </div>
        </div>
      </div> : <div className='bg-violet-500/25 rounded-lg p-5 flex flex-col items-center justify-center'>
      <p className='text-2xl font-semibold text-indigo-400'>You have not set a monthly savings goal yet!</p>
      <ClipboardList className='w-40 h-40 text-indigo-400'/>
      </div>}
      { monthlyIncome.length > 0 ? <div className='bg-cyan-500/25 rounded-lg p-5 relative'>
      <button className='absolute top-5 right-5 text-xl flex gap-2 text-cyan-500 max-xl:flex-col max-sm:text-sm max-sm:right-2'><Edit onClick={() => {setGoalToSet('monthly_income'); setEditGoalWindowOpen(true)}} className='cursor-pointer active:scale-95'/><Trash onClick={()=> deleteGoals(monthlyIncome[0]?.id)} className='cursor-pointer active:scale-95'/></button>
      <h3 className='text-2xl font-semibold mb-5 text-cyan-400 max-xl:text-xl'>Your monthly income goal</h3>
      <div className='flex items-center gap-5 max-xl:flex-col'>
        <div className='rounded flex flex-col text-xl items-center gap-2 bg-cyan-50 p-5 max-xl:text-lg max-xl:p-3'>
       <p className='font-semibold text-cyan-400'>Current income: {currencySymbol} {monthlyIncome[0]?.currentAmount}</p>
       <p className='font-semibold text-cyan-400'>Target income: {currencySymbol} {monthlyIncome[0]?.targetAmount}</p>
       <p className='font-semibold text-cyan-400 flex items-center'>Progress <ArrowBigRightDashIcon className='w-10 h-10 text-cyan-400'/></p>
       </div>
        {monthlyIncome[0]?.status === 'active' && <div><ProgressChart percentage={monthlyIncome[0]?.percentage || 0} color='cyan'/></div>}
        {monthlyIncome[0]?.status === 'completed' &&  <CheckCircle className='w-40 h-40 text-cyan-300'/>}
        </div>
      </div> : <div className='bg-cyan-500/25 rounded-lg p-5 flex flex-col items-center justify-center'>
      <p className='text-2xl font-semibold text-cyan-400'>You have not set a monthly income goal yet!</p>
      <ClipboardList className='w-40 h-40 text-cyan-400'/>
      </div>}
      {cutDownSpending.length > 0 ? <div className='bg-green-500/25 rounded-lg p-5'>
      <h3 className='text-2xl font-semibold mb-5 text-green-400 max-xl:text-xl'>Your cut down spending goal</h3>
      <div className='flex flex-col gap-5'>
      {cutDownSpending.map((item: any) => (
        <div className='flex items-center gap-5' key={item.id}>
          <div className={`rounded-lg ${item.percentage === 0 ? 'bg-red-100' : 'bg-green-100'} p-2 flex items-center gap-10 max-xl:gap-4 text-xl max-xl:text-lg max-xl:p-1 w-full relative`}>
            <p className={`font-semibold ${item.percentage === 0 ? 'text-red-700' : 'text-green-800'}`}>{item.category}</p>
            {item.percentage === 0 ? <p className='text-red-700 max-xl:text-sm'>Overspent - {item.currentAmount - item.targetAmount} {currencySymbol} </p>: <p className='text-green-800 max-xl:text-sm'>Saved - {item.percentage}%</p>}
            <div className={` h-full rounded-lg bg-green-500 absolute top-0 left-0 opacity-50`} style={{width: `${item.percentage}%`}}></div>
            <button className='absolute top-2 right-2 text-xl max-xl:text-sm flex items-center gap-1'><Edit  onClick={() => {setGoalToSet('cut_down_spending'); setSelectedCategory(item.category); setEditGoalWindowOpen(true)}} color='green' className='cursor-pointer active:scale-95 max-xl:w-5'/><Trash onClick={()=> deleteGoals(item.id)}  color='red' className='cursor-pointer active:scale-95 max-xl:w-5'/></button>
          </div>
        </div>
      ))
        
      }</div></div> : <div className='bg-green-500/25 rounded-lg p-5 flex flex-col items-center justify-center'>
      <p className='text-2xl font-semibold text-green-400'>You have not set a monthly spending goal yet!</p>
      <ClipboardList className='w-40 h-40 text-green-400'/>
      </div>}
      
      {longTermSavings.length > 0 ? <div className='bg-amber-500/25 rounded-lg p-5 text-xl text-orange-600 relative'>
      <button className='absolute top-4 right-4 text-xl flex gap-2 max-xl:flex-col max-sm:text-sm max-sm:right-2'><Edit onClick={() => {setGoalToSet('long_term_savings'); setEditGoalWindowOpen(true)}} className='cursor-pointer active:scale-95'/><Trash onClick={()=> deleteGoals(longTermSavings[0]?.id)} className='cursor-pointer active:scale-95'/></button>
       <h3 className='text-2xl font-semibold mb-5 max-xl:text-xl max-lg:mr-3'>Your long term savings goal</h3>
       <div className='flex flex-col items-center gap-5'>
        <div className='dark:bg-amber-100 p-5 rounded flex flex-col gap-2 items-center max-xl:text-lg max-xl:p-2'>
       <p className='font-semibold'>targeted amount: {currencySymbol} {longTermSavings[0]?.targetAmount}</p>
       <p>Current savings: {currencySymbol} {longTermSavings[0]?.currentAmount}</p>
       <p>Deadline: {longTermSavings[0]?.deadline.split('T')[0]}</p>
       <p>Days left: {Math.max(Math.ceil((new Date(longTermSavings[0]?.deadline).getTime() - new Date().getTime())/1000/60/60/24), 0)}</p>
       </div>
       <div className='bg-amber-100 flex flex-col items-center p-4 rounded'><p>Progress</p> 
       <ArrowBigDownDash size={40}/> </div>
       {longTermSavings[0]?.status === 'active' ? <div>
        <ProgressChart percentage={longTermSavings[0]?.percentage || 0} color='orange'/>
        </div> : longTermSavings[0]?.status === 'completed' ? <CheckCircleIcon className='w-40 h-40 text-amber-500'/> : <CircleAlertIcon className='w-30 h-30 text-red-500'/>}
      </div></div> :
      <div className='bg-amber-500/25 rounded-lg p-5 flex flex-col items-center justify-center'>
      <p className='text-2xl font-semibold text-orange-400'>You have not set a long-term savings goal yet!</p>
      <ClipboardList className='w-40 h-40 text-orange-400'/>
      </div>}
      </div>
      {editGoalWindowOpen && <div className="fixed top-0 left-0 w-full h-full backdrop-blur bg-black/20 flex items-center justify-center z-50">
      <form className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative min-w-130">
        <button onClick={() => {setGoalToSet(''); setSelectedCategory(''); setEditGoalWindowOpen(false)}} className='bg-red-500 text-white px-2 py-2 cursor-pointer rounded absolute top-2 right-2'><X/></button>
        <h2 className="text-2xl font-semibold mb-4">Edit {goalToSet.split('_').join(' ')}</h2>
        {selectedCategory && <div className="mb-4">Category: {selectedCategory} </div>}
        <div className="mb-4 flex flex-col gap-3">
          <label >Enter new title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter new title"
            value={goalTitle}
            onChange={(e: any) => setGoalTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <label className="block text-gray-600 dark:text-gray-400">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter new target amount"
            value={goalAmount}
            onChange={(e: any) => setGoalAmount(Number(e.target.value))}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          {goalToSet === 'long_term_savings' && <div>
          <label className="block text-gray-600 dark:text-gray-400">New Deadline:</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            required
            value={goalDeadline}
            onChange={(e: any) => setGoalDeadline(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          </div>}
        </div>
        <button onClick={(e) => {e.preventDefault(); handleGoalSubmit(goalToSet)}} className="bg-[var(--accent)] text-white px-4 cursor-pointer py-2 rounded hover:bg-[var(--accent)]/80">Submit</button>
      </form>
      </div>}
  </div>
  )
}

export default LimitsNgoals