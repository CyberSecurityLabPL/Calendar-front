import { URLS } from '@/config/urls';
import { Hours } from '@/types/Hours';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const hoursQueryOptions = queryOptions({
  queryKey: ['hours'],
  queryFn: async () =>
    Axios.get<Hours[]>(URLS.GET_HOURS())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
