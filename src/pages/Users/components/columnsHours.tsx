import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import hoursFieldNames, { Hours } from '@/types/Hours';
import { ColumnDef } from '@tanstack/react-table';
import { getHours, getMinutes } from 'date-fns';
import { ArrowUpDown, Info } from 'lucide-react';

import HoursOptions from './HoursOptions';

export const columns: ColumnDef<Hours>[] = [
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className="text-left">Data pracy</div>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.startTime);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return <div className="ml-4">{`${day}-${month}-${year}`}</div>;
    },
    enableSorting: true
  },
  {
    accessorKey: 'startHour',
    header: () => <div className="text-left">Początek pracy</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.startTime);
      const hours = getHours(date).toString().padStart(2, '0');
      const minutes = getMinutes(date).toString().padStart(2, '0');
      return <div className="ml-4">{`${hours}:${minutes}`}</div>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'endTime',
    header: () => <div className="text-left">Koniec pracy</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.endTime);
      const hours = getHours(date).toString().padStart(2, '0');
      const minutes = getMinutes(date).toString().padStart(2, '0');
      return <div className="ml-4">{`${hours}:${minutes}`}</div>;
    },
    enableSorting: false
  },
  {
    accessorKey: 'tasks',
    header: () => <div className="text-left">Zadania</div>,
    cell: ({ row }) => {
      const hoursFieldNames = row.original;
      return (
        <div>
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
              <Info />
            </HoverCardTrigger>
            <HoverCardContent>{hoursFieldNames.tasks}</HoverCardContent>
          </HoverCard>
        </div>
      );
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
];

export default hoursFieldNames;
