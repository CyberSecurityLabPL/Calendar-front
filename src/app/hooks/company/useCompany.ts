import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { useQuery } from "@tanstack/react-query";


const useCompany = () => {
    const { data, error, isLoading } = useQuery(
        ['companies'],
        async () => {
            
            const response = await fetchAPI(API_URLS.GET_ALL_COMPANIES, {
                method: "GET",
            })

            if ("error" in response) {
                console.error("Error fetching user hours:", response.error);
                throw response.error;
              }
          
              const data = await response.json();
              return data;
        }
        , {
            refetchOnWindowFocus: false,
        });

    return { data, error, isLoading };
}

export default useCompany;