import { API_URLS } from "./urls";

interface RequestOptions {
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: string;
}

type FetchAPIReturnType =   | Response  | { error: Error };

export const fetchAPI = async (url: string, options?: RequestOptions): Promise<FetchAPIReturnType> => {
    const sessionToken = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refreshToken")

    const defaultHeaders = {
        "Content-Type": "application/json",
    }

    const requestOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options?.headers,
            Authorization: `Bearer ${sessionToken}`
        }
    }

    try {
        const response = await fetch(url, requestOptions)
        if (response.status === 403) {
            const refreshResponse = await fetch(API_URLS.REFRESH, {
                method: "POST",
                headers: {
                    ...defaultHeaders,
                    Authorization: `Bearer ${refreshToken}`
                }
            })

            if (refreshResponse.status === 200) {
                const { token, refreshToken } = await refreshResponse.json()
                localStorage.setItem("token", token)
                localStorage.setItem("refreshToken", refreshToken)

                const refreshedResponse = await fetch(url, {
                    ...requestOptions,
                    headers: {
                        ...defaultHeaders,
                        Authorization: `Bearer ${token}`
                    }
                })
                const refreshedData = await refreshedResponse
                return refreshedData
            } else {
                throw new Error("Token refresh failed")
            }
        } else {
            return response
        }
    } catch (error) {
        console.error(error)
        return {error: error as Error} 
    }
}