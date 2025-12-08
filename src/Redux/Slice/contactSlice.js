import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// add contact slice
export const addContactMessage = createAsyncThunk("contactSlice/addContactMessage",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data for contact in slice', data);

            const res = await supabase.from("contact_messages").insert(data);
            // console.log('Response for adding contact data', res);

            if (res?.error) return rejectWithValue(res?.error.message);

            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    contactLoading: false,
    contactData: false,
    contactError: null
}

export const contactSlice = createSlice({
    name: "contactSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addContactMessage.pending, (state) => {
                state.contactLoading = true;
            })
            .addCase(addContactMessage.fulfilled, (state) => {
                state.contactLoading = false;
                state.contactData = true;
            })
            .addCase(addContactMessage.rejected, (state, action) => {
                state.contactLoading = false;
                state.contactError = action.payload || "Failed to send message";
            });
    },
});

export default contactSlice.reducer;