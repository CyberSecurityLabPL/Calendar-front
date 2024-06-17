import useHours from '@/hooks/useHours';
import useMe from '@/hooks/useMe';
import usePdf from '@/hooks/usePdf';
import useUserHours from '@/hooks/useUserHours';
import { Hours } from '@/types/Hours';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef, useState, useEffect, useCallback } from 'react';

import PdfFetcher from '../Users/components/PdfFetcher';
import SelectUsers from '../Users/components/selectUsers';
import HoursForm from './HoursForm';

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpened] = useState(false);
  const [event, setEvent] = useState<Hours | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>('2024-06');
  const { me } = useMe();
  const { userHours } = useUserHours(
    selectedUser || '074221c8-1545-4e4b-a241-60addeaa0764'
  );
  const { hours } = useHours();

  const isAdmin = me && me.role === 'ROLE_ADMIN';
  const isManager = me && me.role === 'ROLE_MANAGER';
  const isAdminOrManager = isAdmin || isManager;
  const data = isAdminOrManager ? userHours : hours;

  const calendarRef = useRef<FullCalendar | null>(null);

  const getCurrentMonth = useCallback(() => {
    if (!calendarRef.current) return '2024-06';
    const calendarApi = calendarRef.current.getApi();
    const date = calendarApi.getDate();

    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month > 12) {
      month = 1;
      year += 1;
    }

    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}`;
  }, []);

  useEffect(() => {
    setCurrentMonth(getCurrentMonth());
  }, [selectedUser, getCurrentMonth]);

  const { pdfMutation } = usePdf(currentMonth, selectedUser);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setEvent(null);
    setDialogOpened(true);
  };

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault();
    setEvent(null);
    const eventId = info.event.url;
    const event = data?.find(hour => hour.hoursId == eventId);
    if (!event) return;
    setDialogOpened(true);
    setEvent(event);
  };

  const handleDatesSet = () => {
    setCurrentMonth(getCurrentMonth());
  };

  return (
    <>
      <div className="flex w-full justify-start">
        <div style={{ width: '100%', maxWidth: '950px', marginRight: '2rem' }}>
          <FullCalendar
            ref={calendarRef}
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
              Array.isArray(data)
                ? data.map(hour => ({
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
            datesSet={handleDatesSet} // This will trigger the month update when the calendar view changes
          />
        </div>
        <PdfFetcher currentMonth={currentMonth} pdfMutation={pdfMutation} />
        {(me.role === 'ROLE_ADMIN' || me.role === 'ROLE_MANAGER') && (
          <SelectUsers
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
      {me.role === 'ROLE_USER' && (
        <HoursForm
          isDialogOpen={isDialogOpen}
          setDialogOpened={setDialogOpened}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setEvent={setEvent}
          event={event}
        />
      )}{' '}
    </>
  );
}

export default Calendar;
