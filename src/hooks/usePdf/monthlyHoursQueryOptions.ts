import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { queryOptions } from '@tanstack/react-query';

export const monthlyHoursQueryOptions = (
  month: string,
  userId: string | null
) =>
  queryOptions({
    queryKey: ['monthlyHoursPdf', month, userId],
    queryFn: async () => {
      try {
        const response = await Axios.get(URLS.GET_MONTHLY_HOURS_PDF(month), {
          params: { userId: userId },
          responseType: 'blob'
        });
        window.open(URL.createObjectURL(response.data));
      } catch (err) {
        console.error(err);
        throw new Error('Error fetching monthly hours PDF');
      }
    }
  });
