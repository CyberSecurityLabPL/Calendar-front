import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const assignManagerQueryOptions = (
  selectedManager: string,
  selectedUser: string
) =>
  queryOptions({
    queryKey: ['assignManager', selectedManager, selectedUser],
    queryFn: async () =>
      Axios.get(URLS.ASSIGN_MANAGER(selectedManager, selectedUser))
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          throw new Error('Failed to fetch assignManager data');
        })
  });
