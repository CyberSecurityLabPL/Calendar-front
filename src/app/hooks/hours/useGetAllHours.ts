import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { Hours } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllHours = (userId?: string) => {
    const {
        data: hourData,
        isLoading: hoursIsLoading,
        error: hoursError
    } = useQuery<Hours[]>(
        ["hours"],
        async () => {
            const response = await fetchAPI(API_URLS.GET_ALL_USER_TASKS+`?userId=${userId ?? ''}`);

            if ('error' in response) {
                console.error("Error fetching user hours:", response.error);
                throw response.error;
            }

            const data = await response.json();
            
            return data;
        }
    );

    return {
        hourData: hourData ?? [],
        hoursIsLoading,
        hoursError,
    }
}
