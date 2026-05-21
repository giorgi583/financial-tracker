import {ChevronDownCircle, Contact, MessageCircleQuestion,PieChart,Rocket, ShieldCheck, TagIcon} from 'lucide-react'

const Help = () => {
  return (
    <div className="flex flex-col gap-10 w-full p-20 max-sm:p-5 max-sm:pb-20">
      <h1 className="text-3xl font-bold max-sm:mt-15 flex items-center gap-3">Help & Support Center </h1>
      <p className="text-lg">Welcome to your financial command center! Whether you’re here to crush debt, save for a dream vacation, or just figure out where that extra $50 went last week, we’ve got you covered.</p>
<hr />
<div className="flex flex-col gap-12 ">
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><Rocket size={30} />Getting Started <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Linking Accounts: Navigate to the Accounts tab to securely connect your bank, credit cards, or investment portfolios. We use bank-level encryption to keep your data invisible to everyone but you.
      </li>
      <li>
        Manual Entry: Prefer the hands-on approach? Tap the "+" icon on your dashboard to log cash transactions or private loans.
      </li>
      <li>
        Transaction History: Access a detailed history of your transactions, including cash deposits, private loan payments, and investments.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"><PieChart size={30} />Managing Your Budget <ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Create Categories: Go to Budgets and Add Category. You can label them anything from "Rent" to "Emergency Guacamole Fund."
      </li>
      <li>
        Set Limits: Assign a dollar amount to each category. We’ll notify you when you’re approaching 80% of your limit.
      </li>
      <li>
       Rollovers: Want leftover money to carry over to next month? Toggle the "Rollover" switch within any specific category setting.
      </li>
    </ul>
  </details>
  <hr />
  <details className="flex flex-col gap-8">
    <summary className="text-2xl font-semibold flex items-center gap-3 cursor-pointer"> <TagIcon size={30} /> Transactions & Tagging<ChevronDownCircle size={30} /></summary>
    <ul className="list-disc pl-6 flex flex-col gap-5">
      <li>
        Auto-Categorization: Our AI learns your habits. If you tag "Starbucks" as "Dining Out" once, we’ll handle it from there.
      </li>
      <li>
        Splitting Transactions: Did one Target run include both groceries and electronics? Click the transaction and select "Split" to allocate costs to different budgets.
      </li>
      <li>
       Recurring Bills: Mark a transaction as "Recurring" to see it reflected in your Upcoming Bills calendar.
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
      <details className="p-5 border border-gray-950 col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">How do I add a new bank account? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
you can add a new bank account by clicking the "+" icon on the dashboard.
      </p>
      </details>
      <details className="p-5 border border-gray-950 col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">How do I add a new bank account? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
you can add a new bank account by clicking the "+" icon on the dashboard.
      </p>
      </details>
      <details className="p-5 border border-gray-950 col-span-1">
        <summary className="text-lg flex items-center gap-3 cursor-pointer">How do I add a new bank account? <ChevronDownCircle size={20} /></summary>
      <p className='pt-5'>
you can add a new bank account by clicking the "+" icon on the dashboard.
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