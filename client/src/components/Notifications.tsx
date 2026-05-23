import { Settings } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Notifications = () => {
    const navigate = useNavigate()
  return (
    <div className='p-3 absolute bg-white w-100 h-130 top-10 right-0 max-sm:w-[300px] max-sm:-right-40 rounded-lg shadow-lg overflow-scroll scrollbar-none z-10'>
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Notifications</h1>
        <Settings onClick={() => {navigate('/dashboard/settings')}} size={20}/>
</div>
<div className='flex flex-col gap-3'>
    <h2 className='text-xl font-semibold'>Today</h2>
    <div className='flex flex-col gap-2'>
<div className='rounded bg-gray-100 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae, possimus soluta aliquid facilis perspiciatis.</div>
<div className='rounded bg-gray-100 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae, possimus soluta aliquid facilis perspiciatis.</div>
    </div>
    <h2 className='text-xl font-semibold'>Earlier</h2>
    <div className='flex flex-col gap-2'>
<div className='rounded bg-gray-100 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae, possimus soluta aliquid facilis perspiciatis.</div>
<div className='rounded bg-gray-100 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae, possimus soluta aliquid facilis perspiciatis.</div>
<div className='rounded bg-gray-100 p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vitae, possimus soluta aliquid facilis perspiciatis.</div>
    </div>
</div>
    </div>
  )
}

export default Notifications