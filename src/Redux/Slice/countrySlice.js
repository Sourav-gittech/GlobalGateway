import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// fetch all country action
export const fetchAllCountryList = createAsyncThunk("countrySlice/fetchAllCountryList",
    async () => {
        try {
            const res = await supabase.from('countries').select('*').order('name', { ascending: true });
            // console.log('All countries data response', res);

            return res.data;
        }
        catch (err) {
            const message = err?.message ?? "Failed to fetch user details";
            return rejectWithValue(message);
        }
    }
)

const initialState = {
    isAllCountryListLoading: false,
    getAllCountryList: [],
    isAllCountryListError: null
}

export const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    extraReducers: builder => {
        builder

            // fetch all country reducer
            .addCase(fetchAllCountryList.pending, (state, action) => {
                state.isAllCountryListLoading = true;
            })
            .addCase(fetchAllCountryList.fulfilled, (state, action) => {
                state.isAllCountryListLoading = false;
                state.getAllCountryList = action.payload;
            })
            .addCase(fetchAllCountryList.rejected, (state, action) => {
                state.isAllCountryListLoading = false;
                state.isAllCountryListError = action.error.message;
            })
    }
})

export default countrySlice.reducer;