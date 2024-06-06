import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useHours from '@/hooks/useHours';
import DialogForm from '@/pages/Calendar/DialogForm';
import { Hours } from '@/types/Hours';
import { timeToDate } from '@/utils/Time';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface HoursOptionsProps {
  hours: Hours;
}

const HoursOptions = ({ hours }: HoursOptionsProps) => {
  const [isDialogOpen, setDialogOpened] = useState(false);
  const { deleteHours, deleteHoursPending } = useHours();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleEditClick = () => {
    setDialogOpened(true);
  };

  const handleDeleteHours = async () => {
    try {
      await deleteHours(hours.hoursId);
      toast.success('Pomyślnie usunięto godziny!');
      setDialogOpened(false);
    } catch (error) {
      console.error('Failed to delete hours:', error);
      let errorMessage = 'Wystąpił błąd podczas usuwania godzin';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (hours) {
      const start = new Date(hours.startTime);
      const end = new Date(hours.endTime);
      start.setHours(start.getHours() + 2);
      end.setHours(end.getHours() + 2);
      setSelectedDate(timeToDate(start));
    }
  }, [hours]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditClick}>
            Edytuj dane
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-800"
            onClick={handleDeleteHours}
            disabled={deleteHoursPending}>
            Usuń dane
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogForm
        isDialogOpen={isDialogOpen}
        setDialogOpened={setDialogOpened}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        hours={hours}
        hoursId={hours.hoursId}
      />
    </>
  );
};

export default HoursOptions;
