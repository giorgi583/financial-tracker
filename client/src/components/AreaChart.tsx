import React from 'react'
import { Area, AreaChart as AreaCHART, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const AreaChart = ({data, currencySign}: {data: any, currencySign: string}) => {
  console.log(data?.granularity);
  const formatOptions: any = {
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
  if(data?.trend?.length > 0) {
   chartData = Object.values(
  data.trend.reduce((acc : any, item: any) => {
    const period = new Date(item.period).toLocaleDateString("en-US", 
    formatOptions[data.granularity]
    );

    if (!acc[period]) {
      acc[period] = {
        period,
        income: 0,
        expense: 0,
      };
    }

    acc[period][item.type] = item.amount;

  
    return acc;
  }, {})
);   console.log(chartData)}
  return (
    chartData && 
    <div className="w-full h-full bg-white dark:bg-[var(--sidebar)] mt-10 ">
    <ResponsiveContainer width="100%" height={400}>
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
      <Area type="monotone" dataKey="expense" stroke="var(--accent)" fill="var(--accent)"  />
    </AreaCHART>
    </ResponsiveContainer>
    </div>
  )
}

export default AreaChart