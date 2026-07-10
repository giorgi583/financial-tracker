import { LayoutDashboard, ArrowLeftRight, Wallet, BarChart2Icon, Settings, HelpCircleIcon, Menu, Ellipsis, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  const [isdots, setIsdotsopen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {t} = useTranslation()
  return (
    <>
    <aside className='bg-[var(--sidebar)] dark:bg-[var(--dark-sidebar)] text-white dark:text-gray-950 max-w-80 min-w-70 max-xl:min-w-60 max-xl:p-6 p-8 hidden lg:flex min-h-screen flex-col justify-between'>
        <div className='flex flex-col justify-between h-11/12 fixed'>
        <div className='flex-col flex'>
        <h1 className='text-3xl font-bold tracking-wide'>MONIFY</h1>
        <div className='flex items-center'>
        <span className='text-xs text-indigo-200'>Track</span>
        <span className='mx-2 bg-indigo-200 w-0.5 h-3'></span>
        <span className='text-xs text-indigo-200'>Grow</span>
        <span className='mx-2 bg-indigo-200 w-0.5 h-3 '></span>
        <span className='text-xs text-indigo-200'>Secure</span>
        </div>
        </div>
        <div className='mt-10 flex flex-col gap-5 items-center'> 
            <NavLink to="/dashboard/overview" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><LayoutDashboard/> {t('dashboard')}</NavLink>
            <NavLink to="/dashboard/transactions" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><ArrowLeftRight/>{t('transactions')}</NavLink>
            <NavLink to="/dashboard/budget" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><Wallet/>{t('budget')}</NavLink>
            <NavLink to="/dashboard/analytics" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><BarChart2Icon/>{t('analytics')}</NavLink>
        </div>
        <div className='mt-10 flex flex-col gap-5 items-center flex-2 justify-end'>
            <NavLink to="/dashboard/help" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><HelpCircleIcon/>{t('help')}</NavLink>
            <NavLink to="/dashboard/settings" className={({isActive}) =>  `flex p-2 pr-10 gap-3 ${isActive ? 'bg-white/20' : ''} w-full rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><Settings/>{t('settings')}</NavLink>
        </div>
        </div>
    </aside>
    <aside className={`flex lg:hidden bg-[var(--sidebar)] dark:bg-[var(--dark-sidebar)] text-white p-3 max-md:rounded-lg max-md:fixed max-md:bottom-4 max-md:left-4 z-40 max-md:right-4 justify-between items-center md:flex-col md:sticky md:top-0  ${isMenuOpen ? 'md:w-80' : 'md:w-20'} md:h-screen md:pt-10 md:justify-around md:px-0 transition-all duration-300`}>

<div className={`hidden md:flex ${isMenuOpen ? 'absolute top-10 right-10' : ''}`} onClick={()=> setIsMenuOpen(!isMenuOpen)}>{ isMenuOpen ? <X/> : <Menu/>}</div>
<div className='flex gap-6 max-sm:gap-3 items-center justify-between w-full px-5 max-sm:px-2 md:flex-col md:gap-6 md:items-center'> 
            <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/overview" className={({isActive}) =>  `flex p-2 gap-3  ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><LayoutDashboard/>{isMenuOpen && 'Dashboard'}</NavLink>
            <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/transactions" className={({isActive}) =>  `flex p-2 gap-3 ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><ArrowLeftRight/>{isMenuOpen && 'My Transactions'}</NavLink>
            <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/budget" className={({isActive}) =>  `flex p-2 gap-3  ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><Wallet/>{isMenuOpen && 'Budget'}</NavLink>
            <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/analytics" className={({isActive}) =>  `flex p-2 gap-3 ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-lg items-center transition duration-300`}><BarChart2Icon/>{isMenuOpen && 'Analytics'}</NavLink>
            <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/help" className={({isActive}) =>  `flex max-md:hidden p-2 gap-3 ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-sm items-center transition duration-300`}><HelpCircleIcon/>{isMenuOpen && 'Help center'}</ NavLink>
                <NavLink onClick={()=> setIsMenuOpen(false)} to="/dashboard/settings" className={({isActive}) =>  `flex max-md:hidden p-2  ${isActive ? 'bg-white/20' : ''} rounded-xl hover:bg-white/20 cursor-pointer text-sm items-center transition duration-300`}><Settings/>{isMenuOpen && 'Settings'}</ NavLink>
        <div onClick={() => setIsdotsopen(!isdots)} className='md:align-bottom md:hidden'>
            <Ellipsis/>
        </div>
        {isdots && (
            <div className='flex flex-col items-center bg-slate-800 p-4 rounded-lg absolute bottom-16 right-0 max-w-35'>
                <NavLink onClick={()=> setIsdotsopen(false)} to="/dashboard/help" className='flex p-2 pr-10 gap-3 w-full rounded-xl hover:bg-white/20 cursor-pointer text-sm items-center transition duration-300'>Help</NavLink>
                <NavLink onClick={()=> setIsdotsopen(false)} to="/dashboard/settings" className='flex p-2 pr-10 gap-3 w-full rounded-xl hover:bg-white/20 cursor-pointer text-sm items-center transition duration-300'>Settings</NavLink>
            </div>
        )}
        
        </div>
    
    </aside>
        {isMenuOpen && <div className='fixed inset-0 bg-gray-950/70 z-30 w-full h-screen'></div>}
    </>
  )
}

export default Sidebar