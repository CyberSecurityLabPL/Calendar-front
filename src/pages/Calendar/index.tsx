import useHours from '@/hooks/useHours';
import { HoursRequest } from '@/types/Hours';
import { timeToDate, timeToHours } from '@/utils/Time';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    setEditingEventId(null);
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
    setSelectedDate(timeToDate(start));
    setWorkStart(timeToHours(start));
    setWorkEnd(timeToHours(end));
    setTasks(event.tasks);

    setValue('startTime', start);
    setValue('endTime', end);
    setValue('tasks', event.tasks);
    setDialogOpened(true);
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
        handleDeleteHours={deleteHours}
        editingEventId={editingEventId}
        addHours={addHours}
        editHours={editHours}
      />
    </>
  );
}

export default Calendar;
