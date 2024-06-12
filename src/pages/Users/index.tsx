import useMe from '@/hooks/useMe';
import useUsers from '@/hooks/useUsers';

import { DataTable } from './components/DataTable';
import { columns } from './components/columnsUsers';

export default function Users() {
  const { users } = useUsers();
  const { me, meLoading, meError } = useMe();

  if (!users) return <p>Brak użytkowników</p>;
  if (meLoading) return <p>Loading...</p>;
  if (meError) return <p>Error loading user data</p>;

  return (
    <div className="container w-full mx-auto py-10">
      <DataTable columns={columns} data={users} userRole={me.role} />
    </div>
  );
}
