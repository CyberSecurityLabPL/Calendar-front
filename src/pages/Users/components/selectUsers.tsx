import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useUsers from '@/hooks/useUsers';

interface SelectUsersProps {
  selectedUser: string | null;
  setSelectedUser: (
    userId: string | null | '074221c8-1545-4e4b-a241-60addeaa0764'
  ) => void;
}

const SelectUsers: React.FC<SelectUsersProps> = ({
  selectedUser,
  setSelectedUser
}) => {
  const { users, usersLoading, usersError } = useUsers();

  const handleChange = (value: string) => {
    setSelectedUser(value);
  };

  const filteredUsers = users?.filter(user => user.role === 'ROLE_USER');

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Użytkownicy" />
      </SelectTrigger>
      <SelectContent>
        {usersLoading ? (
          <SelectItem value="" disabled>
            Ładowanie...
          </SelectItem>
        ) : usersError ? (
          <SelectItem value="" disabled>
            Błąd ładowania danych
          </SelectItem>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.lastName}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="" disabled>
            Brak użytkowników
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectUsers;
