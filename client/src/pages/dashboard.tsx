import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { Bell, ChevronDown, LogOutIcon, MessageSquare, MessageSquareMoreIcon } from "lucide-react"
import { useState } from "react"

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathnames = location.pathname.split('/').filter(x => x)
  const currentPage = pathnames[pathnames.length - 1]
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  return (
    <div className="flex bg-slate-200 min-h-screen">
      <Sidebar />
        <div className="flex items-center justify-between gap-8 max-md:gap-4 absolute top-4 right-8">
      <div className="flex items-center justify-end relative hover:bg-gray-200/50 p-2 rounded-full transition cursor-pointer">
<Bell size={25} className=" text-gray-800 cursor-pointer" />
<div className="rounded-full w-3 h-3 bg-red-600 absolute text-[8px] text-white flex items-center justify-center top-1 right-1">2</div>
      </div>
<div className="flex items-center gap-4">
  <div onClick={()=> setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-10 h-10 bg-gray-500 text-cyan-50 text-xl rounded-full flex items-center cursor-pointer justify-center">JS</div>
  <div className="flex flex-col"><p className="font-semibold">John Smith</p> <p className="text-sm flex items-center gap-1">{currentPage}<ChevronDown onClick={()=> setIsProfileMenuOpen(!isProfileMenuOpen)} size={15} className="cursor-pointer"/></p></div>
</div>
{isProfileMenuOpen && (
  <div className="absolute -bottom-55 right-0 bg-white p-2 rounded-lg shadow-lg w-40 flex flex-col items-start gap-3">
    <p className=" w-full p-2 hover:bg-gray-200 rounded-b-md cursor-pointer">Profile</p>
    <p className=" w-full p-2 hover:bg-gray-200 rounded-b-md cursor-pointer">Settings</p>
    <p className="p-2 hover:bg-gray-200 rounded-md cursor-pointer w-full" >Help</p>
  <p className="p-2 hover:bg-gray-200 rounded-md cursor-pointer w-full flex items-center gap-5" onClick={()=> navigate('/')}>Logout <LogOutIcon size={17} /></p>
</div>)}
      </div>
      <Outlet />
      <div className="rounded-full p-5 bg-slate-500 fixed bottom-10 right-10 max-md:hidden cursor-pointer"><MessageSquareMoreIcon
      size={40} fill="white" className="cursor-pointer hover:scale-110 transition-transform duration-500 animate-bounce [animation-iteration-count:3]"/></div>
      </div>
    
  )
}

export default Dashboard