import { URLS } from '@/config/urls';
import { CompanyDto } from '@/types/Company';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const companiesQueryOptions = queryOptions({
  queryKey: ['companies'],
  queryFn: async () =>
    Axios.get<CompanyDto[]>(URLS.GET_COMPANIES())
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      })
});
