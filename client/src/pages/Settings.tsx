import  { useState } from 'react'
import { Eye, NotebookPenIcon } from 'lucide-react'
import ProfileSettings from '../components/ProfileSettings'
import Prefferences from '../components/Prefferences'
import { useTranslation } from 'react-i18next'
import NotificationsSettings from '../components/NotificationsSettings'
const Settings = ({settTheme, theme}: {settTheme: React.Dispatch<React.SetStateAction<{mode: string, color: string}>>, theme: {mode: string, color: string}}) => {
  const [setcion, setSetcion] = useState<string>('Profile')
  const { t} = useTranslation();
    
  return (
    <div className="p-10 max-sm:bp-10 max-sm:p-5 max-sm:pb-20">
      <h1 className="text-3xl font-bold max-sm:mt-7 max-sm:text-2xl">{t('settings')}</h1>
<div>
  <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm max-sm:grid max-sm:grid-cols-2">
        <button onClick={() => setSetcion('Profile')} className={`${setcion === 'Profile' ? ' rounded-md ring-2 ring-[var(--accent)] ring-offset-2 py-1 px-3  cursor-pointer font-semibold' : 'rounded-md py-1 px-3 cursor-pointer'}`}>{t('profile')}</button>
        <button onClick={() => setSetcion('Prefferences')} className={`${setcion === 'Prefferences' ? ' ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'rounded-md py-1 px-3  cursor-pointer'}`}>{t('prefferences')}</button>
        <button onClick={() => setSetcion('notifications')} className={`${setcion === 'notifications' ? ' ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'rounded-md py-1 px-3 cursor-pointer'}`}>{t('notifications')}</button>
              <button onClick={() => setSetcion('security')} className={`${setcion === 'security' ? ' ring-2 ring-[var(--accent)] ring-offset-2 rounded-md py-1 px-3  cursor-pointer font-semibold' : 'rounded-md py-1 px-3  cursor-pointer'}`}>{t('security')}</button>
      </div>
      {setcion === 'Profile' && <ProfileSettings />}
      {setcion === 'Prefferences' && <Prefferences settheme={settTheme} theme={theme}/>}
      {setcion === 'notifications' && <NotificationsSettings />}
      {setcion === 'security' && <div>Security</div>}
</div>
    </div>
  )
}

export default Settings