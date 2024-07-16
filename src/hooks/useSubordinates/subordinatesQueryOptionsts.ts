import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const subordinatesQueryOptions = queryOptions({
  queryKey: ['subordinates'],
  queryFn: async () =>
    Axios.get(URLS.GET_SUBORDINATES())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
