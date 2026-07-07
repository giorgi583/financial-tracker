import React from 'react'
import { Bar, BarChart as BarCHART, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
const BarChart = ({data, granularity}: {data: any, granularity: string}) => {

   
  let chartData;
  if(data?.length > 0) {
   chartData = Object.values(
  data?.reduce((acc : any, item: any) => {
    const period = new Date(item.date).toLocaleDateString("en-US", 
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
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
  );
  }
  console.log(data, chartData, granularity);
  return (
   chartData && <div >
    <ResponsiveContainer width="100%" height={400}>
    <BarCHART data={chartData}>
  <XAxis dataKey="period" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Legend />
  <Tooltip />
  <Bar dataKey="amount" fill="var(--accent)" />
</BarCHART>
</ResponsiveContainer>
</div>
  )
}

export default BarChart