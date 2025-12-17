import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// Fetch embassy by country_id
export const fetchEmbassyByCountryId = createAsyncThunk("embassySlice/fetchEmbassyByCountryId",
    async (countryId, { rejectWithValue }) => {
        // console.log('Fetching embassy based on country id', countryId);

        try {
            if (!countryId) return null;
            const res = await supabase.from("embassy").select("*").eq("country_id", countryId).maybeSingle();
            // console.log('Response for fetching embassy based on country id', res);

            if (res?.error) return rejectWithValue(res?.error.message);

            return res?.data ?? null;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch embassy");
        }
    }
)

// fetch specific embassy details
export const fetchEmbassyById = createAsyncThunk("embassySlice/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            // console.log('Fetched embassy details id', id);

            const res = await supabase.from("embassy").select("*").eq("id", id).single();
            // console.log('Response for fetching specific embassy based on country id', res);

            if (res?.error) throw res?.error;
            return res?.data;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch embassy");
        }
    }
)

// update embassy details
export const updateEmbassyById = createAsyncThunk("embassySlice/updateEmbassyById",
    async ({ id, updateData }, { rejectWithValue }) => {
        // console.log('Received data for updating embassy', id, updateData);

        try {
            if (!id) { return rejectWithValue("Embassy ID is required"); }

            const res = await supabase.from("embassy").update({
                ...updateData,
                updated_at: new Date().toISOString(),
            }).eq("id", id).select().single();
            // console.log('Response for updating embassy details', res);

            if (res?.error) {
                return rejectWithValue(res?.error.message);
            }

            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


const initialState = {
    embassyData: null,
    isEmbassyLoading: false,
    hasEmbassyerror: null,
}

export const embassySlice = createSlice({
    name: "embassySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // embassy by country_id
            .addCase(fetchEmbassyByCountryId.pending, (state) => {
                state.isEmbassyLoading = true;
            })
            .addCase(fetchEmbassyByCountryId.fulfilled, (state, action) => {
                state.isEmbassyLoading = false;
                state.embassyData = action.payload;
            })
            .addCase(fetchEmbassyByCountryId.rejected, (state, action) => {
                state.isEmbassyLoading = false;
                state.hasEmbassyerror = action.payload;
            })

            // specific embassy details
            .addCase(fetchEmbassyById.pending, (state) => {
                state.isEmbassyLoading = true;
            })
            .addCase(fetchEmbassyById.fulfilled, (state, action) => {
                state.isEmbassyLoading = false;
                state.embassyData = action.payload;
            })
            .addCase(fetchEmbassyById.rejected, (state, action) => {
                state.isEmbassyLoading = false;
                state.hasEmbassyerror = action.payload;
            })

            // update embassy details
            .addCase(updateEmbassyById.pending, (state) => {
                state.isEmbassyLoading = true;
            })
            .addCase(updateEmbassyById.fulfilled, (state, action) => {
                state.isEmbassyLoading = false;
                state.embassyData = action.payload;
            })
            .addCase(updateEmbassyById.rejected, (state, action) => {
                state.isEmbassyLoading = false;
                state.hasEmbassyerror = action.payload;
            })
    }
})

export default embassySlice.reducer;
