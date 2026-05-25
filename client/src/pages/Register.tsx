import {MailIcon, LockIcon, UserIcon} from 'lucide-react'
import {Link} from 'react-router-dom'
const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <form className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Create Account</h2>
            <div tabIndex={0} className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <UserIcon size={16}/>
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="text" placeholder="Username" required />
            </div>
            <div tabIndex={0} className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <MailIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="email" placeholder="Email" required />
            </div>
            <div tabIndex={0} className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition" >
                <LockIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="password" placeholder="Password" required />
            </div>
            <div tabIndex={0} className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <LockIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium">Create Account</button>
            <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
        </form>
        </div>
  ) 
}

export default Register