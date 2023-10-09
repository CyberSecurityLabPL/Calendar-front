import { API_URLS } from "@/app/api/urls"
import { useMutation } from "@tanstack/react-query"
import { LoginRequest } from "./types";

export const useAuth = () => {
    const login = useMutation(
        async (user: LoginRequest) => {
            const response = await fetch(API_URLS.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const json = await response.json();

            if (json.token) {
                 localStorage.setItem("token", json.token);
                 localStorage.setItem("refreshToken", json.refreshToken);

                return json;
                
            } else {
                throw new Error("Logowanie nie powiodło się");
            }
        });

    return {
        login
    };
};

