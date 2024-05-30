// import { URLS } from '@/config/urls';
// import { Hours } from '@/types/Hours';
// import { Axios } from '@/utils/Axios';
// import { queryOptions } from '@tanstack/react-query';

// export const monthlyHoursQueryOptions = (date: string) =>
//   queryOptions({
//     queryKey: ['monthlyHours'],
//     queryFn: async () =>
//       Axios.get<Hours[]>(URLS.GET_MONTHLY_HOURS(date))
//         .then(res => res.data || [])
//         .catch(err => {
//           console.error(err);
//         })
//   });
