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
  setSelectedUser: (userId: string | null) => void;
}

const SelectUsers: React.FC<SelectUsersProps> = ({
  selectedUser,
  setSelectedUser
}) => {
  const { users, usersLoading, usersError } = useUsers();

  const handleChange = (value: string) => {
    setSelectedUser(value);
  };

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
        ) : users && users.length > 0 ? (
          users.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.lastName} {user.id}
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
