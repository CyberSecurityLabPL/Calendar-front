import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { TotalHours } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useGetTotalHours = () => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    const {
        data: totalHours,
        error: totalHoursError,
    } = useQuery<TotalHours[]>(
        ["totalHours"],
        async () => {
            const response = await fetchAPI(API_URLS.GET_TOTAL_HOURS+"?year="+year+"&month="+month);

            if ('error' in response) {
                console.error("Error fetching users:", response.error);
                throw response.error;
            }

            const data: TotalHours[] = await response.json();
            return data;
        }
    );

    return {
        totalHours: totalHours ?? [],
        totalHoursError,
    };
}