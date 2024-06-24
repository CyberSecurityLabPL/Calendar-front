import useHours from '@/hooks/useHours';
import useMe from '@/hooks/useMe';

import { DataTable } from './components/DataTable';
import { columns } from './components/columnsHours';

export default function HoursTable() {
  const { hours } = useHours();
  const { me } = useMe();
  if (!hours) return <p>Brak godzin</p>;

  const initialState = {
    sorting: [
      {
        id: 'startTime',
        desc: true
      }
    ]
  };

  return (
    <div className="container mx-auto w-3/4 py-10">
      <DataTable
        columns={columns}
        data={hours}
        initialState={initialState}
        userRole={me.role}
      />
    </div>
  );
}
