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
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (hours) {
      const start = new Date(hours.startTime);
      const end = new Date(hours.endTime);
      start.setHours(start.getHours() + 2);
      end.setHours(end.getHours() + 2);
      setSelectedDate(start.toISOString().substr(0, 10));
      setWorkStart(start.toISOString().substr(11, 5));
      setWorkEnd(end.toISOString().substr(11, 5));
      setTasks(hours.tasks);
      setValue('startTime', start);
      setValue('endTime', end);
      setValue('tasks', hours.tasks);
    }
  }, [hours, setValue]);

  const handleDeleteHours = async () => {
    try {
      await deleteHours(hours.hoursId);
      toast.success('Pomyślnie usunięto godziny!');
    } catch (error) {
      console.error('Failed to delete hours:', error);
      let errorMessage = 'Wystąpił błąd podczas usuwania godzin';
      toast.error(errorMessage);
    }
  };

  const handleEditHours = handleSubmit(async (data: HoursRequest) => {
    if (!selectedDate) {
      toast.error('Data nie została wybrana');
      return;
    }

    const createDate = (date: string, time: string) => {
      const [hours, minutes] = time.split(':');
      const dateObj = new Date(`${date}T${hours}:${minutes}:00`);
      dateObj.setHours(dateObj.getHours() + 2);
      return new Date(dateObj);
    };

    const startDate = createDate(selectedDate, workStart);
    const endDate = createDate(selectedDate, workEnd);

    const requestData: HoursRequest = {
      ...data,
      startTime: new Date(startDate),
      endTime: new Date(endDate),
      tasks: tasks
    };

    try {
      if (hours) {
        await editHours({ ...requestData, hoursId: hours.hoursId });
        toast.success('Pomyślnie zedytowano dane!');
      } else {
        await addHours(requestData);
        toast.success('Pomyślnie dodano!');
      }
    } catch (error) {
      console.error('Failed to submit data:', error);
      toast.error('Wystąpił błąd podczas dodawania godzin pracy');
    } finally {
      setDialogOpened(false);
    }
  });

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
          <DropdownMenuItem onClick={() => setDialogOpened(true)}>
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
        workStart={workStart}
        setWorkStart={setWorkStart}
        workEnd={workEnd}
        setWorkEnd={setWorkEnd}
        tasks={tasks}
        setTasks={setTasks}
        hours={hours}
        reset={reset}
        setValue={setValue}
        handleSubmit={handleEditHours}
        register={register}
        handleDeleteHours={handleDeleteHours}
        editingEventId={null}
      />
    </>
  );
};

export default HoursOptions;
