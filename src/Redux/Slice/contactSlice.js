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

// Fetch all contact messages
export const fetchAllContactMessages = createAsyncThunk("contactSlice/fetchAllContactMessages",
    async (_, { rejectWithValue }) => {
        try {
            const res = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
            console.log('Response for fetching all contact message', res);

            if (res?.error) return rejectWithValue(res?.error.message);
            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    contactLoading: false,
    contactData: [],
    contactError: null
}

export const contactSlice = createSlice({
    name: "contactSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // add a contact messages slice
            .addCase(addContactMessage.pending, (state) => {
                state.contactLoading = true;
            })
            .addCase(addContactMessage.fulfilled, (state) => {
                state.contactLoading = false;
                state.contactData = action.payload;
            })
            .addCase(addContactMessage.rejected, (state, action) => {
                state.contactLoading = false;
                state.contactError = action.payload || "Failed to send message";
            })

            // Fetch all contact messages slice
            .addCase(fetchAllContactMessages.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(fetchAllContactMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(fetchAllContactMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message;
            });
    },
});

export default contactSlice.reducer;