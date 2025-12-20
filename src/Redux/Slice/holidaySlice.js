import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// fetch holidays
export const fetchHolidays = createAsyncThunk("holidaysSlice/fetchHolidays",
    async (status, { rejectWithValue }) => {
        const setStatus = status == 'active' ? true : status == 'inactive' ? false : all;
        try {
            const res = await supabase.from("holiday").select("date, event_name").eq("status", setStatus);
            console.log('Response for fetching holidays', res);

            if (res?.error) throw res?.error;
            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const holidaysSlice = createSlice({
    name: "holidaysSlice",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidays.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHolidays.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchHolidays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default holidaysSlice.reducer;
