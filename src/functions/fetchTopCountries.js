// services/fetchTopCountries.js
import supabase from "../util/Supabase/supabase";

export const fetchTopCountries = async () => {
    // Fetch applications
    const { data: applications, error: appError } = await supabase.from("applications").select("id, country_id");

    if (appError) throw appError;

    // Fetch countries
    const { data: countries, error: countryError } = await supabase.from("countries").select("id, name");

    if (countryError) throw countryError;

    // Build countryId → countryName map
    const countryMap = {};
    countries.forEach(c => {
        countryMap[c.id] = c.name;
    });

    // Aggregate applications by country
    const stats = {};

    applications.forEach(app => {
        const countryName = countryMap[app.country_id] || "Others";

        if (!stats[countryName]) {
            stats[countryName] = {
                country: countryName,
                applications: 0,
                revenue: 0,
            };
        }

        stats[countryName].applications += 1;
    });

    // Sort descending
    return Object.values(stats).sort(
        (a, b) => b.applications - a.applications
    );
};
