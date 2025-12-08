import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// Fetch all visa types for specific country slice
export const fetchVisaForCountry = createAsyncThunk("visaSlice/fetchVisaForCountry",
    async (countryId, { rejectWithValue }) => {
        console.log('Fetching visa for country id', countryId);
        try {
            // Fetch visa ID list from country_visas
            const res = await supabase.from("country_visas").select("visa_id").eq("country_id", countryId).single();
            console.log("Response after fetching visa Id's for specific country", res);
            if (res.error) return rejectWithValue(res.error.message);

            const visaIDs = res.data?.visa_id || [];
            if (visaIDs.length === 0) return [];

            // Fetch visa list
            const visaRes = await supabase.from("visa").select("*").in("id", visaIDs);
            console.log('Response after fetching info for specific visa', visaRes);
            
            if (visaRes.error) return rejectWithValue(visaRes.error.message);

            const visas = visaRes.data;

            // Fetch visa_details for this country
            const detailsRes = await supabase.from("visa_details").select("*").eq("country_id", countryId).in("visa_id", visaIDs);
            console.log('Response after fetching details for specific visa', detailsRes);

            if (detailsRes.error) return rejectWithValue(detailsRes.error.message);

            const visaDetails = detailsRes.data;

            // Merge visa and visa_details
            const merged = visas.map(v => ({
                ...v,
                visa_details: visaDetails.filter(d => d.visa_id === v.id)
            }));

            return merged;

        }
        catch (err) {
            console.log('Error occured', err);
            return rejectWithValue(err.message);
        }
    }
);



const initialState = {
    visaListData: [],
    isVisaListloading: false,
    isVisaListerror: null,
}

export const visaSlice = createSlice({
    name: "visaSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisaForCountry.pending, (state) => {
                state.isVisaListloading = true;
                state.isVisaListerror = null;
            })

            .addCase(fetchVisaForCountry.fulfilled, (state, action) => {
                state.isVisaListloading = false;
                state.visaListData = action.payload;
            })

            .addCase(fetchVisaForCountry.rejected, (state, action) => {
                state.isVisaListloading = false;
                state.isVisaListerror = action.payload;
            });
    },
});

export default visaSlice.reducer;