import {MailIcon, LockIcon, UserIcon, Eye, EyeOff} from 'lucide-react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (newUser.password !== newUser.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Registration successful! Please log in.');
                setNewUser({ username: '', email: '', password: '', confirmPassword: '' });
                navigate('/login');
            } else {
                console.log(data.message);
                setError(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration. Please try again later.');
        }
                }
    function getPasswordStrength(password: string): void {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score < 2) setPasswordStrength("Weak");
  else if (score < 4) setPasswordStrength("Medium");
  else setPasswordStrength("Strong");
}
  return (
    <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Create Account</h2>
            <div tabIndex={0} className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <UserIcon size={16}/>
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="text" placeholder="Username" required minLength={3} maxLength={20} value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />
            </div>
            <div tabIndex={0} className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <MailIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type="email" placeholder="Email" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
            </div>
            <div tabIndex={0} className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition" >
                <LockIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type={showPassword ? "text" : "password"} placeholder="Password" minLength={6} maxLength={50} required value={newUser.password} onChange={(e) => {setNewUser({...newUser, password: e.target.value}); getPasswordStrength(e.target.value)}} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none cursor-pointer mr-2">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {passwordStrength && newUser.password && (
                <div className='w-full h-1.5 bg-gray-200 rounded-full'>
                    <div className={`${passwordStrength === "Weak" ? "w-1/3" : passwordStrength === "Medium" ? "w-2/3" : "w-full"} h-full rounded-full ${passwordStrength === "Weak" ? "bg-red-500" : passwordStrength === "Medium" ? "bg-yellow-500" : "bg-green-500"} transition-all duration-400 ease-in-out`}></div>
                </div>
            )}
            {passwordStrength && newUser.password && (
                <span className={`text-xs font-medium ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{passwordStrength}</span>
            )}
            <div tabIndex={0} className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-indigo-500/70 transition">
                <LockIcon size={16} />
                <input className="w-full outline-none bg-transparent py-2.5 border-0" type={showPassword ? "text" : "password"} placeholder="Confirm Password" minLength={6} maxLength={50} required value={newUser.confirmPassword} onChange={(e) => {setNewUser({...newUser, confirmPassword: e.target.value})}} />
                <button type="button"  onClick={() => setShowPassword(!showPassword)} className="focus:outline-none cursor-pointer mr-2">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 cursor-pointer transition py-2.5 rounded text-white font-medium">Create Account</button>
            <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
        </form>
        </div>
  ) 
}

export default Register