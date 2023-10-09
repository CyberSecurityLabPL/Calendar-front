import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { useQuery } from "@tanstack/react-query";

export const usePrintHours = (userId: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${month}`;

    const {
        data: hoursBlob,
        isLoading: pdfIsLoading,
        error: pdfError
    } = useQuery(
        ["printHours"],
        async () => {
            const response = await fetchAPI(API_URLS.PRINT_HOURS_TO_PDF+formattedDate+"?userId="+userId);

            if ('error' in response) {
                console.error("Error fetching users:", response.error);
                throw response.error;
            }

            const pdfBlob = await response.blob();
            return pdfBlob;
        }
    )

    return {
        hoursBlob: hoursBlob ?? null,
        pdfIsLoading,
        pdfError
    }
}

