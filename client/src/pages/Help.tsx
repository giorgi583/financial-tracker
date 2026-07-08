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
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><Rocket size={30} />Getting Started <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Set up your prefferences, including theme, accent color, language or currency and more to personalize your experience.
      </li>
      <li>
        Manualy add transactions, including cash deposits, private loan payments, and investments, to keep track of your finances.
      </li>
      <li>
        Transaction History: Access a detailed history of your transactions, including cash deposits, private loan payments, and investments, filter and sort by date, category, or other criteria.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><TagIcon size={30} /> Managing Your Budget <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Create Limits of categories: Go to Budgets and Add limits. You can label them anything from "Rent" to "Emergency Guacamole Fund."
      </li>
      <li>
        edit and delete Limits and goals: Assign a dollar amount to each category. We’ll notify you when you’re approaching 80% of your limit or goal.
      </li>
      <li>
       Alerts: get notified when your limit or goal is near or exceeded or even failed.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <PieChart size={30} /> Analytics & reports <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Dive deep into your spending: View a detailed report of your spending by month, category, or other criteria.
      </li>
      <li>
        Get all kinds of reports and charts based on selected time period.
      </li>
      <li>
       Go to dashboard to see most important overview of your finacial situation for selected period of time.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <ShieldCheck size={30} />Security & Privacy <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Two-Factor Authentication (2FA): We highly recommend enabling 2FA in your Security Settings for an extra layer of protection.
      </li>
      <li>
        Data Export: You own your data. Export your transaction history as a CSV or PDF at any time via the Reports tab.
      </li>
      <li>
       We will never ask for your password via email or text. Always ensure you are logged in through our secure portal.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <MessageCircleQuestion size={30} /> Frequently Asked Questions <ChevronDownCircle size={30} /></summary>
    <div className="grid grid-cols-1 ">
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">How do I add a new transaction? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
Go to transacctions page, look for add transaction section, fill the form and click "Add Transaction".
      </p>
      </details>
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">How do see information about budget? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
You should first add transactions, then go to budget page. then add limits and goals for each category, and see it on budget overview.
      </p>
      </details>
      <details className="p-5 border border-gray-950 dark:border-white col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">Why are my financial reports not showing? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
You probably havnt set any transactions yet or have not provided enough data to generate reports or have not provided period of time. 
      </p>
      </details>
    </div>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <Contact size={30} /> Still Need Help?<ChevronDownCircle size={30} /></summary>
    <p className='text-lg mb-5'>Can't find what you're looking for? Our human support team (not bots!) is ready to jump in.</p>  
    <ul className="list-disc pl-6 flex flex-col gap-5">
    <li>Email Us: support@monify.com </li>
    <li>Live chat bottom right →</li>
    <li>Community Forum: Check out our user-led tips for advanced budgeting strategies.</li>
    </ul>
  </details>
</div>
    </div>
  )
}

export default Help