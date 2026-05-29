import { createSlice } from "@reduxjs/toolkit";

type PreferenceState = {
    theme: string;
    color: string;
    lang: string;
    currency: string;
};
const initialState: PreferenceState = {
    theme:  localStorage.getItem('mode') || 'light',
    color:  localStorage.getItem('color') || 'blue',
    lang: localStorage.getItem('language') || 'en',
    currency: localStorage.getItem('currency') || 'USD'
};

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
    },
});

export const { setTheme, setColor, setLang, setCurrency } = preferenceSlice.actions;
export default preferenceSlice.reducer;