import { API_URLS } from "@/app/api/urls"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchAPI } from "@/app/api/fetchApi";
import { AddUserRequest } from "./types";

export const useAddUser = () => {
        const addUser = useMutation(
            async (newUser: AddUserRequest) => {
                const response = await fetchAPI(API_URLS.ADD_USER, {
                    method: "POST",
                    body: JSON.stringify(newUser)
                })

                if ('error' in response) {
                    console.error("Error adding user:", response.error);
                    throw response.error; 
                }

                const json = await response.json()

                if (json.token) {
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("refreshToken", json.refreshToken);

                    return json
                }
            });

        return {
            addUser
        };
    }
