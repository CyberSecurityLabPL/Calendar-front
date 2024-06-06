import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Hours, HoursRequest } from '@/types/Hours';
import { timeToDate, timeToHours } from '@/utils/Time';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { TextArea } from '@hilla/react-components/TextArea.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface DialogFormProps {
  isDialogOpen: boolean;
  setDialogOpened: (open: boolean) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  workStart: string;
  setWorkStart: (value: string) => void;
  workEnd: string;
  setWorkEnd: (value: string) => void;
  tasks: string;
  setTasks: (value: string) => void;
  handleDeleteHours: (hoursId: string) => Promise<void>;
  editingEventId: string | null;
  setEditingEventId: (id: string | null) => void;
  addHours: (data: HoursRequest) => Promise<Hours>;
  editHours: (data: HoursRequest) => Promise<Hours>;
  hours?: Hours;
  hoursId?: string;
}

interface TimePickerDetail {
  value: string;
}

const DialogForm = ({
  isDialogOpen,
  setDialogOpened,
  selectedDate,
  setSelectedDate,
  workStart,
  setWorkStart,
  workEnd,
  setWorkEnd,
  tasks,
  setTasks,
  handleDeleteHours,
  editingEventId,
  addHours,
  editHours,
  hours
}: DialogFormProps) => {
  const handleClose = () => {
    setDialogOpened(false);
  };

  const { handleSubmit, setValue, register } = useForm<HoursRequest>({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      tasks: ''
    }
  });

  useEffect(() => {
    if (hours) {
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
    }
  }, [hours, setValue, setSelectedDate, setWorkStart, setWorkEnd, setTasks]);

  const onSubmit = async (data: HoursRequest) => {
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
      startTime: startDate,
      endTime: endDate,
      tasks
    };

    try {
      if (editingEventId) {
        await editHours({ ...requestData, hoursId: editingEventId });
        toast.success('Pomyślnie zedytowano dane!');
      } else {
        await addHours(requestData);
        toast.success('Pomyślnie dodano!');
      }
      setDialogOpened(false);
    } catch (error) {
      if (editingEventId) {
        toast.error('Wystąpił błąd podczas edytowania godzin');
      } else {
        toast.error('Wystąpił błąd podczas dodawania godzin');
      }
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!editingEventId) return;
    try {
      await handleDeleteHours(editingEventId);
      toast.success('Pomyślnie usunięto godziny!');
      handleClose();
    } catch (error) {
      console.error('Failed to delete hours:', error);
      toast.error('Wystąpił błąd podczas usuwania godzin');
    }
  };

  return (
    <Dialog
      opened={isDialogOpen}
      onOpenedChanged={({ detail }) => {
        setDialogOpened(detail.value);
      }}
      footerRenderer={() => (
        <>
          <button style={{ display: 'none' }}></button>
        </>
      )}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center text-xl">{selectedDate}</div>
        <VerticalLayout className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right col-span-2">
              Godzina rozpoczęcia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker
                value={workStart}
                onValueChanged={({ detail }: { detail: TimePickerDetail }) => {
                  setWorkStart(detail.value);
                  setValue(
                    'startTime',
                    new Date(`${selectedDate}T${detail.value}:00`)
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right col-span-2">
              Godzina zakończenia pracy
            </Label>
            <div className="col-span-2">
              <TimePicker
                value={workEnd}
                onValueChanged={({ detail }: { detail: TimePickerDetail }) => {
                  setWorkEnd(detail.value);
                  setValue(
                    'endTime',
                    new Date(`${selectedDate}T${detail.value}:00`)
                  );
                }}
              />
            </div>
          </div>
          <div className="grid cols-12 text-center">
            <TextArea
              label="Task"
              value={tasks}
              onValueChanged={event => {
                setTasks(event.detail.value);
              }}
              {...register('tasks')}
            />
          </div>
          <div className="flex w-full basis-1/2 gap-4 mt-4">
            <Button
              className="basis-1/2"
              type="button"
              variant="outline"
              onClick={handleClose}>
              Wyjdź
            </Button>
            {editingEventId && (
              <Button type="button" onClick={handleDelete} color="secondary">
                Usuń
              </Button>
            )}
            <Button type="submit" color="primary">
              {editingEventId ? 'Aktualizuj' : 'Dodaj'}
            </Button>
          </div>
        </VerticalLayout>
      </form>
    </Dialog>
  );
};

export default DialogForm;
