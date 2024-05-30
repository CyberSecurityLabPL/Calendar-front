import useHours from '@/hooks/useHours';

import { DataTable } from './DataTable';
import { columns } from './columnsHours';

export default function hoursTable() {
  const { hours } = useHours();

  if (!hours) return <p>Brak godzin</p>;
  return (
    <div className="container mx-auto w-full py-10">
      <DataTable columns={columns} data={hours} />
    </div>
  );
}