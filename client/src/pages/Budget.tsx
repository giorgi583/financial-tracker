import React, { useEffect, useCallback } from 'react'
import Alerts from '../components/Alerts'
import BudgetReview from '../components/BudgetReview'
import LimitsNgoals from '../components/LimitsNgoals'
import { Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../Context'
import Loader from '../components/Loader'
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
const Budget = () => {
  const { t } = useTranslation()
  const [budget, setBudget] = React.useState<budget[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('')
  const [selectedMonth, setSelectedMonth] = React.useState<string>('');
  const [setcion, setSetcion] = React.useState<string>('overview');
  const [goals, setGoals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currency, setCurrency] = React.useState<string>('');
  const { user } = useAuth();

  const getGoals = useCallback( async () => {
    try {
      const response = await fetch(`${apiUrl}/goals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log('Fetched goals:', data.data);
      setGoals(data.data);
    }
    catch (error) {
      console.error('Error fetching goals:', error);
    }
    finally {
      setLoading(false);
    }
  }, [])
  const getBudgets = useCallback( async () => {
    try {
      const response = await fetch(`${apiUrl}/budgets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setBudget(data.data);
      console.log('Fetched budgets:', data.data);
      setCurrency(data.currency);
    }
    catch (error) {
      console.error('Error fetching budgets:', error);
    }
    finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getBudgets();
  }, [getBudgets]);
   useEffect(() => {
    getGoals();
  }, [getGoals]);

  if(loading) return <Loader />
  return (
    <div className="p-8 w-full max-md:p-5 max-sm:p-2 max-sm:mt-10 max-sm:pb-25">
      <h1 className="font-bold text-4xl max-sm:mt-8">{user.username}{t('yourBudget')}</h1>
      <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm">
        <button onClick={() => setSetcion('overview')} className={`${setcion === 'overview' ? 'btn rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3 text-slate-700 cursor-pointer '}`}>Overview</button>
        <button onClick={() => setSetcion('limits')} className={`${setcion === 'limits' ? ' btn rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3 text-slate-700 cursor-pointer '}`}>Limits & Goals</button>
        <button onClick={() => setSetcion('alerts')} className={`${setcion === 'alerts' ? ' btn rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3 text-slate-700 cursor-pointer'}`}>Alerts</button>
      </div>
      {setcion === 'overview' && <BudgetReview budget={budget} onBudgetUpdated={getBudgets} currency={currency} />}
      {setcion === 'limits' && <LimitsNgoals  onBudgetUpdated={getBudgets} onGoalsUpdated={getGoals} currency={currency} goals={goals}/>}
      {setcion === 'alerts' && <Alerts />}
    </div>
  )
}

export default Budget