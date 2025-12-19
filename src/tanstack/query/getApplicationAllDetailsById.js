import { useQuery } from "@tanstack/react-query";
import { getApplicationById } from "../../functions/fatchSpecificApplicationAllDetailsById";

export const useApplicationById = (applicationId) => {
    return useQuery({
        queryKey: ["application", applicationId],
        queryFn: () => getApplicationById(applicationId),
        enabled: !!applicationId,
        staleTime: 5 * 60 * 1000,
    });
}