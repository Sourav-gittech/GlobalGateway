import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../../util/Supabase/supabase";

// verifying action 
export const verifyUser = createAsyncThunk("userVerifySlice/verifyUser",
    async (payload, { rejectWithValue }) => {
        const decodedEmail = decodeURIComponent(payload.email);

        try {
            // Update user status
            const { data: userData, error: userError } = await supabase.from("users")
                .update({
                    is_verified: payload.status,
                })
                .eq("email", decodedEmail).eq("is_verified", "pending").select("*");

            if (userError) throw userError;
            // console.log('Update user status', userData);

            return userData;
        } catch (err) {
            return rejectWithValue(err.message || "An unexpected error occurred");
        }
    }
);

// Initial State
const initialState = {
    isVerifyLoading: false,
    verifyData: null,
    verifyError: null,
};

// Slice
export const userVerifySlice = createSlice({
    name: "userVerifySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(verifyUser.pending, (state) => {
                state.isVerifyLoading = true;
                state.verifyError = null;
            })

            // Success
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.isVerifyLoading = false;
                state.verifyData = action.payload;
            })

            // Error
            .addCase(verifyUser.rejected, (state, action) => {
                state.isVerifyLoading = false;
                state.verifyData = null;
                state.verifyError =
                    typeof action.payload === "string"
                        ? action.payload
                        : "Verification failed";
            });
    },
});

export default userVerifySlice.reducer;
