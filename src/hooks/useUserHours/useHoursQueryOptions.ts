import { URLS } from '@/config/urls';
import { Hours } from '@/types/Hours';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const useHoursQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['userHours'],
    queryFn: async () =>
      Axios.get<Hours[]>(URLS.GET_HOURS_FOR_USER(), {
        params: { userId: userId }
      })
        .then(res => res.data)
        .catch(err => {
          console.log(userId);
          console.error(err);
        })
  });
