import React, {useEffect} from 'react'
import { Area, AreaChart as AreaCHART, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const AreaChart2 = ({data, granularity}: {data: any, granularity: string}) => {



  console.log(data);
  const formatOptions: any = {
    hour: {
      day: "numeric",
      hour: "numeric",
    },
  day: {
    month: "short",
    day: "numeric",
  },
  week: {
    month: "short",
    day: "numeric",
  },
  month: {
    month: "short",
    year: "2-digit",
  },
};
  let chartData;
  if(data?.length > 0) {
   chartData = Object.values(
  data.reduce((acc : any, item: any) => {
    const period = new Date(item.period).toLocaleDateString("en-US", 
    formatOptions[granularity]
    );

    if (!acc[period]) {
      acc[period] = {
        period,
        amount: 0,
      };
    }

    acc[period].amount = item.amount;

  
    return acc;
  }, {})
);   console.log(chartData)}
  return (
    chartData && 
    <div className="w-full h-full bg-white dark:bg-[var(--sidebar)] mt-10 ">
    <ResponsiveContainer width="100%" height={300}>
      <AreaCHART
        width={300}
      height={400}
      data={chartData}
    >
        <XAxis dataKey="period" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
      <Area type="monotone" dataKey="amount" stroke="var(--accent)" fill="var(--accent)"  />
    </AreaCHART>
    </ResponsiveContainer>
    </div>
  )
}

export default AreaChart2