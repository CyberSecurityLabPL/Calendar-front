import { useSuspenseQuery } from '@tanstack/react-query';

import { usersQueryOptions } from './usersQueryOptions';

const useUsers = () => {
  const {
    data: users,
    refetch: usersRefetch,
    isLoading: usersLoading,
    isError: usersError
  } = useSuspenseQuery(usersQueryOptions);

  return {
    users,
    usersRefetch,
    usersLoading,
    usersError
  };
};

export default useUsers;
