import supabase from "../util/Supabase/supabase";

export const fetchApplicationsWithAppointment = async (countryId, status, hasAppointment) => {
    if (!countryId) return [];

    let query = supabase
        .from("applications")
        .select(`*,application_documents (*),application_passport (*),application_payment (*),application_personal_info (*),application_visa_details (*)`)
        .eq("country_id", countryId);

    // Dynamic status
    if (status) {
        query = query.eq("status", status);
    }

    // Appointment date filter
    if (hasAppointment) {
        query = query.not("appointment_date", "is", null);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};