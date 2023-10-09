import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const deleteUser = useMutation(
        async (id: number) => {
            const response = await fetchAPI(API_URLS.DELETE_USER + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if ('error' in response) {
                console.error("Error while deleting user:", response.error);
                throw response.error;
            }

            const json = await response.json();
            queryClient.invalidateQueries({queryKey: ["usersInfo"]});

            if (json.token) {
                localStorage.setItem("token", json.token);
                localStorage.setItem("refreshToken", json.refreshToken);

                return json;
            }
        });

    return {
        deleteUser
    }
}