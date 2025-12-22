// import { endPoint_Embassy } from "../api/api_url/apiUrl";
// import { axiosInstance_embassy } from "../api/axiosInstance/axiosInstance";
// import { buildSearchQueries, delay, isValidEmbassy } from "../util/embassy/embassyUtils";

// export const fetchEmbassiesLocation = async ({ destinationCountry, userCountry }) => {
//     // console.log('Receive data for fetching embassy details', destinationCountry, userCountry);

//     if (!destinationCountry || !userCountry) return [];

//     const queries = buildSearchQueries(destinationCountry, userCountry);
//     console.log('queries', queries);

//     let allResults = [];

//     for (let i = 0; i < queries.length; i++) {
//         const res = await axiosInstance_embassy.get(endPoint_Embassy, {
//             params: {
//                 q: queries[i],
//                 format: "json",
//                 addressdetails: 1,
//                 extratags: 1,
//                 limit: 50,
//             },
//         });
//         console.log("Response", res);

//         allResults.push(...res?.data);

//         // Nominatim rule: 1 req/sec
//         if (i < queries.length - 1) await delay(1100);
//     }

//     console.log('Response for fetching embassy', allResults);

//     if (!allResults.length) return [];

//     const embassies = allResults.filter((p) => isValidEmbassy(p, destinationCountry, userCountry))
//         .map((p) => {
//             const address = p.address || {};
//             const name = p.display_name?.split(",")[0] || "Embassy";

//             return {
//                 id: p.place_id,
//                 name,
//                 type: name.toLowerCase().includes("consulate")
//                     ? "Consulate"
//                     : name.toLowerCase().includes("high commission")
//                         ? "High Commission"
//                         : "Embassy",
//                 address: p.display_name,
//                 phone: p.extratags?.phone || "Not available",
//                 workingHours: p.extratags?.opening_hours || "Contact embassy",
//                 website: p.extratags?.website || null,
//                 email: p.extratags?.email || null,
//                 city: address.city || address.town || address.village || "",
//                 state: address.state || "",
//                 coordinates: {
//                     lat: Number(p.lat),
//                     lng: Number(p.lon),
//                 },
//                 importance: p.importance || 0,
//                 openStreetMapUrl: `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}`,
//             };
//         })
//         .sort((a, b) => b.importance - a.importance);

//     return embassies;
// }






import { endPoint_Embassy } from "../api/api_url/apiUrl";
import { axiosInstance_embassy } from "../api/axiosInstance/axiosInstance";

export const fetchEmbassiesLocation = async ({destinationCountry, userCountry}) => {
    const query = `Embassy of ${destinationCountry} in ${userCountry}`;
    console.log(query);

    const res = await axiosInstance_embassy.get(endPoint_Embassy, {
        params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
        },
    });
    console.log('Response', res);

    return res.data.map((item) => ({
        name: item.display_name,
        lat: item.lat,
        lng: item.lon,
        type: item.type,
    }));
};