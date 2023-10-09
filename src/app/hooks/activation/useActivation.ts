import { fetchAPI } from "@/app/api/fetchApi"
import { API_URLS } from "@/app/api/urls"
import { useMutation } from "@tanstack/react-query"
import { ActivationRequest } from "./types"

export const useActivation = () => {
    const activation = useMutation(
        async (user: ActivationRequest) => {
            const response = await fetchAPI(API_URLS.ACTIVATE_ACCOUNT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if ('error' in response) {
                console.error("Error while activating user:", response.error);
                throw response.error;
            }

            const json = await response.json();

            if (json.token) {
                localStorage.setItem("token", json.token);
                localStorage.setItem("refreshToken", json.refreshToken);

                return json;
            }
        });

    return {
        activation
    };
}