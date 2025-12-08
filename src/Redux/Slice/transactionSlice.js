import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";

// Save Transaction slice
export const saveTransaction = createAsyncThunk("transactionSlice/saveTransaction",
    async (payload, { rejectWithValue }) => {
        // console.log('Received payment data in slice', payload);

        try {
            const res = await supabase.from("transaction_details").insert([payload]).select("*").single();
            // console.log('Response after adding payment details', res);

            if (res.error) return rejectWithValue(res.error.message);
            return res.data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch all transactions for specific user slice
export const fetchUserTransactionsWithApplications = createAsyncThunk("transactionSlice/fetchUserTransactionsWithApplications",
    async (userId, { rejectWithValue }) => {
        // console.log('Fetching gtransaction details for user id',userId);

        try {
            const { data: apps, error: appErr } = await supabase.from("applications").select("id").eq("user_id", userId);

            if (appErr) return rejectWithValue(appErr.message);

            const appIds = apps.map(a => a.id);
            if (appIds.length === 0) return [];

            const { data: payments, error: payErr } = await supabase.from("application_payment").select("*").in("application_id", appIds).order("created_at", { ascending: false });

            if (payErr) return rejectWithValue(payErr.message);

            const { data: txnDetails, error: txnErr } = await supabase.from("transaction_details").select("*");

            if (txnErr) return rejectWithValue(txnErr.message);

            const merged = payments.map(payment => ({
                ...payment,
                transaction_details: txnDetails.find(
                    tx => tx.transaction_id === payment.transaction_id
                ) || null
            }));

            return merged;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch transactions along with user details
export const fetchUserTransactionsWithUsers = createAsyncThunk("transactionSlice/fetchUserTransactionsWithUsers",
    async (_, { rejectWithValue }) => {
        try {
            // Fetch payments with application info
            const { data: payments, error: payErr } = await supabase.from("application_payment")
                .select(`*,applications (id,user_id,status,created_at,updated_at)`).order("created_at", { ascending: false });

            if (payErr) throw payErr;

            // Extract user IDs from applications
            const userIds = payments.map(p => p.applications?.user_id).filter(Boolean);

            // Fetch user details
            const { data: users, error: userErr } = await supabase.from("users").select("*").in("id", userIds);

            if (userErr) throw userErr;

            // Fetch transaction_details separately
            const txnIds = payments.map(p => p.transaction_id).filter(Boolean);
            const { data: txnDetails, error: txnErr } = await supabase.from("transaction_details").select("*").in("transaction_id", txnIds);

            if (txnErr) throw txnErr;

            // Merge everything manually
            const result = payments.map(payment => {
                const application = payment.applications || null;
                const user = application ? users.find(u => u.id === application.user_id) || null : null;
                const transaction_details = txnDetails.find(tx => tx.transaction_id === payment.transaction_id) || null;

                return { ...payment, application, user, transaction_details };
            });

            return result;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


const initialState = {
    isTransactionLoading: false,
    hasTransactionError: null,
    transactions: [],
    currentTransaction: null,
}

export const transactionSlice = createSlice({
    name: "transactionSlice",
    initialState,
    extraReducers: (builder) => {
        builder

            // Save Transaction
            .addCase(saveTransaction.pending, (state) => {
                state.isTransactionLoading = true;
            })
            .addCase(saveTransaction.fulfilled, (state, action) => {
                state.isTransactionLoading = false;
                state.currentTransaction = action.payload;
            })
            .addCase(saveTransaction.rejected, (state, action) => {
                state.isTransactionLoading = false;
                state.hasTransactionError = action.payload;
            })

            // Fetch User wise Transactions
            .addCase(fetchUserTransactionsWithApplications.pending, (state) => {
                state.isTransactionLoading = true;
            })
            .addCase(fetchUserTransactionsWithApplications.fulfilled, (state, action) => {
                state.isTransactionLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchUserTransactionsWithApplications.rejected, (state, action) => {
                state.isTransactionLoading = false;
                state.hasTransactionError = action.payload;
            })

            // Fetch All Transactions
            .addCase(fetchUserTransactionsWithUsers.pending, (state) => {
                state.isTransactionLoading = true;
            })
            .addCase(fetchUserTransactionsWithUsers.fulfilled, (state, action) => {
                state.isTransactionLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchUserTransactionsWithUsers.rejected, (state, action) => {
                state.isTransactionLoading = false;
                state.hasTransactionError = action.payload;
            });
    },
});

export default transactionSlice.reducer;