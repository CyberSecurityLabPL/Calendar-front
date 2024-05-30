import { Checkbox } from '@/components/ui/checkbox';
import hoursFieldNames, { Hours } from '@/types/Hours';
import { timestampToDate } from '@/utils/Date';
import { ColumnDef } from '@tanstack/react-table';
import { getHours, getMinutes } from 'date-fns';

import HoursOptions from './HoursOptions';

export const columns: ColumnDef<Hours>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'selectedDate',
    header: () => <div className="text-left">Data pracy</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.startTime);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    enableSorting: true
  },
  {
    accessorKey: 'startTime',
    header: () => <div className="text-left">Początek pracy</div>,
    cell: ({ row }) => {
      const date = timestampToDate(row.original.startTime);
      return `${getHours(date)}:${getMinutes(date).toString().padStart(2, '0')}`;
    }
  },
  {
    accessorKey: 'endTime',
    header: () => <div className="text-left">Koniec pracy</div>,
    cell: ({ row }) => {
      const date = timestampToDate(row.original.endTime);
      return `${getHours(date)}:${getMinutes(date).toString().padStart(2, '0')}`;
    }
  },

  {
    id: 'akcje',
    header: () => <div className="text-left">Akcja</div>,
    cell: ({ row }) => {
      const hour = row.original;

      return <HoursOptions hours={hour} />;
    }
  }
  // ...
];
export default hoursFieldNames;
