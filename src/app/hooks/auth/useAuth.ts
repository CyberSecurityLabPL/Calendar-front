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
                body: JSON.stringify(user),
                credentials: "include"
            });

            if (response.status !== 200) {
                throw new Error("Logowanie nie powiodło się");
            }
        });

    return {
        login
    };
};

