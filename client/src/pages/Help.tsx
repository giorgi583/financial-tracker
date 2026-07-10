import {ChevronDownCircle, Contact, MessageCircleQuestion,PieChart,Rocket, ShieldCheck, TagIcon} from 'lucide-react'
import { useTranslation } from 'react-i18next'
const Help = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-10 w-full p-20 max-sm:p-5 max-sm:pb-20">
      <h1 className="text-3xl font-bold max-sm:mt-15 flex items-center gap-3">{t('Help & Support Center')}</h1>
      <p className="text-lg">{t('help-center-text')}</p>
<hr />
<div className="flex flex-col gap-12 ">
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><Rocket size={30} />{t("get_started")} <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        {t("started1")}
      </li>
      <li>
        {t("started2")}
      </li>
      <li>
        {t("started3")}
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><TagIcon size={30} />{t("manage_budget")} <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        {t("budget1")}
      </li>
      <li>
        {t("budget2")}
      </li>
      <li>
        {t("budget3")}
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <PieChart size={30} /> {t("analytics_reports")} <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        {t("analytics1")}
      </li>
      <li>
        {t("analytics2")}
      </li>
      <li>
        {t("analytics3")}
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <ShieldCheck size={30} />{t("Security_privacy")} <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        {t("security1")}
      </li>
      <li>
        {t("security2")}
      </li>
      <li>
        {t("security3")}
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <MessageCircleQuestion size={30} />{t("FAQ")} <ChevronDownCircle size={30} /></summary>
    <div className="grid grid-cols-1 ">
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">{t('faq1')} <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
{t('faq11')}
      </p>
      </details>
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">{t('faq2')} <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
{t('faq22')}
      </p>
      </details>
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">{t('faq3')} <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
{t('faq33')}
      </p>
      </details>
    </div>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <Contact size={30} /> {t("still_help")} <ChevronDownCircle size={30} /></summary>
    <p className='text-lg mb-5'>{t('stillhelp1')}</p>  
    <ul className="list-disc pl-6 flex flex-col gap-5">
    <li>Email Us: support@monify.com </li>
    <li>{t('stillhelp2')} →</li>
    <li>{t('stillhelp3')}</li>
    </ul>
  </details>
</div>
    </div>
  )
}

export default Help