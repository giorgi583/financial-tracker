import { useEffect, useState } from 'react'
import { Check, SunIcon, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setColor, setLang, setCurrency, updateUserPrefferences, setInitialBalance } from '../slices/PreferenceSlice';

import {toast}  from 'react-hot-toast'
const Prefferences = () => {
const { t, i18n } = useTranslation();

const dispatch = useDispatch();
const theme = useSelector((state: any) => state.preference.theme);
const color = useSelector((state: any) => state.preference.color);
const lang = useSelector((state: any) => state.preference.lang);
const currency = useSelector((state: any) => state.preference.currency);
const initialBalance = useSelector((state: any) => state.preference.initialBalance);

const [selectedTheme, setSelectedTheme] = useState(theme);
const [selectedColor, setSelectedColor] = useState(color);
const [selectedLang, setSelectedLang] = useState(lang);
const [selectedCurrency, setSelectedCurrency] = useState(currency);
const [initialBalanceValue, setInitialBalanceValue] = useState(initialBalance);
const saveChanges = () => {
  console.log('Saving:', { selectedTheme, selectedColor, selectedLang, selectedCurrency });
  // update Redux
    dispatch(setTheme(selectedTheme));
    dispatch(setColor(selectedColor));
    dispatch(setLang(selectedLang));
    dispatch(setCurrency(selectedCurrency));
    dispatch(setInitialBalance(initialBalanceValue));

    // save to server with local state values, not Redux
    dispatch(updateUserPrefferences({
        theme: selectedTheme,
        color: selectedColor,
        lang: selectedLang,
        currency: selectedCurrency,
        initialBalance: initialBalanceValue
    }) as any)
    .then((result: any) => {
        console.log('Server response:', result);
    });
    toast.success('Changes saved');
  }

useEffect(() => {
  document.documentElement.classList.remove(
    "theme-green",
    "theme-purple",
    "theme-red"
  );

  if (selectedColor !== "blue") {
    document.documentElement.classList.add(`theme-${selectedColor}`);
  }
  if (selectedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [selectedTheme, selectedColor]);
  return (
    <div id='prefferences' className='p-10 max-sm:pt-10 max-sm:pb-20 max-sm:m-auto bg-slate-400/10 rounded-3xl max-sm:w-11/12'>
        <div className='flex flex-col gap-5 justify-between max-sm:flex-col max-sm:gap-5 max-sm:items-start'>
        <h2 className='text-3xl font-semibold max-md:text-2xl max-sm:text-xl'>{t('prefferences')}</h2>
         <button onClick={saveChanges} className='btn px-3 py-1 rounded-2xl '>{t('saveChanges')}</button> </div>
        <div className='pt-10 flex flex-col'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5 max-md:text-xl max-sm:text-base'>{t('appearance')}</h3>
            <h4 className='text-xl font-semibold flex items-center gap-2 pb-5'>{t('theme')} { theme === 'dark' ? <Moon /> : <SunIcon />}</h4>
            <hr />
            <div className='pt-5 '>
                <p onClick={() => setSelectedTheme('light')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>{t('light')} {selectedTheme === 'light' &&  <Check />}</p>
                <p onClick={() => setSelectedTheme('dark')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>{t('dark')} {selectedTheme === 'dark' &&  <Check />}</p>
            </div>
            <h4 className='text-2xl font-semibold flex items-center gap-2 pb-5 max-md:text-xl max-sm:text-base'>{t('accentColor')}<p>{color}</p></h4>
            <hr />
            <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${selectedTheme === 'dark' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => setSelectedColor('blue')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-950'></span>{selectedTheme === 'light' && selectedColor === 'blue' && <Check />}</p>
                <p onClick={() => setSelectedColor('red')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-red-950'></span>{selectedTheme === 'light' && selectedColor === 'red' && <Check />}</p>
                <p onClick={() => setSelectedColor('green')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-900'></span>{selectedTheme === 'light' && selectedColor === 'green' && <Check />}</p>
                <p onClick={() => setSelectedColor('purple')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50  rounded-2xl'><span className='w-6 h-6 rounded-full bg-violet-950'></span>{selectedTheme === 'light' && selectedColor === 'purple' && <Check />}</p>
            </div>
             <div className={`pt-5 flex gap-2 items-center pb-5 pl-3 rounded-2xl ${selectedTheme === 'light' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}>
                <p onClick={() => setSelectedColor('blue')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-sky-500'></span>{selectedTheme === 'dark' && selectedColor === 'blue' && <Check />}  </p>
                <p onClick={() => setSelectedColor('red')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-amber-600'></span>{selectedTheme === 'dark' && selectedColor === 'red' && <Check />}</p>
                <p onClick={() => setSelectedColor('green')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-green-600'></span>{selectedTheme === 'dark' && selectedColor === 'green' && <Check />}</p>
                <p onClick={() => setSelectedColor('purple')} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 rounded-2xl'><span className='w-6 h-6 rounded-full bg-indigo-500'></span>{selectedTheme === 'dark' && selectedColor === 'purple' && <Check />}</p>
            </div>
        </div>
        <div className='pt-10'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5 max-md:text-xl max-sm:text-base'>{t('language')}</h3>
            <hr />
            <div className='pt-5 '>
                <p onClick={() => {i18n.changeLanguage('en'); setSelectedLang('en');}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>English {selectedLang === 'en' &&  <Check />}</p>
                <p onClick={() => {i18n.changeLanguage('ka'); setSelectedLang('ka');}} className='flex items-center gap-2 p-3 w-full justify-between hover:bg-gray-300/50 cursor-pointer rounded-2xl'>ქართული {selectedLang === 'ka' &&  <Check />}</p>
            </div>
        </div>
       <div className='pt-10'>
            <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5 max-md:text-xl max-sm:text-base'>{t('setCurrency')}<p>({t('current')}: {currency})</p></h3>
            <hr />
           <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className='mt-5 p-3 rounded-2xl bg-gray-200/50 w-full max-w-xs'>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GEL">GEL</option>
            </select>
        </div>
        <div>
          <h3 className='text-2xl font-semibold flex items-center gap-2 pb-5 mt-10 max-md:text-xl max-sm:text-base'>{t('addInitialBalance')} {initialBalance && `(${initialBalance} ${currency})`}</h3>
          <hr />
          <input placeholder='0.00' id='initBalance' name='initBalance' type="number" value={initialBalanceValue} onChange={(e) => setInitialBalanceValue(Number(e.target.value))} className='mt-5 p-3 rounded-2xl bg-gray-200/50 w-full max-w-xs' />
        </div>
    </div>
  )
}

export default Prefferences