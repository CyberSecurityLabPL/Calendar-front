import useHours from '@/hooks/useHours';
import { HoursRequest } from '@/types/Hours';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import DialogForm from './DialogForm';

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpened] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const { handleSubmit, reset, setValue, register } = useForm<HoursRequest>({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      tasks: ''
    }
  });

  const { hours, addHours, editHours, deleteHours } = useHours();

  const [workStart, setWorkStart] = useState<string>('08:00');
  const [workEnd, setWorkEnd] = useState<string>('16:00');
  const [tasks, setTasks] = useState<string>('');

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setEditingEventId(null); // Clear editingEventId to add a new entry
    setDialogOpened(true);
  };

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault();
    const eventId = info.event.url;
    const event = hours?.find(hour => hour.hoursId == eventId);
    if (!event) return;

    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    start.setHours(start.getHours() + 2);
    end.setHours(end.getHours() + 2);

    setEditingEventId(eventId);
    setSelectedDate(start.toISOString().substr(0, 10));
    setWorkStart(start.toISOString().substr(11, 5));
    setWorkEnd(end.toISOString().substr(11, 5));
    setTasks(event.tasks);

    setValue('startTime', start);
    setValue('endTime', end);
    setValue('tasks', event.tasks);
    setDialogOpened(true);
  };

  const handleDeleteHours = async (eventId: string) => {
    try {
      await deleteHours(eventId);
      toast.success('Pomyślnie usunięto godziny!');
    } catch (error) {
      console.error('Failed to delete hours:', error);
      toast.error('Wystąpił błąd podczas usuwania godzin');
    }
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

  return (
    <>
      <div style={{ width: '80%', maxWidth: '950px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={true}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          locale={'pl'}
          buttonText={{
            today: 'Dzisiaj',
            month: 'Miesiąc',
            week: 'Tydzień',
            day: 'Dzień'
          }}
          displayEventEnd={true}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          events={
            Array.isArray(hours)
              ? hours.map(hour => ({
                  title: hour.tasks,
                  start: hour.startTime,
                  end: hour.endTime,
                  url: hour.hoursId.toString(),
                  display: 'block',
                  borderColor: 'transparent'
                }))
              : []
          }
          eventBackgroundColor="rgba(39, 140, 255, 0.95)"
          eventContent={arg => (
            <div
              style={{
                padding: '0.7rem',
                whiteSpace: 'normal',
                fontSize: '0.9rem'
              }}>
              <b>{arg.timeText}</b>
              <div>{arg.event.title}</div>
            </div>
          )}
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
        reset={reset}
        setValue={setValue}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        handleDeleteHours={handleDeleteHours}
        editingEventId={editingEventId}
      />
    </>
  );
}

export default Calendar;
