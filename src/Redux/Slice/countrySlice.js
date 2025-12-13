import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";
import { fetchCountryDetails } from "../../functions/fetchCountryDetails";

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
                country_details: resCountryDetails?.data.find((d) => d.country_id === c.id) || {},
            }));

            return merged;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

// change country status
export const toggleCountryStatus = createAsyncThunk('countrySlice/toggleCountryStatus',
    async ({ id, currentStatus }) => {
        // console.log('Status changable details', id, currentStatus);

        try {
            const newStatus = !currentStatus;
            const res = await supabase.from("countries").update({ is_blocked: newStatus }).eq("id", id).select().single();
            // console.log('Response for updating country status', res);

            if (res?.error) throw res?.error;

            return res?.data;
        } catch (err) {
            console.error("Error updating block status:", err.message);
            return null;
        }
    }
)

// upload country image in bucket
const uploadFile = async (file, country, type, folder) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${country}-${type}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const res = await supabase.storage.from('country').upload(filePath, file);
    console.log('Response for uploading image in bucket', res);

    if (res?.uploadError) throw res?.uploadError;

    const { data: urlData } = supabase.storage.from('country').getPublicUrl(filePath);

    const bucketData = {
        file: { url: urlData.publicUrl },
        url: urlData.publicUrl,
        docName: res.data.path.split('/')[1]
    }
    return bucketData;
};

// add country
export const addOrUpdateCountry = createAsyncThunk("countrySlice/addOrUpdateCountry",
    async (countryData, { rejectWithValue }) => {
        // console.log('Received data in slice', countryData);

        try {
            let apiData = {};

            // Call fetchCountryDetails to get missing fields
            if (countryData.name) {
                try {
                    apiData = await fetchCountryDetails({ queryKey: ["country", countryData.name] });
                } catch (err) {
                    return rejectWithValue(`Invalid country name: ${countryData.name}`);
                }
            }

            // console.log('Country data from api', apiData);

            // Merge form data with API data (form data takes priority)
            const finalData = {
                name: countryData.name.charAt(0).toUpperCase() + countryData.name.slice(1),
                description: countryData.description || "",
                imageFile: countryData.image[0] || null,
                is_blocked: countryData.is_blocked ?? true,
                code: countryData.code || apiData?.currency?.code || "",
                official_name: countryData.official_name || apiData.officialName,
                capital: countryData.capital || apiData.capital,
                continents: countryData.continents || apiData.continents,
                latlng: [countryData.latlng[0] || apiData.latlng[0], countryData.latlng[1] || apiData.latlng[1]],
                zoom: 5,
                area: countryData.area || apiData.area,
                population: countryData.population || apiData.population,
                flagFile: countryData.flag_url[0] || null,
                languages: countryData.languages || apiData.languages,
                currency: { "name": countryData.currency.name || apiData.currency.name, "symbol": countryData.currency.symbol || apiData.currency.symbol, "code": countryData.currency.code || apiData.currency.code }
            };

            // Upload images
            const flagUrl = await uploadFile(finalData.flagFile, finalData.name, 'flag', "flag");
            const countryImageUrl = await uploadFile(finalData.imageFile, finalData.name, 'place', "important_place");

            // console.log(flagUrl, countryImageUrl);
            // console.log("final data", finalData);

            // Upsert countries table
            const { data: countryRow, error: countryErr } = await supabase.from("countries").upsert(
                {
                    name: finalData.name,
                    description: finalData.description,
                    image: countryImageUrl,
                    image_name: countryImageUrl?.docName || null,
                    image_url: countryImageUrl?.url || null,
                    is_blocked: finalData.is_blocked,
                },
                { onConflict: "name" }
            ).select().single();

            // console.log('Response for adding country', countryRow);

            if (countryErr) throw countryErr;

            // Upsert country_details table
            const { data: countryDetailsRow, error: countryDetailsErr } = await supabase.from("country_details").upsert(
                [
                    {
                        country_id: countryRow?.id,
                        code: finalData.code.toUpperCase(),
                        official_name: finalData.official_name,
                        capital: finalData.capital,
                        continents: finalData.continents,
                        latlng: finalData.latlng,
                        zoom: finalData.zoom,
                        area: finalData.area,
                        population: finalData.population,
                        flag: flagUrl || null,
                        flag_url: flagUrl?.url || apiData?.flag,
                        flag_name: flagUrl?.docName || null,
                        languages: finalData.languages,
                        currency: finalData.currency,
                    },
                ],
                { onConflict: ["code"], returning: "representation" }
            );

            // console.log('Response for adding country details', countryDetailsRow);

            if (countryDetailsErr) throw countryDetailsErr;

            return { countryRow, countryDetailsRow };

        } catch (error) {
            console.error("Error adding/updating country:", error);
            return rejectWithValue(error.message);
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

            // change country status
            .addCase(toggleCountryStatus.pending, (state) => {
                state.isAllCountryListLoading = true;
            })
            .addCase(toggleCountryStatus.fulfilled, (state, action) => {
                state.isAllCountryListLoading = false;
                state.getAllCountryList = state.getAllCountryList.map((u) =>
                    u.id === action.payload.id ? { ...u, ...action.payload } : u);
                state.isAllCountryListError = null;
            })
            .addCase(toggleCountryStatus.rejected, (state, action) => {
                state.isAllCountryListLoading = false;
                state.isAllCountryListError = action.payload || action.error.message;
            })

            // add country
            .addCase(addOrUpdateCountry.pending, (state) => {
                state.isAllCountryListLoading = true;
            })
            .addCase(addOrUpdateCountry.fulfilled, (state, action) => {
                state.isAllCountryListLoading = false;
                state.getAllCountryList.push(action.payload);
            })
            .addCase(addOrUpdateCountry.rejected, (state, action) => {
                state.isAllCountryListLoading = false;
                state.isAllCountryListError = action.payload;
            });
    }
})

export default countrySlice.reducer;