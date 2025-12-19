import supabase from "../util/Supabase/supabase";

export const getApplicationById = async (applicationId) => {
  const { data, error } = await supabase.from("applications").select(`*,
    application_personal_info (*),application_visa_details (*),application_documents (*),application_payment (*)
    `).eq("id", applicationId).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};