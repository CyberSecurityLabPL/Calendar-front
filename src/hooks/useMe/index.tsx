import { useSuspenseQuery } from '@tanstack/react-query';

import { meQueryOptions } from './meQueryOptions';

const useMe = () => {
  const {
    data: me,
    refetch: meRefetch,
    isLoading: meLoading,
    isError: meError
  } = useSuspenseQuery(meQueryOptions);

  return {
    me,
    meRefetch,
    meLoading,
    meError
  };
};

export default useMe;
