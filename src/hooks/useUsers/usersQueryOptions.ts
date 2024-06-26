import { URLS } from '@/config/urls';
import { UserRole } from '@/types/User';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: async () =>
    Axios.get<UserRole[]>(URLS.GET_USERS())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
