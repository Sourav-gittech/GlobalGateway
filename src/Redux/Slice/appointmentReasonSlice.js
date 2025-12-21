import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../util/Supabase/supabase";


// fetch appointment
export const fetchAppointmentReasons = createAsyncThunk("appointmentReasonSlice/fetchAppointmentReasons",
    async (status = "all", { rejectWithValue }) => {
        try {
            let query = supabase.from("appointment_reason").select("*").order("created_at", { ascending: false });

            // status filter
            if (status === "active") query = query.eq("status", true);
            if (status === "inactive") query = query.eq("status", false);

            const res = await query;
            // console.log('Response for fetching active reasons', res);

            if (res?.error) throw res?.error;
            return res?.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

// add appointment
export const addAppointmentReason = createAsyncThunk("appointmentReasonSlice/addAppointmentReason",
    async ({ type, description, status = true, reason_id }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.from("appointment_reason").insert([
                {
                    type,
                    description,
                    status,
                    reason_id,
                },
            ]).select().single();

            if (error) throw error;
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


const initialState = {
    reasonsData: [],
    isReasonsLoading: false,
    hasReasonerror: null
}

export const appointmentReasonSlice = createSlice({
    name: "appointmentReasonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchAppointmentReasons.pending, (state) => {
                state.isReasonsLoading = true;
            })
            .addCase(fetchAppointmentReasons.fulfilled, (state, action) => {
                state.isReasonsLoading = false;
                state.reasonsData = action.payload;
            })
            .addCase(fetchAppointmentReasons.rejected, (state, action) => {
                state.isReasonsLoading = false;
                state.isReasonsLoading = action.payload;
            })

            /* ADD */
            .addCase(addAppointmentReason.pending, (state) => {
                state.isReasonsLoading = true;
            })
            .addCase(addAppointmentReason.fulfilled, (state, action) => {
                state.isReasonsLoading = false;
                state.reasonsData.unshift(action.payload);
            })
            .addCase(addAppointmentReason.rejected, (state, action) => {
                state.isReasonsLoading = false;
                state.isReasonsLoading = action.payload;
            });
    },
});

export default appointmentReasonSlice.reducer;
