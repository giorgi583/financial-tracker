import {Eye, EyeOff, NotebookPenIcon} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../Context'
const ProfileSettings = () => {
  const { t } = useTranslation()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
const { user } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }
  return (
    <div className="p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto">
        <h2 className="text-2xl font-semibold pb-3">{t('UpdateProfile')}</h2>
        <form className='flex gap-7 max-xl:gap-4 max-md:flex-col max-md:gap-8'>
          <div className='flex flex-col gap-4 max-md:w-full max-md:order-2'>
        <div className='flex gap-3 items-center'>
        <label htmlFor="name">{t('name')}:</label>
        <input type="text" id="name" name="name" placeholder={t('updateYourName')}/>
        </div>
        <div className='flex gap-3 items-start'>
        <label htmlFor="bio">{t('bio')}:</label>
        <textarea id="bio" name="email" rows={3} cols={30} placeholder={t('updateYourBio')}/>
        </div>
        <button className='btn px-3 py-1 rounded-md cursor-pointer'>{t('saveChanges')}</button>
        
   </div>
        </form>
        </div>
  )
}

export default ProfileSettings