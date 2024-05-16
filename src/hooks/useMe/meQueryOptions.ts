import { URLS } from '@/config/urls';
import { User } from '@/types/User';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const meQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: async () =>
    Axios.get<User>(URLS.ME())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
