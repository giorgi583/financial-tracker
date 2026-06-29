import AreaChart from "../components/AreaChart"
import ContentOfDashboard from "../components/ContentOfDashboard"
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context";
import { startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subYears } from 'date-fns';
type Period =
  | 'this_month'
  | 'last_month'
  | 'last_3_months'
  | 'this_year'
  | 'last_year'
  | 'all_time';
const Overview = () => {
  const { t } = useTranslation()
const { user } = useAuth();
const [selectedPeriod, setSelectedPeriod] = useState<Period>('all_time');
const [data, setData] = useState<object>({});
async function getOverview() {
  const dateRange: { from: Date | null; to: Date | null } = getDateRange(selectedPeriod);
  try {
    const response = await fetch(`http://localhost:3200/api/dashboard/overview?from=${dateRange.from}&to=${dateRange.to}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    setData(data);
    console.log(data);
  } catch (error: any) {
    console.error(error);
  }
}
function getDateRange(preset: string) {
  const now = new Date();
  switch (preset) {
    case 'this_month':
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case 'last_month':
      const last = subMonths(now, 1);
      return { from: startOfMonth(last), to: endOfMonth(last) };
    case 'last_3_months':
      return { from: startOfMonth(subMonths(now, 3)), to: endOfMonth(now) };
    case 'this_year':
      return { from: startOfYear(now), to: endOfYear(now) };
    case 'last_year':
      const lastYear = subYears(now, 1);
      return { from: startOfYear(lastYear), to: endOfYear(lastYear) };
    case 'all_time':
      return { from: null, to: null }; 
    default:
      return { from: null, to: null };
  }
}
 useEffect(() => {
   getOverview();
 }, [selectedPeriod]);
  return (
    <div className="flex flex-col gap-8 w-full p-8">
    <h1 className="text-3xl font-bold max-sm:mt-7">{user.username}{t('financialOverview')}</h1>
    <form className="flex gap-2 max-md:flex-col max-w-100 items-center">
      <label >Select Period: </label>
      <select defaultValue={'all_time'} onChange={(e) => setSelectedPeriod(e.target.value as Period)} className="border border-gray-300 rounded-lg px-3 py-1">
     <option value="this_month">this month</option>
     <option value="last_month">last month</option>
     <option value="last_3_months">last 3 months</option>
     <option value="this_year">this year</option>
     <option value="last_year">last year</option>
     <option value="all_time">all time</option>
      </select>
      <button type="submit" className="btn rounded-md py-1 px-3 cursor-pointer">Apply</button>
      </form>
  { data &&  <div className="grid grid-cols-3 grid-rows-5 w-full gap-4 h-full max-sm:grid-cols-1 max-sm:grid-rows-14">
<ContentOfDashboard title="Current balance"  className="col-span-1 row-span-1 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Totals"  className="col-span-1 row-span-1 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Spending by category" className="col-span-1 row-span-2 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Expense dynamics trend" className="col-span-2 row-span-2 max-sm:col-span-1 max-sm:row-span-3 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Top categories" className="col-span-1 row-span-3 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Recent Transactions" className="col-span-1 row-span-2 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Largest expense" className="col-span-1 row-span-2 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white" data={data} period={selectedPeriod}/>
    </div>
}
    </div>
  )
}

export default Overview