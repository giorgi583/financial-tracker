import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  type: string;
  description?: string;
  amount: number;
  category: string;
  date: string;
};

interface TransactionState  { 
    transactions: Transaction[], 
    status: 'idle' | 'loading' | 'failed',
    error?: string | null
 };

const initialState: TransactionState = {
    transactions: [],
    status: 'idle',
    error: null
};



export const addTransaction = createAsyncThunk<Transaction, Omit<Transaction, 'id'>, { rejectValue: string }>(
  'transactions/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3000/api/transactions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message);
      }
const json = await res.json()
      return json.data ?? json
    } catch (err) {
      return rejectWithValue('Network error, please try again');
    }
  }
);  
type Filters = {
  description?: string
  maxAmount?: number
  minAmount?: number
  type?: string
  category?: string
  from?: string
  to?: string,
  orderBy?: string
}
// fetch all transactions
export const fetchTransactions = createAsyncThunk<Transaction[], Filters, { rejectValue: string }>(
  'transactions/fetchAll',
  async (filters={}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (filters.description) params.set('description', filters.description)
      if (filters.maxAmount) params.set('maxAmount', filters.maxAmount.toString())
      if (filters.minAmount) params.set('minAmount', filters.minAmount.toString())
      if (filters.type)     params.set('type', filters.type)
      if (filters.category) params.set('category', filters.category)
      if (filters.from)     params.set('from', filters.from)
      if (filters.to)       params.set('to', filters.to)
        if (filters.orderBy) params.set('orderBy', filters.orderBy)
      const res = await fetch(`http://localhost:3000/api/transactions?${params.toString()}`)

      if (!res.ok) return rejectWithValue('Failed to fetch transactions')

      const json = await res.json()
      return json.data // ← adjust based on your backend response shape
    } catch (err) {
      return rejectWithValue('Network error')
    }
  }
)
export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
                state.status = 'idle';
                state.error = null;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'Failed to add transaction';
            })
    .addCase(fetchTransactions.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = 'idle'
      state.transactions = action.payload 
      console.log('Fetched transactions:', action.payload)
    })
    .addCase(fetchTransactions.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload ?? 'Something went wrong'
    })
    },
});


export default transactionsSlice.reducer;