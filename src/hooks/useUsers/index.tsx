import { URLS } from '@/config/urls';
import { UserRequest } from '@/types/User';
import { Axios } from '@/utils/Axios';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query';

import { usersQueryOptions } from './usersQueryOptions';

const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    refetch: usersRefetch,
    isLoading: usersLoading,
    isError: usersError
  } = useSuspenseQuery(usersQueryOptions);

  const {
    mutateAsync: createUser,
    isPending: createUserPending,
    isError: createUserError
  } = useMutation({
    mutationFn: (userData: UserRequest): Promise<UserRequest> =>
      Axios.post(URLS.CREATE_USER(), userData).then(res => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        return res.data;
      })
  });

  const {
    mutateAsync: editUser,
    isPending: editUserPending,
    isError: editUserError
  } = useMutation({
    mutationFn: (userData: UserRequest): Promise<UserRequest> =>
      Axios.put(URLS.EDIT_USER(userData.id || ''), userData).then(res => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        return res.data;
      })
  });

  const {
    mutateAsync: deleteUser,
    isPending: deleteUserPending,
    isError: deleteUserError
  } = useMutation({
    mutationFn: (id: string): Promise<void> =>
      Axios.delete(URLS.DELETE_USER(id || '')).then(res => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        return res.data;
      })
  });

  return {
    users,
    usersRefetch,
    usersLoading,
    usersError,

    createUser,
    createUserPending,
    createUserError,

    editUser,
    editUserPending,
    editUserError,

    deleteUser,
    deleteUserPending,
    deleteUserError
  };
};

export default useUsers;
