import { ClipboardList } from "lucide-react"

const ContentOfDashboard = ({title, className, data}: {title: string, data?: any, type?: string, className?: string}) => {
  return (
    <div className={className}>
      { data ? <><h2>{title}</h2>
      <p>{data}</p> </> : <p className="text-gray-300 text-2xl flex flex-col items-center justify-center h-full"><ClipboardList  size={50}/> No data available!</p>}
    </div>
  )
}

export default ContentOfDashboard