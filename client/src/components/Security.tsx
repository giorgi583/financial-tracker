import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
const Security = () => {
    const { t } = useTranslation()
      const [changePassword, setChangePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='flex flex-col gap-6 mt-4 max-sm:gap-4 p-8'>
        <button onClick={(e) => {e.preventDefault(); setChangePassword(true)}} className='btn px-3 py-1 rounded-md cursor-pointer self-start'>{t('updatePassword')}</button>
        {changePassword && <div className='flex flex-col gap-4 relative'>
            <button className='absolute -top-13 right-10' onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}>
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
       
        </div> <button className='btn px-3 py-1 rounded-md cursor-pointer self-start'>{t('saveChanges')}</button> </div>}
    </div>
  )
}

export default Security