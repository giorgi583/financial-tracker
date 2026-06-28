import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type PreferenceState = {
    theme: string;
    color: string;
    lang: string;
    currency: string;
    initialBalance: number;
    loading?: boolean;
};
const initialState: PreferenceState = {
    theme: 'light',
    color: 'blue',
    lang: 'en',
    currency: 'USD',
    initialBalance: 0,
    loading: false,
};

export const fetchUserPrefferences = createAsyncThunk(
    'preference/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3200/api/user-prefferences', {
                method: 'GET',
                credentials: 'include', // important for cookie-based auth
            });
            if (!res.ok) {
                const error = await res.json();
                return rejectWithValue(error.message);
            }
            const json = await res.json();
            return json.data;
        } catch (err) {
            return rejectWithValue('Network error, please try again');
        }
    }
);

export const updateUserPrefferences = createAsyncThunk(
    'preference/update',
    async (updatedData: Partial<PreferenceState>, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:3200/api/user-prefferences/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify(updatedData),
            });
             console.log('Response status:', res.status);
            if (!res.ok) {
                const error = await res.json();
                console.log('Error response:', error);
                return rejectWithValue(error.message ?? 'update failed');
            }
            const json = await res.json();
            console.log('Response data:', json);
            return json.data;
        } catch (err) {
            console.log('Caught error:', err);
            return rejectWithValue('Network error, please try again');
        }   
    }
);  
const preferenceSlice = createSlice({
    name: "preference",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },
        setLang: (state, action) => {
            state.lang = action.payload;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setInitialBalance: (state, action) => {
            state.initialBalance = action.payload;
        },
        resetPreferences: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPrefferences.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserPrefferences.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload) {
                    state.theme = action.payload.theme;
                    state.color = action.payload.color;
                    state.lang = action.payload.lang;
                    state.currency = action.payload.currency;
                    state.initialBalance = action.payload.initialBalance;
                }
            })
            .addCase(fetchUserPrefferences.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateUserPrefferences.fulfilled, (state, action) => {
                console.log('Update fulfilled, payload:', action.payload);
                state.loading = false;
                if(action.payload) {
                    state.theme = action.payload.theme;
                    state.color = action.payload.color;
                    state.lang = action.payload.lang;
                    state.currency = action.payload.currency;
                    state.initialBalance = action.payload.initialBalance;
                }
            })
            .addCase(updateUserPrefferences.pending, (state) => {  
            state.loading = true;
        })
        .addCase(updateUserPrefferences.rejected, (state, action) => {  
            console.log('Update rejected:', action.payload);
            state.loading = false;
        });
    },
});

export const { setTheme, setColor, setLang, setCurrency, resetPreferences, setInitialBalance } = preferenceSlice.actions;
export default preferenceSlice.reducer;