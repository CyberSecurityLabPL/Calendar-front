import useUsers from '@/hooks/useUsers';

import { DataTable } from './components/DataTable';
import { columns } from './components/columnsUsers';

export default function Users() {
  const { users } = useUsers();

  if (!users) return <p>Brak użytkowników</p>;
  return (
    <div className="container w-full mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
