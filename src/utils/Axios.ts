import { URLS } from '@/config/urls';
import { Route } from '@/routes/__root';
import axios from 'axios';

// axios.defaults.baseURL = 'http://10.34.100.134:8888/api';
axios.defaults.baseURL = 'http://localhost:8080/api';

axios.defaults.maxRedirects = 0;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('error', error);

    const originalRequest = error.config;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (!originalRequest.retry) {
        originalRequest.retry = true;
        console.debug('refreshing token and retrying request');
        return axios.post(URLS.REFRESH()).then(res => {
          if (res.status === 200) {
            return axios(originalRequest);
          }
        });
      } else {
        console.debug('redirecting to login');
        localStorage.removeItem('user');
        Route.router?.navigate({
          to: '/login',
          params: { reason: 'session-expired' }
        });
      }
    }
    return Promise.reject(error);
  }
);

export const Axios = axios;
