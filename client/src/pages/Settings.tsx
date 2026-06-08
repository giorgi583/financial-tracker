import  { useState } from 'react'
import { Eye, NotebookPenIcon } from 'lucide-react'
import ProfileSettings from '../components/ProfileSettings'
import Prefferences from '../components/Prefferences'
import { useTranslation } from 'react-i18next'
import NotificationsSettings from '../components/NotificationsSettings'
import Security from '../components/Security'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
const Settings = () => {
  const loading = useSelector((state: any) => state.preference.loading);
  const [setcion, setSetcion] = useState<string>('Profile')
  const { t} = useTranslation();
    
  return (
    <div className="p-10 max-sm:bp-10 max-sm:p-5 max-sm:pb-20">
      <h1 className="text-3xl font-bold max-sm:mt-7 max-sm:text-2xl">{t('settings')}</h1>
<div>
  <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm max-sm:grid max-sm:grid-cols-2">
        <button onClick={() => setSetcion('Profile')} className={`${setcion === 'Profile' ? 'btn rounded-md ring-2 ring-[var(--accent)] ring-offset-2 py-1 px-3  cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3 cursor-pointer'}`}>{t('profile')}</button>
        <button onClick={() => setSetcion('Prefferences')} className={`${setcion === 'Prefferences' ? 'btn ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3  cursor-pointer'}`}>{t('prefferences')}</button>
        <button onClick={() => setSetcion('notifications')} className={`${setcion === 'notifications' ? 'btn ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3 cursor-pointer'}`}>{t('notifications')}</button>
              <button onClick={() => setSetcion('security')} className={`${setcion === 'security' ? 'btn ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'btn rounded-md py-1 px-3  cursor-pointer'}`}>{t('security')}</button>
      </div>
      {setcion === 'Profile' && (loading ? <Loader /> : <ProfileSettings />)}
      {setcion === 'Prefferences' && <Prefferences />}
      {setcion === 'notifications' && <NotificationsSettings />}
      {setcion === 'security' && <Security />}
</div>
    </div>
  )
}

export default Settings