import AddTransactionForm from "../components/AddTransactionForm"
import FilterSort from "../components/FilterSort"
import TransList from "../components/TransList"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Transactions = () => {
   const [filters, setFilters] = useState<any>({
          description: '',
          minAmount: undefined,
          maxAmount: undefined,
          type: '',
          category: '',
          from: '',
          to: '',
          orderBy: '',
      });
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col gap-8 w-full p-8">
      <h1 className="text-3xl font-bold max-md:text-2xl max-sm:mt-7">John{t('yourTransactions')}</h1>
<div className="flex gap-2 max-md:flex-col">
  <AddTransactionForm />
<FilterSort filters={filters} setFilters={setFilters} /> 
</div>
<TransList filters={filters}/>
    </div>
  )
}

export default Transactions