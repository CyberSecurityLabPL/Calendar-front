import useUsers from '@/hooks/useUsers';

const Users = () => {
  // Here we are using the hook 'useUsers' to fetch users from the backend. We are deconstructing the users element.
  const { users } = useUsers();
  return (
    <>
      {/* Here we map over the users array to display all of the users. */}
      {users?.map(user => {
        return (
          <div key={user.id}>
            <p>{user.firstName}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </>
  );
};

export default Users;
