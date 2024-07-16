import { useSuspenseQuery } from '@tanstack/react-query';
import { subordinatesQueryOptions } from './subordinatesQueryOptionsts';

const useSubordinates = () => {
  const {
    data: subordinates,
    refetch: subordinatesRefetch,
    isLoading: subordinatesLoading,
    isError: subordinatesError
  } = useSuspenseQuery(subordinatesQueryOptions);

  return {
    subordinates,
    subordinatesRefetch,
    subordinatesLoading,
    subordinatesError
  };
};

export default useSubordinates;
