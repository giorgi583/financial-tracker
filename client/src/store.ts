import { configureStore } from "@reduxjs/toolkit";
import preferenceReducer from "./slices/PreferenceSlice";
import transactionsReducer from "./slices/transactionsSlice";
export const store = configureStore({
    reducer: {
        preference: preferenceReducer,
        transactions: transactionsReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch  // ← this knows about thunks