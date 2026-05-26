import React from 'react'
import { Send } from "lucide-react"
const Chat = ({active}: {active: boolean}) => {
  return (
    <div className={`fixed bottom-35 right-5 p-10 rounded-2xl bg-[var(--light-mainbg)] dark:bg-[var(--mainbg)] text-gray-950 dark:text-white w-80 min-h-96 shadow-lg z-20 ${active ? 'flex' : 'hidden'} peer-focus:flex flex-col`}>
        <h2 className='text-2xl font-semibold'>Chat with us</h2>
        <p className='text-gray-500 text-sm mb-5'>Our support team is here to help you with any questions or issues you may have. Feel free to reach out to us!</p>
        <div className='flex flex-col gap-3'>
            <input type="text" placeholder='Your name' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            <input type="email" placeholder='Your email' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            <textarea placeholder='Your message' className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] h-24 resize-none'/>
            <button className='px-4 py-2 rounded-lgtransition flex gap-7 items-center'>Send Message <Send size={19}/></button>
    </div>
    </div>
  )
}

export default Chat