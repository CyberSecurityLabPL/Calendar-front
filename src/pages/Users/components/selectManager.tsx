import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useUsers from '@/hooks/useUsers';

interface SelectManagerProps {
  selectedManager: string | null;
  setSelectedManager: (managerId: string | null) => void;
}

const SelectManager: React.FC<SelectManagerProps> = ({
  selectedManager,
  setSelectedManager
}) => {
  const { users, usersLoading, usersError } = useUsers();

  const handleChange = (value: string) => {
    setSelectedManager(value);
  };

  const filteredManagers = users?.filter(user => user.role === 'ROLE_MANAGER');

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Menadżerowie" />
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
        ) : filteredManagers && filteredManagers.length > 0 ? (
          filteredManagers.map(manager => (
            <SelectItem key={manager.id} value={manager.id}>
              {manager.lastName}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="" disabled>
            Brak menadżerów
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectManager;
