import useHours from '@/hooks/useHours';
import { Hours, HoursRequest } from '@/types/Hours';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import DialogForm from './DialogForm';

interface CalendarProps {
  hours?: Hours;
}

export function Calendar({ hours }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpened] = useState(false);
  const { handleSubmit, reset, setValue, register } = useForm<HoursRequest>({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      tasks: ''
    }
  });

  const { addHours } = useHours(); // Add the addHours function from your hook

  const [workStart, setWorkStart] = useState<string>('08:00');
  const [workEnd, setWorkEnd] = useState<string>('16:00');
  const [tasks, setTasks] = useState<string>('');

  useEffect(() => {
    if (hours) {
      const start = new Date(hours.startTime);
      const end = new Date(hours.endTime);
      setWorkStart(start.toISOString().substr(11, 5)); // 'HH:MM'
      setWorkEnd(end.toISOString().substr(11, 5)); // 'HH:MM'
      setTasks(hours.tasks);
      setValue('startTime', start);
      setValue('endTime', end);
      setValue('tasks', hours.tasks);
    }
  }, [hours, setValue]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setDialogOpened(true);
  };

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
      startTime: new Date(startDate),
      endTime: new Date(endDate),
      tasks: tasks
    };

    try {
      await addHours(requestData);
      toast.success('Pomyślnie dodano!');
      setDialogOpened(false);
      reset();
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania godzin');
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-1/2">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={true}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="90vh"
          dateClick={handleDateClick}
        />
      </div>
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
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
      />
    </>
  );
}

export default Calendar;
