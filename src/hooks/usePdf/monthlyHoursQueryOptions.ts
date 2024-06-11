import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const monthlyHoursQueryOptions = (month: string) =>
  queryOptions({
    queryKey: ['monthlyHoursPdf', month],
    queryFn: async () => {
      try {
        Axios.get(
          URLS.GET_MONTHLY_HOURS_PDF(month),
          { responseType: 'blob' } // !!!
        ).then(response => {
          window.open(URL.createObjectURL(response.data));
        });
      } catch (err) {
        console.error(err);
        throw new Error('Error fetching monthly hours PDF');
      }
    }
  });
