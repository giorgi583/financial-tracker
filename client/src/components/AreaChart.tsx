import React from 'react'
import { Area, AreaChart as AreaCHART, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
const data = [
    { name: 'Page 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page 3', uv: 1400, pv: 2400, amt: 2400 },
          { name: 'Page 4', uv: 5300, pv: 1398, amt: 1210 },
          { name: 'Page 5', uv: 3200, pv: 7800, amt: 2290 },
          { name: 'Page 6', uv: 1278, pv: 3908, amt: 3000 },
          { name: 'Page 7', uv: 4189, pv: 4800, amt: 2181 },
          { name: 'Page 8', uv: 2390, pv: 3800, amt: 2500 },
          { name: 'Page 9', uv: 3490, pv: 4300, amt: 2100 }, 
]
const AreaChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-5 pb-10">
        <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>Spending by Category</h4>
    <ResponsiveContainer width="100%" height="100%">
      <AreaCHART
        width={100}
      height={100}
      data={data}
    >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d"  />
         <Area type="monotone" dataKey="amt" stroke="#ffc658" fill="#ffc658"  />
    </AreaCHART>
    </ResponsiveContainer>
    </div>
  )
}

export default AreaChart