import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useUsers from '@/hooks/useUsers';
import { Contract, Role, User } from '@/types/User';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

import { UserForm } from '../UserForm';

interface UserOptionsProps {
  user: User;
}

const UserOptions = ({ user }: UserOptionsProps) => {
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const { deleteUser, deleteUserPending } = useUsers();

  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        id: user.id,
        companyId: '',
        firstName: '',
        lastName: '',
        workYears: 0,
        email: '',
        contract: Contract.ZLECENIE,
        position: '',
        workStart: new Date(),
        role: Role.ADMIN
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
          Edytuj dane
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-800"
          onClick={handleDeleteUser}
          disabled={deleteUserPending}>
          {' '}
          Usuń użytkownika
        </DropdownMenuItem>
      </DropdownMenuContent>
      <UserForm
        user={user}
        isOpen={isEditModalOpen}
        onOpenChange={() => setEditModalOpen(!isEditModalOpen)}
      />
    </DropdownMenu>
  );
};

export default UserOptions;
