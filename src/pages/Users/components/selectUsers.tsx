import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useUsers from '@/hooks/useUsers';

const SelectUsers = () => {
  const { users, usersLoading, usersError } = useUsers();

  return (
    <Select>
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
