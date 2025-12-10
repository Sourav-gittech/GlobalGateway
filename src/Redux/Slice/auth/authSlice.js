import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../util/Supabase/supabase";

// register slice 
export const registerUser = createAsyncThunk("authSlice/registerUser",
  async (data, { rejectWithValue }) => {
    console.log('Received register data', data);

    try {
      const redirectUrl = `${import.meta.env.VITE_CHECKOUT_ENDPOINT}/verification/${data.email}/${data.role || "user"}`;

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.name },
          emailRedirectTo: redirectUrl,
        }
      });

      // console.log('Register user in auth table data', signUpData);

      if (signUpError) return rejectWithValue(signUpError.message);

      const userId = signUpData.user.id;

      let fileName = null;
      let publicUrl = null;

      // insert into bucket
      if (data.role == 'user') {
        const file = data.avatar[0];
        fileName = `${userId}_${Date.now()}.${file.name.split(".").pop()}`;

        const { error: uploadError } = await supabase.storage.from("user")
          .upload(fileName, file, {
            upsert: true,
          });

        if (uploadError) return rejectWithValue(uploadError.message);

        const { data: urlData } = supabase.storage.from("user").getPublicUrl(fileName);
        publicUrl = urlData.publicUrl;
      }

      // insert into custom table
      const { data: insertData, error: insertError } = await supabase.from("users").insert({
        id: userId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatar: fileName,
        avatar_url: publicUrl,
        is_verified: "pending",
        is_blocked: data.is_blocked,
        last_sign_in_at: null,
        providers: signUpData.user.app_metadata.provider,
        role: data.role
      });

      if (insertError) return rejectWithValue(insertError.message);

      return insertData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// login slice 
export const loginUser = createAsyncThunk("authSlice/loginUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return rejectWithValue(error.message);

      const accessToken = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;

      const userId = data.user.id;

      const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", userId).single();

      if (userError) return rejectWithValue(userError.message);

      if (userData.is_verified === "pending")
        return rejectWithValue("Please verify your email first");

      if (userData.is_verified === "rejected")
        return rejectWithValue("Email verification failed");

      if (userData.is_blocked)
        return rejectWithValue("You are blocked. Please contact admin.");

      if (userData.role != role) {
        return rejectWithValue((role == 'admin' ? "Admin" : role == 'user' ? "User" : "Embassy") + " doesn't exist.");
      }
      return {
        user: userData,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  userAuthData: null,
  isUserAuthLoading: false,
  userAuthError: null
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.isUserAuthLoading = true;
        state.userAuthError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isUserAuthLoading = false;
        state.userAuthData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserAuthLoading = false;
        state.userAuthError = action.payload == 'duplicate key value violates unique constraint "users_email_key"' ? 'Email ID already exist' : action.payload;
      });

    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.isUserAuthLoading = true;
        state.userAuthError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserAuthLoading = false;
        state.userAuthData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserAuthLoading = false;
        state.userAuthError = action.payload;
      });
  },
});

export default authSlice.reducer;