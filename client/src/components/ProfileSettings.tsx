
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
const ProfileSettings = () => {
  const { t } = useTranslation()

  const [newName, setNewName] = useState('');

const apiUrl = import.meta.env.VITE_API_URL
  const handleupdateName = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!newName){
      toast.error('Please enter a name')
      return }
    try {
      const data = await fetch(`${apiUrl}/users/update-name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: newName,
        }),
      });
      const response = await data.json()
      if (!response.success) {
        console.log(response.message)
        throw new Error(response.message)
      }
      toast.success('Name updated successfully')
    } catch (error) {
      console.error('Error updating name:', error);
      toast.error(error as string)
    }

  }
  return (
    <div id='profile' className="p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto bg-slate-400/10 rounded-2xl">
        <h2 className="text-3xl font-semibold pb-3 mb-5">{t('UpdateProfile')}</h2>
        <form onSubmit={handleupdateName} className='flex gap-7 max-xl:gap-4 max-md:flex-col max-md:gap-8'>
          <div className='flex flex-col gap-6 max-md:w-full max-md:order-2'>
        <div className='flex gap-5 items-center'>
        <label htmlFor="name">{t('name')}:</label>
        <input  type="text" id="name" name="name" placeholder={t('updateYourName')} value={newName} onChange={(e) => setNewName(e.target.value)} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'  />
        </div>
        <button className='btn px-3 py-1 rounded-md cursor-pointer'>{t('saveChanges')}</button>
        
   </div>
        </form>
        </div>
  )
}

export default ProfileSettings