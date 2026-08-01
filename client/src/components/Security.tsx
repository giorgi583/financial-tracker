import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
const Security = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const updatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
     const response = await fetch(`${apiUrl}/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      const data = await response.json()
      if (!data.success) {
        console.log(data.message)
        throw new Error(data.message)
      }
      toast.success('Password updated successfully')
    }
    catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error updating password')
    }
  }
    const { t } = useTranslation()
      const [changePassword, setChangePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div id='security' className='flex flex-col gap-6 mt-4 max-sm:gap-4 p-8 max-sm:p-4 bg-slate-400/10 rounded-2xl'>
        <h2 className='text-3xl font-bold max-md:text-2xl max-sm:text-xl'>{t('security')}</h2>
        <button onClick={(e) => {e.preventDefault(); setChangePassword(true)}} className='btn px-3 py-1 rounded-md cursor-pointer self-start'>{t('updatePassword')}</button>
        {changePassword && <div className='flex flex-col gap-4 relative'>
            <button className='absolute -top-13 right-10' onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}>
        {showPassword ? <EyeOff className='cursor-pointer hover:scale-110 transition-transform duration-500 ' /> : <Eye className='cursor-pointer hover:scale-110 transition-transform duration-500 ' /> }</button>
          <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'> 
        <label htmlFor="password">{t('oldPassword')}</label>
        <input id='oldpassword' name='password' type={showPassword ? 'text' : 'password'} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={t('oldPassword')}/>
        </div>
          <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'> 
        <label htmlFor="password">{t('newPassword')}</label>
        <input id='newpassword' name='password' type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={t('newPassword')}/>
       
        </div>
        <div className='flex gap-3 items-center max-sm:flex-col max-sm:items-start'>
        <label htmlFor="password">{t('confirmPassword')}</label>
        <input id='confirmpassword' name='password' type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('confirmPassword')}/>
       
        </div> <button onClick={(e) => {e.preventDefault(); updatePassword()}} className='btn px-3 py-1 rounded-md cursor-pointer self-start'>{t('saveChanges')}</button> </div>}
    </div>
  )
}

export default Security