import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useHoursQueryOptions } from './useHoursQueryOptions';

const useUserHours = (userId: string) => {
  const {
    data: userHours,
    isLoading: userHoursLoading,
    isError: userHoursError,
    error
  } = useSuspenseQuery(useHoursQueryOptions(userId));

  return {
    userHours,
    userHoursLoading,
    userHoursError,
    error
  };
};

export default useUserHours;
