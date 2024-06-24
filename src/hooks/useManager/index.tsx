// useAssignManager.ts
import { URLS } from '@/config/urls';
import { User } from '@/types/User';
import { Axios } from '@/utils/Axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AssignManagerParams {
  managerId: string;
  userId: string;
}

export const useManager = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: assignManager,
    isPending: assignManagerLoading,
    isError: assignManagerError
  } = useMutation({
    mutationFn: ({
      managerId,
      userId
    }: AssignManagerParams): Promise<User | void> =>
      Axios.post(URLS.ASSIGN_MANAGER(managerId, userId)).then(res => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        return res.data;
      })
  });
  return {
    assignManager,
    assignManagerLoading,
    assignManagerError
  };
};
