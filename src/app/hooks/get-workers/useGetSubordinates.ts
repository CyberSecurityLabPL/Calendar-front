import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { GetSubordinatesProps } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useGetSubordinates = () => {
    const {
        data: subordinates,
        error: subordinatesError,
    } = useQuery<GetSubordinatesProps[]>(
        ["subordinates"],
        async () => {
            const response = await fetchAPI(API_URLS.GET_SUBORDINATES);

            if ('error' in response) {
                console.error("Error fetching users:", response.error);
                throw response.error;
            }

            const data: GetSubordinatesProps[] = await response.json();
            return data;
        }
    );

    return {
        subordinates: subordinates ?? [],
        subordinatesError,
    };
}