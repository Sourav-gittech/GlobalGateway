import { useQuery } from "@tanstack/react-query";
import { fetchEmbassiesLocation } from "../../functions/fetchEmbassyOfficeLocation";

export const useEmbassies = ({ destinationCountry, userCountry }) => {
    console.log('Query',destinationCountry, userCountry);
    
    return useQuery({
        queryKey: ["embassies", destinationCountry, userCountry],
        queryFn: () =>
            fetchEmbassiesLocation({
                destinationCountry,
                userCountry,
            }),
        enabled: !!destinationCountry && !!userCountry,
        staleTime: 1000 * 60 * 30, 
        retry: 1,
    });
};
