
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../Context"
import { startOfMonth, endOfMonth, parse, format, startOfWeek, endOfWeek, isBefore } from 'date-fns';
import {toast} from 'react-hot-toast'
import Reports from "../components/Reports";
const Analytics = () => {
  const { t } = useTranslation()
  const { user } = useAuth();
  
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState<string>('')
  const [day, setDay] = React.useState<string>('')
  const [week, setWeek] = React.useState<string>('')
  const [spendingByCategory, setSpendingByCategory] = React.useState<any>([])
  const [category, setCategory] = React.useState<string>('Food')
  const [reportsGenerated, setReportsGenerated] = React.useState<boolean>(false)
  const [trendByCategory, setTrendByCategory] = React.useState<any>([])
  const [incomeByCategory, setIncomeByCategory] = React.useState<any>([])
  const [trend, setTrend] = React.useState<any>([])
  const [topSpendingDays, setTopSpendingDays] = React.useState<any>([])
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")
  const [period, setPeriod] = React.useState("")
  const today = new Date();
  const apiUrl = import.meta.env.VITE_API_URL
const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const maxMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
const maxWeek = format(new Date(), "RRRR-'W'II");
 
    const getDataRange = (period: string) => {
      switch (period) {
        case "year": 
        return {from: new Date(year, 0, 1), to: new Date(year, 11, 31)};

        case "month": 
        const date = parse(month, 'yyyy-MM', new Date());
        return {from: startOfMonth(date), to: endOfMonth(date)};

        case "week": 
        const weekDate = parse(week, "RRRR-'W'II", new Date());
        return {from: startOfWeek(weekDate, {weekStartsOn: 1}), to: endOfWeek(weekDate, {weekStartsOn: 1})};  
        
        case "day":
        return {from: new Date(day), to: new Date(day)};

        case "custom":
        return {from: new Date(from), to: new Date(to)}

        default: 
        return {from: new Date(), to: new Date()};
      }
    }
  const retrieveData = () => {
    const {from, to} = getDataRange(period)
    if (isBefore(to, from)) {
     return toast.error('Error: To date is before from date');
    }
    try {
      getSpendingByCategory(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"));
      getIncomeByCategory(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"));
      getTrend(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"));
      getTrendByCategory(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"), category);
      getTopSpendingDays(format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd"));
      toast.success('Data retrieved successfully');
      setReportsGenerated(true);
    }
    catch (error) {
      toast.error('Error retrieving data');
    } 
  }
  const getSpendingByCategory = async (from: string, to: string) => {
    try {
      const response = await fetch(`${apiUrl}/analytics/spending-by-category?from=${from}&to=${to}`, {
        method: "GET",
        credentials: "include",
         headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      console.log(data.data);
      setSpendingByCategory(data.data);
    }
    catch (error) {
      console.log(error);
    }
  }
const getIncomeByCategory = async (from: string, to: string) => {
  try {
    const response = await fetch(`${apiUrl}/analytics/income-by-category?from=${from}&to=${to}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data.data);
    setIncomeByCategory(data.data);
  }
  catch (error) {
    console.log(error);
  }
}
const getTrend = async (from: string, to: string) => {
  try {
    const response = await fetch(`${apiUrl}/analytics/trend?from=${from}&to=${to}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data.data);
    setTrend(data.data);
  }
  catch (error) {
    console.log(error);
  }
}
 const getTrendByCategory = async (from: string, to: string, category: string) => {
  try {
    const response = await fetch(`${apiUrl}/analytics/trend-by-category?category=${category}&from=${from}&to=${to}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data.data);
    setTrendByCategory(data.data);
  }
  catch (error) {
    console.log(error);
  }
 }
 const getTopSpendingDays = async (from: string, to: string) => {
   try {
     const response = await fetch(`${apiUrl}/analytics/top-spending-days?from=${from}&to=${to}`, {
       method: "GET",
       credentials: "include",
       headers: {
         "Content-Type": "application/json"
       },
     });
     const data = await response.json();
     console.log(data.data);
     setTopSpendingDays(data.data);
   }
   catch (error) {
     console.log(error);
   }
 }
  console.log(day, week, month, year, from, to, period)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 max-sm:mt-8">{user.username}{t('yourAnalytics')}</h1>
      <select onChange={(e) => setPeriod(e.target.value)} className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
        <option value="">Select period</option>
        <option value="year">Year</option>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
        <option value="custom">Custom</option>
        </select>
       {( (period === "year" && year) || ( period === "month" && month) || (period === "week" && week) || (period === "day" && day) || ((from && to) && period === "custom")) ? <button onClick={retrieveData} className="btn ml-5 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-lg:text-sm">
                Generate reports
        </button> : <span className="ml-5 text-xl ">Please select a period to generate reports</span>}
       {period === "month" &&  <div className="p-3 my-2 flex flex-col gap-2 items-start"><label>Select Month:</label><input max={maxMonth} onChange={(e) => setMonth(String(e.target.value))} value={month} type='month' className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"  /></div>}
       {period === "week" &&  <div className="p-3 my-2 flex flex-col gap-2 items-start"><label>Select Week:</label><input max={maxWeek} onChange={(e) => setWeek(String(e.target.value))} value={week} type='week' className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"  /></div>}
       {period === "day" &&  <div className="p-3 my-2 flex flex-col gap-2 items-start"><label>Select Day:</label><input max={maxDate} onChange={(e) => setDay(String(e.target.value))} value={day} type='date' className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"  /></div>}
       {period === 'year' && <div className="p-3 my-2 flex flex-col gap-2 items-start">Select Year:<select
  value={year}
  onChange={(e) => setYear(Number(e.target.value))}
>
  {Array.from({ length: 17 }, (_, i) => 2010 + i).map((y) => (
    <option key={y} value={y}>
      {y}
    </option>
  ))}
</select></div>}
{period === 'custom' && <div className="p-3 my-2 flex gap-2 items-center">
  <label>From</label><input max={maxDate} onChange={(e) => setFrom(String(e.target.value))} value={from} type='date' className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"  />
  <label>To</label><input max={maxDate} onChange={(e) => setTo(String(e.target.value))} value={to} type='date' className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"  />
</div>}
      <p className="text-gray-600 dark:text-gray-400 mt-5">This is the analytics page. Here you can view various metrics and insights about your finances. You can search for all the financial reports here.</p>
     
  { reportsGenerated ? <div> <Reports spendingByCategory={spendingByCategory} setCategory={setCategory} incomeByCategory={incomeByCategory} trend={trend} topSpendingDays={topSpendingDays} trendByCategory={trendByCategory}/> </div> : 
  <div className="text-gray-400 dark:text-gray-300 mt-5 text-4xl flex flex-col items-center justify-center h-100 font-semibold">No reports to show! :( </div>
  }
    </div>
  )
}

export default Analytics