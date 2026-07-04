import React from 'react'
import { RadialBarChart, PolarAngleAxis, RadialBar } from "recharts";

const ProgressChart = ({percentage, color}: {percentage: number, color: string}) => {
  return (
    <RadialBarChart
      width={200}
      height={200}
      cx="50%"
      cy="50%"
      innerRadius="70%"
      outerRadius="100%"
      barSize={15}
      data={[{value: Math.min(percentage, 100)}]}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis
        type="number"
        domain={[0, 100]}
        angleAxisId={0}
        tick={false}
      />
      <RadialBar
        dataKey="value"
        background 
        cornerRadius={10}
        fill={percentage > 100 ? "#ef4444" : color}
      />
      <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-3xl font-bold fill-current ${percentage > 100 ? "text-red-500" : color} `}
        >
            {Math.round(percentage)}%
        </text>
    </RadialBarChart>
  )
}

export default ProgressChart