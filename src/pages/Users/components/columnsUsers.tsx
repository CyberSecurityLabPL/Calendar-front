import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import userFieldNames, { Contract, Role, User } from '@/types/User';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import UserOptions from './UserOptions';

const roleTranslation = {
  [Role.ADMIN]: 'Administrator',
  [Role.USER]: 'Użytkownik',
  [Role.MANAGER]: 'Manager'
};

const contractTranslation = {
  [Contract.ZLECENIE]: 'Umowa zlecenie',
  [Contract.PRACA]: 'Umowa o pracę'
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'firstName',
    header: () => <div className="text-right">{userFieldNames.firstName}</div>
  },
  {
    accessorKey: 'lastName',
    header: () => <div className="text-right">{userFieldNames.lastName}</div>
  },
  {
    accessorKey: 'role',
    header: () => <div className="text-right">{userFieldNames.role}</div>,
    cell: ({ row }) => <p>{roleTranslation[row.original.role]}</p>
  },
  {
    accessorKey: 'contract',
    header: () => <div className="text-right">{userFieldNames.contract}</div>,
    cell: ({ row }) => <p>{contractTranslation[row.original.contract]}</p>
  },
  {
    accessorKey: 'position',
    header: () => <div className="text-right">{userFieldNames.position}</div>
  },

  {
    id: 'akcje',
    cell: ({ row }) => {
      const user = row.original;

      return <UserOptions user={user} />;
    }
  }
  // ...
];
export default userFieldNames;
