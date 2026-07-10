import React from 'react'
import { Send } from "lucide-react"
import { useAuth } from '../Context';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
const Chat = ({active}: {active: Boolean}) => {
const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(name && email && message) {
      console.log(name, email, message)
      toast.success('Message sent successfully')
    } else {
      toast.error('Please fill all the fields')
    }
  }
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const { user } = useAuth();
  return (
    <div className={`fixed bottom-35 right-5 p-10 rounded-2xl bg-white dark:bg-[var(--dark-sidebar)] text-gray-950 dark:text-white w-80 min-h-96 shadow-lg z-20 ${active ? 'flex' : 'hidden'} peer-focus:flex flex-col`}>
        <h1 className='text-2xl font-bold mb-2'>{t('hello')}, {user.username}!</h1>
        <h2 className='text-2xl font-semibold mb-4'>{t('chatWithUs')}</h2>
      <p className='text-gray-500 dark:text-gray-300 text-sm mb-5'>{t('chatText')}</p>
        <div className='flex flex-col gap-3'>
            <input id='text' name='text' type="text" placeholder='Your name' onChange={(e) => setName(e.target.value) } value={name} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            < input id='email' name='email' type="email" placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'/>
            <textarea placeholder='Your message' onChange={(e) => setMessage(e.target.value)} value={message} className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] h-24 resize-none'/>
            <button onClick={handleSubmit} type='submit' className='btn px-4 py-2 rounded-lgtransition flex gap-7 items-center'>{t('sendMessage')} <Send size={19}/></button>
    </div>
    </div>
  )
}

export default Chat