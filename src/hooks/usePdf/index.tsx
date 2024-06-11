import { useQuery, useQueryClient } from '@tanstack/react-query';

import { monthlyHoursQueryOptions } from './monthlyHoursQueryOptions';

const usePdf = (month: string) => {
  const queryClient = useQueryClient();

  const {
    data: monthlyHoursPdf,
    refetch: monthlyHoursPdfRefetch,
    isLoading: monthlyHoursPdfLoading,
    isError: monthlyHoursPdfError
  } = useQuery({
    ...monthlyHoursQueryOptions(month),
    enabled: false // Ensure the query does not run automatically
  });

  return {
    monthlyHoursPdf,
    monthlyHoursPdfRefetch,
    monthlyHoursPdfLoading,
    monthlyHoursPdfError
  };
};

export default usePdf;
