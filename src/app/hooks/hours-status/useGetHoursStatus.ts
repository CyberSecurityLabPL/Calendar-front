import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { GetHourStatus } from "./types";

export const useGetHoursStatus = async () => {

    const currentDate = new Date();
    const getCurrentMonth = currentDate.getMonth() + 1;
    const getCurrentYear = currentDate.getFullYear();

    try {
        const response = await fetchAPI(API_URLS.GET_HOURS_STATUS+getCurrentYear+"/"+getCurrentMonth);

        if ('error' in response) {
            console.error("Error fetching user hours:", response.error);
            return [];
        }

        const data: GetHourStatus[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user hours:", error);

        return [];
    }
};