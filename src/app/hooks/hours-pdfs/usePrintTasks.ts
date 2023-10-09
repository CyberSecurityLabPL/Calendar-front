import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { useQuery } from "@tanstack/react-query";

export const usePrintTasks = (userId: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${month}`;

    const {
        data: tasksBlob,
        isLoading: pdfIsLoading,
        error: pdfError
    } = useQuery(
        ["printTasks"],
        async () => {
            const response = await fetchAPI(API_URLS.PRINT_TASKS_TO_PDF + formattedDate + "?userId=" + userId);

            if ('error' in response) {
                console.error("Error fetching users:", response.error);
                throw response.error;
            }

            const pdfBlob = await response.blob();
            return pdfBlob;
        }
    )

    return {
        tasksBlob: tasksBlob ?? null,
        pdfIsLoading,
        pdfError
    }
}


