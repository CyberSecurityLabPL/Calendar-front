import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { MyInfo } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useGetMyInfo = () => {
    const {
        data: userInfo,
        isLoading: userInfoIsLoading,
        error: userInfoError,
    } = useQuery<MyInfo>(
        ["userInfo"],
        async () => {
            const response = await fetchAPI(API_URLS.GET_MY_INFO);

            if ('error' in response) {
                console.error("Error fetching user info:", response.error);
                throw response.error;
            }

            const data = await response.json();
            return data;
        }
    );

    return {
        userInfo,
        userInfoIsLoading,
        userInfoError,
    };
}
