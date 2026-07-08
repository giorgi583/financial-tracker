import  { useState } from 'react'
import { Eye, NotebookPenIcon } from 'lucide-react'
import ProfileSettings from '../components/ProfileSettings'
import Prefferences from '../components/Prefferences'
import { useTranslation } from 'react-i18next'
import NotificationsSettings from '../components/NotificationsSettings'
import Security from '../components/Security'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
const Settings = () => {
  const loading = useSelector((state: any) => state.preference.loading);
  const { t} = useTranslation();
    
  return (
    <div className="p-10 max-sm:bp-10 max-sm:p-5 max-sm:pb-20">
      <h1 className="text-3xl font-bold max-sm:mt-7 max-sm:text-2xl">{t('settings')}</h1>
<div>
  <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm max-sm:grid max-sm:grid-cols-2">
        <a href={'#profile'} className={` btn rounded-md ring-2 ring-[var(--accent)] ring-offset-2 py-1 px-3  cursor-pointer font-semibold`}>{t('profile')}</a>
        <a href={'#prefferences'}  className={` btn ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold`}>{t('prefferences')}</a>
              <a href={'#security'}  className={` btn ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold`}>{t('security')}</a>
      </div>
      <div className='mt-15 flex flex-col gap-10'>
       <ProfileSettings />
       <Prefferences />
       <Security />
      </div>
</div>
    </div>
  )
}

export default Settings