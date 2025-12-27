import { useQuery } from "@tanstack/react-query";
import { fetchVisaDetailsForCountry } from "../../functions/fetchVisaDetailsForCountry";

export function useVisaDetailsForCountry({ countryId, visitorCountryId, visaId }) {
    return useQuery({
        queryKey: ["visaDetails", countryId, visitorCountryId, visaId],
        queryFn: () => fetchVisaDetailsForCountry({ countryId, visitorCountryId, visaId }),
        enabled: !!countryId && !!visitorCountryId && !!visaId,
        refetchOnWindowFocus: false,
    });
}