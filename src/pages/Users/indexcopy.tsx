import useHours from '@/hooks/useHours';

import { DataTable } from './components/DataTable';
import { columns } from './components/columnsHours';

export default function HoursTable() {
  const { hours } = useHours();

  if (!hours) return <p>Brak godzin</p>;

  const initialState = {
    sorting: [
      {
        id: 'startTime',
        desc: true // Sortowanie malejące (od najnowszych do najstarszych)
      }
    ]
  };

  return (
    <div className="container mx-auto w-3/4 py-10">
      <DataTable columns={columns} data={hours} initialState={initialState} />
    </div>
  );
}
