import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Hours } from "./types";
import { fetchAPI } from "@/app/api/fetchApi";
import { API_URLS } from "@/app/api/urls";

export const useHours = (userId?: string) => {
  const queryClient = useQueryClient();
  const {
    data: hoursData,
    isLoading: hoursIsLoading,
    error: hoursError
  } = useQuery<Hours[]>(["hours"], async () => {
    const response = await fetchAPI(API_URLS.GET_ALL_USER_TASKS+`?userId=${userId ?? ''}`);

    if ("error" in response) {
      console.error("Error fetching user hours:", response.error);
      throw response.error;
    }

    const data = await response.json();

    return data;
  });

  const addHours = useMutation(
    (newHours: Hours) =>
      fetchAPI(API_URLS.ADD_USER_TASK, {
        method: "POST",
        body: JSON.stringify(newHours)
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["hours"]});
      }
    }
  );

  return {
    data: hoursData,
    hoursIsLoading,
    hoursError,
    addHours
  };
};
