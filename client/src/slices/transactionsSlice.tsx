import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  id: number;
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
      const res = await fetch('http://localhost:3300/api/transactions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important for cookie-based auth
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
      const res = await fetch(`http://localhost:3300/api/transactions?${params.toString()}`, {
        method: 'GET',
        credentials: 'include', // important for cookie-based auth
      })

      if (!res.ok) return rejectWithValue('Failed to fetch transactions')

      const json = await res.json()
      return json.data // ← adjust based on your backend response shape
    } catch (err) {
      return rejectWithValue('Network error')
    }
  }

);

export const removeTransaction = createAsyncThunk<number, number, { rejectValue: string }>(
  'transactions/remove',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3300/api/transactions/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include', // important for cookie-based auth
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message);
      }

      return id;
    } catch (err) {
      return rejectWithValue('Network error, please try again');
    }
  }
);
export const editTransaction = createAsyncThunk<Transaction, {id: number} & Partial<Omit<Transaction, 'id'>>, { rejectValue: string }>(
  'transactions/edit',
  async (data, { rejectWithValue }) => {
    try {      const res = await fetch(`http://localhost:3300/api/transactions/edit/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important for cookie-based auth
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
      .addCase(removeTransaction.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'idle';
        state.error = null;
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
      })
      .addCase(removeTransaction.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to remove transaction';
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
  const index = state.transactions.findIndex(tx => tx.id === action.payload.id)
  if (index !== -1) state.transactions[index] = action.payload
})
.addCase(editTransaction.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.payload ?? 'Failed to edit transaction'
})
    },
});


export default transactionsSlice.reducer;