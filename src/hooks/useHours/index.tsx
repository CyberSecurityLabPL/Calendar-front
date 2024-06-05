import { URLS } from '@/config/urls';
import { Hours, HoursRequest } from '@/types/Hours';
import { Axios } from '@/utils/Axios';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query';

import { hoursQueryOptions } from './hoursQueryOptions';

const useHours = (date?: string) => {
  const queryClient = useQueryClient();

  const {
    data: hours,
    refetch: hoursRefetch,
    isLoading: hoursLoading,
    isError: hoursError
  } = useSuspenseQuery(hoursQueryOptions);

  const {
    mutateAsync: addHours,
    isPending: addHoursPending,
    isError: addHoursError
  } = useMutation({
    mutationFn: (hoursData: Hours): Promise<Hours> =>
      Axios.post(URLS.ADD_HOURS(), hoursData).then(res => {
        queryClient.invalidateQueries({ queryKey: ['hours'] });
        return res.data;
      })
  });

  const {
    mutateAsync: editHours,
    isPending: editHoursPending,
    isError: editHoursError
  } = useMutation({
    mutationFn: (
      hoursData: HoursRequest & { hoursId: string }
    ): Promise<HoursRequest> =>
      Axios.put(URLS.EDIT_HOURS(hoursData.hoursId), {
        ...hoursData,
        startTime: hoursData.startTime.toISOString(),
        endTime: hoursData.endTime.toISOString()
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['hours'] });
        return res.data;
      })
  });

  const {
    mutateAsync: deleteHours,
    isPending: deleteHoursPending,
    isError: deleteHoursError
  } = useMutation({
    mutationFn: (id: string): Promise<void> =>
      Axios.delete(URLS.DELETE_HOURS(id || '')).then(res => {
        queryClient.invalidateQueries({ queryKey: ['hours'] });
        return res.data;
      })
  });

  return {
    hours,
    hoursRefetch,
    hoursLoading,
    hoursError,

    addHours,
    addHoursPending,
    addHoursError,

    editHours,
    editHoursPending,
    editHoursError,

    deleteHours,
    deleteHoursPending,
    deleteHoursError
  };
};

export default useHours;
