import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// get all admin 
export const getAllAdmins = createAsyncThunk("adminProfileSlice/getAllAdmins",
    async (_, { rejectWithValue }) => {
        try {
            // Fetch users table
            const { data: adminData, error: adminError } = await supabase.from("users").select("*").eq("role", "admin").order("created_at", { ascending: false });
            // console.log('Response for fetching admin data', adminData, adminError);

            if (adminError) throw adminError;

            return adminData;
        } catch (err) {
            console.error("Error fetching users:", err);
            return rejectWithValue(err.message);
        }
    }
);


const initialState = {
    isAdminLoading: false,
    getAdminData: [],
    isAdminError: null,
};

export const adminProfileSlice = createSlice({
    name: "adminProfileSlice",
    initialState,
    extraReducers: (builder) => {
        builder

            // fetch all admins
            .addCase(getAllAdmins.pending, (state) => {
                state.isAdminLoading = true;
            })
            .addCase(getAllAdmins.fulfilled, (state, action) => {
                state.isAdminLoading = false;
                state.getAdminData = action.payload;
                state.isAdminError = null;
            })
            .addCase(getAllAdmins.rejected, (state, action) => {
                state.isAdminLoading = false;
                state.isAdminError = action.payload || action.error.message;
            })
    }
});

export default adminProfileSlice.reducer;