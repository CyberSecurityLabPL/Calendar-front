import useHours from '@/hooks/useHours';
import { Hours } from '@/types/Hours';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

import DialogForm from './DialogForm';

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpened] = useState(false);
  const [event, setEvent] = useState<Hours | null>(null);
  const { hours } = useHours();

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setEvent(null);
    setDialogOpened(true);
  };

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault();
    setEvent(null);
    const eventId = info.event.url;
    const event = hours?.find(hour => hour.hoursId == eventId);
    if (!event) return;
    setDialogOpened(true);
    setEvent(event);
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
        setEvent={setEvent}
        event={event}
      />
    </>
  );
}

export default Calendar;
