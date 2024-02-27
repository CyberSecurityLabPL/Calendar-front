import { API_URLS } from "./urls";

interface RequestOptions {
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
}

type FetchAPIReturnType = Response | { error: Error };

export const fetchAPI = async (
  url: string,
  options?: RequestOptions
): Promise<FetchAPIReturnType> => {
  const defaultHeaders = {
    "Content-Type": "application/json"
  };

  const requestOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers ?? {})
    },
    credentials: "include" as RequestCredentials
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 403) {
      await refreshTokenAndRetry(url, requestOptions);
    }

    return response;
  } catch (error) {
    console.error(error);
    return { error: error as Error };
  }
};

const refreshTokenAndRetry = async (
  url: string,
  requestOptions: RequestOptions
) => {
  try {
    const refreshResponse = await fetch(API_URLS.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include" as RequestCredentials
    });

    if (refreshResponse.status === 200) {
      const refreshedResponse = await fetch(url, {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials
      });

      return refreshedResponse;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    throw new Error("Token refresh failed");
  }
};
