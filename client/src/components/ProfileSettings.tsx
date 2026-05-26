import {Eye, EyeOff, NotebookPenIcon} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const ProfileSettings = () => {
  const { t } = useTranslation()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
        <button onClick={(e) => {e.preventDefault(); setChangePassword(true)}} className='px-3 py-1 rounded-md cursor-pointer self-start'>{t('updatePassword')}</button>
        {changePassword && <div className='flex flex-col gap-4 relative'>
            <button className='absolute -top-10 right-10' onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}>
        {showPassword ? <EyeOff className='cursor-pointer hover:scale-110 transition-transform duration-500 ' /> : <Eye className='cursor-pointer hover:scale-110 transition-transform duration-500 ' /> }</button>
          <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'> 
        <label htmlFor="password">{t('oldPassword')}</label>
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder={t('oldPassword')}/>
        </div>
          <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'> 
        <label htmlFor="password">{t('newPassword')}</label>
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder={t('newPassword')}/>
       
        </div>
        <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'>
        <label htmlFor="password">{t('confirmPassword')}</label>
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder={t('confirmPassword')}/>
        
        </div> </div>}
   </div>
        <div className='flex flex-col gap-10 max-md:order-1 max-md:flex-row max-md:items-start max-md:w-full'>
          <div className='w-50 h-50 bg-gray-400 flex items-center justify-center rounded-full text-8xl text-white relative max-lg:w-30 max-lg:h-30 max-lg:text-5xl'>{selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Profile" className='w-full h-full object-cover rounded-full' /> : 'JS'}
          <button onClick={(e) => { e.preventDefault(); setShowUploadButton(!showUploadButton)}} className='absolute bottom-0 right-0 cursor-pointer text-lg text-gray-950 flex  items-center gap-1 border border-gray-300 rounded-lg py-1 px-3'>{t('edit')}<NotebookPenIcon color='black'/></button>
          <label htmlFor="fileInput" className={`text-lg absolute -bottom-10 px-3 py-1 right-0 text-gray-950 border-2 border-gray-300 rounded-md cursor-pointer ${showUploadButton ? 'block' : 'hidden'} hover:scale-105 transition-transform duration-500`}>Upload</label>
          <input type="file" accept="image/*" className='hidden' id="fileInput" onChange={handleFileChange} />
        </div>
        <button className='px-3 py-1 rounded-md cursor-pointer'>{t('saveChanges')}</button>
        </div>
        </form>
        </div>
  )
}

export default ProfileSettings