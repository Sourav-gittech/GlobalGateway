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

// fetch all country details action
export const fetchAllCountryDetails = createAsyncThunk("countrySlice/fetchAllCountryDetails",
    async (_, { rejectWithValue }) => {
        try {
            const resCountry = await supabase.from("countries").select("*").order("created_at", { ascending: false });
            // console.log('Response for getting all country', resCountry);

            if (resCountry?.err) throw resCountry?.err;

            const resCountryDetails = await supabase.from("country_details").select("*");
            // console.log('Response for getting country details', resCountryDetails);

            if (resCountryDetails?.err) throw resCountryDetails?.err;

            const merged = resCountry?.data.map((c) => ({
                ...c,
                country_details: resCountryDetails?.data.find((d) => d.id === c.id) || null,
            }));

            return merged;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


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

            // fetch all country details reducer
            .addCase(fetchAllCountryDetails.pending, (state, action) => {
                state.isAllCountryListLoading = true;
            })
            .addCase(fetchAllCountryDetails.fulfilled, (state, action) => {
                state.isAllCountryListLoading = false;
                state.getAllCountryList = action.payload;
            })
            .addCase(fetchAllCountryDetails.rejected, (state, action) => {
                state.isAllCountryListLoading = false;
                state.isAllCountryListError = action.error.message;
            })
    }
})

export default countrySlice.reducer;