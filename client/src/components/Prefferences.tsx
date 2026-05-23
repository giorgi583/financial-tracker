import React from 'react'
import { Check, SunIcon, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Prefferences = ({settheme, theme}: {settheme: React.Dispatch<React.SetStateAction<{mode: string, color: string}>>, theme: {mode: string, color: string}}) => {
const { t, i18n } = useTranslation();
const [lang, setLang] = React.useState<string>('en');
  return (
    <div className='p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto'>
        <div className='flex justify-between items-center max-sm:flex-col max-sm:gap-5 max-sm:items-start'>
        <h2 className='text-3xl font-semibold'>{t('prefferences')}</h2>
         <button className='px-3 py-1 rounded-2xl bg-blue-500 cursor-pointer text-white'>{t('saveChanges')}</button> </div>
        <div className='pt-10 flex flex-col'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5'>{t('appearance')}</h3>
            <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>{t('theme')} { theme.mode === 'dark' ? <Moon /> : <SunIcon />}</h4>
            <hr />
            <div className='pt-5 '>
                <p onClick={() => settheme(prev => ({...prev, mode: 'light'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 cursor-pointer rounded-2xl'>{t('light')} {theme.mode === 'light' &&  <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, mode: 'dark'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 cursor-pointer rounded-2xl'>{t('dark')} {theme.mode === 'dark' &&  <Check />}</p>
            </div>
            <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>{t('accentColor')}</h4>
            <hr />
            <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${theme.mode === 'dark' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => settheme(prev => ({...prev, color: 'sky'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300  rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-950'></span>{theme.mode === 'light' && theme.color === 'sky' && <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, color: 'red'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300  rounded-2xl'><span className='w-6 h-6 rounded-full bg-red-950'></span>{theme.mode === 'light' && theme.color === 'red' && <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, color: 'green'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300  rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-950'></span>{theme.mode === 'light' && theme.color === 'green' && <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, color: 'violet'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300  rounded-2xl'><span className='w-6 h-6 rounded-full bg-violet-950'></span>{theme.mode === 'light' && theme.color === 'violet' && <Check />}</p>
            </div>
             <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${theme.mode === 'light' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => settheme(prev => ({...prev, color: 'sky'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-500'></span>{theme.mode === 'dark' && theme.color === 'sky' && <Check />}  </p>
                <p onClick={() => settheme(prev => ({...prev, color: 'red'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 rounded-2xl'><span className='w-6 h-6 rounded-full bg-amber-600'></span>{theme.mode === 'dark' && theme.color === 'red' && <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, color: 'green'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-600'></span>{theme.mode === 'dark' && theme.color === 'green' && <Check />}</p>
                <p onClick={() => settheme(prev => ({...prev, color: 'violet'}))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 rounded-2xl'><span className='w-6 h-6 rounded-full bg-indigo-500'></span>{theme.mode === 'dark' && theme.color === 'violet' && <Check />}</p>
            </div>
        </div>
        <div className='pt-10'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5'>{t('language')}</h3>
            <hr />
            <div className='pt-5 '>
                <button onClick={() => {i18n.changeLanguage('en'); setLang('en')}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 cursor-pointer rounded-2xl'>English {lang === 'en' &&  <Check />}</button>
                <button onClick={() => {i18n.changeLanguage('ka'); setLang('ka')}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300 cursor-pointer rounded-2xl'>ქართული {lang === 'ka' &&  <Check />}</button>
            </div>
        </div>
       
    </div>
  )
}

export default Prefferences