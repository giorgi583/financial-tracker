import  { useState } from 'react'
import { NotebookPenIcon } from 'lucide-react'
const Settings = () => {
  const [setcion, setSetcion] = useState<string>('Profile')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showUploadButton, setShowUploadButton] = useState(false)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }
  return (
    <div className="p-10 max-sm:bp-10">
      <h1 className="text-3xl font-bold max-sm:mt-7 max-sm:text-2xl">Settings</h1>
<div>
  <div className="flex gap-2 items-center mt-4 border border-gray-300 rounded-lg p-1 max-w-fit shadow-sm">
        <button onClick={() => setSetcion('Profile')} className={`${setcion === 'Profile' ? 'bg-linear-to-r from-blue-50 to-blue-100 rounded-md ring-2 ring-blue-500 ring-offset-2 py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Profile</button>
        <button onClick={() => setSetcion('Prefferences')} className={`${setcion === 'Prefferences' ? 'bg-linear-to-r from-blue-50 to-blue-100 ring-2 ring-blue-500 ring-offset-2 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Prefferences</button>
        <button onClick={() => setSetcion('notifications')} className={`${setcion === 'notifications' ? 'bg-linear-to-r from-blue-50 to-blue-100 ring-2 ring-blue-500 ring-offset-2 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Notifications</button>
              <button onClick={() => setSetcion('security')} className={`${setcion === 'security' ? 'bg-linear-to-r from-blue-50 to-blue-100 ring-2 ring-blue-500 ring-offset-2 rounded-md py-1 px-3 text-slate-700 cursor-pointer font-semibold' : 'rounded-md py-1 px-3 text-slate-700 cursor-pointer bg-linear-to-r from-blue-50 to-blue-100'}`}>Security</button>
      </div>
      {setcion === 'Profile' && <div className="p-10">
        <h2 className="text-2xl font-semibold pb-3">Update Profile</h2>
        <form className='flex gap-7'>
          <div className='flex flex-col gap-4'>
        <div className='flex gap-3 items-center'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        </div>
        <div className='flex gap-3 items-center'>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        </div>
        <div className='flex gap-3 items-center'> 
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        </div>
        <div className='flex gap-3 items-center'>
        <label htmlFor="password">Confirm Password:</label>
        <input type="password" id="password" name="password" />
        </div>
   </div>
        <div className='w-50 h-50 bg-gray-400 flex items-center justify-center rounded-full text-8xl text-white relative'>{selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Profile" className='w-full h-full object-cover rounded-full' /> : 'JS'}
          <button onClick={(e) => { e.preventDefault(); setShowUploadButton(!showUploadButton)}} className='absolute bottom-0 right-0 cursor-pointer text-lg text-gray-950 flex bg-slate-100  items-center gap-1 border border-gray-300 rounded-lg py-1 px-3'>Edit <NotebookPenIcon color='black'/></button>
          <label htmlFor="fileInput" className={`text-lg absolute -bottom-10 px-3 py-1 right-0 text-gray-950 border-2 border-gray-300 rounded-md bg-slate-200 cursor-pointer ${showUploadButton ? 'block' : 'hidden'}`}>Upload</label>
          <input type="file" accept="image/*" className='hidden' id="fileInput" onChange={handleFileChange} />
        </div>
        </form>
        </div>}
      {setcion === 'Prefferences' && <div>Prefferences</div>}
      {setcion === 'notifications' && <div>Notifications</div>}
      {setcion === 'security' && <div>Security</div>}
</div>
    </div>
  )
}

export default Settings