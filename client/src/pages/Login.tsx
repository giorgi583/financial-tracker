import {MailIcon, LockIcon, Eye, EyeOff} from 'lucide-react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context';
import { toast } from 'react-hot-toast';
const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const {refetch} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(user.rememberMe);
    console.log(apiUrl);
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const email = user.email;
        const password = user.password;
        const rememberMe = user.rememberMe;
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                toast.success('Login successful! Welcome back.');
                setUser({ email: '', password: '', rememberMe: false });
                await refetch();
                navigate('/dashboard');
            } else {
                console.log(data.message);
                setError(data.message);
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError(err instanceof Error ? err.message : 'An error occurred during login. Please try again later.');
        } }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
    <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Welcome Back</h2>
            <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <MailIcon size={16}/>
                <input id="email" className="w-full outline-none bg-transparent py-2.5 border-0" type="email" placeholder="Email" name="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
            </div>
            <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <LockIcon size={16} />
                <input id="password" className="w-full outline-none bg-transparent py-2.5 border-0" type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required />
                <button type="button" className='cursor-pointer mr-2' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                    <input name="checkbox"  id="checkbox" type="checkbox" checked={user.rememberMe} onChange={(e) => setUser({...user, rememberMe: e.target.checked})} />
                    <label htmlFor="checkbox">Remember me</label>
                </div>
                <Link className="text-blue-600 underline" to="/forgot-password">Forgot Password</Link>
            </div>
            <button type="submit" className="w-full cursor-pointer mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium">Log In</button>
            <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-500 underline">Signup</Link></p>
        </form>
    </div>
  )
}

export default Login