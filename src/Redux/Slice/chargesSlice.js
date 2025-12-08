import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// slice to fetch all charges
export const fetchCharges = createAsyncThunk("chargesSlice/fetchCharges",
    async (_, { rejectWithValue }) => {
        try {
            const res = await supabase.from("charges").select("*").order("created_at", { ascending: true });
            // console.log('Response for fetching all charges', res);

            if (res.error) return rejectWithValue(res.error.message);

            return res.data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const chargesSlice = createSlice({
    name: "chargesSlice",
    initialState: {
        allCharges: [],
        isChargesLoading: false,
        hasChargesError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharges.pending, (state) => {
                state.isChargesLoading = true;
            })
            .addCase(fetchCharges.fulfilled, (state, action) => {
                state.isChargesLoading = false;
                state.allCharges = action.payload;
            })
            .addCase(fetchCharges.rejected, (state, action) => {
                state.isChargesLoading = false;
                state.hasChargesError = action.payload;
            });
    },
});

export default chargesSlice.reducer;