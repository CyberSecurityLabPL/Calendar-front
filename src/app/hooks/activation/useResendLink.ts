import { API_URLS } from "@/app/api/urls"
import { useMutation } from "@tanstack/react-query"

export const useResendLink = () => {
    const resendLink = useMutation(
        async (email: string) => {
            const response = await fetch(API_URLS.RESEND_LINK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: email
            });

            if ('error' in response) {
                console.error("Error while resending activation link:", response.error);
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
        resendLink
    }
}