import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;
const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const handleReset = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            fetch(`${apiUrl}/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message);
                });
            toast.success('Password reset link sent successfully');
        } catch (error: any) {
            console.error(error);
            toast.error('Something went wrong');
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen gap-4 bg-blue-100">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Request password reset</h1>
        <p>Please enter the email address registered to your account and check your inbox.</p>
        <form onSubmit={handleReset} className="mt-4 flex flex-col">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg">Request Reset link</button>
        </form>
        </div>
    </div>
  )
}

export default ForgotPass