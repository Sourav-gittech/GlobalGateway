import { useQuery } from "@tanstack/react-query";
import { fetchTopCountries } from "../../functions/fetchTopCountries";

export const useTopCountries = () => {
  return useQuery({
    queryKey: ["top-countries"],
    queryFn: fetchTopCountries,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}