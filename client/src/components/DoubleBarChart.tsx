import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const DoubleBarChart = ({data, granularity}: {data: any, granularity: string}) => {

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
   chartData = 
  data?.map((item: any) => {
    const period = new Date(item.period).toLocaleDateString("en-US", 
    formatOptions[granularity]
    );
    return {...item, period};
    
    })
  console.log(chartData)}
  return (
    <div>
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="period" />
  <YAxis />
  <Tooltip />
  <Legend />

  <Bar dataKey="income" fill="var(--accent)" />
  <Bar dataKey="expense" fill="#ef4444" />
</BarChart>
</ResponsiveContainer>
    </div>
  )
}

export default DoubleBarChart