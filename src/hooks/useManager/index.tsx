// useAssignManager.ts
import { useSuspenseQuery } from '@tanstack/react-query';

import { assignManagerQueryOptions } from './assignManagerQueryOptions';

export const useAssignManager = (
  selectedManager: string | null,
  selectedUser: string | null
) => {
  if (!selectedManager || !selectedUser) {
    return {
      assignManager: null,
      assignManagerRefetch: () => Promise.reject('Missing parameters'),
      assignManagerLoading: false,
      assignManagerError: 'Missing parameters'
    };
  }

  const {
    data: assignManager,
    refetch: assignManagerRefetch,
    isLoading: assignManagerLoading,
    isError: assignManagerError
  } = useSuspenseQuery(
    assignManagerQueryOptions(selectedManager, selectedUser)
  );

  return {
    assignManager,
    assignManagerRefetch,
    assignManagerLoading,
    assignManagerError
  };
};
