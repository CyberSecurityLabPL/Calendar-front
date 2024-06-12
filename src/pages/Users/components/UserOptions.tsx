import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useUsers from '@/hooks/useUsers';
import { UserRole } from '@/types/User';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';

import { UserForm } from './UserForm';

interface UserOptionsProps {
  user: UserRole;
}

const UserOptions = ({ user }: UserOptionsProps) => {
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const { deleteUser, deleteUserPending } = useUsers();

  const handleDeleteUser = async () => {
    deleteUser(user.id)
      .then(() => {
        toast.success('Pomyślnie usunięto użytkownika!');
      })
      .catch(error => {
        console.error('Failed to delete user:', error);
        let errorMessage = 'Wystąpił błąd podczas usuwania użytkownika';
        if (error?.data?.message === "You can't delete admin account") {
          errorMessage = 'Nie możesz usunąć administratora';
        }
        toast.error(errorMessage);
      });
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
        <DropdownMenuItem
          className="text-red-800"
          onClick={handleDeleteUser}
          disabled={deleteUserPending}>
          {' '}
          Usuń użytkownika
        </DropdownMenuItem>
        <DropdownMenuItem>Kalendarz użytkownika</DropdownMenuItem>
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
