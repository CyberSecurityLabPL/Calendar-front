import { URLS } from '@/config/urls';
import { useNavigate } from '@tanstack/react-router';
import Axios from 'axios';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Axios.post(URLS.LOGOUT())
      .then(() => {
        localStorage.removeItem('user');
        navigate({ to: '/login' }); // Use navigate with a single string argument for the URL
      })
      .catch(error => {
        console.error(error);
        // Optionally, handle errors (e.g., show a toast notification)
      });
  };

  return logout;
};
