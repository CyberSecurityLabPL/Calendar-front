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
import { HoursRequest } from '@/types/Hours';
import { timeToDate, timeToHours } from '@/utils/Time';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface HoursOptionsProps {
  hours: Hours;
}

const HoursOptions = ({ hours }: HoursOptionsProps) => {
  const [isDialogOpen, setDialogOpened] = useState(false);
  const { deleteHours, deleteHoursPending, editHours, addHours } = useHours();
  const { handleSubmit, reset, setValue, register } = useForm<HoursRequest>({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      tasks: ''
    }
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workStart, setWorkStart] = useState<string>('08:00');
  const [workEnd, setWorkEnd] = useState<string>('16:00');
  const [tasks, setTasks] = useState<string>('');

  const handleEditClick = () => {
    const start = new Date(hours.startTime);
    const end = new Date(hours.endTime);
    start.setHours(start.getHours() + 2);
    end.setHours(end.getHours() + 2);
    setSelectedDate(timeToDate(start));
    setWorkStart(timeToHours(start));
    setWorkEnd(timeToHours(end));
    setTasks(hours.tasks);
    setValue('startTime', start);
    setValue('endTime', end);
    setValue('tasks', hours.tasks);
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
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
        workStart={workStart}
        setWorkStart={setWorkStart}
        workEnd={workEnd}
        setWorkEnd={setWorkEnd}
        tasks={tasks}
        setTasks={setTasks}
        reset={reset}
        setValue={setValue}
        handleSubmit={handleSubmit}
        register={register}
        handleDeleteHours={handleDeleteHours}
        editingEventId={hours.hoursId}
        addHours={addHours}
        editHours={editHours}
        hours={hours}
        hoursId={hours.hoursId}
      />
    </>
  );
};

export default HoursOptions;
