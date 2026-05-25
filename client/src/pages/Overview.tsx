import AreaChart from "../components/AreaChart"
import ContentOfDashboard from "../components/ContentOfDashboard"


const Overview = () => {
  return (
    <div className="flex flex-col gap-8 w-full p-8">
    <h1 className="text-3xl font-bold max-sm:mt-7">John's Financial Overview</h1>
    <div className="grid grid-cols-3 grid-rows-5 w-full gap-4 h-full max-sm:grid-cols-1 max-sm:grid-rows-14">
<ContentOfDashboard title="Total Income"  type="income" className="col-span-1 row-span-1 bg-white rounded-2xl p-5 " />
<ContentOfDashboard title="Total Expenses"  type="expenses" className="col-span-1 row-span-1 bg-white rounded-2xl p-5" />
<ContentOfDashboard title="Budget Progress" type="Budget Progress" className="col-span-1 row-span-2 bg-white rounded-2xl p-5" />
<ContentOfDashboard title="Expense dynamics" type="spendingbycategory" className="col-span-2 row-span-2 max-sm:col-span-1 max-sm:row-span-3 bg-white rounded-2xl p-5" />
<ContentOfDashboard title="Income vs Expenses" type="incomevsexpenses" className="col-span-1 row-span-3 bg-white rounded-2xl p-5" />
<ContentOfDashboard title="Recent Transactions" type="recenttransactions" className="col-span-1 row-span-2 bg-white rounded-2xl p-5" />
<div className="row-span-2">
  <AreaChart />
</div>
    </div>
    </div>
  )
}

export default Overview