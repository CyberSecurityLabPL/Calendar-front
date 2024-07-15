import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const meQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: async () =>
    Axios.get(URLS.ME())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
