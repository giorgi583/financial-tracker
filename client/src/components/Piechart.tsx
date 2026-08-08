
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF19AF", "#19FFAF", "#FF19D3", "#19D3FF", "#D3FF19", "#FFD319", "#D319FF", "#FFD319"];
const Piechart = ({data}: {data: any}) => {
    console.log(data);
  return (
    <>
     <div className="mt-1"> { data &&
   <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={90}
        >
          {data?.map((entry: any, index: number) => (
            <Cell
              key={entry.category}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer> }
    </div>
    </>
  )
}

export default Piechart