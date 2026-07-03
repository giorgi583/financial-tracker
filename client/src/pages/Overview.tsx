import AreaChart from "../components/AreaChart"
import ContentOfDashboard from "../components/ContentOfDashboard"
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context";
import { startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, subYears } from 'date-fns';
import { Calendar1, Check, LoaderCircle } from "lucide-react";
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
const [loading, setLoading] = useState(true);
const [data, setData] = useState<object>({});
const dateRange: { from: Date | null; to: Date | null } = getDateRange(selectedPeriod);
const apiUrl = import.meta.env.VITE_API_URL;
async function getOverview() {
  setLoading(true);
  try {
    const response = await fetch(`${apiUrl}/dashboard/overview?from=${dateRange.from}&to=${dateRange.to}`, {
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
  finally {
    setLoading(false);
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
 }, []);
  return (
    <div className="flex flex-col gap-8 w-full p-8 max-md:py-23 max-md:p-5 max-[400px]:p-3">
    <h1 className="text-3xl font-bold max-sm:mt-7">{user.username}{t('financialOverview')}</h1>
    <form onSubmit={(e) => {e.preventDefault(); getOverview()}} className="flex gap-2  max-w-200 items-center max-md:flex-col max-md:items-start max-md:gap-3">
      <label >Select Period: </label>
      <select defaultValue={'all_time'} onChange={(e) => setSelectedPeriod(e.target.value as Period)} className="border cursor-pointer border-gray-300 rounded-lg px-3 py-1">
     <option value="this_month">this month</option>
     <option value="last_month">last month</option>
     <option value="last_3_months">last 3 months</option>
     <option value="this_year">this year</option>
     <option value="last_year">last year</option>
     <option value="all_time">all time</option>
      </select>
      <button type="submit" className="btn rounded-md py-1 px-3 cursor-pointe flex items-center gap-2">{loading ? <LoaderCircle className="animate-spin size-5 font-bold" /> : ''}Apply</button>
      { dateRange.from && dateRange.to && <div className="flex items-center gap-2 bg-gray-600/30 rounded-full px-3 py-1"><Check size={16} /> <p className="text-lg whitespace-nowrap flex items-center gap-3"><Calendar1 size={16} />{dateRange.from?.toLocaleDateString("en-US",{day: 'numeric', month: 'short', year: 'numeric'})} - {dateRange.to?.toLocaleDateString("en-US",{day: 'numeric', month: 'short', year: 'numeric'})}</p> </div>}
      </form>
  { data &&  <div className="grid grid-cols-3 grid-rows-4 w-full gap-4 max-xl:grid-cols-2 max-xl:grid-rows-6 max-sm:grid-cols-1 max-sm:grid-rows-9 " >
<ContentOfDashboard title="Current balance"  className="col-span-1 row-span-1 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Totals"  className="col-span-1 row-span-1 bg-white max-xl:order-2 rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Spending by category" className="col-span-1 row-span-2 bg-white rounded-2xl max-sm:order-3 p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Expense dynamics trend" className="col-span-2 row-span-2 max-xl:order-4 max-sm:col-span-1 max-sm:row-span-1 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] shadow-lg dark:text-white" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Recent Transactions" className="col-span-1 row-span-2 max-xl:order-5 bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Top categories" className="col-span-1 row-span-1 bg-white rounded-2xl max-xl:order-6 p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
<ContentOfDashboard title="Largest expense" className="col-span-1 row-span-1 bg-white rounded-2xl max-xl:order-7 p-5 dark:bg-[var(--sidebar)] dark:text-white shadow-lg" data={data} period={selectedPeriod}/>
    </div>
}
    </div>
  )
}

export default Overview