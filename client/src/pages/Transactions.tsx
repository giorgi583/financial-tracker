import AddTransactionForm from "../components/AddTransactionForm"
import FilterSort from "../components/FilterSort"
import TransList from "../components/TransList"
import { useState } from "react"
import { useTranslation } from "react-i18next"
type Transaction = {
  id: number,
    type: string,
    description?: string,
    amount: number,
    category: string,
    date: string,
    createdAt: string,
    updatedAt?: string
}
const Transactions = () => {
  const { t } = useTranslation()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  return (
    <div className="flex flex-col gap-8 w-full p-8">
      <h1 className="text-3xl font-bold max-md:text-2xl max-sm:mt-7">John{t('yourTransactions')}</h1>
<div className="flex gap-2 max-md:flex-col">
  <AddTransactionForm setTransactions={setTransactions}/>
<FilterSort/> 
</div>
<TransList transactions={transactions}/>
    </div>
  )
}

export default Transactions