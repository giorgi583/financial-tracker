import React, { useEffect } from 'react'
import Loader from './Loader';
import { FaBatteryEmpty, FaExclamationCircle } from 'react-icons/fa';
import { ChevronDown, ClipboardEdit, ClipboardListIcon } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL
const Alerts = () => {
const [loading, setLoading] = React.useState<boolean>(true);
const [openAlerts, setOpenAlerts] = React.useState<boolean>(false);
const [openWarnings, setOpenWarnings] = React.useState<boolean>(false);
const [openInfo, setOpenInfo] = React.useState<boolean>(false);
const [alerts, setAlerts] = React.useState<any[]>([]);
  const getAlerts = async () => {
    try {
      const response = await fetch(`${apiUrl}/goals/alerts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setAlerts(data.data);
      console.log(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
      }
      useEffect(() => {
        getAlerts();
      }, []);

  return (
    <div className="p-5 grid grid-cols-1 gap-4 mt-5 w-full max-md:grid-cols-1">
        <div className='bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white overflow-hidden'>
        <h2 className="text-2xl font-semibold pb-3 flex items-center gap-4">Alerts <FaExclamationCircle color='red'/><ChevronDown className={`transition-all cursor-pointer duration-300 ${openAlerts ? 'rotate-180' : 'rotate-0'}`} onClick={() => setOpenAlerts(!openAlerts)}/></h2>
        <div className={`flex flex-col gap-4 rounded-lg border-2 border-red-500 p-5 ${openAlerts ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'}  transition-all duration-300 ease-in-out`}>
        {alerts.filter((alert: any) => alert.severity === 'danger').length > 0 ? alerts.filter((alert: any) => alert.severity === 'danger').map((alert: any) => (
          <div key={alert.id} className="flex flex-col border-2 border-red-500 p-4 rounded-lg bg-red-200 text-red-700">
            <h3 className="text-lg font-semibold">{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        )) : (
          <div className="flex flex-col p-4 items-center justify-center gap-6 text-gray-500 text-3xl">
            <p>No information</p>
            <ClipboardListIcon size={50}/>
          </div>
        )}
        </div>
      </div>
      <div className='bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white overflow-hidden'>
    <h2 className="text-2xl font-semibold pb-3 flex items-center gap-4">Warnings <FaExclamationCircle color='orange'/> <ChevronDown className={`transition-all cursor-pointer duration-300 ${openWarnings ? 'rotate-180' : 'rotate-0'}`} onClick={() => setOpenWarnings(!openWarnings)}/></h2>
    <div className={`flex flex-col gap-4 rounded-lg border-2 border-yellow-500 p-5 ${openWarnings ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'}  transition-all duration-300 ease-in-out`}>
        {alerts.filter((alert: any) => alert.severity === 'warning').length > 0 ? alerts.filter((alert: any) => alert.severity === 'warning').map((alert: any) => (
          <div key={alert.id} className="flex flex-col border-2 border-yellow-500 p-4 rounded-lg bg-yellow-200 text-yellow-700">
            <h3 className="text-lg font-semibold">{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        )) : (
          <div className="flex flex-col p-4 items-center justify-center gap-6 text-gray-500 text-3xl">
            <p>No information</p>
            <ClipboardListIcon size={50}/>
          </div>
        )}  
      </div>
      </div>
      <div className='bg-white rounded-2xl p-5 dark:bg-[var(--sidebar)] dark:text-white overflow-hidden'>
    <h2 className="text-2xl font-semibold pb-3 flex items-center gap-4">Information <FaExclamationCircle color='var(--accent)'/><ChevronDown className={`transition-all cursor-pointer duration-300 ${openInfo ? 'rotate-180' : 'rotate-0'}`} onClick={() => setOpenInfo(!openInfo)}/></h2>
    <div className={`flex flex-col gap-4 rounded-lg border-2 border-[var(--accent)] p-5 ${openInfo ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'}  transition-all duration-300 ease-in-out`}>
        {alerts.filter((alert: any) => alert.severity === 'info').length > 0 ? alerts.filter((alert: any) => alert.severity === 'info').map((alert: any) => (
          <div key={alert.id} className="flex flex-col border-2 border-[var(--accent)] p-4 rounded-lg bg-[var(--accent] text-[var(--sidebar)]">
            <h3 className="text-lg font-semibold">{alert.title}</h3>
            <p>{alert.message}</p>
          </div> 
        ) ) : (
          <div className="flex flex-col p-4 items-center justify-center gap-6 text-gray-500 text-3xl">
            <p>No information</p>
            <ClipboardListIcon size={50}/>
          </div>
        )}  
      </div>
    </div>
    </div>
  )
}

export default Alerts