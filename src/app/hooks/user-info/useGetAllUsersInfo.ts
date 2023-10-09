import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { UserInfo } from "./types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsersInfo = () => {
    const {
        data: usersInfo,
        error: usersInfoError,
    } = useQuery<UserInfo[]>(
        ["usersInfo"],
        async () => {
            const response = await fetchAPI(API_URLS.GET_USER_INFO);

            if ('error' in response) {
                console.error("Error fetching users:", response.error);
                throw response.error;
            }

            const data: UserInfo[] = await response.json();
            return data;
        }
    );

    return {
        usersInfo: usersInfo ?? [],
        usersInfoError,
    };
}