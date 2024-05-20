import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

import { UserForm } from '../UserForm';
import { User } from '@/types/User';

interface UserOptionsProps {
    user: User;
    }

const UserOptions = ({user}: UserOptionsProps )=> {
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);


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
        <DropdownMenuItem>Usuń użytkownika</DropdownMenuItem>
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