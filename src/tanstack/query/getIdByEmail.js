"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../../functions/getUserId";

export const useGetIdByEmail = (email) => {

    const encoded = email;
    const decoded = decodeURIComponent(encoded);

    // console.log('Received user email', decoded);

    return useQuery({
        queryKey: ["userId", email],
        queryFn: () => getUserId(decoded),
        enabled: !!email,
    });
};