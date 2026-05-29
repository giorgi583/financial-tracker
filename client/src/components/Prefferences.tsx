import React, { useEffect } from 'react'
import { Check, SunIcon, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setColor, setLang, setCurrency } from '../slices/PreferenceSlice';
const Prefferences = () => {
const { t, i18n } = useTranslation();

const dispatch = useDispatch();
const theme = useSelector((state: any) => state.preference.theme);
const color = useSelector((state: any) => state.preference.color);
const lang = useSelector((state: any) => state.preference.lang);
const currency = useSelector((state: any) => state.preference.currency);

const saveChanges = () => {
    localStorage.setItem('mode', theme);
    localStorage.setItem('color', color);
    localStorage.setItem('language', lang);
    localStorage.setItem('currency', currency);
    alert('Changes saved successfully!')
}
useEffect(() => {
  document.documentElement.classList.remove(
    "theme-green",
    "theme-purple",
    "theme-red"
  );

  if (color !== "blue") {
    document.documentElement.classList.add(`theme-${color}`);
  }
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme, color]);
  return (
    <div className='p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto'>
        <div className='flex justify-between items-center max-sm:flex-col max-sm:gap-5 max-sm:items-start'>
        <h2 className='text-3xl font-semibold'>{t('prefferences')}</h2>
         <button onClick={saveChanges} className='btn px-3 py-1 rounded-2xl '>{t('saveChanges')}</button> </div>
        <div className='pt-10 flex flex-col'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5'>{t('appearance')}</h3>
            <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>{t('theme')} { theme === 'dark' ? <Moon /> : <SunIcon />}</h4>
            <hr />
            <div className='pt-5 '>
                <p onClick={() => dispatch(setTheme('light'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>{t('light')} {theme === 'light' &&  <Check />}</p>
                <p onClick={() => dispatch(setTheme('dark'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>{t('dark')} {theme === 'dark' &&  <Check />}</p>
            </div>
            <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>{t('accentColor')}<p>{color}</p></h4>
            <hr />
            <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${theme === 'dark' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => dispatch(setColor('blue'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-950'></span>{theme === 'light' && color === 'blue' && <Check />}</p>
                <p onClick={() => dispatch(setColor('red'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-red-950'></span>{theme === 'light' && color === 'red' && <Check />}</p>
                <p onClick={() => dispatch(setColor('green'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-900'></span>{theme === 'light' && color === 'green' && <Check />}</p>
                <p onClick={() => dispatch(setColor('purple'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-violet-950'></span>{theme === 'light' && color === 'purple' && <Check />}</p>
            </div>
             <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${theme === 'light' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => dispatch(setColor('blue'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-500'></span>{theme === 'dark' && color === 'blue' && <Check />}  </p>
                <p onClick={() => dispatch(setColor('red'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-amber-600'></span>{theme === 'dark' && color === 'red' && <Check />}</p>
                <p onClick={() => dispatch(setColor('green'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-600'></span>{theme === 'dark' && color === 'green' && <Check />}</p>
                <p onClick={() => dispatch(setColor('purple'))} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-indigo-500'></span>{theme === 'dark' && color === 'purple' && <Check />}</p>
            </div>
        </div>
        <div className='pt-10'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5'>{t('language')}</h3>
            <hr />
            <div className='pt-5 '>
                <p onClick={() => {i18n.changeLanguage('en'); dispatch(setLang('en'));}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>English {lang === 'en' &&  <Check />}</p>
                <p onClick={() => {i18n.changeLanguage('ka'); dispatch(setLang('ka'));}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>ქართული {lang === 'ka' &&  <Check />}</p>
            </div>
        </div>
       <div className='pt-10'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5'>Set Currency <p>(current: {currency})</p></h3>
            <hr />
           <select value={currency} onChange={(e) => dispatch(setCurrency(e.target.value))} className='mt-5 p-3 rounded-2xl bg-gray-200/50 w-full max-w-xs'>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GEL">GEL</option>
            </select>
        </div>
    </div>
  )
}

export default Prefferences