import React, { useState } from 'react'
import { Lock, EyeIcon, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ResetPass = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const token = new URLSearchParams(window.location.search).get('token');
    const navigate = useNavigate();
    const handlePasswordChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           const response = await fetch('http://localhost:3400/api/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            })

            const data = await response.json();
            toast.success(data.message);
            navigate('/login');
        } catch (error: any) {
            toast.error('Something went wrong');
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen gap-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Reset your password</h1>
      <form onSubmit={handlePasswordChange} className="mt-4 flex flex-col gap-4">
       <div className='relative w-full'><Lock className='size-4 text-gray-500 absolute top-3 left-3' /><input value={password} onChange={(e)=> setPassword(e.target.value)} type= {showPassword ? "text" : "password"} placeholder="new password" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pl-9" />{!showPassword ? <EyeIcon className='cursor-pointer size-5 text-gray-500 absolute top-3 right-3' onClick={() => setShowPassword(!showPassword)} /> : <EyeOff className='cursor-pointer size-5 text-gray-500 absolute top-3 right-3' onClick={() => setShowPassword(!showPassword)} />}</div> 
        <div className='relative w-full'><Lock className='size-4 text-gray-500 absolute top-3 left-3' /><input value={password} onChange={(e)=> setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="confirm password" className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pl-9" />{!showPassword ? <EyeIcon className='cursor-pointer size-5 text-gray-500 absolute top-3 right-3' onClick={() => setShowPassword(!showPassword)} /> : <EyeOff className='cursor-pointer size-5 text-gray-500 absolute top-3 right-3' onClick={() => setShowPassword(!showPassword)} />}</div> 
        <button type="submit" className="btn mt-4 px-4 py-2 rounded-lg">Reset Password</button>
      </form>
      </div>
    </div>
  )
}

export default ResetPass