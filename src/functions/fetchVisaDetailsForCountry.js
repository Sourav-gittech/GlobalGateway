import supabase from "../util/Supabase/supabase";

export async function fetchVisaDetailsForCountry({ countryId, visitorCountryId, visaId }) {
  // console.log('country id', countryId, 'visitor country id', visitorCountryId, 'visa id', visaId);

  if (!countryId || !visitorCountryId || !visaId) return null;

  const res = await supabase.from("visa_details").select("*").eq("country_id", countryId).eq("visitor_country_id", visitorCountryId).eq("visa_id", visaId).maybeSingle();
  // console.log('Response for fetching visa details for specific country', res);

  if (res?.error) throw new Error(res?.error.message);

  return res?.data;
}
