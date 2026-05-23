import React from 'react'
import { useTranslation } from 'react-i18next'
const NotificationsSettings = () => {
  const { t } = useTranslation()
  const [notifchecked, setnotifChecked] = React.useState<{email: boolean, weekly: boolean, budget: boolean, bill: boolean}>({email: false, weekly: false, budget: false, bill: false})
  return (
    <div className='p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto'>
      <h2 className='text-3xl font-semibold pt-3 pb-3'>Notifications Settings</h2>
      <button className='px-3 py-1 rounded-2xl bg-blue-500 cursor-pointer text-white mb-4'>{t('saveChanges')}</button>
      <hr />
<div className='p-5 flex items-center justify-between'>
  <h3 className='text-2xl font-semibold pt-5 pb-3'>Email notifications</h3>
  <div onClick={() =>setnotifChecked(prev => ({...prev, email: !prev.email}))} className={`relative rounded-2xl w-11 h-5.5 cursor-pointer ${notifchecked.email ? 'bg-green-700' : 'bg-gray-500'}`}><div className={`absolute top-0.5 ${notifchecked.email ? 'right-0.5' : 'left-0.5'} rounded-full w-4.5 h-4.5 bg-white z-10`}></div></div>
</div>
<div className='p-5 flex items-center justify-between'>
  <h3 className='text-2xl font-semibold pt-5 pb-3'>Weekly reports</h3>
  <div onClick={() =>setnotifChecked(prev => ({...prev, weekly: !prev.weekly}))} className={`relative rounded-2xl w-11 h-5.5 cursor-pointer ${notifchecked.weekly ? 'bg-green-700' : 'bg-gray-500'}`}><div className={`absolute top-0.5 ${notifchecked.weekly ? 'right-0.5' : 'left-0.5'} rounded-full w-4.5 h-4.5 bg-white z-10`}></div></div>
</div>
<div className='p-5 flex items-center justify-between'>
  <h3 className='text-2xl font-semibold pt-5 pb-3'>Budget alerts</h3>
  <div onClick={() =>setnotifChecked(prev => ({...prev, budget: !prev.budget}))} className={`relative rounded-2xl w-11 h-5.5 cursor-pointer ${notifchecked.budget ? 'bg-green-700' : 'bg-gray-500'}`}><div className={`absolute top-0.5 ${notifchecked.budget ? 'right-0.5' : 'left-0.5'} rounded-full w-4.5 h-4.5 bg-white z-10`}></div></div>
</div>
<div className='p-5 flex items-center justify-between'>
  <h3 className='text-2xl font-semibold pt-5 pb-3'>Bill remainders</h3>
  <div onClick={() =>setnotifChecked(prev => ({...prev, bill: !prev.bill}))} className={`relative rounded-2xl w-11 h-5.5 cursor-pointer ${notifchecked.bill ? 'bg-green-700' : 'bg-gray-500'}`}><div className={`absolute top-0.5 ${notifchecked.bill ? 'right-0.5' : 'left-0.5'} rounded-full w-4.5 h-4.5 bg-white z-10`}></div></div>
</div>
    </div>
  )
}

export default NotificationsSettings