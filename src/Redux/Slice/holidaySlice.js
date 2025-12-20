import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// fetch holidays
export const fetchHolidays = createAsyncThunk("holidaysSlice/fetchHolidays",
    async (status = "all", { rejectWithValue }) => {
        try {
            let query = supabase.from("holiday").select("date, event_name");

            if (status === "active") {
                query = query.eq("status", true);
            } else if (status === "inactive") {
                query = query.eq("status", false);
            }

            const res = await query;
            // console.log('Response for fetching holidays', res);

            if (res?.error) throw res?.error;

            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    holidayData: [],
    isHolidayLoading: false,
    holidayError: null,
}

export const holidaysSlice = createSlice({
    name: "holidaysSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidays.pending, (state) => {
                state.isHolidayLoading = true;
            })
            .addCase(fetchHolidays.fulfilled, (state, action) => {
                state.isHolidayLoading = false;
                state.holidayData = action.payload;
            })
            .addCase(fetchHolidays.rejected, (state, action) => {
                state.isHolidayLoading = false;
                state.holidayError = action.payload;
            });
    },
});

export default holidaysSlice.reducer;
