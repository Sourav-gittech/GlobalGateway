import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// slice to add new charges
export const addCharge = createAsyncThunk("chargesSlice/addCharge",
    async ({ type, chargeData }, { rejectWithValue }) => {
        // console.log('New Charge details',chargeData);

        try {
            const res = await supabase.from("charges").insert([chargeData]).select();
            // console.log('Response for adding new charge', res);

            if (res.error) return rejectWithValue(res.error.message);
            return {
                type,
                data: res.data[0]
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// slice to fetch all charges
export const fetchCharges = createAsyncThunk("chargesSlice/fetchCharges",
    async ({ type } = {}, { rejectWithValue }) => {
        try {
            let query = supabase.from("charges").select("*").order("created_at", { ascending: true });

            if (type) {
                query = query.eq("purpose", type)
            }
            const res = await query;
            // console.log('Response for fetching all charges', res);

            if (res.error) return rejectWithValue(res.error.message);

            return {
                type,
                data: res.data,
            };
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// slice to update charges
export const updateCharge = createAsyncThunk("chargesSlice/updateCharge",
    async ({ type, id, updatedData }, { rejectWithValue }) => {
        // console.log('Updated Charge details',id, updatedData);

        try {
            const res = await supabase.from("charges").update(updatedData).eq("id", id).select();
            // console.log('Response for updating charges', res);

            if (res.error) return rejectWithValue(res.error.message);
            return {
                type,
                data: res.data[0]
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// slice to delete charges
export const deleteCharge = createAsyncThunk("chargesSlice/deleteCharge",
    async (id, { rejectWithValue }) => {
        // console.log('Deleted Charge id',id);

        try {
            const res = await supabase.from("charges").delete().eq("id", id).select();
            // console.log('Response for deleting charges', res);

            if (res.error) return rejectWithValue(res.error.message);
            return res.data[0];
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


const initialState = {
    allCharges: {
        visa: [],
        course: [],
    },
    isChargesLoading: false,
    hasChargesError: null
}

export const chargesSlice = createSlice({
    name: "chargesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // add new charges
            .addCase(addCharge.pending, (state) => {
                state.isChargesLoading = true;
            })
            .addCase(addCharge.fulfilled, (state, action) => {
                state.isChargesLoading = false;
                const { type, data } = action.payload;
                state.allCharges[type].push(data);
            })
            .addCase(addCharge.rejected, (state, action) => {
                state.isChargesLoading = false;
                state.hasChargesError = action.payload;
            })

            // fetch all charges
            .addCase(fetchCharges.pending, (state) => {
                state.isChargesLoading = true;
            })
            .addCase(fetchCharges.fulfilled, (state, action) => {
                state.isChargesLoading = false;
                const { type, data } = action.payload;
                state.allCharges[type] = data;
            })
            .addCase(fetchCharges.rejected, (state, action) => {
                state.isChargesLoading = false;
                state.hasChargesError = action.payload;
            })

            // update charges
            .addCase(updateCharge.pending, (state) => {
                state.isChargesLoading = true;
            })
            .addCase(updateCharge.fulfilled, (state, action) => {
                state.isChargesLoading = false;
                // state.allCharges = action.payload;
            })
            .addCase(updateCharge.rejected, (state, action) => {
                state.isChargesLoading = false;
                state.hasChargesError = action.payload;
            })

            // delete charges
            .addCase(deleteCharge.pending, (state) => {
                state.isChargesLoading = true;
            })
            .addCase(deleteCharge.fulfilled, (state, action) => {
                state.isChargesLoading = false;
                // state.allCharges = action.payload;
            })
            .addCase(deleteCharge.rejected, (state, action) => {
                state.isChargesLoading = false;
                state.hasChargesError = action.payload;
            });
    },
});

export default chargesSlice.reducer;